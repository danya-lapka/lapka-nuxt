<template>
  <div class="layout">
    <BlockHeader :class="padding"/>
    <main class="m-top-136 m-bottom-64 f-c g-96" :class="padding">
      <NuxtPage />
    </main>
    <BlockFooter :class="padding"/>
  </div>
</template>

<script setup lang="ts">
import { WindowSize } from '~/ui';
import { computed } from 'vue';
import { BlockFooter, BlockHeader } from '~/components';

const padding = computed(() => ({
  ['p-x-240']: ['Lg'].includes(WindowSize.value),
  ['p-x-208']: ['Bg'].includes(WindowSize.value),
  ['p-x-128']: ['Md'].includes(WindowSize.value),
  ['p-x-96']: ['Sm'].includes(WindowSize.value),
  ['p-x-32']: ['Xs'].includes(WindowSize.value)
}))

</script>

<style scoped></style>
