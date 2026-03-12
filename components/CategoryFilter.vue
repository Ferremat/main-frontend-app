<script setup lang="ts">
const { fetchCategories } = useApi();

const categories = ref<{ id: string; name: string }[]>([]);
const loading = ref(true);

onMounted(async () => {
  try {
    categories.value = await fetchCategories();
  } catch {
    // Si la API falla, muestra el bloque vacío sin error visible
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="relative -mt-10 mb-8 container mx-auto px-4 z-20">
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 class="text-ferremat-blue font-bold text-center text-xl mb-6">Categorías principales</h2>
      
      <!-- Loading state -->
      <div v-if="loading" class="flex flex-wrap justify-center gap-4">
        <div v-for="n in 6" :key="n" class="h-9 w-28 bg-slate-200 rounded-lg animate-pulse"></div>
      </div>

      <!-- Categories -->
      <div v-else class="flex flex-wrap justify-center gap-4">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          class="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>
  </div>
</template>
