<script setup lang="ts">
import { Hammer, Users, Star, ShieldCheck, Truck, Award } from 'lucide-vue-next';

const { lang, theme } = useSettings();

const values = computed(() =>
  lang.value === 'es'
    ? [
        { icon: ShieldCheck, title: 'Calidad Garantizada',    description: 'Todos nuestros productos pasan por estrictos controles de calidad antes de llegar a tus manos.' },
        { icon: Users,       title: 'Atención Personalizada', description: 'Contamos con un equipo de expertos listos para asesorarte en cada proyecto de construcción.' },
        { icon: Truck,       title: 'Entregas a Domicilio',   description: 'Llevamos los materiales directo a tu obra o domicilio con rapidez y seguridad.' },
        { icon: Award,       title: 'Más de 20 Años',         description: 'Dos décadas de experiencia en el rubro ferretero nos respaldan como referente de confianza.' },
      ]
    : [
        { icon: ShieldCheck, title: 'Guaranteed Quality',     description: 'All our products go through strict quality controls before reaching your hands.' },
        { icon: Users,       title: 'Personalized Service',   description: 'We have a team of experts ready to advise you on every construction project.' },
        { icon: Truck,       title: 'Home Delivery',          description: 'We deliver materials directly to your site or home quickly and safely.' },
        { icon: Award,       title: 'Over 20 Years',          description: 'Two decades of experience in the hardware industry back us as a trusted reference.' },
      ]
);

const teamComputed = computed(() => [
  { name: 'Carlos Martínez', role: lang.value === 'es' ? 'Fundador & Director General' : 'Founder & CEO',    initials: 'CM' },
  { name: 'Ana López',       role: lang.value === 'es' ? 'Gerente de Ventas'           : 'Sales Manager',    initials: 'AL' },
  { name: 'Roberto Sánchez', role: lang.value === 'es' ? 'Jefe de Almacén'             : 'Warehouse Manager',initials: 'RS' },
]);

// Clases reactivas según tema
const pageBg     = computed(() => theme.value === 'dark' ? 'bg-slate-900' : 'bg-gray-50');
const cardBg     = computed(() => theme.value === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100');
const sectionBg  = computed(() => theme.value === 'dark' ? 'bg-slate-800/60' : 'bg-white');
const heading    = computed(() => theme.value === 'dark' ? 'text-gray-100' : 'text-gray-800');
const subtext    = computed(() => theme.value === 'dark' ? 'text-slate-400' : 'text-gray-600');

useHead({
  title: computed(() => lang.value === 'es' ? 'Conócenos | Ferremat' : 'About Us | Ferremat'),
  meta: [{ name: 'description', content: computed(() =>
    lang.value === 'es'
      ? 'Conoce la historia, valores y equipo detrás de Ferretería Ferremat.'
      : 'Learn about the history, values and team behind Ferretería Ferremat.'
  )}],
});
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="pageBg">

    <!-- Hero Banner -->
    <div class="relative h-64 overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center scale-105" />
      <div class="absolute inset-0 bg-gradient-to-r from-ferremat-blue/90 via-ferremat-blue/70 to-ferremat-blue/40" />
      <div class="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div class="flex items-center gap-3 mb-3">
          <div class="bg-ferremat-orange p-2 rounded-md">
            <Hammer class="w-6 h-6 text-white" stroke-width="2.5" />
          </div>
          <span class="text-ferremat-orange font-bold uppercase tracking-widest text-sm">Ferretería Ferremat</span>
        </div>
        <h1 class="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          {{ lang === 'es' ? 'Conócenos' : 'About Us' }}
        </h1>
        <p class="text-white/80 mt-2 text-lg max-w-xl">
          {{ lang === 'es' ? 'Más de 20 años construyendo confianza y calidad en cada herramienta.' : 'Over 20 years building trust and quality in every tool.' }}
        </p>
      </div>
    </div>

    <!-- Historia -->
    <section class="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <span class="inline-block bg-ferremat-orange/10 text-ferremat-orange text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
          {{ lang === 'es' ? 'Nuestra Historia' : 'Our Story' }}
        </span>
        <h2 class="text-3xl font-extrabold mb-4 leading-tight" :class="heading">
          {{ lang === 'es' ? 'Nacimos para ayudarte a' : 'We were born to help you' }}
          <span class="text-ferremat-orange"> {{ lang === 'es' ? 'construir tus sueños' : 'build your dreams' }}</span>
        </h2>
        <p class="leading-relaxed mb-4" :class="subtext">
          {{ lang === 'es'
            ? 'Ferretería Ferremat nació en el año 2003 con una misión clara: ofrecer a los profesionales de la construcción y a los aficionados del bricolaje los mejores materiales y herramientas a precios justos.'
            : 'Ferretería Ferremat was founded in 2003 with a clear mission: to offer construction professionals and DIY enthusiasts the best materials and tools at fair prices.' }}
        </p>
        <p class="leading-relaxed" :class="subtext">
          {{ lang === 'es'
            ? 'Con más de dos décadas en el mercado, nos hemos convertido en el aliado número uno para miles de familias y empresas constructoras de la región, manteniendo siempre nuestra esencia: el trato cercano, la honestidad y la calidad ante todo.'
            : 'With more than two decades in the market, we have become the number-one partner for thousands of families and construction companies in the region, always maintaining our essence: personal service, honesty, and quality above all.' }}
        </p>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 gap-6">
        <div class="rounded-2xl shadow-sm border p-6 text-center transition-colors duration-300" :class="cardBg">
          <p class="text-4xl font-extrabold text-ferremat-orange">+20</p>
          <p class="text-sm font-medium mt-1" :class="subtext">{{ lang === 'es' ? 'Años de experiencia' : 'Years of experience' }}</p>
        </div>
        <div class="rounded-2xl shadow-sm border p-6 text-center transition-colors duration-300" :class="cardBg">
          <p class="text-4xl font-extrabold text-ferremat-orange">+5K</p>
          <p class="text-sm font-medium mt-1" :class="subtext">{{ lang === 'es' ? 'Clientes satisfechos' : 'Happy customers' }}</p>
        </div>
        <div class="rounded-2xl shadow-sm border p-6 text-center transition-colors duration-300" :class="cardBg">
          <p class="text-4xl font-extrabold text-ferremat-orange">+3K</p>
          <p class="text-sm font-medium mt-1" :class="subtext">{{ lang === 'es' ? 'Productos disponibles' : 'Products available' }}</p>
        </div>
        <div class="rounded-2xl shadow-sm border p-6 text-center transition-colors duration-300" :class="cardBg">
          <p class="text-4xl font-extrabold text-ferremat-orange">4.9</p>
          <p class="text-sm font-medium mt-1 flex items-center justify-center gap-1" :class="subtext">
            <Star class="w-4 h-4 text-yellow-400 fill-yellow-400" />
            {{ lang === 'es' ? 'Valoración' : 'Rating' }}
          </p>
        </div>
      </div>
    </section>

    <!-- Valores -->
    <section class="py-16 transition-colors duration-300" :class="sectionBg">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-12">
          <span class="inline-block bg-ferremat-blue/10 text-ferremat-blue text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            {{ lang === 'es' ? 'Nuestros Valores' : 'Our Values' }}
          </span>
          <h2 class="text-3xl font-extrabold" :class="heading">
            {{ lang === 'es' ? 'Lo que nos define' : 'What defines us' }}
          </h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="value in values"
            :key="value.title"
            class="group flex flex-col items-center text-center p-6 rounded-2xl border hover:border-ferremat-orange/30 hover:shadow-md transition-all duration-300 cursor-default"
            :class="cardBg"
          >
            <div class="w-14 h-14 bg-ferremat-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-ferremat-orange/20 transition-colors">
              <component :is="value.icon" class="w-7 h-7 text-ferremat-orange" stroke-width="2" />
            </div>
            <h3 class="font-bold text-lg mb-2" :class="heading">{{ value.title }}</h3>
            <p class="text-sm leading-relaxed" :class="subtext">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Equipo -->
    <section class="max-w-5xl mx-auto px-6 py-16">
      <div class="text-center mb-12">
        <span class="inline-block bg-ferremat-orange/10 text-ferremat-orange text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          {{ lang === 'es' ? 'Nuestro Equipo' : 'Our Team' }}
        </span>
        <h2 class="text-3xl font-extrabold" :class="heading">
          {{ lang === 'es' ? 'Las personas detrás de Ferremat' : 'The people behind Ferremat' }}
        </h2>
      </div>
      <div class="flex flex-wrap justify-center gap-8">
        <div v-for="member in teamComputed" :key="member.name" class="flex flex-col items-center text-center w-48">
          <div class="w-20 h-20 rounded-full bg-ferremat-blue flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-md">
            {{ member.initials }}
          </div>
          <p class="font-bold" :class="heading">{{ member.name }}</p>
          <p class="text-sm mt-1" :class="subtext">{{ member.role }}</p>
        </div>
      </div>
    </section>

  </div>
</template>
