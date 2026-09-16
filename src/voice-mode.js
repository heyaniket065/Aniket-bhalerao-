import { showToast } from './ui/render.js'

export function setupVoiceMode(root, state) {
  const button = root.querySelector('.voice-button')
  button.addEventListener('click', async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      showToast('Voice input is not supported by this browser')
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach(track => track.stop())
      state.set({ isListening: !state.get().isListening })
      button.classList.toggle('is-active', state.get().isListening)
      showToast(state.get().isListening ? 'Voice mode is ready' : 'Voice mode paused')
    } catch {
      showToast('Microphone permission is required for voice input')
    }
  })
}
