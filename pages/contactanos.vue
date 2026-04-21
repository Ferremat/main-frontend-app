<script setup lang="ts">
import { MapPin, Phone, Mail, Clock, Send, Instagram, AtSign } from 'lucide-vue-next';
import { ref } from 'vue';

const form = ref({ name: '', email: '', phone: '', message: '' });
const submitted = ref(false);

function handleSubmit() {
  submitted.value = true;
  form.value = { name: '', email: '', phone: '', message: '' };
  setTimeout(() => { submitted.value = false; }, 5000);
}

const contactInfo = [
  { icon: MapPin, label: 'Dirección', value: 'Av. Principal 1234, Zona Industrial\nCiudad, CP 10000' },
  { icon: Phone, label: 'Teléfono', value: '+52 (55) 1234-5678' },
  { icon: Mail, label: 'Correo', value: 'contacto@ferremat.com' },
  { icon: Clock, label: 'Horario', value: 'Lun–Vie: 8:00 am – 6:00 pm\nSáb: 9:00 am – 2:00 pm' },
];

useHead({
  title: 'Contáctanos | Ferremat',
  meta: [{ name: 'description', content: 'Ponte en contacto con Ferretería Ferremat. Estamos aquí para ayudarte.' }],
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Banner -->
    <div class="relative h-64 overflow-hidden">
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588421357574-87938a86fa28?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-ferremat-blue/90 via-ferremat-blue/70 to-ferremat-blue/40" />
      <div class="relative h-full flex flex-col items-center justify-center text-center px-6">
        <span class="text-ferremat-orange font-bold uppercase tracking-widest text-sm mb-3">Estamos para ayudarte</span>
        <h1 class="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg">Contáctanos</h1>
        <p class="text-white/80 mt-2 text-lg max-w-xl">
          ¿Tienes alguna pregunta? Escríbenos o visítanos. Con gusto te atendemos.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <section class="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">

      <!-- Contact Form -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 class="text-2xl font-extrabold text-gray-800 mb-1">Envíanos un mensaje</h2>
        <p class="text-gray-500 text-sm mb-6">Responderemos a la brevedad posible.</p>

        <!-- Success Banner -->
        <Transition name="fade">
          <div
            v-if="submitted"
            class="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-6 text-sm font-medium"
          >
            <Send class="w-4 h-4 flex-shrink-0" />
            ¡Mensaje enviado! Te contactaremos pronto.
          </div>
        </Transition>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Nombre completo</label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="Juan Pérez"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="+52 (55) 0000-0000"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico</label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="juan@correo.com"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
            />
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Mensaje</label>
            <textarea
              v-model="form.message"
              required
              rows="5"
              placeholder="¿En qué podemos ayudarte?"
              class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition resize-none"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-ferremat-orange hover:bg-ferremat-orange/90 active:scale-95 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-ferremat-orange/20"
          >
            <Send class="w-4 h-4" />
            Enviar mensaje
          </button>
        </form>
      </div>

      <!-- Contact Info + Map -->
      <div class="flex flex-col gap-6">
        <!-- Info Cards -->
        <div class="grid sm:grid-cols-2 gap-4">
          <div
            v-for="info in contactInfo"
            :key="info.label"
            class="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-start gap-4"
          >
            <div class="w-10 h-10 bg-ferremat-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <component :is="info.icon" class="w-5 h-5 text-ferremat-orange" stroke-width="2" />
            </div>
            <div>
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{{ info.label }}</p>
              <p class="text-gray-700 text-sm font-medium whitespace-pre-line">{{ info.value }}</p>
            </div>
          </div>
        </div>

        <!-- Map Placeholder -->
        <div class="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-48">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.3!2d-99.1332!3d19.4284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzQyLjMiTiA5OcKwMDcnNTkuNSJX!5e0!3m2!1ses!2smx!4v0000000000"
            width="100%"
            height="100%"
            style="min-height:200px; border:0;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            class="w-full h-full"
          />
        </div>

        <!-- Social Links -->
        <div class="bg-ferremat-blue rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p class="text-white font-bold text-lg">Síguenos en redes</p>
            <p class="text-white/70 text-sm">Novedades, ofertas y consejos</p>
          </div>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
              <Instagram class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
              <AtSign class="w-5 h-5" />
            </a>
            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
              <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.038 3.284l-.569 2.491 2.509-.549c.972.547 2.035.912 3.297.913h.028c3.182 0 5.767-2.586 5.768-5.766 0-3.181-2.586-5.733-5.768-5.733zm3.954 8.273c-.214.603-1.248 1.162-1.742 1.227-.474.065-.922.298-2.911-.534-2.408-.998-3.968-3.411-4.088-3.571-.12-.161-1.074-1.428-1.074-2.724 0-1.296.657-1.928.921-2.2.261-.271.65-.408.847-.408.196 0 .393.001.54.008.155.008.364-.06.567.437.21.509.71 1.744.773 1.868.062.126.103.272.019.438-.083.167-.156.272-.313.438-.155.167-.327.373-.467.502-.158.147-.324.308-.14.623.184.314.82 1.346 1.758 2.181 1.203 1.072 2.215 1.403 2.531 1.558.318.154.503.127.691-.091.188-.217.812-.942.928-1.268.117-.327.234-.271.393-.211.159.06 1.012.477 1.186.564.172.088.289.132.331.203.042.073.042.421-.172 1.024z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
