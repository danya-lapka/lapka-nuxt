<template>

<button
  class="component f-r fi p-x-8 p-y-4 ga-8 ra-8 c-pointer"
  :class="computedClasses"
  :type="type"
  @click="$emit('click', $event)"
>
  <slot>Button</slot>
</button>

</template>
<script setup lang="ts">
import { computed } from 'vue';
import type Color from '../types';

interface Props {
  color?: Color,
  type?: "button"|"reset"|"submit",
  outline?: boolean
}
interface Emits {
  (e: 'click', event: MouseEvent): void
}

const props = withDefaults(defineProps<Props>(),
{
  color: "white",
  type: "button",
  outline: false
});
const computedClasses = computed(() => [
  props.outline ? `${props.color}-outline` : props.color
])

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<Emits>();

</script>
<style scoped lang="scss">
@use './colors' as colors;

.component {
  &:active {
    transform: scale(0.95);
  }
}
@each $name, $colors in colors.$component {
  .#{$name} {
    @include colors.background($colors);
  }
  .#{$name}-outline {
    @include colors.outline($colors);
  }
}

</style>

