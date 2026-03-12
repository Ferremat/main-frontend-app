<script setup lang="ts">
import { Truck, ShieldCheck, Headphones } from 'lucide-vue-next';

const highlights = [
  { icon: Truck,        text: 'Envío gratis en compras mayores a $1,000' },
  { icon: ShieldCheck,  text: 'Garantía en todos los productos' },
  { icon: Headphones,   text: 'Asesoría profesional gratuita' },
];
</script>

<template>
  <div class="relative h-[420px] w-full overflow-hidden">
    <!-- Background image -->
    <div
      class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center scale-105"
    ></div>

    <!-- Dark gradient overlay — left-heavy so text is legible -->
    <div class="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/20"></div>

    <!-- Content -->
    <div class="relative h-full flex items-center px-10 md:px-20 gap-16">

      <!-- Left: text -->
      <div class="flex flex-col justify-center max-w-lg">
        <!-- Eyebrow tag -->
        <span class="inline-flex items-center gap-2 bg-ferremat-orange/20 border border-ferremat-orange/50 text-ferremat-orange text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4">
          🔨 Ferretería Ferremat
        </span>

        <!-- Heading -->
        <h1 class="text-white font-extrabold text-4xl md:text-5xl leading-tight drop-shadow-lg">
          Bienvenido a<br>
          <span class="text-ferremat-orange">Ferretería Ferremat</span>
        </h1>

        <!-- Subtitle -->
        <p class="text-white/80 mt-4 text-lg leading-relaxed">
          Encuentra las mejores herramientas y materiales de construcción para tus proyectos.
          <span class="text-white font-semibold">Calidad garantizada</span> y precios competitivos.
        </p>
      </div>

      <!-- Right: highlights pills -->
      <ul class="hidden md:flex flex-col gap-4">
        <li
          v-for="item in highlights"
          :key="item.text"
          class="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium px-5 py-3 rounded-full whitespace-nowrap"
        >
          <component :is="item.icon" class="w-5 h-5 text-ferremat-orange flex-shrink-0" stroke-width="2.5" />
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
