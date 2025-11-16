<template>

<div>
  <slot>Hover me</slot>
    <div
      class="b-5 fi f-r ga-4 pa-4 ra-4 j-center tooltip"
      :class="`${color}-${side}`"
    >
      <slot name="tooltip">Tooltip</slot>
    </div>
</div>

</template>
<script setup lang="ts">

interface Props {
  color?: "white"|"black"|"accent"|"accent-alt"|"success"|"warn"|"error"|"info";
  side?: "top"|"bottom"|"left"|"right"
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(),
{
  color: "white",
  side: "top"
});

</script>
<style scoped lang="scss">
@use 'sass:list';
@use '../styles/all.scss' as *;
@use '../styles/_variables.scss' as *;

$component: (
  "white": ("white", "black"),
  "black": ("black", "white"),
  "accent": ("accent", "black"),
  "accent-alt": ("accent", "white"),
  "success": ("success", "black"),
  "warn": ("warn", "black"),
  "error": ("error", "black"),
  "info": ("info", "black"),
);

$sides: top, bottom, left, right;

%component {
  .tooltip {
    opacity: 0;
    visibility: hidden;
    z-index: 1;

    &::after {
      content: "";
      border-width: 5px;
      border-style: solid;
    }
  }

  &:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
}

@each $name, $colors in $component {
  $bg-color: list.nth($colors, 1);
  $text-color: list.nth($colors, 2);

  @each $side in $sides {
    .#{$name}-#{$side} {
      @extend %component, .bg-#{$bg-color}, .color-#{$text-color};

      @if $side == top {
        @extend .a-left-50p, .a-bottom-100p;
        transform: translateX(-50%) translateY(-4 * $n);
        &::after {
          @extend .a-top-100p, .a-left-50p, .border-#{$bg-color}t;
          transform: translateX(-50%);
        }
      }

      @if $side == bottom {
        @extend .a-left-50p, .a-top-100p;
        transform: translateX(-50%) translateY(4 * $n);
        &::after {
          @extend .a-bottom-100p, .a-left-50p, .border-#{$bg-color}b;
          transform: translateX(-50%);
        }
      }

      @if $side == left {
        @extend .a-right-100p, .a-top-50p;
        transform: translateY(-50%) translateX(-8 * $n);
        &::after {
          @extend .a-top-50p, .a-left-100p, .border-#{$bg-color}l;
          transform: translateY(-50%);
        }
      }

      @if $side == right {
        @extend .a-left-100p, .a-top-50p;
        transform: translateY(-50%) translateX(8 * $n);
        &::after {
          @extend .a-top-50p, .a-right-100p, .border-#{$bg-color}r;
          transform: translateY(-50%);
        }
      }
    }
  }
}

</style>

