<template>

<NuxtLink
  class="f-r fi ga-4 c-pointer"
  :class="color"
  :to="href"
  :target="target"
>
  <slot>Link</slot>
</NuxtLink>

</template>
<script setup lang="ts">
import type Color from '../types';

interface Props {
  color?: Color;
  href: string,
  target?: '_self' | '_blank' | '_parent' | '_top'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(),
{
  color: "white",
  target: "_self"
});

</script>
<style scoped lang="scss">
@use './colors' as colors;

@each $name, $colors in colors.$component {
  .#{$name} {
    @include colors.color($colors);
  }
}
</style>
