export function renderApp(app) {
  app.innerHTML = `
    <main class="shell">
      <aside class="sidebar">
        <a class="brand" href="#"><span class="brand-mark">✦</span><span>Nexora</span></a>
        <button class="new-chat"><span>＋</span> New conversation <kbd>⌘ K</kbd></button>
        <nav>
          <p class="nav-label">WORKSPACE</p>
          <a class="nav-item active" href="#chat"><span class="nav-icon">◈</span> Chat</a>
          <a class="nav-item" href="#library"><span class="nav-icon">◫</span> Library</a>
          <a class="nav-item" href="#agents"><span class="nav-icon">◎</span> Agents <b>3</b></a>
          <p class="nav-label history-label">RECENT</p>
          <a class="recent selected" href="#"><span class="dot pink"></span>Product launch strategy</a>
          <a class="recent" href="#"><span class="dot blue"></span>Q3 growth insights</a>
          <a class="recent" href="#"><span class="dot orange"></span>Design system audit</a>
          <a class="recent" href="#"><span class="dot mint"></span>Content calendar</a>
        </nav>
        <div class="sidebar-bottom">
          <div class="upgrade"><span class="sparkle">✦</span><div><strong>Unlock more with Pro</strong><small>More messages, models & tools</small></div><span>›</span></div>
          <div class="profile"><div class="avatar">AR</div><div><strong>Alex Rivera</strong><small>Personal workspace</small></div><button class="settings-trigger" aria-label="Open settings">•••</button></div>
        </div>
      </aside>
      <section class="workspace">
        <header class="topbar">
          <button class="crumb">Personal <span>⌄</span></button>
          <div class="top-actions"><button class="icon-button" aria-label="Search">⌕</button><button class="share">↗ Share</button><button class="circle-button">AR</button></div>
        </header>
        <section class="chat" id="chat">
          <div class="conversation-head"><div><p class="eyebrow">TODAY, 10:42 AM</p><h1>Product launch strategy</h1></div><button class="more" aria-label="More options">•••</button></div>
          <div class="messages">
            <div class="message user-message"><div class="message-body">I’m launching a new productivity app for creative teams next month. Can you help me build a focused go-to-market plan?</div><div class="avatar tiny">AR</div></div>
            <div class="message assistant-message"><div class="ai-avatar">✦</div><div class="message-content"><div class="ai-name">Nexora <span>•</span> <small>Strategic mode</small></div><div class="assistant-copy"><p>Absolutely. Let’s turn your launch into a clear, high-signal moment for the people who will love it most.</p><p>Here’s a strategic foundation we can build on:</p><div class="strategy-grid"><article><span class="number">01</span><h3>Define the wedge</h3><p>Start with one sharp audience and one irresistible job-to-be-done.</p></article><article><span class="number">02</span><h3>Craft the narrative</h3><p>Make the value tangible with a story your team can repeat.</p></article><article><span class="number">03</span><h3>Build momentum</h3><p>Layer anticipation, launch energy, and a thoughtful follow-through.</p></article></div><p>To make this specific, tell me a little about your ideal customer and what makes the product feel different.</p></div><div class="message-actions"><button>↻</button><button>♡</button><button>↗</button><button>•••</button></div></div></div>
          </div>
          <div class="composer-wrap"><div class="quick-prompts"><button>Define my audience</button><button>Build launch timeline</button><button>Find positioning</button></div><form class="composer"><input class="attachment-input" type="file" multiple hidden><button type="button" class="add" aria-label="Attach files">＋</button><textarea rows="1" placeholder="Ask anything..."></textarea><button type="button" class="voice-button" aria-label="Use voice input">◉</button><div class="model-picker"><button type="button" class="model-button">Nexora Pro <span>⌄</span></button><div class="model-menu" hidden></div></div><button type="submit" class="send" aria-label="Send message">↑</button></form><p class="disclaimer">Nexora can make mistakes. Check important info.</p></div>
        </section>
      </section>
      <aside class="context-panel"><div class="context-title"><h2>Workspace</h2><button aria-label="Close panel">×</button></div><div class="project-card"><div class="project-icon">✦</div><div><strong>Product launch</strong><small>Strategy & planning</small></div><button>•••</button></div><div class="panel-section"><div class="section-header"><h3>Project context</h3><button>＋</button></div><div class="context-file"><span class="file-icon">▤</span><div><strong>Launch brief</strong><small>Added today</small></div><span class="file-more">•••</span></div><div class="context-file"><span class="file-icon violet">◫</span><div><strong>Audience notes</strong><small>Added today</small></div><span class="file-more">•••</span></div></div><div class="panel-section collaborators"><div class="section-header"><h3>Collaborators</h3><button>＋</button></div><div class="people"><span class="face one">JM</span><span class="face two">SL</span><span class="face three">KN</span><span class="face plus">+4</span></div></div><div class="panel-tip"><span>✦</span><p><strong>Pro tip</strong> Add context to get more tailored responses.</p></div></aside>
    </main>
    <dialog class="settings-dialog"><form method="dialog"><div class="settings-heading"><h2>Settings</h2><button aria-label="Close settings">×</button></div><label><input type="checkbox" class="mock-mode-toggle"> Use mock AI responses</label><p>Mock mode never sends messages to Kie.ai.</p></form></dialog>
  `
}

export function showToast(message) {
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.textContent = message
  document.body.appendChild(toast)
  window.setTimeout(() => toast.remove(), 2200)
}
