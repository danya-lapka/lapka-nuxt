<template>
  <section class="f-c g-48">
    <h1 class="h-1">Ссылки</h1>
    <div class="g-32" :class="computedClasses">
      <CardLink v-for="l in links" :key="l.name" :href="l.url">
        <SvgIcon class="h-1" :name="l.icon"/>{{ l.name }}
      </CardLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { links } from '~/data/static';
import { SvgIcon, WindowSize } from '~/ui';
import { CardLink } from '../cards';

const computedClasses = computed(() => ({
  ['gc-3']: ['Lg'].includes(WindowSize.value),
  ['gc-2']: ['Bg'].includes(WindowSize.value),
  ['gc-1']: ['Md','Sm','Xs'].includes(WindowSize.value)
}))

</script>

<style scoped>
</style>

