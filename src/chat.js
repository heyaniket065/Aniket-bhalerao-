import { createKieService } from './services/kie.js'
import { createMockService } from './services/mock.js'
import { showToast } from './ui/render.js'

export function setupChat(root, state) {
  const form = root.querySelector('.composer')
  const textarea = form.querySelector('textarea')
  const mock = createMockService()
  const kie = createKieService()
  root.querySelector('.quick-prompts').addEventListener('click', event => {
    if (event.target.tagName === 'BUTTON') { textarea.value = event.target.textContent; textarea.focus() }
  })
  form.addEventListener('submit', async event => {
    event.preventDefault()
    const message = textarea.value.trim()
    if (!message) return
    textarea.value = ''
    showToast('Message queued — Nexora is thinking')
    try {
      const service = state.get().mockMode ? mock : kie
      await service.sendMessage(message, state.get().activeModel)
    } catch (error) {
      showToast(error.message)
    }
  })
}
