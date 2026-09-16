const defaultConfig = { mockMode: true, endpoint: '', apiKey: '' }

export function getServiceConfig() {
  return { ...defaultConfig, ...(window.NEXORA_CONFIG || {}) }
}

export function createKieService(config = getServiceConfig()) {
  return {
    async sendMessage(message, model) {
      if (!config.endpoint) throw new Error('Set NEXORA_CONFIG.endpoint before disabling mock mode.')
      const response = await fetch(config.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(config.apiKey && { Authorization: `Bearer ${config.apiKey}` }) },
        body: JSON.stringify({ message, model }),
      })
      if (!response.ok) throw new Error(`Kie.ai request failed (${response.status}).`)
      return response.json()
    },
  }
}
