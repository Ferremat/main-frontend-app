<script setup lang="ts">
const categories = [
  'None', 'None', 'None', 'None', 'None', 'None', 'None', 'None', 'None', 'None'
];
</script>

<template>
  <div class="relative -mt-10 mb-8 container mx-auto px-4 z-20">
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h2 class="text-ferremat-blue font-bold text-center text-xl mb-6">Categorías principales</h2>
      
      <div class="flex flex-wrap justify-center gap-4">
        <button 
          v-for="(cat, index) in categories" 
          :key="index"
          class="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          {{ cat }}
        </button>
      </div>
    </div>
  </div>
</template>
