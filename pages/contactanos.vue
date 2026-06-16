<script setup lang="ts">
import { MapPin, Phone, Mail, Clock, Send, Instagram, AtSign } from 'lucide-vue-next';
import { ref, computed } from 'vue';

const { lang, theme } = useSettings();

const form = ref({ name: '', email: '', phone: '', message: '' });
const submitted = ref(false);

function handleSubmit() {
  submitted.value = true;
  form.value = { name: '', email: '', phone: '', message: '' };
  setTimeout(() => { submitted.value = false; }, 5000);
}

const contactInfo = computed(() => [
  { icon: MapPin, label: lang.value === 'es' ? 'Dirección' : 'Address', value: 'Av. Principal 1234, Zona Industrial\nCiudad, CP 10000' },
  { icon: Phone,  label: lang.value === 'es' ? 'Teléfono'  : 'Phone',   value: '+52 (55) 1234-5678' },
  { icon: Mail,   label: lang.value === 'es' ? 'Correo'    : 'Email',   value: 'contacto@ferremat.com' },
  { icon: Clock,  label: lang.value === 'es' ? 'Horario'   : 'Hours',   value: lang.value === 'es' ? 'Lun–Vie: 8:00 am – 6:00 pm\nSáb: 9:00 am – 2:00 pm' : 'Mon–Fri: 8:00 am – 6:00 pm\nSat: 9:00 am – 2:00 pm' },
]);

const t = computed(() => ({
  pageTag:      lang.value === 'es' ? 'Estamos para ayudarte'          : 'We are here to help',
  pageTitle:    lang.value === 'es' ? 'Contáctanos'                    : 'Contact Us',
  pageSubtitle: lang.value === 'es' ? '¿Tienes alguna pregunta? Escríbenos o visítanos. Con gusto te atendemos.' : 'Have a question? Write or visit us. We are happy to help.',
  formTitle:    lang.value === 'es' ? 'Envíanos un mensaje'            : 'Send us a message',
  formSub:      lang.value === 'es' ? 'Responderemos a la brevedad posible.' : 'We will get back to you as soon as possible.',
  successMsg:   lang.value === 'es' ? '¡Mensaje enviado! Te contactaremos pronto.' : 'Message sent! We will contact you soon.',
  labelName:    lang.value === 'es' ? 'Nombre completo'                : 'Full name',
  phName:       lang.value === 'es' ? 'Juan Pérez'                     : 'John Doe',
  labelPhone:   lang.value === 'es' ? 'Teléfono'                       : 'Phone',
  labelEmail:   lang.value === 'es' ? 'Correo electrónico'             : 'Email address',
  labelMsg:     lang.value === 'es' ? 'Mensaje'                        : 'Message',
  phMsg:        lang.value === 'es' ? '¿En qué podemos ayudarte?'      : 'How can we help you?',
  sendBtn:      lang.value === 'es' ? 'Enviar mensaje'                 : 'Send message',
  socialTitle:  lang.value === 'es' ? 'Síguenos en redes'              : 'Follow us',
  socialSub:    lang.value === 'es' ? 'Novedades, ofertas y consejos'  : 'News, offers and tips',
}));

// Reactive theme classes
const pageBg    = computed(() => theme.value === 'dark' ? 'bg-slate-900' : 'bg-gray-50');
const cardBg    = computed(() => theme.value === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100');
const heading   = computed(() => theme.value === 'dark' ? 'text-gray-100' : 'text-gray-800');
const subtext   = computed(() => theme.value === 'dark' ? 'text-slate-400' : 'text-gray-500');
const labelCls  = computed(() => theme.value === 'dark' ? 'text-slate-300'  : 'text-gray-700');
const inputCls  = computed(() => theme.value === 'dark'
  ? 'border-slate-600 bg-slate-700 text-gray-100 placeholder-slate-400'
  : 'border-gray-200 bg-white text-gray-700 placeholder-gray-400');

useSeo({
  title: 'Contáctanos - Ferremat | Ferretería Online',
  description: 'Ponte en contacto con Ferremat. Estamos aquí para ayudarte. Llama, envía un email o visita nuestras oficinas. Respuesta rápida garantizada.',
  url: '/contactanos',
  keywords: 'contacto, ferremat, ferretería, teléfono, email, dirección',
  type: 'website',
});
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="pageBg">

    <!-- Hero Banner -->
    <div class="relative h-64 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-ferremat-blue via-ferremat-blue/70 to-ferremat-blue/40 scale-105" />
      <div class="relative h-full flex flex-col items-center justify-center text-center px-6">
        <span class="text-ferremat-orange font-bold uppercase tracking-widest text-sm mb-3">{{ t.pageTag }}</span>
        <h1 class="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg">{{ t.pageTitle }}</h1>
        <p class="text-white/80 mt-2 text-lg max-w-xl">{{ t.pageSubtitle }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <section class="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-12">

      <!-- Contact Form -->
      <div class="rounded-2xl shadow-sm border p-8 transition-colors duration-300" :class="cardBg">
        <h2 class="text-2xl font-extrabold mb-1" :class="heading">{{ t.formTitle }}</h2>
        <p class="text-sm mb-6" :class="subtext">{{ t.formSub }}</p>

        <Transition name="fade">
          <div v-if="submitted" class="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-6 text-sm font-medium">
            <Send class="w-4 h-4 flex-shrink-0" />
            {{ t.successMsg }}
          </div>
        </Transition>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div class="grid sm:grid-cols-2 gap-5">
            <div>
              <label class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelName }}</label>
              <input v-model="form.name" type="text" required :placeholder="t.phName"
                class="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
                :class="inputCls" />
            </div>
            <div>
              <label class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelPhone }}</label>
              <input v-model="form.phone" type="tel" placeholder="+52 (55) 0000-0000"
                class="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
                :class="inputCls" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelEmail }}</label>
            <input v-model="form.email" type="email" required placeholder="juan@correo.com"
              class="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
              :class="inputCls" />
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelMsg }}</label>
            <textarea v-model="form.message" required rows="5" :placeholder="t.phMsg"
              class="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition resize-none"
              :class="inputCls" />
          </div>
          <button type="submit" class="w-full bg-ferremat-orange hover:bg-ferremat-orange/90 active:scale-95 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-ferremat-orange/20">
            <Send class="w-4 h-4" />
            {{ t.sendBtn }}
          </button>
        </form>
      </div>

      <!-- Contact Info + Map -->
      <div class="flex flex-col gap-6">
        <div class="grid sm:grid-cols-2 gap-4">
          <div v-for="info in contactInfo" :key="info.label"
            class="rounded-2xl border shadow-sm p-5 flex items-start gap-4 transition-colors duration-300" :class="cardBg">
            <div class="w-10 h-10 bg-ferremat-orange/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <component :is="info.icon" class="w-5 h-5 text-ferremat-orange" stroke-width="2" />
            </div>
            <div>
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{{ info.label }}</p>
              <p class="text-sm font-medium whitespace-pre-line" :class="theme === 'dark' ? 'text-slate-300' : 'text-gray-700'">{{ info.value }}</p>
            </div>
          </div>
        </div>

        <div class="flex-1 rounded-2xl border shadow-sm overflow-hidden min-h-48 transition-colors duration-300 bg-gradient-to-br from-ferremat-blue/10 to-ferremat-orange/10 flex items-center justify-center" :class="cardBg">
          <div class="text-center">
            <div class="w-16 h-16 bg-ferremat-blue/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin class="w-8 h-8 text-ferremat-blue" />
            </div>
            <p class="text-sm font-medium" :class="heading">{{ lang === 'es' ? 'Ubicación en el Mapa' : 'Location on Map' }}</p>
            <p class="text-xs mt-1" :class="subtext">Av. Principal 1234, Zona Industrial</p>
          </div>
        </div>

        <div class="bg-ferremat-blue rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p class="text-white font-bold text-lg">{{ t.socialTitle }}</p>
            <p class="text-white/70 text-sm">{{ t.socialSub }}</p>
          </div>
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"><Instagram class="w-5 h-5" /></a>
            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"><AtSign class="w-5 h-5" /></a>
            <a href="#" class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
              <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.038 3.284l-.569 2.491 2.509-.549c.972.547 2.035.912 3.297.913h.028c3.182 0 5.767-2.586 5.768-5.766 0-3.181-2.586-5.733-5.768-5.733zm3.954 8.273c-.214.603-1.248 1.162-1.742 1.227-.474.065-.922.298-2.911-.534-2.408-.998-3.968-3.411-4.088-3.571-.12-.161-1.074-1.428-1.074-2.724 0-1.296.657-1.928.921-2.2.261-.271.65-.408.847-.408.196 0 .393.001.54.008.155.008.364-.06.567.437.21.509.71 1.744.773 1.868.062.126.103.272.019.438-.083.167-.156.272-.313.438-.155.167-.327.373-.467.502-.158.147-.324.308-.14.623.184.314.82 1.346 1.758 2.181 1.203 1.072 2.215 1.403 2.531 1.558.318.154.503.127.691-.091.188-.217.812-.942.928-1.268.117-.327.234-.271.393-.211.159.06 1.012.477 1.186.564.172.088.289.132.331.203.042.073.042.421-.172 1.024z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
