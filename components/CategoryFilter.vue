<script setup lang="ts">
const { fetchCategories } = useApi();
const { lang, theme } = useSettings();

const props = defineProps<{ selected: string }>();
const emit = defineEmits<{ select: [category: string] }>();

const { data: categories, pending: loading } = useAsyncData(
  'categories',
  async () => {
    try {
      return await fetchCategories();
    } catch {
      return [];
    }
  },
  { cache: false }
);

const sectionTitle = computed(() =>
  lang.value === 'es' ? 'Categorías principales' : 'Main categories'
);

const visibleCategories = computed(() => categories.value.slice(0, 5));

function selectCategory(name: string) {
  emit('select', props.selected === name ? '' : name);
}
</script>

<template>
  <div class="relative -mt-10 mb-8 container mx-auto px-4 z-20">
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-lg dark:shadow-black/20 border border-gray-200 dark:border-slate-700 p-6 transition-colors duration-300">
      <h2 class="text-ferremat-blue dark:text-blue-400 font-bold text-center text-xl mb-6">
        {{ sectionTitle }}
      </h2>

      <div v-if="loading" class="flex flex-wrap justify-center gap-4">
        <div v-for="n in 6" :key="n" class="h-9 w-28 bg-slate-200 rounded-lg animate-pulse"></div>
      </div>

      <div v-else class="flex flex-wrap justify-center gap-4">
        <button
          v-for="cat in visibleCategories"
          :key="cat.id"
          @click="selectCategory(cat.name)"
          :class="[
            'px-6 py-2 rounded-lg border font-medium transition-colors duration-200',
            props.selected === cat.name
              ? 'bg-ferremat-blue text-white border-ferremat-blue'
              : 'border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-ferremat-blue hover:text-white hover:border-ferremat-blue dark:hover:border-ferremat-blue'
          ]"
        >
          {{ cat.name }}
        </button>
      </div>
    </div>
  </div>
</template>