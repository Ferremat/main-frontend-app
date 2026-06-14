<script setup lang="ts">
const { fetchCategories } = useApi();
const { lang, theme } = useSettings();

const { data: categories, pending: loading } = useAsyncData(
  'categories',
  async () => {
    try {
      return await fetchCategories();
    } catch {
      return [];
    }
  }
);

const sectionTitle = computed(() =>
  lang.value === 'es' ? 'Categorías principales' : 'Main categories'
);

const visibleCategories = computed(() => categories.value.slice(0, 5));
</script>

<template>
  <div class="relative -mt-10 mb-8 container mx-auto px-4 z-20">
    <!-- Card con tema oscuro suave -->
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-lg dark:shadow-black/20 border border-gray-200 dark:border-slate-700 p-6 transition-colors duration-300">
      <h2 class="text-ferremat-blue dark:text-blue-400 font-bold text-center text-xl mb-6">
        {{ sectionTitle }}
      </h2>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-wrap justify-center gap-4">
        <div v-for="n in 6" :key="n" class="h-9 w-28 bg-slate-200 rounded-lg animate-pulse"></div>
      </div>

      <!-- Categories -->
      <div v-else class="flex flex-wrap justify-center gap-4">
        <button
          v-for="cat in visibleCategories"
          :key="cat.id"
          class="px-6 py-2 rounded-lg border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-ferremat-blue hover:text-white dark:hover:bg-ferremat-blue hover:border-ferremat-blue dark:hover:border-ferremat-blue transition-colors duration-200"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>
  </div>
</template>
