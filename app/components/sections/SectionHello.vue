<template>
  <section class="hello" :class="computedClasses">
    <div class="hello-text f-c g-16">
      <h1 class="h-1">Всем мяу <span class="b-1">:3</span></h1>
      <div class="b-4">
        <p>Меня зовут Даниил(Даня) или как вам удобно. Мой ник — danya_lapka (Даня Лапка).
          Я фембой, люблю носить чулки, юбочку и другие милые вещички❣ Фоточки в <LinkBase target="_blank" class="w-min" color="accent-1" href="https://t.me/danya_lapka">Telegram</LinkBase>. Мне 18 годиков.</p>
        <p>Я люблю играть в разные игры, например Terraria, Hollow Knight, Dead Cells и другие,
          посмотреть меня можно на стримах <LinkBase color="accent-1" href="https://www.twitch.tv/danya_lapka" target="_blank">Twitch</LinkBase> или на видео <LinkBase color="accent-1" target="_blank" href="https://www.youtube.com/@DanyaLapka">YouTube</LinkBase>.
          В свободноe время я занимаюсь программированием, этот сайт я написал сам :3, вот мой <LinkBase color="accent-1" target="_blank" href="https://github.com/danya-lapka">GitHub</LinkBase>.</p>
      </div>
    </div>
    <NuxtPicture class="hello-image" format="png" src="/hello-image.png" alt="boykisser" preload />
  </section>
</template>

<script setup lang="ts">
import { LinkBase, WindowSize } from '~/ui';


const computedClasses = computed(() => ({
  ['f-r']: ['xl','lg','md'].includes(WindowSize.value),
  ['f-c a-center']: ['sm','xs'].includes(WindowSize.value)
}))
</script>

<style scoped>
.hello-image {
  aspect-ratio: 282/384;
  max-width: 282px;
  max-height: 384px;
}
</style>

