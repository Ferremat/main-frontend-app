<script setup lang="ts">
import { Search, ShoppingBag, User, Settings, Hammer } from 'lucide-vue-next';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Conocenos', href: '#' },
  { label: 'Productos', href: '#' },
  { label: 'Novedades', href: '#' },
  { label: 'Contactanos', href: '#' },
];
</script>

<template>
  <header class="bg-ferremat-blue px-6 py-4 flex items-center justify-between sticky top-0 z-50">
    <!-- Logo -->
    <div class="flex items-center">
      <div class="bg-ferremat-orange text-white p-2.5 rounded-md flex items-center justify-center">
        <Hammer class="w-8 h-8" stroke-width="2.5" />
      </div>
    </div>

    <!-- Navigation Links -->
    <nav class="hidden lg:flex items-center gap-8 ml-8">
      <a 
        v-for="link in navLinks" 
        :key="link.label" 
        :href="link.href"
        class="text-white font-bold text-lg hover:text-white/80 transition-colors"
      >
        {{ link.label }}
      </a>
    </nav>

    <!-- Action Icons -->
    <div class="flex items-center gap-6 text-white">
      <button class="hover:text-white/80 transition-colors">
        <Search class="w-8 h-8" stroke-width="2" />
      </button>
      <button class="hover:text-white/80 transition-colors">
        <ShoppingBag class="w-8 h-8" stroke-width="2" />
      </button>
      <button class="hover:text-white/80 transition-colors">
        <User class="w-8 h-8" stroke-width="2" />
      </button>
      <button class="hover:text-white/80 transition-colors">
        <Settings class="w-8 h-8" stroke-width="2" />
      </button>
    </div>
  </header>
</template>
