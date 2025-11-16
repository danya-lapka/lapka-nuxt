<template>
  <svg
    ref="svgRef"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    preserveAspectRatio="xMidYMid meet"
  >
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch, nextTick } from 'vue'

interface Props {
  name: string
}

const props = defineProps<Props>()

const svgRef = ref<SVGSVGElement | null>(null)
const viewBox = ref<string>('0 0 24 24')

const updateViewBox = () => {
  if (typeof window !== 'undefined' && svgRef.value) {
    const useElement = svgRef.value.querySelector('use')
    if (useElement) {
      const href = useElement.getAttribute('href') || useElement.getAttribute('xlink:href')
      if (href) {
        const symbolId = href.replace('#', '')
        const symbol = document.getElementById(symbolId) as SVGSymbolElement | null
        if (symbol) {
          const symbolViewBox = symbol.getAttribute('viewBox')
          if (symbolViewBox) {
            viewBox.value = symbolViewBox
          }
        }
      }
    }
  }
}

const tryUpdateViewBox = async () => {
  // Пробуем несколько раз, пока спрайт не загрузится
  for (let i = 0; i < 10; i++) {
    await nextTick()
    updateViewBox()
    if (viewBox.value !== '0 0 24 24' || document.getElementById(`icon-${props.name}`)) {
      break
    }
    await new Promise(resolve => setTimeout(resolve, 50))
  }
}

onMounted(() => {
  tryUpdateViewBox()
  
  // Также обновляем при изменении name
  watch(() => props.name, () => {
    tryUpdateViewBox()
  })
})
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: middle;
  height: 1em;
  width: auto;
  fill: currentColor;
  color: currentColor;
}

svg :deep(use) {
  color: inherit;
}
</style>

