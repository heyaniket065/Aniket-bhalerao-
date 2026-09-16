export function createMockService() {
  return {
    async sendMessage(message) {
      await new Promise(resolve => window.setTimeout(resolve, 350))
      return `Mock response ready for: ${message.slice(0, 48)}`
    },
  }
}
