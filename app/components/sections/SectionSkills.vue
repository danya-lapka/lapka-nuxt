<template>
  <section class="f-c g-32">
    <h1 class="h-1">Скиллы <span class="b-1">так называемые</span></h1>
    <div :class="computedClasses">
      <CardSkill v-for="s in skills" :key="s.name">
        <template #name>
          <SvgIcon class="h-2" :name="s.icon" />{{ s.name }}
        </template>
        {{ s.description }}
      </CardSkill>
    </div>
  </section>
</template>

<script setup lang="ts">
import { SvgIcon, WindowSize } from '~/ui';
import { CardSkill } from '../cards';

const computedClasses = computed(() => ({
  ['gm-3-24']: ['xl','lg'].includes(WindowSize.value),
  ['gm-2-24']: ['md'].includes(WindowSize.value),
  ['gm-1-24']: ['sm', 'xs'].includes(WindowSize.value)
}))

const skills: {
  name: string,
  icon: string,
  description: string
}[] = [
  {
    name: "Figma",
    icon: "Figma",
    description: "Облачный инструмент для проектирования UI/UX интерфейсов и прототипирования с совместной работой"
  },
  {
    name: "SASS",
    icon: "Sass",
    description: "Препроцессор CSS с переменными, миксинами и вложенностью для удобства стилизации"
  },
  {
    name: "Git",
    icon: "Git",
    description: "Система контроля версий для отслеживания изменений в коде и совместной разработки"
  },
  {
    name: "React",
    icon: "React",
    description: "Библиотека для создания интерактивных пользовательских интерфейсов на основе компонентов"
  },
  {
    name: "Vue.js",
    icon: "VueDotJs",
    description: "Прогрессивный фреймворк для создания пользовательских интерфейсов с гибкой архитектурой"
  },
  {
    name: "TypeScript",
    icon: "TypeScript",
    description: "JavaScript со статической типизацией для повышения надежности и удобства разработки"
  },
  {
    name: "Next.js",
    icon: "NextDotJs",
    description: "Фреймворк для React с серверным рендерингом, маршрутизацией и оптимизацией"
  },
];
</script>

<style scoped>
</style>

