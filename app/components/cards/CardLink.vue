<template>
  <a :href="href" target="_blank" class="p-y-24 h-2 p-x-32 g-24 f-r a-center j-center ra-16 bg-white color-black hover:bg-gray-1 hover:color-accent-3">
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
interface Props {
  href: string
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(),
{
  href: '#'
});
</script>

<style scoped>
</style>

