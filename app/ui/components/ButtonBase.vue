<template>

<button
  class="f-r fi p-x-8 p-y-4 ga-8 ra-8 c-pointer"
  :class="computedClasses"
  :type="type"
  @click="$emit('click', $event)"
>
  <slot>Button</slot>
</button>

</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  color?: "white"|"white-accent"|"black"|"black-accent"|"accent"|"accent-alt",
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
@use 'sass:list';
@use '../styles/all.scss' as *;

$component: (
  "white": ("white", "gray-1", "black", "gray-3"),
  "white-accent": ("white", "accent", "black", "black"),
  "black": ("black", "gray-3", "white", "gray-1"),
  "black-accent": ("black", "accent", "white", "white"),
  "accent": ("accent", "accent-1", "black", "gray-3"),
  "accent-alt": ("accent", "accent-3", "white", "gray-1")
);
.component {
  &:active {
    transform: scale(0.95);
  }
}
@each $name, $colors in $component {
  .#{$name} {
    @extend .component,
      .bg-#{list.nth($colors, 1)},
      .hover\:bg-#{list.nth($colors, 2)},
      .color-#{list.nth($colors, 3)},
      .hover\:color-#{list.nth($colors, 4)};
  }
  .#{$name}-outline {
    @extend .component,
      .transparent,
      .outline-base,
      .outline-#{list.nth($colors, 1)},
      .hover\:outline-#{list.nth($colors, 2)},
      .color-#{list.nth($colors, 1)},
      .hover\:color-#{list.nth($colors, 2)};
  }
}

</style>

