const initialState = {
  activeModel: 'Nexora Pro',
  attachments: [],
  isListening: false,
  settingsOpen: false,
}

export function createAppState(seed = {}) {
  let state = { ...initialState, ...seed }
  const listeners = new Set()

  return {
    get: () => state,
    set(update) {
      state = { ...state, ...update }
      listeners.forEach(listener => listener(state))
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}
