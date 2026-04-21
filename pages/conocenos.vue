<script setup lang="ts">
import { Hammer, Users, Star, ShieldCheck, Truck, Award } from 'lucide-vue-next';

const values = [
  {
    icon: ShieldCheck,
    title: 'Calidad Garantizada',
    description: 'Todos nuestros productos pasan por estrictos controles de calidad antes de llegar a tus manos.',
  },
  {
    icon: Users,
    title: 'Atención Personalizada',
    description: 'Contamos con un equipo de expertos listos para asesorarte en cada proyecto de construcción.',
  },
  {
    icon: Truck,
    title: 'Entregas a Domicilio',
    description: 'Llevamos los materiales directo a tu obra o domicilio con rapidez y seguridad.',
  },
  {
    icon: Award,
    title: 'Más de 20 Años',
    description: 'Dos décadas de experiencia en el rubro ferretero nos respaldan como referente de confianza.',
  },
];

const team = [
  { name: 'Carlos Martínez', role: 'Fundador & Director General', initials: 'CM' },
  { name: 'Ana López', role: 'Gerente de Ventas', initials: 'AL' },
  { name: 'Roberto Sánchez', role: 'Jefe de Almacén', initials: 'RS' },
];

useHead({
  title: 'Conócenos | Ferremat',
  meta: [{ name: 'description', content: 'Conoce la historia, valores y equipo detrás de Ferretería Ferremat.' }],
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Banner -->
    <div class="relative h-64 overflow-hidden">
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-ferremat-blue/90 via-ferremat-blue/70 to-ferremat-blue/40" />
      <div class="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div class="flex items-center gap-3 mb-3">
          <div class="bg-ferremat-orange p-2 rounded-md">
            <Hammer class="w-6 h-6 text-white" stroke-width="2.5" />
          </div>
          <span class="text-ferremat-orange font-bold uppercase tracking-widest text-sm">Ferretería Ferremat</span>
        </div>
        <h1 class="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg">Conócenos</h1>
        <p class="text-white/80 mt-2 text-lg max-w-xl">
          Más de 20 años construyendo confianza y calidad en cada herramienta.
        </p>
      </div>
    </div>

    <!-- Historia -->
    <section class="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <span class="inline-block bg-ferremat-orange/10 text-ferremat-orange text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          Nuestra Historia
        </span>
        <h2 class="text-3xl font-extrabold text-gray-800 mb-4 leading-tight">
          Nacimos para ayudarte a <span class="text-ferremat-orange">construir tus sueños</span>
        </h2>
        <p class="text-gray-600 leading-relaxed mb-4">
          Ferretería Ferremat nació en el año 2003 con una misión clara: ofrecer a los profesionales de la
          construcción y a los aficionados del bricolaje los mejores materiales y herramientas a precios justos.
        </p>
        <p class="text-gray-600 leading-relaxed">
          Con más de dos décadas en el mercado, nos hemos convertido en el aliado número uno para miles de
          familias y empresas constructoras de la región, manteniendo siempre nuestra esencia: el trato cercano,
          la honestidad y la calidad ante todo.
        </p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
          <p class="text-4xl font-extrabold text-ferremat-orange">+20</p>
          <p class="text-gray-600 text-sm font-medium mt-1">Años de experiencia</p>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
          <p class="text-4xl font-extrabold text-ferremat-orange">+5K</p>
          <p class="text-gray-600 text-sm font-medium mt-1">Clientes satisfechos</p>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
          <p class="text-4xl font-extrabold text-ferremat-orange">+3K</p>
          <p class="text-gray-600 text-sm font-medium mt-1">Productos disponibles</p>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
          <p class="text-4xl font-extrabold text-ferremat-orange">4.9</p>
          <p class="text-gray-600 text-sm font-medium mt-1 flex items-center justify-center gap-1">
            <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" /> Valoración
          </p>
        </div>
      </div>
    </section>

    <!-- Valores -->
    <section class="bg-white py-16">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-12">
          <span class="inline-block bg-ferremat-blue/10 text-ferremat-blue text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Nuestros Valores
          </span>
          <h2 class="text-3xl font-extrabold text-gray-800">Lo que nos define</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="value in values"
            :key="value.title"
            class="group flex flex-col items-center text-center p-6 rounded-2xl border border-gray-100 hover:border-ferremat-orange/30 hover:shadow-md transition-all duration-300 cursor-default"
          >
            <div class="w-14 h-14 bg-ferremat-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-ferremat-orange/20 transition-colors">
              <component :is="value.icon" class="w-7 h-7 text-ferremat-orange" stroke-width="2" />
            </div>
            <h3 class="text-gray-800 font-bold text-lg mb-2">{{ value.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Equipo -->
    <section class="max-w-5xl mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <span class="inline-block bg-ferremat-orange/10 text-ferremat-orange text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          Nuestro Equipo
        </span>
        <h2 class="text-3xl font-extrabold text-gray-800">Las personas detrás de Ferremat</h2>
      </div>
      <div class="flex flex-wrap justify-center gap-8">
        <div
          v-for="member in team"
          :key="member.name"
          class="flex flex-col items-center text-center w-48"
        >
          <div class="w-20 h-20 rounded-full bg-ferremat-blue flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-md">
            {{ member.initials }}
          </div>
          <p class="text-gray-800 font-bold">{{ member.name }}</p>
          <p class="text-gray-500 text-sm mt-1">{{ member.role }}</p>
        </div>
      </div>
    </section>
  </div>
</template>
