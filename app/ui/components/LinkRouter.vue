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

interface Props {
  color?: "white"|"white-accent"|"black"|"black-accent"|"accent"|"accent-alt";
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
@use 'sass:list';
@use '../styles/all.scss' as *;

$component: (
  "white": ("white", "gray-1"),
  "white-accent": ("white", "accent"),
  "black": ("black", "gray-3"),
  "black-accent": ("black", "accent"),
  "accent": ("accent", "accent-1"),
  "accent-alt": ("accent", "accent-3")
);
@each $name, $colors in $component {
  .#{$name} {
    @extend
      .color-#{list.nth($colors, 1)};

    &:hover {
      @extend
        .color-#{list.nth($colors, 2)};
    }
  }
}

</style>

