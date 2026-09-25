<script setup lang="ts">
import {
  ArrowDownUp,
  ArrowDown,
  ArrowUpRight,
  Bot,
  Box,
  CalendarClock,
  CircleCheck,
  Clock3,
  Database,
  MessageCircle,
  Monitor,
  Plus,
  Send,
  Settings2,
  Terminal,
  BarChart3,
  BrainCircuit,
  Check,
  DatabaseBackup,
  EyeOff,
  FolderOpen,
  ListFilter,
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
const featuredServices = [
  { name: 'Filesystem', description: 'Read, write and search local files.', category: 'Local files', icon: '' },
  { name: 'Web Fetch', description: 'Fetch and explore web content.', category: 'Web', icon: '' },
  { name: 'Terminal', description: 'Run terminal commands.', category: 'System', icon: '' },
  { name: 'GitHub', description: 'Work with issues, repos and pull requests.', category: 'Development', icon: 'github-icon.svg' },
  { name: 'Google Drive', description: 'Access and manage your files.', category: 'Cloud files', icon: 'google-drive-color-icon.svg' },
  { name: 'Slack', description: 'Read and send messages.', category: 'Messaging', icon: 'slack-icon.svg' },
  { name: 'YouTube', description: 'Search and transcribe videos.', category: 'Media', icon: 'youtube-color-icon.svg' },
  { name: 'Notion', description: 'Read and update your pages.', category: 'Knowledge', icon: '' },
  { name: 'Weather', description: 'Get current weather and forecasts.', category: 'Information', icon: '' },
] as const
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
      <a href="#workspace" @click="closeMenu">Use Cases</a>
      <a href="#download" @click="closeMenu">Pricing</a>
      <a href="https://github.com/andreasjhagen/Cynosure#readme" target="_blank" rel="noreferrer">Documentation
        <span>↗</span></a>
    </nav>
    <a class="nav-cta" href="https://github.com/andreasjhagen/Cynosure/releases/latest">Download
      <ArrowDown :size="14" />
    </a>
    <button class="menu-button" type="button" aria-label="Toggle navigation" :aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen">
      <X v-if="menuOpen" :size="22" />
      <Menu v-else :size="22" />
    </button>
  </header>

  <main id="top">
    <section class="hero">
      <div class="hero-copy reveal">
        <div class="eyebrow"><span></span> The AI workspace that remembers</div>
        <h1>Your models.<br />Your tools. <br/><em>Your AI.</em></h1>
        <p class="hero-lede">Cynosure is the AI workspace for models, tools, memory, agents, artifacts, and automations — all in one place. Bring your own models or use a provider API, then add the tools and memory your workflows need.</p>
        <div class="hero-actions">
          <a class="button primary" href="https://github.com/andreasjhagen/Cynosure/releases/latest"><span>Download
              for {{ currentPlatform }}</span>
            <ArrowDown :size="17" />
          </a>
          <a class="button secondary" href="https://github.com/andreasjhagen/Cynosure#readme" target="_blank"
            rel="noreferrer">Read the docs
            <ArrowUpRight :size="14" />
          </a>
        </div>
        <div class="hero-notes">
          <span><Monitor :size="23" /><span>Desktop &amp; Web<small>Free to use</small></span></span>
          <span><Database :size="23" /><span>Bring your own models<small>Or use any provider API</small></span></span>
          <span><Box :size="23" /><span>Tools, memory, agents<small>All in one workspace</small></span></span>
        </div>
      </div>

      <figure class="hero-visual reveal delay-1">
        <div class="hero-app" aria-label="Preview of Cynosure's chat workspace">
          <div class="hero-app-top"><div class="traffic"><i></i><i></i><i></i></div></div>
          <div class="hero-app-body">
            <aside class="hero-app-sidebar">
              <div class="hero-app-brand"><img src="/logo.png" alt="" /> CYNOSURE</div>
              <div class="hero-app-item active"><MessageCircle :size="12" /> Chat</div>
              <div class="hero-app-item"><Box :size="12" /> Models</div>
              <div class="hero-app-item"><Settings2 :size="12" /> Tools</div>
              <div class="hero-app-item"><Bot :size="12" /> Agents</div>
              <div class="hero-app-item"><FolderOpen :size="12" /> Artifacts</div>
              <div class="hero-app-item"><Database :size="12" /> Memory</div>
              <div class="hero-app-recent">RECENT CHATS</div>
              <div v-for="chat in ['Build a research agent', 'Analyze dataset trends', 'Create marketing assets', 'Summarize user feedback']" :key="chat" class="hero-app-chat"><span>✦</span>{{ chat }}</div>
            </aside>
            <div class="hero-app-main">
              <div class="hero-app-toolbar"><span><MessageCircle :size="12" /> Chat</span><span class="hero-app-new"><Plus :size="12" /> New Chat</span></div>
              <div class="hero-app-center"><div class="hero-app-bot"><Bot :size="28" /></div><strong>WHAT'S ON YOUR MIND?</strong><p>Chat with your models, use your tools, access your memory,<br />create agents, and automate your workflows.</p></div>
              <div class="hero-app-composer"><span>Type a message or add tools...</span><div><span><Search :size="12" /> Search</span><span><Settings2 :size="12" /> Tools</span><span><Database :size="12" /> Memory</span><span><Bot :size="12" /> Agents</span><b>Cynosure Intelligence⌄</b><Send :size="12" /></div></div>
            </div>
          </div>
        </div>
      </figure>
    </section>

    <section class="overview-band" id="features">
      <div class="overview-title"><div class="section-kicker">A complete AI workspace</div><h2>Everything you need<br />to go further.</h2></div>
      <a class="overview-card" href="#features-detail"><span class="overview-icon"><Box :size="26" /></span><div><h3>Models</h3><p>Use your own models or connect any provider API. Switch, compare, and customize for your workflow.</p><span class="card-link">Learn more <ArrowUpRight :size="15" /></span></div></a>
      <a class="overview-card" href="#memory"><span class="overview-icon"><Database :size="26" /></span><div><h3>Memory</h3><p>Give your AI a long-term memory. Reference past work, build context, and keep knowledge at hand.</p><span class="card-link">Learn more <ArrowUpRight :size="15" /></span></div></a>
      <a class="overview-card" href="#workspace"><span class="overview-icon"><Sparkles :size="26" /></span><div><h3>Agents &amp; Tools</h3><p>Add tools, create agents, and automate repetitive work. Turn ideas into powerful workflows.</p><span class="card-link">Learn more <ArrowUpRight :size="15" /></span></div></a>
    </section>



    <section class="trust-strip" aria-label="Supported capabilities">
      <p>ALL COMMON REMOTE AND LOCAL PROVIDERS. A HUGE VARIETY OF MODELS.</p>
      <div class="provider-list"><span><i><img src="/providers/openai.png" alt="" /></i>OpenAI</span><span><i><img
              src="/providers/anthropic.png" alt="" /></i>Anthropic</span><span><i><img
              src="/providers/google-gemini.png" alt="" /></i>Gemini</span><span><i><img src="/providers/ollama.png"
              alt="" /></i>Ollama</span><span><i><img src="/providers/lmstudio.png" alt="" /></i>LM
          Studio</span><span><i><img src="/providers/openrouter.png" alt="" /></i>OpenRouter</span></div>
    </section>



    <section class="intro product-overview" id="features-detail">
      <div class="mcp-heading reveal">
        <div><div class="section-kicker">MCP Directory</div><h2>Add functionality<br /><em>in a few clicks.</em></h2><p>Find and add MCP servers in Cynosure’s built-in store, powered by Smithery and the official MCP Registry. Bring a custom server whenever the directory doesn’t cover your workflow.</p></div>
        <p>Just add a provider API key or connect a model running locally. There is little to configure before your first conversation, with models, prompts, tools, and agents ready to customize when you want more control.</p>
      </div>
      <div class="mcp-stage reveal">
        <div class="mcp-steps">
          <div><span><Search :size="28" /></span><p><strong>Discover</strong>Browse curated and official registries.</p></div>
          <div><span><Plus :size="28" /></span><p><strong>Install</strong>Add MCP servers with one click.</p></div>
          <div><span><Settings2 :size="28" /></span><p><strong>Configure</strong>Set API keys and permissions.</p></div>
          <div><span><Box :size="28" /></span><p><strong>Use instantly</strong>Tools are available in chat right away.</p></div>
          <div class="mcp-actions"><a class="button primary" href="https://github.com/andreasjhagen/Cynosure#readme" target="_blank" rel="noreferrer">Explore MCP servers <ArrowUpRight :size="16" /></a><a class="button secondary" href="https://github.com/andreasjhagen/Cynosure#readme" target="_blank" rel="noreferrer">Learn more <ArrowUpRight :size="16" /></a></div>
        </div>
        <div class="mcp-showcase" aria-label="Illustration of the Cynosure MCP directory">
          <div class="floating-service float-github"><img src="/mcp-icons/github-icon.svg" alt="" /></div>
          <div class="floating-service float-slack"><img src="/mcp-icons/slack-icon.svg" alt="" /></div>
          <div class="floating-service float-drive"><img src="/mcp-icons/google-drive-color-icon.svg" alt="" /></div>
          <div class="mcp-browser">
            <div class="mcp-browser-head"><span><img src="/logo.png" alt="" /> MCP STORE</span></div>
            <div class="mcp-browser-body">
              <aside class="mcp-sidebar"><div class="mcp-search"><Search :size="13" /> Search MCP servers...</div><b>Recommended <small>12</small></b><span>Official <small>48</small></span><span>Smithery <small>312</small></span><span>Glama <small>156</small></span><em>INSTALLED</em><span>File System</span><span>Web &amp; Data</span><span>Development</span><span>System</span><span class="mcp-custom">＋ Add Custom Server</span></aside>
              <div class="mcp-results"><div class="mcp-results-head"><div><strong>Recommended</strong><small>Handpicked MCP servers for everyday use.</small></div><span>Popular⌄</span></div><div class="mcp-result-grid"><div v-for="service in featuredServices" :key="service.name" class="mcp-result-card"><div class="mcp-result-title"><span class="mcp-result-icon"><img v-if="service.icon" :src="`/mcp-icons/${service.icon}`" alt="" /><FolderOpen v-else-if="service.name === 'Filesystem'" :size="25" /><Terminal v-else-if="service.name === 'Terminal'" :size="25" /><span v-else>{{ service.name === 'Web Fetch' ? '◎' : service.name === 'Weather' ? '☀' : 'N' }}</span></span><div><strong>{{ service.name }}</strong><small>{{ service.description }}</small></div></div><div class="mcp-result-foot"><span>↧ {{ service.category }}</span><span class="install-label">Install</span></div></div></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="memory-section" id="memory">
      <div class="section-kicker reveal">Memory, connected</div>
      <div class="memory-heading reveal">
        <h2>Always the right context.<br /><em>Always up to date.</em></h2>
        <p>Cynosure automatically reviews all conversations for key facts, connects related information over time, and
          learns your preferences and skills. Its memory helps it see the bigger picture as you work together.</p>
      </div>
      <div class="memory-feature-list">
        <article class="feature large memory-feature reveal">
          <div class="feature-copy">

            <span class="feature-overline">FOCUSED RETRIEVAL</span>
            <h3>Memory that assembles the right context</h3>
            <p>When you ask a question, Cynosure searches relevant memories and their connections, filters and reranks
              the results, then brings the most useful context into the conversation.</p>
            <div class="tags"><span>Tool + auto retrieval</span><span>Parallel queries</span><span>Lean context</span>
            </div>
          </div>
          <div class="memory-layers" role="img"
            aria-label="Five animated layers search semantically, run multiple queries, search the knowledge graph, rerank and curate, and serve focused context in under four seconds.">
            <div class="memory-stage stage-search">
              <div class="stage-label"><b>01</b>
                <Search class="stage-icon" :size="17" /><span>Search semantically</span>
              </div>
            </div>
            <div class="memory-stage stage-query">
              <div class="stage-label"><b>02</b>
                <Network class="stage-icon" :size="17" /><span>Search knowledge graph</span>
              </div>
            </div>
            <div class="memory-stage stage-filter">
              <div class="stage-label"><b>03</b>
                <ListFilter class="stage-icon" :size="17" /><span>Filter results</span>
              </div>
            </div>
            <div class="memory-stage stage-rerank">
              <div class="stage-label"><b>04</b>
                <ArrowDownUp class="stage-icon" :size="17" /><span>Rerank &amp; curate</span>
              </div>
            </div>
            <div class="memory-stage stage-serve">
              <div class="stage-label"><b>05</b>
                <PanelTopOpen class="stage-icon" :size="17" /><span>Serve to context</span>
              </div>
            </div>
          </div>
        </article>
        <article class="feature large graph-feature reveal">
          <div class="feature-copy">

            <span class="feature-overline">KNOWLEDGE GRAPH + DREAMING MODE</span>
            <h3>Memory that grows along with you</h3>
            <p>Your knowledge graph connects people, projects, facts, preferences, and skills so Cynosure can understand
              how they fit together. Inspect those connections in the app.
              <br><br>Dreaming Mode revisits past conversations while you are away, linking related ideas and
              consolidating useful knowledge.</p>
            <div class="dream-status"><i></i><span><b>DREAMING MODE</b><small>Reflecting · connecting ·
                  consolidating</small></span><em>ACTIVE</em></div>
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
      <div class="section-kicker light reveal">Beyond the desktop</div>
      <div class="workspace-heading reveal"><h2>Your AI, wherever<br /><em>you are.</em></h2><p>Keep the conversation going from your favorite chat app, and schedule work for Cynosure to handle at the right time.</p></div>
      <div class="remote-grid">
        <article class="remote-card remote-chat reveal"><div class="remote-card-copy"><span class="feature-overline">REMOTE CHAT</span><h3>Message Cynosure from anywhere.</h3><p>Talk to your AI through Telegram, Discord, or Slack. Ask questions and continue conversations when you’re away from the workspace.</p><div class="remote-platforms"><span><Send :size="19" /> Telegram</span><span><img src="/mcp-icons/discord-color-icon.svg" alt="" /> Discord</span><span><img src="/mcp-icons/slack-icon.svg" alt="" /> Slack</span></div></div><div class="remote-chat-preview" aria-hidden="true"><div class="preview-head"><span class="preview-avatar"><img src="/logo.png" alt="" /></span><div><strong>Cynosure</strong><small>Always ready to help</small></div><span class="online-dot"></span></div><div class="preview-messages"><div class="preview-message outgoing">Can you summarize the latest project notes?</div><div class="preview-message incoming">Of course. Here are the three updates that matter most today…</div></div><div class="preview-input">Message Cynosure <Send :size="14" /></div></div></article>
        <article class="remote-card remote-schedule reveal"><div class="remote-card-copy"><span class="feature-overline">SCHEDULES</span><h3>Put recurring work on the calendar.</h3><p>Schedule an agent to run a daily brief, weekly review, or any task you want done on a regular cadence.</p><div class="schedule-example"><CalendarClock :size="20" /><span><strong>Morning brief</strong><small>Every weekday · 08:30</small></span><CircleCheck :size="18" /></div></div><figure class="remote-schedule-shot"><img src="/screenshots/schedule.png" alt="Cynosure schedule screen showing recurring jobs and their status" loading="lazy" /></figure></article>
      </div>
    </section>

    <section class="personalize">
      <div class="section-kicker reveal">Your workspace. Your way.</div>
      <div class="personal-heading reveal">
        <div class="personal-copy">
          <h2>Make it <em>yours.</em></h2>
        </div>
        <p>From how Cynosure looks and listens to how every tool is allowed to act, the workspace is designed to adapt
          to you—not the other way around.</p>
      </div>
      <div class="personal-feature-grid reveal" aria-label="Workspace personalization and control features">
        <article>
          <Palette :size="21" /><span>Make it feel like yours</span>
          <h3>Themes</h3>
          <p>Choose from distinct workspace themes and display options built for long sessions.</p>
        </article>

        <article>
          <Mic2 :size="21" /><span>Speak locally or remotely</span>
          <h3>Voice Input</h3>
          <p>Use local or remote speech-to-text providers and use your voice to give commands.</p>
        </article>

        <article>
          <ShieldCheck :size="21" /><span>Policy for every tool</span>
          <h3>Tool Control</h3>
          <p>Set fine-grained, per-tool policies while destructive actions remain behind a human confirmation gate.</p>
        </article>

        <article>
          <EyeOff :size="21" /><span>No telemetry. Full stop.</span>
          <h3>Privacy</h3>
          <p>No tracking, usage analytics, or hidden data collection from Cynosure.</p>
        </article>

        <article>
          <BarChart3 :size="21" /><span>Know what gets used</span>
          <h3>Usage Analytics</h3>
          <p>Keep model, tool, and agent usage visible so your setup never becomes a black box.</p>
        </article>

        <article>
          <DatabaseBackup :size="21" /><span>Back up and move freely</span>
          <h3>Fully Local</h3>
          <p>The whole application runs locally, ensuring your data never leaves your device.</p>
        </article>
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
              href="https://github.com/andreasjhagen/Cynosure/releases/latest"><span>Download for {{ currentPlatform
                }}</span>
              <ArrowDown :size="17" />
            </a></div>
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
