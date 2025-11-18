<template>
  <footer class="f-r wp-100 p-top-35 p-bottom-36 color-gray-3 a-center j-between bg-black">
    <ul class="f-c g-8">
      <li v-for="p in pages" :key="p.path">
        <LinkRouter class="b-4" target="_self" :href="p.path" color="white">{{ p.name }}</LinkRouter>
      </li>
    </ul>
    <LinkRouter href="/" color="white" target="_self" class="h-2"><SvgIcon name="lapka-text2" :class="height" /></LinkRouter>
    <ul class="f-c g-8">
      <li v-for="l in links" :key="l.name">
        <LinkBase target="_blank" :href="l.url" color="white" class="g-8 b-4"><SvgIcon :name="l.icon"/>{{ l.name }}</LinkBase>
      </li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
import { pages, links } from '~/data/static';
import { LinkBase, LinkRouter, SvgIcon, WindowSize } from '~/ui';
import { computed } from 'vue';

const height = computed(() => ({
  ['ha-182']: ['Lg','Bg','Md','Sm'].includes(WindowSize.value),
  ['ha-136']: ['Xs'].includes(WindowSize.value)
}))
</script>

<style scoped lang="scss">
@use '~/ui/styles/variables' as *;
footer {
  border-top: 1*$n solid currentColor;
}
</style>

