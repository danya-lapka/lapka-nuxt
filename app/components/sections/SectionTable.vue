<template>
  <section class="f-c g-48">
    <h1 class="h-1">Таблица</h1>
    <div class="f-c">
      <div class="b-3 f-r g-1 bg-gray-2 color-black r-top-16">
        <div style="flex: 1 1 auto;" class="p-x-12 p-y-4 bg-white r-top-left-16">Название</div>
        <div class="wa-120 p-y-4 bg-white t-center">Статус</div>
        <div class="wa-130 p-y-4 bg-white t-center r-top-right-16">Ссылка</div>
      </div>
      <div v-if="loading" style="height: 500px;" class="b-4 f-r g-1 bg-gray-2 skeleton">
      </div>
      <div class="b-4 f-r g-1 bg-gray-2" v-for="game in games">
        <div style="flex: 1 1 260px;" class="p-x-12 p-y-2" :class="getBg(game.id)" >{{ game.name }}</div>
        <div class="wa-120 p-y-2 fi a-center j-center" :class="getBg(game.id), getStatus(game.status)" >
          {{ getStatusName(game.status) }}
        </div>
        <div v-if="game.link === '#'" class="wa-130 t-center p-y-2 color-gray-2" :class="getBg(game.id)">
          Нету
        </div>
        <LinkBase v-else class="wa-130 j-center p-y-2" :class="getBg(game.id)" :href="game.link" >
          Клик
        </LinkBase>
      </div>
      <div class="b-4 f-r g-1 bg-gray-2 color-black r-bottom-16">
        <div style="flex: 1 1 auto;" class="p-x-12 p-y-2 bg-white r-bottom-left-16">Стримы</div>
        <LinkBase color="black" class="wa-250 j-center p-y-2 bg-white r-bottom-right-16" href="https://www.youtube.com/playlist?list=PLgPYefSLHqt-8RueFtkjDIXCgXp37XHBe" >Клик</LinkBase>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSupabaseClientBrowser } from '~/utils/supabase';
import type { Database } from '~/types/supabase';
import { LinkBase } from '~/ui';

const supabase = useSupabaseClientBrowser();
type Game = Database['public']['Tables']['games']['Row']
const games: Ref<Game[]> = ref([]);
const loading = ref(true);

async function getGames(): Promise<void> {
  const { data, error } = await supabase
  .from('games')
  .select('*');

  if (error) {
    console.error(error);
    loading.value = false;
    return;
  }

  if (data) {
    games.value = data as Game[]
  }
  loading.value = false;
}

onMounted(() => {
  void getGames()
});

const getBg = (id: number) => {
  return (id % 2 === 0)? 'bg-gray-3':'bg-black';
}
const getStatus = (status: Database['public']['Tables']['games']['Row']['status']) => {
  let result: 'info'|'success'|'error'|'warn';
  
  switch (status) {
    case 'planned': result = 'info'; break;
    case 'playing': result = 'warn'; break;
    case 'completed': result = 'success'; break;
    case 'dropped': result = 'error'; break;
  }
  return `color-${result}`;
}
const getStatusName = (status: Database['public']['Tables']['games']['Row']['status']) => {
  let result: 'Планы'|'Играю'|'Прошёл'|'Бросил';
  
  switch (status) {
    case 'planned': result = 'Планы'; break;
    case 'playing': result = 'Играю'; break;
    case 'completed': result = 'Прошёл'; break;
    case 'dropped': result = 'Бросил'; break;
  }
  return result;
}

</script>

<style scoped>
.skeleton {
  background: linear-gradient(90deg, #000 25%, #fff 50%, #000 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s linear infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
