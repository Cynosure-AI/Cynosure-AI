<script setup lang="ts">
import {
  ArrowDownUp,
  ArrowDown,
  ArrowUpRight,
  BarChart3,
  BrainCircuit,
  Check,
  DatabaseBackup,
  EyeOff,
  FolderOpen,
  ListFilter,
  Mail,
  Menu,
  Mic2,
  Network,
  Palette,
  PanelTopOpen,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from '@lucide/vue'

const downloadPlatforms = ['Windows', 'macOS', 'Linux'] as const
type DownloadPlatform = typeof downloadPlatforms[number]

const menuOpen = ref(false)
const currentPlatform = ref<DownloadPlatform>('Windows')
const alternatePlatforms = computed(() => downloadPlatforms.filter(platform => platform !== currentPlatform.value))
let revealObserver: IntersectionObserver | undefined

useSeoMeta({
  title: 'Cynosure — Your AI, in one place',
  description: 'Cynosure is a private AI workspace for agents, durable memory, tools, media, and automations.',
  ogTitle: 'Cynosure — Your AI, in one place',
  ogDescription: 'A private AI workspace for agents, durable memory, tools, media, and automations.',
  ogType: 'website',
})

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', href: '/logo.png' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap',
    },
  ],
  meta: [{ name: 'theme-color', content: '#070b0f' }],
})

onMounted(() => {
  const userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.includes('mac')) currentPlatform.value = 'macOS'
  else if (userAgent.includes('linux')) currentPlatform.value = 'Linux'

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        revealObserver?.unobserve(entry.target)
      }
    })
  }, { threshold: 0.12 })

  document.querySelectorAll('.reveal').forEach(element => revealObserver?.observe(element))
})

onBeforeUnmount(() => revealObserver?.disconnect())

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <div class="grain" aria-hidden="true"></div>
  <header class="site-header" :class="{ open: menuOpen }">
    <a class="brand" href="#top" aria-label="Cynosure home">
      <img src="/logo.png" alt="" />
      <span>CYNOSURE</span>
    </a>
    <nav aria-label="Main navigation">
      <a href="#features" @click="closeMenu">Capabilities</a>
      <a href="#memory" @click="closeMenu">Memory</a>
      <a href="#workspace" @click="closeMenu">Agents</a>
      <a href="https://github.com/andreasjhagen/Cynosure#readme" target="_blank" rel="noreferrer">Documentation
        <span>↗</span></a>
    </nav>
    <a class="nav-cta" href="https://github.com/andreasjhagen/Cynosure/releases/latest">Download <ArrowDown :size="14" /></a>
    <button class="menu-button" type="button" aria-label="Toggle navigation" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
      <X v-if="menuOpen" :size="22" />
      <Menu v-else :size="22" />
    </button>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy reveal">
        <div class="eyebrow"><span></span> The AI workspace that remembers</div>
        <h1>Your models.<br />Your tools. <em>Your AI.</em></h1>
        <p class="hero-lede">A focused command center for working with local and remote AI. Connect any model, build
          persistent memory, and let capable agents get real work done.</p>
        <div class="hero-actions">
          <a class="button primary" href="https://github.com/andreasjhagen/Cynosure/releases/latest"><span>Download
              for {{ currentPlatform }}</span><ArrowDown :size="17" /></a>
          <a class="button secondary" href="https://github.com/andreasjhagen/Cynosure#readme" target="_blank"
            rel="noreferrer">Read the docs <ArrowUpRight :size="14" /></a>
        </div>
        <div class="hero-notes"><span>Free to use</span><span>Desktop &amp; web</span></div>
      </div>

      <figure class="hero-visual reveal delay-1">
        <div class="orb orb-one"></div>
        <div class="orb orb-two"></div>
        <div class="screenshot-frame"><img src="/cynosure-app.png"
            alt="Cynosure desktop app showing the chat workspace, agents, artifacts, memories, and model controls" />
        </div>
        <figcaption>One workspace for chat, agents, memory, artifacts, and automations.</figcaption>
      </figure>
    </section>

    <section class="feature-bar mini-features reveal" aria-label="Core platform features">
      <article><span>◷</span>
        <div>
          <h3>Scheduling</h3>
          <p>Automate recurring agent runs with flexible cron schedules.</p>
        </div>
      </article>
      <article><span>⌘</span>
        <div>
          <h3>MCP native</h3>
          <p>Connect standard Model Context Protocol servers and tools.</p>
        </div>
      </article>
      <article><span>◇</span>
        <div>
          <h3>Composable agent teams</h3>
          <p>Build workflows where focused specialists handle different parts of the task.</p>
        </div>
      </article>
      <article><span>◈</span>
        <div>
          <h3>Channels</h3>
          <p>Meet your agents in Telegram, Discord, and Slack.</p>
        </div>
      </article>
    </section>

    <section class="trust-strip" aria-label="Supported capabilities">
      <p>WORKS WITH ANY PROVIDER. EVERY MODEL.</p>
      <div class="provider-list"><span><i><img src="/providers/openai.png" alt="" /></i>OpenAI</span><span><i><img
              src="/providers/anthropic.png" alt="" /></i>Anthropic</span><span><i><img
              src="/providers/google-gemini.png" alt="" /></i>Gemini</span><span><i><img src="/providers/ollama.png"
              alt="" /></i>Ollama</span><span><i><img src="/providers/lmstudio.png" alt="" /></i>LM
          Studio</span><span><i><img src="/providers/openrouter.png" alt="" /></i>OpenRouter</span></div>
    </section>

    <section class="intro product-overview" id="features">
      <div class="section-kicker reveal"><span>01</span> Your stack, your way</div>
      <div class="intro-heading reveal">
        <h2>Start minimal.<br /><em>Add what matters.</em></h2>
        <div class="intro-summary">
          <p>Cynosure is customizable from the first launch—including the default system prompt. Shape a personal AI
            harness around the way you work.</p>
          <ul class="overview-list" aria-label="Included out of the box">
            <li><Check :size="14" /> Durable, source-grounded memory</li>
            <li><Check :size="14" /> Browsable and custom MCP tools</li>
            <li><Check :size="14" /> Purpose-built agents and agent teams</li>
            <li><Check :size="14" /> Schedules and recurring automations</li>
            <li><Check :size="14" /> Telegram, Discord, and Slack channels</li>
            <li><Check :size="14" /> Local and remote model support</li>
          </ul>
        </div>
      </div>

      <article class="mcp-spotlight reveal">
        <div class="feature-copy mcp-copy">
          <span class="feature-overline">EXTENSIBILITY, BY DESIGN</span>
          <h3>Your tools,<br />within reach.</h3>
          <p>Browse compatible MCP servers inside Cynosure, review the tools they provide, and add them to your workspace
            in a few clicks. Bring a custom server whenever the directory does not cover your workflow.</p>
          <div class="mcp-chips"><span>Browse in app</span><span>One-click add</span><span>Bring your own MCP</span></div>
        </div>
        <div class="mcp-browser" aria-label="MCP server browser with popular compatible services">
          <div class="mcp-browser-head"><span><i></i> MCP DIRECTORY</span><b>BROWSE + ADD</b></div>
          <div class="service-grid">
            <div class="service"><img src="https://cdn.simpleicons.org/github/ffffff" alt="" /><strong>GitHub</strong><small>Development</small><button type="button" aria-label="Add GitHub MCP">+</button></div>
            <div class="service"><img src="https://cdn.simpleicons.org/gmail/EA4335" alt="" /><strong>Gmail</strong><small>Email</small><button type="button" aria-label="Add Gmail MCP">+</button></div>
            <div class="service"><Mail :size="26" /><strong>Outlook</strong><small>Email</small><button type="button" aria-label="Add Outlook MCP">+</button></div>
            <div class="service"><img src="https://cdn.simpleicons.org/notion/ffffff" alt="" /><strong>Notion</strong><small>Knowledge</small><button type="button" aria-label="Add Notion MCP">+</button></div>
            <div class="service"><FolderOpen :size="26" /><strong>File System</strong><small>Local files</small><button type="button" aria-label="Add File System MCP">+</button></div>
            <div class="service"><Search :size="26" /><strong>Tavily Search</strong><small>Web research</small><button type="button" aria-label="Add Tavily Search MCP">+</button></div>
            <div class="service"><img class="slack-logo" src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/slack.svg" alt="" /><strong>Slack</strong><small>Messaging</small><button type="button" aria-label="Add Slack MCP">+</button></div>
          </div>
          <div class="mcp-browser-foot mcp-setup-guide">
            <span>EXPAND IN SECONDS</span>
            <p>Open <b>MCP Servers</b> → <b>Browse</b> → click <b>Add</b> on whatever you want.</p>
            <small>Powered by the official MCP Registry, Smithery, Glama, and Cyno’s curated selection.</small>
          </div>
        </div>
      </article>
    </section>

    <section class="memory-section" id="memory">
      <div class="section-kicker reveal"><span>02</span> Memory, connected</div>
      <div class="memory-heading reveal">
        <h2>Context that stays.<br /><em>Knowledge that grows.</em></h2>
        <p>Memory in Cynosure is more than conversation history. It retrieves what matters for the task, keeps every
          connection inspectable, and continues organizing useful knowledge over time.</p>
      </div>
      <div class="memory-feature-list">
        <article class="feature large memory-feature reveal">
          <div class="feature-copy">
            <div class="feature-icon"><BrainCircuit :size="20" /></div>
            <span class="feature-overline">FOCUSED RETRIEVAL</span>
            <h3>Memory that assembles the right context</h3>
            <p>Retrieval can be called explicitly as a tool or activated automatically from the conversation. Cynosure
              searches memory in parallel, filters and re-ranks the evidence, and exposes only the MCPs and tools the
              task actually needs—keeping prompts focused and token use down.</p>
            <div class="tags"><span>Tool + auto retrieval</span><span>Parallel queries</span><span>Lean context</span>
            </div>
          </div>
          <div class="memory-layers" role="img"
            aria-label="Five animated layers search semantically, run multiple queries, search the knowledge graph, rerank and curate, and serve focused context in under four seconds.">
            <div class="memory-stage stage-search">
              <div class="stage-label"><b>01</b><Search class="stage-icon" :size="17" /><span>Search semantically</span></div>
            </div>
            <div class="memory-stage stage-query">
              <div class="stage-label"><b>02</b><Network class="stage-icon" :size="17" /><span>Search knowledge graph</span></div>
            </div>
            <div class="memory-stage stage-filter">
              <div class="stage-label"><b>03</b><ListFilter class="stage-icon" :size="17" /><span>Filter results</span></div>
            </div>
            <div class="memory-stage stage-rerank">
              <div class="stage-label"><b>04</b><ArrowDownUp class="stage-icon" :size="17" /><span>Rerank &amp; curate</span></div>
            </div>
            <div class="memory-stage stage-serve">
              <div class="stage-label"><b>05</b><PanelTopOpen class="stage-icon" :size="17" /><span>Serve to context</span></div>
            </div>
          </div>
        </article>
        <article class="feature large graph-feature reveal">
          <div class="feature-copy">
            <div class="feature-icon"><Sparkles :size="20" /></div>
            <span class="feature-overline">KNOWLEDGE GRAPH + DREAMING MODE</span>
            <h3>A memory that keeps thinking.</h3>
            <p>Your knowledge graph makes people, projects, facts, and their relationships visible. Turn on Dreaming
              Mode and Cynosure quietly reviews past conversations, connects related ideas, and consolidates useful
              knowledge while you are away.</p>
            <div class="dream-status"><i></i><span><b>DREAMING MODE</b><small>Reflecting · connecting · consolidating</small></span><em>ACTIVE</em></div>
            <div class="tags"><span>Source grounded</span><span>Editable memory</span><span>Runs locally</span></div>
          </div>
          <figure class="product-shot memory-graph-shot"><img src="/screenshots/memory-graph.png"
              alt="Cynosure knowledge graph showing connected memories, people, projects, and facts" loading="lazy" />
            <figcaption><span>Living memory</span> Inspect every connection and keep the source in view.</figcaption>
          </figure>
        </article>

      </div>
    </section>

    <section class="workspace" id="workspace">
      <div class="workspace-bg"></div>
      <div class="section-kicker light reveal"><span>03</span> Work beyond the window</div>
      <div class="workspace-heading reveal">
        <h2>Your agents don’t<br />clock out when <em>you do.</em></h2>
        <p>Create agents for distinct roles, then reuse them as sub-agents inside other agents. Each specialist handles
          its part of a complex workflow, with its own model, memory, and tools.</p>
      </div>
      <div class="workflow reveal">
        <div class="workflow-col">
          <div class="workflow-title"><span>TRIGGERS</span><i></i></div>
          <div class="node"><b>◷</b>
            <div><strong>Every weekday</strong><small>08:30 · Europe/Vienna</small></div>
          </div>
          <div class="node"><b>#</b>
            <div><strong>New Slack message</strong><small>#weekly-research</small></div>
          </div>
        </div>
        <div class="connector"><span></span><i>→</i></div>
        <div class="workflow-col center">
          <div class="workflow-title"><span>AGENT</span><i></i></div>
          <div class="agent-node"><img src="/logo.png" alt="" />
            <div><small>RESEARCH AGENT</small><strong>Morning brief</strong><span><i></i> Ready</span></div><b>7
              tools</b>
          </div>
        </div>
        <div class="connector"><span></span><i>→</i></div>
        <div class="workflow-col">
          <div class="workflow-title"><span>DELIVERS TO</span><i></i></div>
          <div class="channel-row">
            <div class="channel telegram">➤</div>
            <div class="channel discord">⌘</div>
            <div class="channel slack">#</div>
          </div>
          <div class="delivery">Telegram · Discord · Slack</div>
        </div>
      </div>
      <figure class="product-shot schedule-shot reveal"><img src="/screenshots/schedule.png"
          alt="Cynosure scheduled jobs view showing recurring agents, schedules, statuses, and controls"
          loading="lazy" />
        <figcaption><span>Scheduled jobs</span> Keep recurring work visible, editable, and under your control.
        </figcaption>
      </figure>
    </section>

    <section class="personalize">
      <div class="section-kicker reveal"><span>04</span> Make it yours</div>
      <div class="personal-heading reveal">
        <div class="personal-copy">
          <h2>Your workspace.<br /><em>Your way.</em></h2>
        </div>
        <p>From how Cynosure looks and listens to how every tool is allowed to act, the workspace is designed to adapt
          to you—not the other way around.</p>
      </div>
      <div class="personal-feature-grid reveal" aria-label="Workspace personalization and control features">
        <article><Palette :size="21" /><span>APPEARANCE</span><h3>Themes that feel like yours</h3><p>Choose from distinct workspace themes and display options built for long sessions.</p></article>
        <article><Mic2 :size="21" /><span>VOICE INPUT</span><h3>Speak locally or remotely</h3><p>Use local or remote speech-to-text providers and choose where voice processing happens.</p></article>
        <article><ShieldCheck :size="21" /><span>TOOL CONTROL</span><h3>Policy for every tool</h3><p>Set fine-grained, per-tool policies while destructive actions remain behind a human confirmation gate.</p></article>
        <article><EyeOff :size="21" /><span>PRIVACY</span><h3>No telemetry. Full stop.</h3><p>No tracking, usage analytics, or hidden data collection from Cynosure.</p></article>
        <article><BarChart3 :size="21" /><span>VISIBILITY</span><h3>Know what gets used</h3><p>Keep model, tool, and agent usage visible so your setup never becomes a black box.</p></article>
        <article><DatabaseBackup :size="21" /><span>PORTABILITY</span><h3>Back up and move freely</h3><p>Export and restore your workspace so your configuration and knowledge stay portable.</p></article>
      </div>
    </section>

    <section class="cta-section" id="download">
      <div class="cta-atmosphere" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="cta-inner">
        <div class="cta-copy reveal">
          <div class="eyebrow"><span></span> Your workspace is ready</div>
          <h2>Bring your AI<br /><em>into focus.</em></h2>
          <p>One private workspace for the models, knowledge, tools, and agents that move your work forward.</p>
          <div class="hero-actions"><a class="button primary platform-download"
              href="https://github.com/andreasjhagen/Cynosure/releases/latest"><span>Download for {{ currentPlatform }}</span><ArrowDown :size="17" /></a></div>
          <div class="download-alternates">
            <span>Also available for</span>
            <a v-for="platform in alternatePlatforms" :key="platform"
              href="https://github.com/andreasjhagen/Cynosure/releases/latest">{{ platform }}</a>
          </div>
          <small>Free to use · No tracking · Your data stays yours</small>
        </div>
      </div>
    </section>
  </main>

  <footer><a class="brand" href="#top"><img src="/logo.png" alt="" /><span>CYNOSURE</span></a>
    <p>© 2026 Cynosure. Free to use</p>
    <div><a href="https://github.com/andreasjhagen/Cynosure#readme">Documentation</a><a
        href="https://github.com/andreasjhagen/Cynosure/releases">Releases</a><a
        href="https://github.com/andreasjhagen/Cynosure/issues">Support</a></div>
  </footer>
</template>
