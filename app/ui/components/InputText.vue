<template>

<label
  class="f-r fi p-x-8 p-y-6 ga-8 ra-8 c-text"
  :class="computedClasses"
  :for="id"
>
  <input
    :type="type"
    :pattern="pattern"
    :required="required"
    :id="id"
    :name="id"
    @input="handleInput"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
    @keydown="$emit('keydown', $event)"
    placeholder=" "
  >
  <span><slot>Input text</slot></span>
</label>

</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  color?: "white"|"black";
  type?: "text"|"password"|"email"|"tel"|"number"|"url"|"search",
  outline?: boolean,
  id?: string,
  required?: boolean,
  pattern?: string,
  name?: string,
  modelValue?: string | number
}
interface Emits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'blur', event: Event): void
  (e: 'focus', event: Event): void
  (e: 'keydown', event: KeyboardEvent): void
}


const props = withDefaults(defineProps<Props>(),
{
  color: "white",
  type: "text",
  outline: false,
  required: false,
  modelValue: ''
});
const computedClasses = computed(() => [
  props.outline ? `${props.color}-outline` : props.color
])

const emit = defineEmits<Emits>();

const handleInput = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
}

</script>
<style scoped lang="scss">
@use 'sass:list';
@use '../styles/all.scss' as *;
@use '../styles/_variables.scss' as *;
@use './colors' as colors;

$component: (
  "white": ("white", "gray-1", "black", "gray-3"),
  "black": ("black", "gray-3", "white", "gray-1")
);
%component-base {
  input {
    width: calc(100% - 16*$n);
    @extend .transparent, .pos-absolute;
    font: inherit;
    height: min-content;
    color: inherit;
  }
  height: calc(1em + 12*$n);
  &:has(input:not(:placeholder-shown)), &:focus-within {
    span {
      @extend
        .b-6,
        .m-left-4m;
      transform: translateY(calc(-1em - 10*$n))
    }
  }
  &:focus-within, &:focus-within:has(input:not(:placeholder-shown)) {
    span {
      @extend .color-accent;
    }
    &:hover span{
      @extend .color-accent;
    }
  }
}
%component {
  @extend %component-base;
  &:focus-within, &:focus-within:has(input:not(:placeholder-shown)) {
    @extend
    .bg-accent,
    .hover\:bg-accent;
  }
}
%component-outline {
  @extend %component-base;
  &:focus-within, &:focus-within:has(input:not(:placeholder-shown)) {
    @extend
    .outline-accent,
    .color-accent,
    .hover\:outline-accent;
  }
}
@each $name, $colors in $component {
  .#{$name} {
    @extend %component;
    @include colors.background($colors);

    &:has(input:not(:placeholder-shown)) {
      span {
        @extend .color-#{list.nth($colors, 1)};
      }
      &:hover {
        span {
          @extend .color-#{list.nth($colors, 2)};
        }
      }
    }
    &:focus-within {
      @extend
        .color-#{list.nth($colors, 3)};
    }
  }
  .#{$name}-outline {
    @extend %component-outline;
    @include colors.background($colors);

    &:has(input:not(:placeholder-shown)) {
      span {
        @extend .color-#{list.nth($colors, 1)};
      }
      &:hover {
        span {
          @extend .color-#{list.nth($colors, 2)};
        }
      }
    }
    &:focus-within {
      @extend
        .color-#{list.nth($colors, 1)};
    }
  }
}

</style>
