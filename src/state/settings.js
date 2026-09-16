const STORAGE_KEY = 'nexora-client-settings'

const defaults = {
  apiKey: '',
  baseUrl: 'https://api.kie.ai',
  model: 'gpt-4o-mini',
  stream: true,
  tokenMetrics: true,
  markdown: true,
}

function deploymentConfig() {
  const config = globalThis.__NEXORA_CONFIG__ || {}
  const meta = name => document.querySelector(`meta[name="${name}"]`)?.content
  return {
    apiKey: config.kieApiKey || meta('kie-api-key') || '',
    baseUrl: config.kieBaseUrl || meta('kie-base-url') || '',
    model: config.kieModel || meta('kie-model') || '',
  }
}

export function loadSettings() {
  let saved = {}
  try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') } catch { /* ignore malformed saved settings */ }
  const env = deploymentConfig()
  return { ...defaults, ...saved, ...Object.fromEntries(Object.entries(env).filter(([, value]) => value)) }
}

// Call this only from the explicit Save settings action. Secrets are never saved implicitly.
export function saveSettings(settings) {
  const value = Object.fromEntries(Object.keys(defaults).map(key => [key, settings[key]]))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  return value
}

export function hasConfiguredKey(settings) {
  return Boolean(settings.apiKey?.trim())
}
