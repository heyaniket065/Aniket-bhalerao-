const models = ['Nexora Pro', 'Nexora Fast', 'Nexora Creative']

export function setupModelSelector(root, state) {
  const button = root.querySelector('.model-button')
  const menu = root.querySelector('.model-menu')
  menu.innerHTML = models.map(model => `<button type="button" data-model="${model}">${model}</button>`).join('')
  button.addEventListener('click', () => { menu.hidden = !menu.hidden })
  menu.addEventListener('click', event => {
    const model = event.target.dataset.model
    if (!model) return
    state.set({ activeModel: model })
    button.innerHTML = `${model} <span>⌄</span>`
    menu.hidden = true
  })
  document.addEventListener('click', event => {
    if (!event.target.closest('.model-picker')) menu.hidden = true
  })
}
