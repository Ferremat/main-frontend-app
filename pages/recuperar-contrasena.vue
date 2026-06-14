<script setup lang="ts">
import { ref, computed } from 'vue';
import { Mail, Lock, Hammer, ArrowLeft, CheckCircle2 } from 'lucide-vue-next';

const { lang, theme } = useSettings();
const router = useRouter();

const step = ref(1); // 1: email, 2: code, 3: new password
const email = ref('');
const code = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');
const success = ref('');

async function handleSubmit() {
  error.value = '';
  success.value = '';
  loading.value = true;

  await new Promise((r) => setTimeout(r, 1200));
  loading.value = false;

  if (step.value === 1) {
    success.value = lang.value === 'es'
      ? 'Se envió un código de verificación a tu correo'
      : 'A verification code was sent to your email';
    step.value = 2;
  } else if (step.value === 2) {
    success.value = lang.value === 'es'
      ? 'Código verificado correctamente'
      : 'Code verified successfully';
    step.value = 3;
  } else if (step.value === 3) {
    if (newPassword.value !== confirmPassword.value) {
      error.value = lang.value === 'es' ? 'Las contraseñas no coinciden' : 'Passwords do not match';
      loading.value = false;
      return;
    }
    success.value = lang.value === 'es'
      ? 'Tu contraseña ha sido actualizada'
      : 'Your password has been updated';
    setTimeout(() => router.push('/login'), 2000);
  }
}

const t = computed(() => ({
  pageTitle:      lang.value === 'es' ? 'Recuperar contraseña'                    : 'Reset password',
  pageSubtitle:   lang.value === 'es' ? 'Restablece el acceso a tu cuenta'        : 'Restore access to your account',
  cardTitle:      lang.value === 'es' ? 'Recuperación de cuenta'                  : 'Account recovery',
  step1Title:     lang.value === 'es' ? 'Ingresa tu correo'                       : 'Enter your email',
  step1Sub:       lang.value === 'es' ? 'Te enviaremos un código para verificar tu identidad' : 'We will send you a code to verify your identity',
  step2Title:     lang.value === 'es' ? 'Verifica el código'                      : 'Verify the code',
  step2Sub:       lang.value === 'es' ? 'Ingresa el código que recibiste en tu correo' : 'Enter the code you received in your email',
  step3Title:     lang.value === 'es' ? 'Nueva contraseña'                        : 'New password',
  step3Sub:       lang.value === 'es' ? 'Crea una nueva contraseña para tu cuenta' : 'Create a new password for your account',
  labelEmail:     lang.value === 'es' ? 'Correo electrónico'                      : 'Email address',
  phEmail:        lang.value === 'es' ? 'tu@correo.com'                           : 'you@email.com',
  labelCode:      lang.value === 'es' ? 'Código de verificación'                  : 'Verification code',
  phCode:         lang.value === 'es' ? 'Ej: 123456'                              : 'E.g: 123456',
  labelPass:      lang.value === 'es' ? 'Nueva contraseña'                        : 'New password',
  labelConfirm:   lang.value === 'es' ? 'Confirmar contraseña'                    : 'Confirm password',
  btnContinue:    lang.value === 'es' ? 'Continuar'                               : 'Continue',
  btnLoading:     lang.value === 'es' ? 'Procesando…'                             : 'Processing…',
  btnBack:        lang.value === 'es' ? 'Volver al login'                         : 'Back to login',
}));

const pageBg   = computed(() => theme.value === 'dark' ? 'bg-slate-900' : 'bg-gray-50');
const cardBg   = computed(() => theme.value === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100');
const heading  = computed(() => theme.value === 'dark' ? 'text-gray-100' : 'text-gray-800');
const labelCls = computed(() => theme.value === 'dark' ? 'text-slate-300' : 'text-gray-700');
const inputCls = computed(() => theme.value === 'dark'
  ? 'border-slate-600 bg-slate-700 text-gray-100 placeholder-slate-400'
  : 'border-gray-200 bg-white text-gray-700 placeholder-gray-400');
const dividerCls = computed(() => theme.value === 'dark' ? 'bg-slate-600' : 'bg-gray-100');
const dividerTxt = computed(() => theme.value === 'dark' ? 'text-slate-400' : 'text-gray-400');

const currentStepTitle = computed(() => {
  if (step.value === 1) return t.value.step1Title;
  if (step.value === 2) return t.value.step2Title;
  return t.value.step3Title;
});

const currentStepSub = computed(() => {
  if (step.value === 1) return t.value.step1Sub;
  if (step.value === 2) return t.value.step2Sub;
  return t.value.step3Sub;
});

useSeo({
  title: 'Recuperar Contraseña - Ferremat',
  description: 'Recupera el acceso a tu cuenta de Ferremat siguiendo nuestro proceso seguro de verificación.',
  url: '/recuperar-contrasena',
  keywords: 'recuperar, contraseña, reset, recuperación',
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

    <!-- Recovery Card -->
    <section class="relative z-10 max-w-md mx-auto px-6 -mt-10 pb-20">
      <div class="rounded-2xl shadow-md border p-8 transition-colors duration-300" :class="cardBg">

        <!-- Progress Steps -->
        <div class="flex gap-2 mb-8">
          <div :class="['h-1 flex-1 rounded-full transition-colors', step >= 1 ? 'bg-ferremat-orange' : 'bg-gray-300']" />
          <div :class="['h-1 flex-1 rounded-full transition-colors', step >= 2 ? 'bg-ferremat-orange' : 'bg-gray-300']" />
          <div :class="['h-1 flex-1 rounded-full transition-colors', step >= 3 ? 'bg-ferremat-orange' : 'bg-gray-300']" />
        </div>

        <!-- Card Header -->
        <div class="mb-6">
          <h2 class="text-xl font-extrabold leading-tight" :class="heading">{{ currentStepTitle }}</h2>
          <p class="text-gray-400 text-sm mt-1">{{ currentStepSub }}</p>
        </div>

        <!-- Error Banner -->
        <Transition name="fade">
          <div v-if="error" class="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
            <span class="flex-shrink-0">⚠</span>
            {{ error }}
          </div>
        </Transition>

        <!-- Success Banner -->
        <Transition name="fade">
          <div v-if="success" class="flex items-center gap-3 bg-green-50 border border-green-200 text-green-600 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
            <CheckCircle2 class="w-5 h-5 flex-shrink-0" stroke-width="2" />
            {{ success }}
          </div>
        </Transition>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Step 1: Email -->
          <template v-if="step === 1">
            <div>
              <label for="recovery-email" class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelEmail }}</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail class="w-4 h-4 text-gray-400" stroke-width="2" />
                </span>
                <input id="recovery-email" v-model="email" type="email" required :placeholder="t.phEmail"
                  class="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
                  :class="inputCls" />
              </div>
            </div>
          </template>

          <!-- Step 2: Verification Code -->
          <template v-else-if="step === 2">
            <div>
              <label for="recovery-code" class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelCode }}</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock class="w-4 h-4 text-gray-400" stroke-width="2" />
                </span>
                <input id="recovery-code" v-model="code" type="text" required :placeholder="t.phCode"
                  class="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition tracking-widest"
                  :class="inputCls" />
              </div>
            </div>
          </template>

          <!-- Step 3: New Password -->
          <template v-else-if="step === 3">
            <div>
              <label for="recovery-password" class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelPass }}</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock class="w-4 h-4 text-gray-400" stroke-width="2" />
                </span>
                <input id="recovery-password" v-model="newPassword" type="password" required placeholder="••••••••"
                  class="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
                  :class="inputCls" />
              </div>
            </div>

            <div>
              <label for="recovery-confirm" class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelConfirm }}</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock class="w-4 h-4 text-gray-400" stroke-width="2" />
                </span>
                <input id="recovery-confirm" v-model="confirmPassword" type="password" required placeholder="••••••••"
                  class="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
                  :class="inputCls" />
              </div>
            </div>
          </template>

          <button type="submit" :disabled="loading"
            class="w-full bg-ferremat-orange hover:bg-ferremat-orange/90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-ferremat-orange/20">
            <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {{ loading ? t.btnLoading : t.btnContinue }}
          </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-6">
          <span class="flex-1 h-px" :class="dividerCls" />
        </div>

        <!-- Back to Login -->
        <NuxtLink to="/login"
          class="w-full flex items-center justify-center gap-2 border-2 border-ferremat-blue text-ferremat-blue font-bold py-3 rounded-xl hover:bg-ferremat-blue hover:text-white transition-all duration-200">
          <ArrowLeft class="w-4 h-4" stroke-width="2.5" />
          {{ t.btnBack }}
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
