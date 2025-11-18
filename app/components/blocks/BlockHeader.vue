<template>
  <header class="f-r wp-100 p-top-12 p-bottom-11 a-center j-between pos-fixed bg-black color-gray-3 a-top-0">
    <LinkRouter href="/" color="white" target="_self" class="h-2"><SvgIcon name="lapka-text" /></LinkRouter>
    <ul class="f-r g-32">
      <li v-for="p in pages" :key="p.path">
        <LinkRouter class="b-4" target="_self" :href="p.path" color="white">{{ p.name }}</LinkRouter>
      </li>
    </ul>
  </header>
</template>

<script setup lang="ts">
import { pages } from '~/data/static';
import { LinkRouter, SvgIcon } from '~/ui';
</script>

<style scoped lang="scss">
@use '~/ui/styles/variables' as *;
header {
  border-bottom: 1*$n solid currentColor;
  z-index: 999;
}
</style>

