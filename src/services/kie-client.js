const trimSlash = value => value.replace(/\/+$/, '')

export class KieClient {
  constructor(settings) { this.settings = settings }

  async validate() {
    if (!this.settings.apiKey?.trim()) return { ok: false, message: 'Add an API key to validate this connection.' }
    try {
      const response = await fetch(`${trimSlash(this.settings.baseUrl)}/v1/models`, {
        headers: { Authorization: `Bearer ${this.settings.apiKey.trim()}` },
      })
      if (!response.ok) return { ok: false, message: `Connection failed (${response.status}). Check your base URL and key.` }
      return { ok: true, message: 'Connection verified.' }
    } catch {
      return { ok: false, message: 'Could not reach Kie.ai. Check your base URL or network.' }
    }
  }

  async *complete(messages) {
    if (!this.settings.apiKey?.trim()) {
      yield* mockResponse(messages.at(-1)?.content || '')
      return
    }
    const response = await fetch(`${trimSlash(this.settings.baseUrl)}/v1/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${this.settings.apiKey.trim()}` },
      body: JSON.stringify({ model: this.settings.model, messages, stream: this.settings.stream }),
    })
    if (!response.ok) throw new Error(`Kie.ai request failed (${response.status})`)
    if (!this.settings.stream) {
      const data = await response.json()
      yield { text: data.choices?.[0]?.message?.content || 'No response received.', usage: data.usage }
      return
    }
    const reader = response.body?.getReader()
    if (!reader) throw new Error('Streaming is not supported by this browser.')
    const decoder = new TextDecoder()
    let pending = ''
    while (true) {
      const { done, value } = await reader.read()
      pending += decoder.decode(value || new Uint8Array(), { stream: !done })
      const lines = pending.split('\n')
      pending = lines.pop() || ''
      for (const line of lines) {
        if (!line.startsWith('data:')) continue
        const payload = line.slice(5).trim()
        if (payload === '[DONE]') return
        try {
          const data = JSON.parse(payload)
          const text = data.choices?.[0]?.delta?.content
          if (text) yield { text, usage: data.usage }
        } catch { /* wait for the next valid server-sent event */ }
      }
      if (done) return
    }
  }
}

async function* mockResponse(prompt) {
  const topic = prompt.trim() || 'your request'
  const response = `**Demo response**\n\nNo Kie.ai key is configured, so this is a deterministic local preview for: “${topic}”.\n\n1. Define the outcome.\n2. Choose the smallest useful next step.\n3. Review the result and iterate.\n\nOpen **Settings** and save an API key to use the live service.`
  for (const word of response.split(/(\s+)/)) {
    await new Promise(resolve => setTimeout(resolve, 12))
    yield { text: word, mock: true }
  }
}
