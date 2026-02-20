<script setup lang="ts">
import { Search, Menu, Hammer } from 'lucide-vue-next';
</script>

<template>
  <header class="bg-[#3333FF] p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
    <!-- Logo -->
    <div class="flex items-center">
      <div class="bg-[#F37021] text-white p-2 rounded-lg flex items-center gap-2">
        <Hammer class="w-6 h-6" />
        <span class="font-bold text-xl tracking-tight">Ferremat</span>
      </div>
    </div>

    <!-- Search Bar (Hidden on very small screens, responsive) -->
    <div class="hidden md:flex flex-1 mx-8 max-w-2xl relative">
      <input 
        type="text" 
        placeholder="Buscar herramientas, materiales..." 
        class="w-full py-2.5 pl-4 pr-10 rounded-md outline-none text-gray-700 bg-gray-200 focus:bg-white transition-colors"
      />
      <Search class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
    </div>

    <!-- Mobile Menu / Navigation -->
    <button class="text-white hover:bg-white/10 p-2 rounded-md transition-colors">
      <Menu class="w-8 h-8" />
    </button>
  </header>
</template>
