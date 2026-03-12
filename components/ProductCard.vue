<script setup lang="ts">
import { ShoppingCart, Eye } from 'lucide-vue-next';

defineProps<{
  image: string;
  title: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}>();
</script>

<template>
  <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col border border-slate-100">

    <!-- Image with badges -->
    <div class="relative overflow-hidden">
      <img
        :src="image"
        :alt="title"
        class="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
      />
      <!-- Category badge -->
      <span class="absolute top-3 left-3 bg-ferremat-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
        {{ category }}
      </span>
      <!-- Stock badge -->
      <span class="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        {{ stock }} disponibles
      </span>
    </div>

    <!-- Content -->
    <div class="flex flex-col flex-1 px-4 pt-4 pb-4 gap-2">

      <!-- Brand -->
      <span class="text-ferremat-orange text-xs font-bold uppercase tracking-wide">{{ brand }}</span>

      <!-- Title -->
      <h3 class="text-slate-800 font-bold text-base leading-snug line-clamp-2">{{ title }}</h3>

      <!-- Description -->
      <p class="text-slate-500 text-sm leading-relaxed line-clamp-2 flex-1">{{ description }}</p>

      <!-- Price -->
      <p class="text-ferremat-orange font-extrabold text-xl mt-1">
        ${{ price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
      </p>

      <!-- Actions -->
      <div class="flex gap-2 mt-1">
        <button class="flex-1 flex items-center justify-center gap-1.5 border-2 border-ferremat-blue text-ferremat-blue text-sm font-semibold py-2 rounded-lg hover:bg-ferremat-blue hover:text-white transition-colors duration-200">
          <Eye class="w-4 h-4" />
          Ver Detalles
        </button>
        <button class="flex-1 flex items-center justify-center gap-1.5 bg-ferremat-orange text-white text-sm font-semibold py-2 rounded-lg hover:bg-orange-500 transition-colors duration-200">
          <ShoppingCart class="w-4 h-4" />
          Agregar
        </button>
      </div>

    </div>
  </div>
</template>
