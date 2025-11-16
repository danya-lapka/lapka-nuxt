export default defineNuxtPlugin(() => {
  if (process.client) {
    // Загружаем спрайт один раз при загрузке приложения
    const spriteUrl = '/icons-sprite.svg'
    
    fetch(spriteUrl)
      .then(res => {
        if (!res.ok) {
          console.warn(`SVG спрайт не найден: ${spriteUrl}. Запустите: npm run generate:sprite`)
          return null
        }
        return res.text()
      })
      .then(svg => {
        if (svg) {
          // Проверяем, не загружен ли уже спрайт
          if (!document.getElementById('icons-sprite')) {
            const div = document.createElement('div')
            div.id = 'icons-sprite'
            div.innerHTML = svg
            div.style.display = 'none'
            document.body.appendChild(div)
          }
        }
      })
      .catch(err => {
        console.warn('Ошибка загрузки SVG спрайта:', err)
      })
  }
})

