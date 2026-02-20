<script setup lang="ts">
import { Eye, ShoppingCart } from 'lucide-vue-next';

defineProps<{
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}>();
</script>

<template>
  <div class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden relative group">
    <!-- Badges -->
    <div class="absolute top-2 left-2 z-10">
      <span class="bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded">{{ category }}</span>
    </div>
    <div v-if="inStock" class="absolute top-2 right-2 z-10">
      <span class="bg-green-100 text-green-600 text-xs font-semibold px-2 py-0.5 rounded">Stock</span>
    </div>

    <!-- Image -->
    <div class="aspect-square bg-gray-50 flex items-center justify-center p-4">
      <img :src="image" :alt="title" class="object-contain h-full w-full mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="font-bold text-gray-800 text-lg mb-1">{{ title }}</h3>
      <p class="text-gray-500 text-xs mb-3 line-clamp-2">{{ description }}</p>
      
      <div class="flex items-center justify-between mb-3">
        <span class="text-[#F37021] font-bold text-xl">{{ price.toFixed(2) }} €</span>
      </div>

      <div class="flex gap-2">
         <button class="flex-1 flex items-center justify-center gap-1 border border-[#3333FF] text-[#3333FF] text-xs py-2 rounded-md hover:bg-[#3333FF]/5 transition-colors">
            <Eye class="w-3 h-3" />
            Ver detalles
         </button>
         <button class="flex-1 flex items-center justify-center gap-1 bg-[#F37021] text-white text-xs py-2 rounded-md hover:bg-[#F37021]/90 transition-colors shadow-sm">
            <ShoppingCart class="w-3 h-3" />
            Añadir
         </button>
      </div>
    </div>
  </div>
</template>
