<script setup lang="ts">
import { ArrowRight, Bot, Check, FileText, FolderOpen, Mail, RotateCcw, Search, Sparkles } from '@lucide/vue'

const assetBase = useRuntimeConfig().app.baseURL

type ToolKind = 'memory' | 'files' | 'mail' | 'web'

const workflows: {
  label: string
  title: string
  prompt: string
  tools: { kind: ToolKind; name: string; detail: string }[]
  reply: string
  outputs: { kind: 'mail' | 'file' | 'folder'; name: string; detail: string }[]
}[] = [
  {
    label: 'Follow up',
    title: 'A follow-up, already prepared',
    prompt: 'Catch me up on Project Atlas, draft a follow-up to Maya, and save a brief with the project files.',
    tools: [
      { kind: 'memory', name: 'Search memory', detail: 'Project Atlas · Maya' },
      { kind: 'files', name: 'Find project files', detail: '/Projects/Atlas' },
      { kind: 'mail', name: 'Draft email', detail: 'Follow-up to Maya' },
      { kind: 'files', name: 'Save brief', detail: 'atlas-brief.md' },
    ],
    reply: 'Done. I found the latest launch decisions and Maya’s preference for concise updates. Your follow-up is drafted, and the project brief is saved with the Atlas files.',
    outputs: [
      { kind: 'mail', name: 'Follow-up to Maya', detail: 'Email draft' },
      { kind: 'file', name: 'atlas-brief.md', detail: 'Saved to /Projects/Atlas' },
    ],
  },
  {
    label: 'Research',
    title: 'Research that connects the dots',
    prompt: 'Review the latest customer feedback for Project Atlas. What are the three themes I should bring to our planning meeting?',
    tools: [
      { kind: 'memory', name: 'Recall project context', detail: 'Project Atlas' },
      { kind: 'files', name: 'Read feedback notes', detail: '18 related files' },
      { kind: 'web', name: 'Compare findings', detail: 'Recent research' },
    ],
    reply: 'Three themes stand out: faster onboarding, clearer progress updates, and simpler sharing. I pulled the supporting notes into a short brief for your meeting.',
    outputs: [
      { kind: 'file', name: 'feedback-themes.md', detail: 'Research brief' },
    ],
  },
  {
    label: 'Organize files',
    title: 'The busywork, taken care of',
    prompt: 'Sort the loose launch assets into design, copy, and research folders. Let me know where everything went.',
    tools: [
      { kind: 'files', name: 'Scan launch assets', detail: '12 unsorted files' },
      { kind: 'files', name: 'Create folders', detail: 'Design · Copy · Research' },
      { kind: 'files', name: 'Organize files', detail: '12 files moved' },
    ],
    reply: 'All 12 launch assets are organized. Design has 5 files, Copy has 4, and Research has 3. I saved a move log so you can review the changes.',
    outputs: [
      { kind: 'folder', name: 'Launch assets', detail: '3 organized folders' },
      { kind: 'file', name: 'move-log.md', detail: 'Changes recorded' },
    ],
  },
]

const root = ref<HTMLElement | null>(null)
const selected = ref(0)
const promptText = ref('')
const replyText = ref('')
const shownTools = ref(0)
const showOutputs = ref(false)
const phase = ref<'waiting' | 'prompt' | 'tools' | 'reply' | 'done'>('waiting')
const current = computed(() => workflows[selected.value]!)

let observer: IntersectionObserver | undefined
let motionQuery: MediaQueryList | undefined
let isVisible = false
let runId = 0
let timer: number | undefined
let finishWait: (() => void) | undefined

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    finishWait = () => {
      if (timer !== undefined) window.clearTimeout(timer)
      timer = undefined
      finishWait = undefined
      resolve()
    }
    timer = window.setTimeout(() => finishWait?.(), ms)
  })
}

function stop() {
  runId++
  finishWait?.()
}

function showComplete() {
  promptText.value = current.value.prompt
  shownTools.value = current.value.tools.length
  replyText.value = current.value.reply
  showOutputs.value = true
  phase.value = 'done'
}

async function stream(value: string, target: typeof promptText, id: number) {
  for (let i = 0; i < value.length && id === runId; i++) {
    target.value = value.slice(0, i + 1)
    await wait(i % 4 === 0 ? 27 : 14)
  }
}

async function play() {
  stop()
  const id = runId
  promptText.value = ''
  replyText.value = ''
  shownTools.value = 0
  showOutputs.value = false
  phase.value = 'prompt'

  if (motionQuery?.matches) {
    showComplete()
    return
  }

  await wait(330)
  if (id !== runId) return
  await stream(current.value.prompt, promptText, id)
  if (id !== runId) return
  phase.value = 'tools'
  await wait(400)
  for (let i = 0; i < current.value.tools.length && id === runId; i++) {
    shownTools.value = i + 1
    await wait(610)
  }
  if (id !== runId) return
  phase.value = 'reply'
  await wait(300)
  if (id !== runId) return
  await stream(current.value.reply, replyText, id)
  if (id !== runId) return
  showOutputs.value = true
  phase.value = 'done'
  await wait(7000)
  if (id !== runId || !isVisible) return
  selected.value = (selected.value + 1) % workflows.length
  void play()
}

function selectWorkflow(index: number) {
  selected.value = index
  if (isVisible) void play()
  else showComplete()
}

function onMotionChange() {
  if (motionQuery?.matches) {
    stop()
    showComplete()
  } else if (isVisible) {
    void play()
  }
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionQuery.addEventListener('change', onMotionChange)
  observer = new IntersectionObserver(([entry]) => {
    if (!entry) return
    isVisible = entry.isIntersecting
    if (isVisible) {
      if (phase.value === 'waiting' || phase.value === 'done') void play()
    } else {
      stop()
      if (phase.value !== 'waiting') showComplete()
    }
  }, { threshold: 0.2 })
  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  stop()
  observer?.disconnect()
  motionQuery?.removeEventListener('change', onMotionChange)
})
</script>

<template>
  <div ref="root" class="workflow-demo" aria-label="Illustrated Cynosure task conversation">
    <div class="workflow-demo-top">
      <div class="workflow-demo-identity"><span class="workflow-demo-logo"><img :src="`${assetBase}logo.png`" alt="" /></span><span><strong>Cynosure</strong><small>Working across your tools</small></span></div>
    </div>

    <div class="workflow-demo-tabs" aria-label="Example workflows">
      <button v-for="(workflow, index) in workflows" :key="workflow.label" type="button" :aria-pressed="selected === index" :class="{ active: selected === index }" @click="selectWorkflow(index)">{{ workflow.label }}</button>
    </div>

    <div class="workflow-demo-body">
      <div class="workflow-demo-caption"><span class="workflow-live-dot"></span> LIVE WORKFLOW <span class="workflow-demo-number">0{{ selected + 1 }} / 0{{ workflows.length }}</span></div>
      <h3>{{ current.title }}</h3>
      <div class="workflow-message user-message"><span class="workflow-avatar user-avatar">YOU</span><div class="workflow-message-content"><span class="workflow-message-name">You</span><p>{{ promptText }}<span v-if="phase === 'prompt'" class="workflow-cursor" aria-hidden="true"></span><span v-if="phase === 'waiting'" class="workflow-placeholder">Ask Cynosure to handle a task…</span></p></div></div>

      <div v-if="shownTools" class="workflow-tool-list"><div v-for="tool in current.tools.slice(0, shownTools)" :key="tool.name" class="workflow-tool"><span class="workflow-tool-icon"><Search v-if="tool.kind === 'memory' || tool.kind === 'web'" :size="14" /><Mail v-else-if="tool.kind === 'mail'" :size="14" /><FolderOpen v-else :size="14" /></span><span class="workflow-tool-name">{{ tool.name }}</span><span class="workflow-tool-detail">{{ tool.detail }}</span><Check class="workflow-tool-check" :size="14" /></div></div>

      <div v-if="phase === 'reply' || phase === 'done'" class="workflow-message assistant-message"><span class="workflow-avatar assistant-avatar"><Bot :size="17" /></span><div class="workflow-message-content"><span class="workflow-message-name">Cynosure <Sparkles :size="12" /></span><p>{{ replyText }}<span v-if="phase === 'reply'" class="workflow-cursor" aria-hidden="true"></span></p></div></div>

      <div v-if="showOutputs" class="workflow-outputs"><div v-for="output in current.outputs" :key="output.name" class="workflow-output"><span class="workflow-output-icon"><Mail v-if="output.kind === 'mail'" :size="18" /><FolderOpen v-else-if="output.kind === 'folder'" :size="18" /><FileText v-else :size="18" /></span><span><strong>{{ output.name }}</strong><small>{{ output.detail }}</small></span><ArrowRight :size="15" /></div></div>
    </div>
    <div class="workflow-demo-bottom"><span><Check :size="13" /> Tasks, tools, and results in one conversation</span><span>ILLUSTRATIVE DEMO</span></div>
  </div>
</template>
