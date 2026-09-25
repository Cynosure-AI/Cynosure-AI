import fs from 'node:fs'
import path from 'node:path'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'

const root = process.cwd()
const stylesheet = path.join(root, 'assets/css/main.css')
const fix = process.argv.includes('--fix')

function sourceFiles(directory) {
  if (!fs.existsSync(directory)) return []
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) return sourceFiles(file)
    return /\.(vue|js|ts)$/.test(entry.name) ? [file] : []
  })
}

const usedClasses = new Set()
for (const file of [...sourceFiles(path.join(root, 'pages')), ...sourceFiles(path.join(root, 'components')), path.join(root, 'app.vue')]) {
  if (!fs.existsSync(file)) continue
  const source = fs.readFileSync(file, 'utf8')
  for (const [, value] of source.matchAll(/(?<!:)\bclass=["']([^"']*)["']/g)) {
    for (const name of value.trim().split(/\s+/)) if (name) usedClasses.add(name)
  }
  for (const [, expression] of source.matchAll(/:class=["']([^"']*)["']/g)) {
    for (const [, name] of expression.matchAll(/([\w-]+)\s*:/g)) usedClasses.add(name)
  }
  for (const [, , name] of source.matchAll(/classList\.(?:add|remove|toggle)\((["'])([^"']+)\1/g)) usedClasses.add(name)
}

const css = postcss.parse(fs.readFileSync(stylesheet, 'utf8'), { from: stylesheet })
const orphaned = []
let removed = 0

css.walkRules((rule) => {
  if (rule.parent.type === 'atrule' && rule.parent.name === 'keyframes') return
  const selectors = []
  selectorParser((selectorRoot) => {
    selectorRoot.each((selector) => {
      const missing = new Set()
      selector.walkClasses((node) => {
        // A missing class inside :not() does not make the selector unreachable.
        if (node.parent?.parent?.type === 'pseudo' && node.parent.parent.value === ':not') return
        if (!usedClasses.has(node.value)) missing.add(node.value)
      })
      selectors.push({ text: selector.toString(), missing: [...missing] })
    })
  }).processSync(rule.selector)
  const dead = selectors.filter((selector) => selector.missing.length)
  if (!dead.length) return
  orphaned.push(...dead.map((selector) => `${selector.text} → ${selector.missing.join(', ')}`))
  if (!fix) return
  const live = selectors.filter((selector) => !selector.missing.length)
  removed += dead.length
  if (live.length) rule.selector = live.map((selector) => selector.text).join(', ')
  else rule.remove()
})

if (fix) {
  const laterDeclarations = new Map()
  const rules = []
  css.walkRules((rule) => rules.push(rule))
  for (const rule of rules.reverse()) {
    const ancestors = []
    for (let parent = rule.parent; parent && parent.type !== 'root'; parent = parent.parent) {
      ancestors.push(parent.type === 'atrule' ? `${parent.name}(${parent.params})` : parent.type)
    }
    const key = `${ancestors.reverse().join('/')}|${rule.selector}`
    const properties = laterDeclarations.get(key) || new Set()
    const declarations = []
    rule.walkDecls((declaration) => declarations.push(declaration))
    for (const declaration of declarations.reverse()) {
      if (properties.has(declaration.prop) && !declaration.important) {
        declaration.remove()
        removed++
      } else {
        properties.add(declaration.prop)
      }
    }
    laterDeclarations.set(key, properties)
    if (!rule.nodes?.length) rule.remove()
  }
  const referencedAnimations = new Set()
  css.walkDecls((declaration) => {
    if (/^animation(?:-name)?$/.test(declaration.prop)) {
      for (const name of declaration.value.matchAll(/[a-z][\w-]*/gi)) referencedAnimations.add(name[0])
    }
  })
  css.walkAtRules('keyframes', (rule) => {
    if (!referencedAnimations.has(rule.params)) rule.remove()
  })
  css.walkAtRules((rule) => {
    if (rule.nodes && !rule.nodes.some((node) => node.type !== 'comment')) rule.remove()
  })
  const result = css.toString().replace(/\n[\t ]*\n(?:[\t ]*\n)+/g, '\n\n')
  fs.writeFileSync(stylesheet, result.endsWith('\n') ? result : `${result}\n`)
  console.log(`Removed ${removed} unused selector branches or repeated declarations from main.css.`)
} else if (orphaned.length) {
  console.error(`${orphaned.length} unused CSS selectors found:\n${orphaned.join('\n')}`)
  process.exitCode = 1
} else {
  console.log(`CSS audit passed: every class selector has a matching Vue class.`)
}
