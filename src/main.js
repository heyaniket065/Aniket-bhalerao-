import './style.css'

const app = document.querySelector('#app')

const destinations = [
  ['chat', '◈', 'Chat sessions', 'Product launch strategy'],
  ['workspaces', '▦', 'Workspaces', 'Personal workspace'],
  ['sandbox', '⌘', 'Coding sandbox', 'Prototype environment'],
  ['studio', '◉', 'Video & image studio', 'Creative canvas'],
  ['logs', '▤', 'System logs', 'Activity stream'],
  ['settings', '⚙', 'Settings', 'Workspace settings'],
]

const sessions = [
  ['Product launch strategy', 'pink'], ['Q3 growth insights', 'blue'],
  ['Design system audit', 'orange'], ['Content calendar', 'mint'],
]

const state = { destination: 'chat', session: 0, sidebarOpen: false, hud: false }

function render() {
  const destination = destinations.find(([id]) => id === state.destination)
  const isChat = state.destination === 'chat'
  app.innerHTML = `
    <main class="shell ${state.sidebarOpen ? 'sidebar-open' : ''} ${state.hud ? 'hud-mode' : ''}">
      <button class="nav-scrim" aria-label="Close navigation" data-action="toggle-sidebar"></button>
      <aside class="sidebar" aria-label="Workspace navigation">
        <div class="sidebar-top"><a class="brand" href="#chat"><span class="brand-mark">✦</span><span>Nexora</span></a><button class="sidebar-close" data-action="toggle-sidebar" aria-label="Close navigation">×</button></div>
        <button class="new-chat" data-action="new-chat"><span>＋</span> New conversation <kbd>⌘ K</kbd></button>
        <nav>
          <p class="nav-label">WORKSPACE</p>
          ${destinations.map(([id, icon, label]) => `<button class="nav-item ${id === state.destination ? 'active' : ''}" data-destination="${id}" aria-current="${id === state.destination ? 'page' : 'false'}"><span class="nav-icon">${icon}</span>${label}</button>`).join('')}
          <p class="nav-label history-label">RECENT SESSIONS</p>
          ${sessions.map(([label, color], index) => `<button class="recent ${isChat && index === state.session ? 'selected' : ''}" data-session="${index}"><span class="dot ${color}"></span>${label}</button>`).join('')}
        </nav>
        <div class="sidebar-bottom">
          <div class="upgrade"><span class="sparkle">✦</span><div><strong>Unlock more with Pro</strong><small>More messages, models & tools</small></div><span>›</span></div>
          <div class="connection-status"><span class="status-dot"></span><span>API connected</span><strong>2,480 credits</strong></div>
          <div class="profile"><div class="avatar">AR</div><div><strong>Alex Rivera</strong><small>Personal workspace</small></div><button aria-label="Profile menu">•••</button></div>
        </div>
      </aside>
      <section class="workspace">
        <header class="topbar">
          <div class="topbar-left"><button class="mobile-nav" data-action="toggle-sidebar" aria-label="Open navigation" aria-expanded="${state.sidebarOpen}">☰</button><button class="crumb" data-action="workspace-menu">Personal <span>⌄</span></button></div>
          <div class="top-actions">
            <button class="icon-button" data-action="clear" aria-label="Clear active conversation" title="Clear conversation">⌫</button>
            <button class="icon-button" data-action="export" aria-label="Export conversation context" title="Export context">⇩</button>
            <button class="icon-button" data-action="api" aria-label="Open API settings" title="API settings">⌘</button>
            <button class="icon-button hud-button" data-action="hud" aria-label="${state.hud ? 'Exit' : 'Enter'} fullscreen HUD mode" title="Fullscreen HUD">${state.hud ? '⤢' : '⛶'}</button>
            <button class="share">↗ Share</button><button class="circle-button">AR</button>
          </div>
        </header>
        ${isChat ? chatView() : destinationView(destination)}
      </section>
      <aside class="context-panel" aria-label="Project context"><div class="context-title"><h2>Workspace</h2><button aria-label="Close panel">×</button></div><div class="project-card"><div class="project-icon">✦</div><div><strong>Product launch</strong><small>Strategy & planning</small></div><button>•••</button></div><div class="panel-section"><div class="section-header"><h3>Project context</h3><button>＋</button></div><div class="context-file"><span class="file-icon">▤</span><div><strong>Launch brief</strong><small>Added today</small></div><span class="file-more">•••</span></div><div class="context-file"><span class="file-icon violet">◫</span><div><strong>Audience notes</strong><small>Added today</small></div><span class="file-more">•••</span></div></div><div class="panel-tip"><span>✦</span><p><strong>Pro tip</strong> Add context to get more tailored responses.</p></div></aside>
    </main>`
}

function chatView() {
  const title = sessions[state.session][0]
  return `<section class="chat" id="chat"><div class="conversation-head"><div><p class="eyebrow">TODAY, 10:42 AM</p><h1>${title}</h1></div><button class="more" aria-label="More options">•••</button></div><div class="messages"><div class="message user-message"><div class="message-body">I’m launching a new productivity app for creative teams next month. Can you help me build a focused go-to-market plan?</div><div class="avatar tiny">AR</div></div><div class="message assistant-message"><div class="ai-avatar">✦</div><div class="message-content"><div class="ai-name">Nexora <span>•</span> <small>Strategic mode</small></div><div class="assistant-copy"><p>Absolutely. Let’s turn your launch into a clear, high-signal moment for the people who will love it most.</p><p>Here’s a strategic foundation we can build on:</p><div class="strategy-grid"><article><span class="number">01</span><h3>Define the wedge</h3><p>Start with one sharp audience and one irresistible job-to-be-done.</p></article><article><span class="number">02</span><h3>Craft the narrative</h3><p>Make the value tangible with a story your team can repeat.</p></article><article><span class="number">03</span><h3>Build momentum</h3><p>Layer anticipation, launch energy, and a thoughtful follow-through.</p></article></div><p>To make this specific, tell me a little about your ideal customer and what makes the product feel different.</p></div><div class="message-actions"><button>↻</button><button>♡</button><button>↗</button><button>•••</button></div></div></div></div><div class="composer-wrap"><div class="quick-prompts"><button>Define my audience</button><button>Build launch timeline</button><button>Find positioning</button></div><form class="composer"><button type="button" class="add">＋</button><textarea rows="1" placeholder="Ask anything..."></textarea><button type="button" class="model-button">Nexora Pro <span>⌄</span></button><button type="submit" class="send" aria-label="Send message">↑</button></form><p class="disclaimer">Nexora can make mistakes. Check important info.</p></div></section>`
}

function destinationView(destination) {
  return `<section class="destination-view"><span class="destination-icon">${destination[1]}</span><p class="eyebrow">${destination[2].toUpperCase()}</p><h1>${destination[3]}</h1><p>Choose this workspace destination from the sidebar to continue your work with Nexora.</p><button class="new-chat" data-action="new-chat">＋ Start a new conversation</button></section>`
}

function toast(message) { const node = document.createElement('div'); node.className = 'toast'; node.textContent = message; document.body.append(node); setTimeout(() => node.remove(), 2200) }

app.addEventListener('click', event => {
  const button = event.target.closest('button'); if (!button) return
  if (button.dataset.destination) { state.destination = button.dataset.destination; state.sidebarOpen = false; render(); return }
  if (button.dataset.session !== undefined) { state.destination = 'chat'; state.session = Number(button.dataset.session); state.sidebarOpen = false; render(); return }
  const action = button.dataset.action
  if (action === 'toggle-sidebar') { state.sidebarOpen = !state.sidebarOpen; render() }
  if (action === 'new-chat') { state.destination = 'chat'; state.session = 0; render(); toast('New conversation ready') }
  if (action === 'clear') toast('Active conversation cleared')
  if (action === 'export') toast('Conversation context exported')
  if (action === 'api') { state.destination = 'settings'; render(); toast('API settings opened') }
  if (action === 'hud') { state.hud = !state.hud; render(); toast(state.hud ? 'Fullscreen HUD mode enabled' : 'Fullscreen HUD mode disabled') }
})

app.addEventListener('submit', event => { if (!event.target.matches('.composer')) return; event.preventDefault(); const textarea = event.target.querySelector('textarea'); if (!textarea.value.trim()) return; textarea.value = ''; toast('Message queued — Nexora is thinking') })
app.addEventListener('click', event => { if (event.target.matches('.quick-prompts button')) { const textarea = app.querySelector('textarea'); textarea.value = event.target.textContent; textarea.focus() } })
document.addEventListener('keydown', event => { if (event.key === 'Escape' && (state.sidebarOpen || state.hud)) { state.sidebarOpen = false; state.hud = false; render() } })

render()
