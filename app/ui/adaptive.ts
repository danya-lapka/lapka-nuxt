import { useWindowSize } from '@vueuse/core';

const { width } = useWindowSize();
type Size = 'xl'|'lg'|'md'|'sm'|'xs';
export const WindowSize = computed<Size>(() => {
  if (width.value < 768) return 'xs';
  if (width.value < 1024) return 'sm';
  if (width.value < 1440) return 'md';
  if (width.value < 1920) return 'lg';
  return 'xl';
});
