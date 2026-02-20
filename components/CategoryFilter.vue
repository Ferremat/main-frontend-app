<script setup lang="ts">
import { LayoutGrid, Hammer, PaintRoller, Box, Droplets, Zap } from 'lucide-vue-next';

const categories = [
  { name: 'Todos', icon: LayoutGrid, id: 'all' },
  { name: 'Herramientas', icon: Hammer, id: 'tools' },
  { name: 'Pinturas', icon: PaintRoller, id: 'paints' },
  { name: 'Materiales', icon: Box, id: 'materials' },
  { name: 'Plomería', icon: Droplets, id: 'plumbing' },
  { name: 'Electricidad', icon: Zap, id: 'electricity' },
];

const selectedCategory = ref('all');
</script>

<template>
  <div class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-[#3333FF] mb-8">Filtra por Categoría</h2>
      
      <div class="flex flex-wrap justify-center gap-4 md:gap-8">
        <button 
          v-for="category in categories" 
          :key="category.id"
          @click="selectedCategory = category.id"
          class="flex flex-col items-center justify-center p-6 w-32 md:w-40 rounded-xl border-2 transition-all duration-300 bg-white shadow-sm hover:shadow-md"
          :class="selectedCategory === category.id ? 'border-[#F37021]/50 bg-[#F37021]/5 text-[#F37021]' : 'border-gray-200 text-gray-500 hover:border-[#F37021]/30 hover:text-[#F37021]/80'"
        >
          <component :is="category.icon" class="w-8 h-8 mb-3" stroke-width="1.5" />
          <span class="font-medium text-sm">{{ category.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
