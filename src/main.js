import './style.css'

const app = document.querySelector('#app')

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
        <div class="profile"><div class="avatar">AR</div><div><strong>Alex Rivera</strong><small>Personal workspace</small></div><button aria-label="Profile menu">•••</button></div>
      </div>
    </aside>

    <section class="workspace">
      <header class="topbar">
        <button class="crumb">Personal <span>⌄</span></button>
        <div class="top-actions"><button class="icon-button" aria-label="Search">⌕</button><button class="share">↗ Share</button><button class="circle-button">AR</button></div>
      </header>
      <section class="chat" id="chat">
        <div class="conversation-head">
          <div><p class="eyebrow">TODAY, 10:42 AM</p><h1>Product launch strategy</h1></div>
          <button class="more" aria-label="More options">•••</button>
        </div>
        <div class="messages">
          <div class="message user-message"><div class="message-body">I’m launching a new productivity app for creative teams next month. Can you help me build a focused go-to-market plan?</div><div class="avatar tiny">AR</div></div>
          <div class="message assistant-message"><div class="ai-avatar">✦</div><div class="message-content"><div class="ai-name">Nexora <span>•</span> <small>Strategic mode</small></div><div class="assistant-copy"><p>Absolutely. Let’s turn your launch into a clear, high-signal moment for the people who will love it most.</p><p>Here’s a strategic foundation we can build on:</p><div class="strategy-grid"><article><span class="number">01</span><h3>Define the wedge</h3><p>Start with one sharp audience and one irresistible job-to-be-done.</p></article><article><span class="number">02</span><h3>Craft the narrative</h3><p>Make the value tangible with a story your team can repeat.</p></article><article><span class="number">03</span><h3>Build momentum</h3><p>Layer anticipation, launch energy, and a thoughtful follow-through.</p></article></div><p>To make this specific, tell me a little about your ideal customer and what makes the product feel different.</p></div><div class="message-actions"><button>↻</button><button>♡</button><button>↗</button><button>•••</button></div></div></div>
        </div>
        <div class="composer-wrap"><div class="quick-prompts"><button>Define my audience</button><button>Build launch timeline</button><button>Find positioning</button></div><form class="composer" aria-label="Message composer"><input class="file-input" type="file" multiple accept="image/*,video/*,application/pdf,.doc,.docx,.txt,.md,.csv,.json,.js,.ts,.jsx,.tsx,.py,.html,.css,.java,.c,.cpp,.sql" aria-label="Choose files"><div class="composer-tools"><button type="button" class="add" aria-label="Add attachment" aria-expanded="false" aria-controls="attachment-menu">＋</button><div class="attachment-menu" id="attachment-menu" hidden><button type="button" data-action="files">⌁ <span>Upload files</span></button><button type="button" data-action="camera">◉ <span>Use camera</span></button><button type="button" data-action="screen">▣ <span>Share screen</span></button><button type="button" data-action="voice">◌ <span>Start voice chat</span></button></div></div><div class="composer-main"><div class="attachment-tray" aria-live="polite"></div><textarea rows="1" placeholder="Ask anything..."></textarea></div><button type="button" class="voice-trigger" aria-label="Start voice chat">◌</button><button type="button" class="model-button">Nexora Pro <span>⌄</span></button><button type="submit" class="send" aria-label="Send message">↑</button></form><p class="drop-hint" aria-live="polite">Drop images, videos, PDFs, documents, or code files here</p><p class="disclaimer">Nexora can make mistakes. Check important info.</p></div>
      </section>
    </section>
    <aside class="context-panel">
      <div class="context-title"><h2>Workspace</h2><button aria-label="Close panel">×</button></div>
      <div class="project-card"><div class="project-icon">✦</div><div><strong>Product launch</strong><small>Strategy & planning</small></div><button>•••</button></div>
      <div class="panel-section"><div class="section-header"><h3>Project context</h3><button>＋</button></div><div class="context-file"><span class="file-icon">▤</span><div><strong>Launch brief</strong><small>Added today</small></div><span class="file-more">•••</span></div><div class="context-file"><span class="file-icon violet">◫</span><div><strong>Audience notes</strong><small>Added today</small></div><span class="file-more">•••</span></div></div>
      <div class="panel-section collaborators"><div class="section-header"><h3>Collaborators</h3><button>＋</button></div><div class="people"><span class="face one">JM</span><span class="face two">SL</span><span class="face three">KN</span><span class="face plus">+4</span></div></div>
      <div class="panel-tip"><span>✦</span><p><strong>Pro tip</strong> Add context to get more tailored responses.</p></div>
    </aside>
  </main>
`

const form = document.querySelector('.composer')
const textarea = form.querySelector('textarea')
const fileInput = form.querySelector('.file-input')
const tray = form.querySelector('.attachment-tray')
const addButton = form.querySelector('.add')
const attachmentMenu = form.querySelector('.attachment-menu')
const composerWrap = document.querySelector('.composer-wrap')
let attachments = []
let cameraStream
let screenStream
const acceptedExtensions = ['doc', 'docx', 'txt', 'md', 'csv', 'json', 'js', 'ts', 'jsx', 'tsx', 'py', 'html', 'css', 'java', 'c', 'cpp', 'sql']
const maxFileSize = 25 * 1024 * 1024

function toast(message) {
  const bubble = document.createElement('div')
  bubble.className = 'toast'
  bubble.textContent = message
  document.body.appendChild(bubble)
  setTimeout(() => bubble.remove(), 3000)
}

function isAccepted(file) {
  const extension = file.name.split('.').pop().toLowerCase()
  return file.type.startsWith('image/') || file.type.startsWith('video/') || file.type === 'application/pdf' || acceptedExtensions.includes(extension)
}

function attachmentLabel(file) {
  if (file.type.startsWith('image/')) return 'Image'
  if (file.type.startsWith('video/')) return 'Video'
  if (file.type === 'application/pdf') return 'PDF'
  return 'File'
}

function renderAttachments() {
  tray.innerHTML = ''
  attachments.forEach((item, index) => {
    const card = document.createElement('div')
    card.className = 'attachment-card'
    if (item.file.type.startsWith('image/')) {
      const image = document.createElement('img')
      image.src = item.url
      image.alt = `Preview of ${item.file.name}`
      card.appendChild(image)
    } else if (item.file.type.startsWith('video/')) {
      const video = document.createElement('video')
      video.src = item.url
      video.muted = true
      video.setAttribute('aria-label', `Video preview: ${item.file.name}`)
      card.appendChild(video)
    } else card.insertAdjacentHTML('beforeend', `<span class="attachment-icon">${item.kind === 'screen' ? '▣' : item.kind === 'camera' ? '◉' : '▤'}</span>`)
    card.insertAdjacentHTML('beforeend', `<span class="attachment-info"><strong>${item.file.name}</strong><small>${attachmentLabel(item.file)} · ${Math.ceil(item.file.size / 1024)} KB</small></span><button type="button" aria-label="Remove ${item.file.name}" data-remove="${index}">×</button>`)
    tray.appendChild(card)
  })
}

function addFiles(files, kind = 'file') {
  Array.from(files).forEach(file => {
    if (!isAccepted(file)) return toast(`${file.name} isn’t a supported file type.`)
    if (file.size > maxFileSize) return toast(`${file.name} is larger than the 25 MB limit.`)
    if (attachments.some(item => item.file.name === file.name && item.file.size === file.size)) return
    attachments.push({ file, kind, url: URL.createObjectURL(file) })
  })
  renderAttachments()
}

function stopStream(stream) { stream?.getTracks().forEach(track => track.stop()) }

async function captureMedia(kind) {
  const media = navigator.mediaDevices
  const method = kind === 'screen' ? 'getDisplayMedia' : 'getUserMedia'
  if (!media?.[method]) return toast(`${kind === 'screen' ? 'Screen sharing' : 'Camera'} is not supported in this browser.`)
  try {
    if (kind === 'camera') { stopStream(cameraStream); cameraStream = await media.getUserMedia({ video: true, audio: false }) }
    else { stopStream(screenStream); screenStream = await media.getDisplayMedia({ video: true, audio: false }) }
    const stream = kind === 'camera' ? cameraStream : screenStream
    const track = stream.getVideoTracks()[0]
    const blob = new Blob([], { type: 'video/webm' })
    const file = new File([blob], `${kind}-${Date.now()}.webm`, { type: 'video/webm' })
    attachments.push({ file, kind, url: URL.createObjectURL(file), stream })
    track.addEventListener('ended', () => { stopStream(stream); toast(`${kind === 'screen' ? 'Screen share' : 'Camera'} stopped.`) }, { once: true })
    renderAttachments()
    toast(`${kind === 'screen' ? 'Screen sharing' : 'Camera'} is ready to include.`)
  } catch (error) {
    toast(error.name === 'NotAllowedError' ? `Permission was denied for ${kind === 'screen' ? 'screen sharing' : 'the camera'}.` : `Couldn’t start ${kind === 'screen' ? 'screen sharing' : 'the camera'}.`)
  }
}

function openVoiceModal() {
  if (document.querySelector('.voice-modal')) return
  const supportsAudio = Boolean(navigator.mediaDevices?.getUserMedia)
  const supportsSpeech = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
  const modal = document.createElement('section')
  modal.className = 'voice-modal'
  modal.setAttribute('role', 'dialog')
  modal.setAttribute('aria-modal', 'true')
  modal.setAttribute('aria-labelledby', 'voice-title')
  modal.innerHTML = `<div class="voice-top"><button class="voice-close" aria-label="Close voice chat">×</button><p>${supportsSpeech ? 'VOICE CONVERSATION' : 'TEXT-ONLY MOCK MODE'}</p><span class="voice-status">Listening</span></div><div class="orb-wrap"><canvas class="voice-orb" width="500" height="500" aria-label="Animated voice activity visual"></canvas><h2 id="voice-title">How can I help?</h2><p class="voice-subtitle">${supportsSpeech ? 'I’m listening — speak naturally.' : 'Speech APIs aren’t available. Type your response below.'}</p></div><div class="transcript" aria-live="polite"><span>You</span><p>${supportsSpeech ? 'I’m listening…' : 'Text-only voice preview is ready.'}</p></div><form class="voice-entry"><input aria-label="Voice chat transcript" placeholder="Type a response…" ${supportsSpeech ? '' : 'autofocus'}><button type="submit" aria-label="Send transcript">↑</button></form><div class="voice-controls"><button class="mute" aria-pressed="false" aria-label="Mute microphone">◌ <span>Mute</span></button><button class="end-call">☎ <span>End call</span></button></div>`
  document.body.appendChild(modal)
  const canvas = modal.querySelector('canvas'), ctx = canvas.getContext('2d'); let frame; let phase = 0; let state = 'listening'
  function animate() { phase += state === 'speaking' ? .11 : .055; ctx.clearRect(0, 0, 500, 500); const radius = 108 + Math.sin(phase) * (state === 'thinking' ? 6 : 14); const gradient = ctx.createRadialGradient(250, 250, 20, 250, 250, radius); gradient.addColorStop(0, '#c5f8ff'); gradient.addColorStop(.42, '#7178ff'); gradient.addColorStop(1, '#8a3af4'); ctx.beginPath(); ctx.arc(250, 250, radius, 0, Math.PI * 2); ctx.fillStyle = gradient; ctx.shadowColor = '#9b4dff'; ctx.shadowBlur = 50; ctx.fill(); frame = requestAnimationFrame(animate) } animate()
  let audioStream
  if (supportsAudio) navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => { audioStream = stream }).catch(error => toast(error.name === 'NotAllowedError' ? 'Microphone permission was denied. You can continue in text-only mode.' : 'Microphone is unavailable; using text-only mode.'))
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
  let recognition
  if (supportsSpeech) { recognition = new Recognition(); recognition.continuous = true; recognition.onresult = event => { const text = event.results[event.results.length - 1][0].transcript; modal.querySelector('.transcript p').textContent = text; state = 'thinking'; modal.querySelector('.voice-status').textContent = 'Thinking'; setTimeout(() => { state = 'speaking'; modal.querySelector('.voice-status').textContent = 'Speaking' }, 700) }; recognition.start() }
  const close = () => { cancelAnimationFrame(frame); recognition?.stop(); stopStream(audioStream); modal.remove(); textarea.focus() }
  modal.querySelector('.voice-close').onclick = close; modal.querySelector('.end-call').onclick = close
  modal.querySelector('.mute').onclick = event => { const muted = event.currentTarget.getAttribute('aria-pressed') === 'true'; event.currentTarget.setAttribute('aria-pressed', String(!muted)); event.currentTarget.querySelector('span').textContent = muted ? 'Mute' : 'Unmute'; audioStream?.getAudioTracks().forEach(track => { track.enabled = muted }) }
  modal.querySelector('.voice-entry').onsubmit = event => { event.preventDefault(); const input = event.currentTarget.querySelector('input'); if (!input.value.trim()) return; modal.querySelector('.transcript p').textContent = input.value; input.value = ''; state = 'thinking'; modal.querySelector('.voice-status').textContent = 'Thinking' }
}

addButton.onclick = () => { const open = attachmentMenu.hidden; attachmentMenu.hidden = !open; addButton.setAttribute('aria-expanded', String(open)) }
attachmentMenu.onclick = event => { const action = event.target.closest('button')?.dataset.action; if (!action) return; attachmentMenu.hidden = true; addButton.setAttribute('aria-expanded', 'false'); if (action === 'files') fileInput.click(); if (action === 'camera' || action === 'screen') captureMedia(action); if (action === 'voice') openVoiceModal() }
fileInput.onchange = () => { addFiles(fileInput.files); fileInput.value = '' }
tray.onclick = event => { const index = event.target.dataset.remove; if (index === undefined) return; const [item] = attachments.splice(index, 1); URL.revokeObjectURL(item.url); stopStream(item.stream); renderAttachments() }
composerWrap.addEventListener('dragover', event => { event.preventDefault(); composerWrap.classList.add('dragging') })
composerWrap.addEventListener('dragleave', event => { if (!composerWrap.contains(event.relatedTarget)) composerWrap.classList.remove('dragging') })
composerWrap.addEventListener('drop', event => { event.preventDefault(); composerWrap.classList.remove('dragging'); addFiles(event.dataTransfer.files) })
form.querySelector('.voice-trigger').onclick = openVoiceModal
form.addEventListener('submit', (event) => {
  event.preventDefault()
  if (!textarea.value.trim() && !attachments.length) return
  const payload = { message: textarea.value.trim(), attachments: attachments.map(({ file, kind }) => ({ name: file.name, type: file.type, size: file.size, source: kind })) }
  form.dataset.requestPayload = JSON.stringify(payload)
  console.info('Prepared Nexora request payload', payload)
  toast(`Message queued${attachments.length ? ` with ${attachments.length} attachment${attachments.length > 1 ? 's' : ''}` : ''} — Nexora is thinking`)
  textarea.value = ''; attachments.forEach(item => { URL.revokeObjectURL(item.url); stopStream(item.stream) }); attachments = []; renderAttachments()
})

document.querySelectorAll('.quick-prompts').forEach(group => group.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') { textarea.value = e.target.textContent; textarea.focus() }
}))
