import { getServiceConfig } from './services/kie.js'

const mockModeKey = 'nexora.mock-mode'

export function setupSettings(root, state) {
  const dialog = root.querySelector('.settings-dialog')
  const toggle = root.querySelector('.mock-mode-toggle')
  const saved = localStorage.getItem(mockModeKey)
  toggle.checked = saved === null ? getServiceConfig().mockMode : saved === 'true'
  state.set({ mockMode: toggle.checked })
  root.querySelector('.settings-trigger').addEventListener('click', () => dialog.showModal())
  toggle.addEventListener('change', () => {
    localStorage.setItem(mockModeKey, String(toggle.checked))
    state.set({ mockMode: toggle.checked })
  })
}
