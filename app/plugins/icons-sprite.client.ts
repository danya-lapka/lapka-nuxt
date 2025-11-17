export default defineNuxtPlugin(() => {
  if (!process.client) return

  const spriteUrl = '/icons-sprite.svg'

  fetch(spriteUrl)
    .then((res) => {
      if (!res.ok) {
        console.warn(`SVG спрайт не найден: ${spriteUrl}. Запустите: npm run generate:sprite`)
        return null
      }
      return res.text()
    })
    .then((svg) => {
      if (!svg) return

      if (!document.getElementById('icons-sprite')) {
        const container = document.createElement('div')
        container.id = 'icons-sprite'
        container.style.display = 'none'
        container.innerHTML = svg
        document.body.appendChild(container)
      }
    })
    .catch((err) => {
      console.warn('Ошибка загрузки SVG спрайта:', err)
    })
})
