import { useWindowSize } from '@vueuse/core';
import { computed } from 'vue';

const { width } = useWindowSize();
type Size = 'Lg'|'Bg'|'Md'|'Sm'|'Xs';
export const WindowSize = computed<Size>(() => {
  if (width.value < 768) return 'Xs';
  if (width.value < 1024) return 'Sm';
  if (width.value < 1440) return 'Md';
  if (width.value < 1920) return 'Bg';
  return 'Lg';
});

