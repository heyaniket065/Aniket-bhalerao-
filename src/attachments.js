import { showToast } from './ui/render.js'

export function setupAttachments(root, state) {
  const input = root.querySelector('.attachment-input')
  root.querySelector('.add').addEventListener('click', () => input.click())
  input.addEventListener('change', () => {
    const attachments = [...input.files]
    if (!attachments.length) return
    state.set({ attachments })
    showToast(`${attachments.length} attachment${attachments.length === 1 ? '' : 's'} ready to send`)
  })
}
