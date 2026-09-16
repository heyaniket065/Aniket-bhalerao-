import './style.css'

const app = document.querySelector('#app')

// One catalog drives both the picker and the request sent to Kie.ai.  Add a model here
// rather than adding provider-specific conditionals throughout the interface.
const MODEL_CATALOG = [
  { id: 'gpt-4.1', name: 'GPT-4.1', provider: 'OpenAI', tasks: ['chat', 'coding', 'reasoning'], description: 'Fast, dependable workhorse' },
  { id: 'o3', name: 'o3', provider: 'OpenAI', tasks: ['reasoning', 'coding'], description: 'Deep reasoning and planning' },
  { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Anthropic', tasks: ['chat', 'coding', 'reasoning'], description: 'Nuanced writing and code' },
  { id: 'claude-opus-4', name: 'Claude Opus 4', provider: 'Anthropic', tasks: ['reasoning', 'coding'], description: 'Complex analysis' },
  { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google Gemini', tasks: ['chat', 'coding', 'reasoning'], description: 'Multimodal problem solving' },
  { id: 'grok-3', name: 'Grok 3', provider: 'xAI', tasks: ['chat', 'reasoning'], description: 'Current, direct answers' },
  { id: 'flux-1.1-pro', name: 'FLUX 1.1 Pro', provider: 'Image', tasks: ['image'], description: 'High-fidelity image generation', ratios: ['1:1', '4:5', '16:9'], resolutions: ['1024px', '1536px'] },
  { id: 'imagen-3', name: 'Imagen 3', provider: 'Image', tasks: ['image'], description: 'Polished photorealism', ratios: ['1:1', '3:4', '16:9'], resolutions: ['1024px', '2048px'] },
  { id: 'veo-3', name: 'Veo 3', provider: 'Video', tasks: ['video'], description: 'Cinematic video with sound', ratios: ['16:9', '9:16'], resolutions: ['720p', '1080p'] },
  { id: 'kling-2.1', name: 'Kling 2.1', provider: 'Video', tasks: ['video'], description: 'Expressive motion', ratios: ['16:9', '9:16', '1:1'], resolutions: ['720p', '1080p'] }
]

const TASKS = {
  chat: { label: 'Chat', icon: '◈', hint: 'General conversation' },
  coding: { label: 'Code', icon: '</>', hint: 'Build and explain code' },
  reasoning: { label: 'Reason', icon: '◌', hint: 'Think through a problem' },
  image: { label: 'Image', icon: '▧', hint: 'Create an image' },
  video: { label: 'Video', icon: '▷', hint: 'Create a video' }
}

let state = { task: 'chat', modelId: 'gpt-4.1', aspectRatio: '16:9', resolution: '1024px', enhancedPrompt: '' }
const model = () => MODEL_CATALOG.find(item => item.id === state.modelId)
const supportedModels = task => MODEL_CATALOG.filter(item => item.tasks.includes(task))

app.innerHTML = `
  <main class="shell">
    <aside class="sidebar"><a class="brand" href="#"><span class="brand-mark">✦</span><span>Nexora</span></a>
      <button class="new-chat"><span>＋</span> New conversation <kbd>⌘ K</kbd></button>
      <nav><p class="nav-label">WORKSPACE</p><a class="nav-item active" href="#chat"><span class="nav-icon">◈</span> Chat</a><a class="nav-item" href="#library"><span class="nav-icon">◫</span> Library</a><a class="nav-item" href="#agents"><span class="nav-icon">◎</span> Agents <b>3</b></a><p class="nav-label history-label">RECENT</p><a class="recent selected" href="#"><span class="dot pink"></span>Product launch strategy</a><a class="recent" href="#"><span class="dot blue"></span>Q3 growth insights</a></nav>
      <div class="sidebar-bottom"><div class="upgrade"><span class="sparkle">✦</span><div><strong>Unlock more with Pro</strong><small>More messages, models & tools</small></div><span>›</span></div><div class="profile"><div class="avatar">AR</div><div><strong>Alex Rivera</strong><small>Personal workspace</small></div></div></div>
    </aside>
    <section class="workspace"><header class="topbar"><button class="crumb">Personal <span>⌄</span></button><div class="top-actions"><button class="icon-button" aria-label="Search">⌕</button><button class="share">↗ Share</button></div></header>
      <section class="chat" id="chat"><div class="conversation-head"><div><p class="eyebrow">TODAY, 10:42 AM</p><h1>Product launch strategy</h1></div><button class="more" aria-label="More options">•••</button></div>
        <div class="messages" aria-live="polite"><div class="message assistant-message"><div class="ai-avatar">✦</div><div class="message-content"><div class="ai-name">Nexora <span>•</span> <small>Strategic mode</small></div><div class="assistant-copy"><p>Choose a task and model to shape the workspace around the work you want to do.</p></div></div></div></div>
        <div class="composer-wrap"><div class="quick-prompts"><button>Define my audience</button><button>Build a landing page</button><button>Create launch artwork</button></div><div class="task-tabs" role="tablist" aria-label="Task mode"></div><form class="composer"><button type="button" class="add" aria-label="Add context">＋</button><textarea rows="1" aria-label="Prompt" placeholder="Ask anything..."></textarea><div class="model-picker"><button type="button" class="model-button" aria-haspopup="menu" aria-expanded="false"><span class="model-label"></span><span>⌄</span></button><div class="model-menu" role="menu" hidden></div></div><button type="submit" class="send" aria-label="Send message">↑</button></form><p class="disclaimer">Nexora can make mistakes. Check important info.</p></div>
      </section>
    </section>
    <aside class="context-panel"><div class="context-title"><h2>Workspace</h2><button aria-label="Close panel">×</button></div><div class="project-card"><div class="project-icon">✦</div><div><strong>Product launch</strong><small>Strategy & planning</small></div></div><div class="panel-section"><div class="section-header"><h3>Project context</h3><button>＋</button></div><div class="context-file"><span class="file-icon">▤</span><div><strong>Launch brief</strong><small>Added today</small></div></div></div><div class="panel-tip"><span>✦</span><p><strong>Pro tip</strong> Add context to get more tailored responses.</p></div></aside>
  </main>`

const form = document.querySelector('.composer')
const textarea = form.querySelector('textarea')
const messages = document.querySelector('.messages')
const taskTabs = document.querySelector('.task-tabs')
const picker = document.querySelector('.model-picker')
const modelButton = document.querySelector('.model-button')
const modelMenu = document.querySelector('.model-menu')

function renderTaskTabs () {
  taskTabs.innerHTML = Object.entries(TASKS).map(([id, task]) => `<button type="button" role="tab" aria-selected="${id === state.task}" class="task-tab ${id === state.task ? 'active' : ''}" data-task="${id}"><span>${task.icon}</span>${task.label}</button>`).join('')
}

function renderPicker () {
  const current = model()
  document.querySelector('.model-label').textContent = `${current.provider} · ${current.name}`
  const groups = [...new Set(supportedModels(state.task).map(item => item.provider))]
  modelMenu.innerHTML = `<p class="menu-heading">${TASKS[state.task].label} models <span>${TASKS[state.task].hint}</span></p>${groups.map(provider => `<section class="model-group" aria-label="${provider}"><h3>${provider}</h3>${supportedModels(state.task).filter(item => item.provider === provider).map(item => `<button type="button" role="menuitemradio" aria-checked="${item.id === current.id}" class="model-option ${item.id === current.id ? 'selected' : ''}" data-model="${item.id}"><span class="model-check">${item.id === current.id ? '✓' : ''}</span><span><strong>${item.name}</strong><small>${item.description}</small></span></button>`).join('')}</section>`).join('')}`
}

function studioControls () {
  if (!['image', 'video'].includes(state.task)) return ''
  const item = model()
  const ratios = item.ratios || ['1:1']
  const resolutions = item.resolutions || ['1024px']
  return `<section class="studio-controls" aria-label="${TASKS[state.task].label} studio"><div class="studio-heading"><span>${state.task === 'image' ? '✦' : '▷'}</span><div><strong>${TASKS[state.task].label} Studio</strong><small>${state.task === 'image' ? 'Refine your visual direction' : 'Set your shot and delivery format'}</small></div></div><label>Prompt enhancer <button type="button" class="enhance">Enhance prompt</button></label><div class="studio-grid"><label>Aspect ratio<select class="aspect">${ratios.map(x => `<option ${x === state.aspectRatio ? 'selected' : ''}>${x}</option>`).join('')}</select></label><label>Resolution<select class="resolution">${resolutions.map(x => `<option ${x === state.resolution ? 'selected' : ''}>${x}</option>`).join('')}</select></label></div></section>`
}

function renderStudio () {
  document.querySelector('.studio-controls')?.remove()
  form.insertAdjacentHTML('beforebegin', studioControls())
}

function setTask (task) {
  state.task = task
  const valid = supportedModels(task)
  if (!valid.some(item => item.id === state.modelId)) state.modelId = valid[0].id
  state.aspectRatio = model().ratios?.[0] || '16:9'
  state.resolution = model().resolutions?.[0] || '1024px'
  textarea.placeholder = task === 'image' ? 'Describe the image you want to create...' : task === 'video' ? 'Describe a scene, camera movement, and mood...' : task === 'coding' ? 'Describe what you want to build...' : 'Ask anything...'
  renderTaskTabs(); renderPicker(); renderStudio()
}

function addMessage (kind, html) {
  const row = document.createElement('div')
  row.className = `message ${kind}-message`
  row.innerHTML = kind === 'user' ? `<div class="message-body">${html}</div><div class="avatar tiny">AR</div>` : `<div class="ai-avatar">✦</div><div class="message-content"><div class="ai-name">Nexora <span>•</span> <small>${model().name} · ${TASKS[state.task].label}</small></div><div class="assistant-copy">${html}</div></div>`
  messages.appendChild(row)
  row.scrollIntoView({ behavior: 'smooth', block: 'end' })
}

function escapeHtml (value) { return value.replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]) }

function codeWorkspace (prompt) {
  const code = `function launchMessage(audience) {\n  return \`Build momentum with ${audience}.\`\n}\n\nconsole.log(launchMessage('creative teams'))`
  const lines = code.split('\n').map((line, index) => `<span class="code-line"><i>${index + 1}</i><code>${escapeHtml(line)}</code></span>`).join('')
  return `<p>I drafted a small, runnable starting point for “${escapeHtml(prompt)}”.</p><section class="code-workspace"><header><span><b>JS</b> launch-message.js</span><button class="copy-code" data-code="${encodeURIComponent(code)}">Copy code</button></header><pre aria-label="JavaScript code">${lines}</pre><details class="preview-panel"><summary>Live preview <span>Sandboxed</span></summary><iframe title="Sandboxed code preview" sandbox="allow-scripts" srcdoc="${escapeHtml(`<!doctype html><style>body{font:16px system-ui;padding:24px;background:#10111a;color:#f5edff}button{background:#a970ff;border:0;border-radius:8px;padding:9px 14px;color:white}</style><h2>Launch ready</h2><p>A focused moment for creative teams.</p><button onclick=\"this.textContent='Saved!'\">Save my spot</button>`)}"></iframe></details></section>`
}

function mockResponse (prompt) {
  if (state.task === 'coding') return codeWorkspace(prompt)
  if (state.task === 'image') return `<div class="media-result image-result"><div class="generated-art">✦</div><div><strong>Image concept prepared</strong><p>${escapeHtml(prompt)}</p><small>${model().name} · ${state.aspectRatio} · ${state.resolution}</small></div></div>`
  if (state.task === 'video') return `<div class="media-result video-result"><div class="generated-art">▷</div><div><strong>Video treatment prepared</strong><p>${escapeHtml(prompt)}</p><small>${model().name} · ${state.aspectRatio} · ${state.resolution}</small></div></div>`
  return `<p>Using <strong>${model().name}</strong> in ${TASKS[state.task].label.toLowerCase()} mode, I’d start by clarifying the audience, outcome, and the strongest proof point in your prompt.</p>`
}

async function requestKie (prompt) {
  const payload = { model: model().id, task: state.task, prompt, aspect_ratio: state.aspectRatio, resolution: state.resolution }
  const apiKey = localStorage.getItem('kie_api_key')
  if (!apiKey) throw new Error('No Kie.ai key configured')
  const response = await fetch('https://api.kie.ai/api/v1/jobs/createTask', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` }, body: JSON.stringify(payload) })
  if (!response.ok) throw new Error('Kie.ai request failed')
  return response.json()
}

renderTaskTabs(); renderPicker(); renderStudio()
taskTabs.addEventListener('click', event => { const tab = event.target.closest('[data-task]'); if (tab) setTask(tab.dataset.task) })
modelButton.addEventListener('click', () => { const open = modelMenu.hidden; modelMenu.hidden = !open; modelButton.setAttribute('aria-expanded', String(open)) })
modelMenu.addEventListener('click', event => { const option = event.target.closest('[data-model]'); if (!option) return; state.modelId = option.dataset.model; state.aspectRatio = model().ratios?.[0] || state.aspectRatio; state.resolution = model().resolutions?.[0] || state.resolution; renderPicker(); renderStudio(); modelMenu.hidden = true; modelButton.setAttribute('aria-expanded', 'false') })
document.addEventListener('click', event => { if (!picker.contains(event.target)) { modelMenu.hidden = true; modelButton.setAttribute('aria-expanded', 'false') } })

document.addEventListener('click', event => { if (event.target.classList.contains('enhance')) { textarea.value = `Create a polished ${state.task === 'image' ? 'editorial image' : 'cinematic sequence'}: ${textarea.value || 'a creative team collaborating'}, considered lighting, clear focal point, premium product-launch mood.`; textarea.focus() } })
document.addEventListener('change', event => { if (event.target.matches('.aspect')) state.aspectRatio = event.target.value; if (event.target.matches('.resolution')) state.resolution = event.target.value })
document.addEventListener('click', event => { const copy = event.target.closest('.copy-code'); if (!copy) return; navigator.clipboard?.writeText(decodeURIComponent(copy.dataset.code)); copy.textContent = 'Copied!'; setTimeout(() => { copy.textContent = 'Copy code' }, 1600) })
form.addEventListener('submit', async event => { event.preventDefault(); const prompt = textarea.value.trim(); if (!prompt) return; addMessage('user', escapeHtml(prompt)); textarea.value = ''; const thinking = document.createElement('div'); thinking.className = 'toast'; thinking.textContent = `Routing to ${model().name}…`; document.body.appendChild(thinking); try { await requestKie(prompt); addMessage('assistant', '<p>Your Kie.ai job was submitted. Results will appear here when it is complete.</p>') } catch { addMessage('assistant', mockResponse(prompt)) } finally { setTimeout(() => thinking.remove(), 900) } })
document.querySelector('.quick-prompts').addEventListener('click', event => { if (event.target.tagName === 'BUTTON') { textarea.value = event.target.textContent; textarea.focus() } })
