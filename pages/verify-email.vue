<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { CheckCircle2, XCircle, Hammer, ArrowRight, LogIn } from 'lucide-vue-next';

const { lang, theme } = useSettings();
const route = useRoute();

const status = ref<'loading' | 'success' | 'error'>('loading');
const errorMessage = ref('');

onMounted(async () => {
  const token = route.query.token as string | undefined;

  if (!token) {
    status.value = 'error';
    errorMessage.value = lang.value === 'es'
      ? 'Falta el token de verificación en el enlace.'
      : 'Missing verification token in the link.';
    return;
  }

  try {
    const apiUrl = useRuntimeConfig().public.apiUrl || 'http://localhost:3001';
    const response = await fetch(`${apiUrl}/verify-email?token=${encodeURIComponent(token)}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      status.value = 'error';
      errorMessage.value = errorData.message || (lang.value === 'es'
        ? 'El enlace de verificación es inválido o ha expirado.'
        : 'The verification link is invalid or has expired.');
      return;
    }

    status.value = 'success';
  } catch {
    status.value = 'error';
    errorMessage.value = lang.value === 'es'
      ? 'Error al conectar con el servidor'
      : 'Error connecting to server';
  }
});

const t = computed(() => ({
  pageTitle:    lang.value === 'es' ? 'Verificación de cuenta'                : 'Account verification',
  pageSubtitle: lang.value === 'es' ? 'Confirmando tu correo electrónico'     : 'Confirming your email',
  loadingTitle: lang.value === 'es' ? 'Verificando tu cuenta...'              : 'Verifying your account...',
  loadingSub:   lang.value === 'es' ? 'Esto solo tomará un momento.'          : 'This will only take a moment.',
  successTitle: lang.value === 'es' ? '¡Cuenta verificada!'                   : 'Account verified!',
  successSub:   lang.value === 'es' ? 'Tu correo ha sido confirmado correctamente. Ya puedes iniciar sesión.' : 'Your email has been confirmed. You can now sign in.',
  errorTitle:   lang.value === 'es' ? 'No se pudo verificar'                  : 'Verification failed',
  btnLogin:     lang.value === 'es' ? 'Ir a iniciar sesión'                   : 'Go to sign in',
}));

const pageBg  = computed(() => theme.value === 'dark' ? 'bg-slate-900' : 'bg-gray-50');
const cardBg  = computed(() => theme.value === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100');
const heading = computed(() => theme.value === 'dark' ? 'text-gray-100' : 'text-gray-800');
const textCls = computed(() => theme.value === 'dark' ? 'text-slate-300' : 'text-gray-600');

useSeo({
  title: 'Verificación de cuenta - Ferremat',
  description: 'Verifica tu correo electrónico para activar tu cuenta en Ferremat.',
  url: '/verify-email',
  keywords: 'verificación, cuenta, ferremat',
  type: 'website',
});
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="pageBg">

    <!-- Hero Banner -->
    <div class="relative h-64 overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center scale-105" />
      <div class="absolute inset-0 bg-gradient-to-r from-ferremat-blue/90 via-ferremat-blue/70 to-ferremat-blue/40" />
      <div class="relative h-full flex flex-col items-center justify-center text-center px-6 pt-4">
        <div class="flex items-center gap-3 mb-3">
          <div class="bg-ferremat-orange p-2 rounded-md">
            <Hammer class="w-6 h-6 text-white" stroke-width="2.5" />
          </div>
          <span class="text-ferremat-orange font-bold uppercase tracking-widest text-sm">Ferretería Ferremat</span>
        </div>
        <h1 class="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg">{{ t.pageTitle }}</h1>
        <p class="text-white/80 mt-2 text-lg">{{ t.pageSubtitle }}</p>
      </div>
    </div>

    <!-- Card -->
    <section class="relative z-10 max-w-md mx-auto px-6 -mt-10 pb-20">
      <div class="rounded-2xl shadow-md border p-8 text-center transition-colors duration-300" :class="cardBg">

        <!-- Loading -->
        <div v-if="status === 'loading'">
          <div class="w-12 h-12 border-4 border-ferremat-orange/20 border-t-ferremat-orange rounded-full animate-spin mx-auto mb-4" />
          <h2 class="text-xl font-extrabold mb-1" :class="heading">{{ t.loadingTitle }}</h2>
          <p class="text-sm" :class="textCls">{{ t.loadingSub }}</p>
        </div>

        <!-- Success -->
        <div v-else-if="status === 'success'">
          <div class="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 class="w-7 h-7 text-green-600" stroke-width="2" />
          </div>
          <h2 class="text-xl font-extrabold mb-1" :class="heading">{{ t.successTitle }}</h2>
          <p class="text-sm mb-6" :class="textCls">{{ t.successSub }}</p>
          <NuxtLink to="/login"
            class="w-full inline-flex items-center justify-center gap-2 bg-ferremat-orange hover:bg-ferremat-orange/90 active:scale-95 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-md shadow-ferremat-orange/20">
            <LogIn class="w-4 h-4" stroke-width="2.5" />
            {{ t.btnLogin }}
            <ArrowRight class="w-4 h-4" stroke-width="2.5" />
          </NuxtLink>
        </div>

        <!-- Error -->
        <div v-else>
          <div class="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle class="w-7 h-7 text-red-600" stroke-width="2" />
          </div>
          <h2 class="text-xl font-extrabold mb-1" :class="heading">{{ t.errorTitle }}</h2>
          <p class="text-sm mb-6" :class="textCls">{{ errorMessage }}</p>
          <NuxtLink to="/login"
            class="w-full inline-flex items-center justify-center gap-2 border-2 border-ferremat-blue text-ferremat-blue font-bold py-3 rounded-xl hover:bg-ferremat-blue hover:text-white transition-all duration-200">
            <LogIn class="w-4 h-4" stroke-width="2.5" />
            {{ t.btnLogin }}
          </NuxtLink>
        </div>

      </div>
    </section>

  </div>
</template>