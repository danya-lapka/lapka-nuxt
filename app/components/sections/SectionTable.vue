<template>
  <section class="f-c g-48">
    <h1 class="h1">Таблица</h1>
    <div>
      <div v-for="game in data">
        <div>{{ game.name }}</div>
        <div>{{ game.status }}</div>
        <div>{{ game.link }}</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSupabase } from '~/composables/useSupabase';
import type { TableGames } from '~/types/supabase';

const { data, loading, error, fetchAll } = useSupabase<TableGames>('games')

// Получить все записи
onMounted(async () => {
  await fetchAll()
})

</script>

<style scoped>
</style>

