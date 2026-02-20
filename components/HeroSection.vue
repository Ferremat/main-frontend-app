<script setup lang="ts">
import { Check } from 'lucide-vue-next';
</script>

<template>
  <div class="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
    <!-- Overlay/Background Image Placeholder -->
    <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>

    <div class="container mx-auto px-4 py-16 md:py-24 relative z-10 flex flex-col md:flex-row items-center justify-between">
      
      <!-- Text Content -->
      <div class="md:w-1/2 mb-8 md:mb-0">
        <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Bienvenido a <span class="text-[#F37021]">Ferremat</span>
        </h1>
        <p class="text-xl md:text-2xl font-light text-gray-100 max-w-lg mb-6">
          Encuentra las herramientas que necesites al mejor precio y de la mejor calidad
        </p>
      </div>

      <!-- Right Side Cards -->
      <div class="md:w-1/2 flex flex-col gap-4 items-end">
        
        <div class="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 flex items-center gap-3 shadow-lg transform transition hover:scale-105">
          <div class="bg-white rounded-full p-1 text-[#F37021]">
            <Check class="w-4 h-4" stroke-width="3" />
          </div>
          <span class="font-medium">Todos los productos con garantía de 2 años</span>
        </div>

        <div class="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 flex items-center gap-3 shadow-lg transform transition hover:scale-105">
          <div class="bg-white rounded-full p-1 text-[#F37021]">
             <Check class="w-4 h-4" stroke-width="3" />
          </div>
          <span class="font-medium">Envíos gratis en compras superiores a 50 €</span>
        </div>

      </div>
    </div>
  </div>
</template>
