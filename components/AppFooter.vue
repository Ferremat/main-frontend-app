<script setup lang="ts">
import { Hammer, Instagram, AtSign } from 'lucide-vue-next';
</script>

<template>
  <footer class="bg-ferremat-blue text-white py-6 mt-auto">
    <div class="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
      
      <!-- Logo and Brand -->
      <div class="flex items-center gap-4">
        <div class="bg-ferremat-orange p-2 rounded-md">
          <Hammer class="w-6 h-6" stroke-width="2.5" />
        </div>
        <span class="text-3xl font-bold">Ferremat</span>
      </div>

      <!-- Social Icons -->
      <div class="flex items-center gap-8">
        <a href="#" class="hover:text-white/80 transition-colors">
          <AtSign class="w-7 h-7" />
        </a>
        <a href="#" class="hover:text-white/80 transition-colors">
          <Instagram class="w-7 h-7" />
        </a>
        <a href="#" class="hover:text-white/80 transition-colors">
          <!-- WhatsApp style icon using Hammer for placeholder if needed, or simple SVG -->
          <svg viewBox="0 0 24 24" class="w-7 h-7 fill-current">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.038 3.284l-.569 2.491 2.509-.549c.972.547 2.035.912 3.297.913h.028c3.182 0 5.767-2.586 5.768-5.766 0-3.181-2.586-5.733-5.768-5.733zm3.954 8.273c-.214.603-1.248 1.162-1.742 1.227-.474.065-.922.298-2.911-.534-2.408-.998-3.968-3.411-4.088-3.571-.12-.161-1.074-1.428-1.074-2.724 0-1.296.657-1.928.921-2.2.261-.271.65-.408.847-.408.196 0 .393.001.54.008.155.008.364-.06.567.437.21.509.71 1.744.773 1.868.062.126.103.272.019.438-.083.167-.156.272-.313.438-.155.167-.327.373-.467.502-.158.147-.324.308-.14.623.184.314.82 1.346 1.758 2.181 1.203 1.072 2.215 1.403 2.531 1.558.318.154.503.127.691-.091.188-.217.812-.942.928-1.268.117-.327.234-.271.393-.211.159.06 1.012.477 1.186.564.172.088.289.132.331.203.042.073.042.421-.172 1.024z"/>
          </svg>
        </a>
      </div>

      <!-- Legal Links -->
      <div class="grid grid-cols-2 gap-x-8 gap-y-1 text-xs font-bold text-white/90">
        <a href="#" class="hover:underline">Política de privacidad</a>
        <a href="#" class="hover:underline">Política de cookies</a>
        <a href="#" class="hover:underline">Aviso legal</a>
        <a href="#" class="hover:underline">Condiciones de compra</a>
      </div>

    </div>
  </footer>
</template>
