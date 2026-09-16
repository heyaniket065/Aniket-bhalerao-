import './style.css'
import { setupAttachments } from './attachments.js'
import { setupChat } from './chat.js'
import { setupModelSelector } from './model-selector.js'
import { setupSettings } from './settings.js'
import { createAppState } from './state.js'
import { renderApp } from './ui/render.js'
import { setupVoiceMode } from './voice-mode.js'

const app = document.querySelector('#app')
const state = createAppState()

renderApp(app)
setupChat(app, state)
setupModelSelector(app, state)
setupSettings(app, state)
setupAttachments(app, state)
setupVoiceMode(app, state)
