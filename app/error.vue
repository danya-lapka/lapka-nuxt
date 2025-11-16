<template>
  <div>
    <h1 class="h-1">{{ error?.statusCode }}</h1>
    <LinkRouter href="/" color="white" target="_self" class="b-1">Go back home</LinkRouter>
  </div>
</template>

<script setup lang="ts">
import { LinkRouter } from '~/ui';
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError,
})
</script>
