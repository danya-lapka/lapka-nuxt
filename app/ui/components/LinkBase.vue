<template>

<a
  class="f-r fi c-pointer"
  :class="color"
  :href="href"
  :target="target"
>
  <slot>Link</slot>
</a>

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
