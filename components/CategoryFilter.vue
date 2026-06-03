<script setup lang="ts">
const { fetchCategories } = useApi();
const { lang, theme } = useSettings();

const categories = ref<{ id: string; name: string }[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    categories.value = await fetchCategories();
  } catch {
    // silent fail
  } finally {
    loading.value = false;
  }
});

const sectionTitle = computed(() =>
  lang.value === 'es' ? 'Categorías principales' : 'Main categories'
);
</script>

<template>
  <div class="relative -mt-10 mb-8 container mx-auto px-4 z-20">
    <!-- Card siempre en blanco — color de referencia original -->
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 transition-colors duration-300">
      <h2 class="text-ferremat-blue font-bold text-center text-xl mb-6">
        {{ sectionTitle }}
      </h2>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-wrap justify-center gap-4">
        <div v-for="n in 6" :key="n" class="h-9 w-28 bg-slate-200 rounded-lg animate-pulse"></div>
      </div>

      <!-- Categories — blanco original -->
      <div v-else class="flex flex-wrap justify-center gap-4">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-ferremat-blue hover:text-white hover:border-ferremat-blue transition-colors duration-200"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>
  </div>
</template>
