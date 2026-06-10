<script setup lang="ts">
import { ref, computed } from 'vue';
import { Mail, Lock, Eye, EyeOff, UserPlus, Hammer, ArrowLeft } from 'lucide-vue-next';

const { lang, theme } = useSettings();
const { login } = useAuth();
const router = useRouter();

const form = ref({ email: '', password: '', confirmPassword: '', fullName: '' });
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const loading = ref(false);
const error = ref('');
const agreeTerms = ref(false);

async function handleRegister() {
  error.value = '';

  if (!agreeTerms.value) {
    error.value = lang.value === 'es' ? 'Debes aceptar los términos y condiciones' : 'You must accept the terms and conditions';
    return;
  }

  if (form.value.password !== form.value.confirmPassword) {
    error.value = lang.value === 'es' ? 'Las contraseñas no coinciden' : 'Passwords do not match';
    return;
  }

  loading.value = true;
  await new Promise((r) => setTimeout(r, 1200));
  loading.value = false;

  login({ name: form.value.fullName, email: form.value.email });
  router.push('/');
}

const t = computed(() => ({
  pageTitle:    lang.value === 'es' ? 'Crear cuenta'                          : 'Create account',
  pageSubtitle: lang.value === 'es' ? 'Regístrate para comenzar a comprar'    : 'Sign up to start shopping',
  cardTitle:    lang.value === 'es' ? 'Registro'                              : 'Sign up',
  cardSub:      lang.value === 'es' ? 'Completa el formulario para crear tu cuenta' : 'Fill the form to create your account',
  labelName:    lang.value === 'es' ? 'Nombre completo'                       : 'Full name',
  phName:       lang.value === 'es' ? 'Juan Pérez'                            : 'John Doe',
  labelEmail:   lang.value === 'es' ? 'Correo electrónico'                    : 'Email address',
  phEmail:      lang.value === 'es' ? 'tu@correo.com'                         : 'you@email.com',
  labelPass:    lang.value === 'es' ? 'Contraseña'                            : 'Password',
  labelConfirm: lang.value === 'es' ? 'Confirmar contraseña'                  : 'Confirm password',
  agreeTerms:   lang.value === 'es' ? 'Aceptar términos y condiciones'        : 'Accept terms and conditions',
  btnRegister:  lang.value === 'es' ? 'Crear cuenta'                          : 'Create account',
  btnLoading:   lang.value === 'es' ? 'Creando cuenta…'                       : 'Creating account…',
  haveAccount:  lang.value === 'es' ? '¿Ya tienes cuenta?'                    : 'Already have an account?',
  btnLogin:     lang.value === 'es' ? 'Inicia sesión aquí'                    : 'Sign in here',
  terms:        lang.value === 'es' ? 'Al registrarte aceptas nuestros'       : 'By signing up you accept our',
  termsLink:    lang.value === 'es' ? 'Términos y condiciones'                : 'Terms and conditions',
  andText:      lang.value === 'es' ? 'y nuestra'                             : 'and our',
  privacyLink:  lang.value === 'es' ? 'Política de privacidad'                : 'Privacy policy',
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

useSeo({
  title: 'Registro - Ferremat | Crea tu Cuenta',
  description: 'Crea tu cuenta en Ferremat y accede a todos nuestros productos y servicios. Registro rápido y seguro.',
  url: '/registro',
  keywords: 'registro, crear cuenta, sign up, ferremat',
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

    <!-- Register Card -->
    <section class="relative z-10 max-w-md mx-auto px-6 -mt-10 pb-20">
      <div class="rounded-2xl shadow-md border p-8 transition-colors duration-300" :class="cardBg">

        <!-- Card Header -->
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-ferremat-orange/10 rounded-xl flex items-center justify-center">
            <UserPlus class="w-5 h-5 text-ferremat-orange" stroke-width="2" />
          </div>
          <div>
            <h2 class="text-xl font-extrabold leading-tight" :class="heading">{{ t.cardTitle }}</h2>
            <p class="text-gray-400 text-xs">{{ t.cardSub }}</p>
          </div>
        </div>

        <!-- Error Banner -->
        <Transition name="fade">
          <div v-if="error" class="flex items-center gap-3 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 mb-5 text-sm font-medium">
            <span class="flex-shrink-0">⚠</span>
            {{ error }}
          </div>
        </Transition>

        <!-- Form -->
        <form @submit.prevent="handleRegister" class="space-y-5">
          <div>
            <label for="register-name" class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelName }}</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <UserPlus class="w-4 h-4 text-gray-400" stroke-width="2" />
              </span>
              <input id="register-name" v-model="form.fullName" type="text" required :placeholder="t.phName"
                class="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
                :class="inputCls" />
            </div>
          </div>

          <div>
            <label for="register-email" class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelEmail }}</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail class="w-4 h-4 text-gray-400" stroke-width="2" />
              </span>
              <input id="register-email" v-model="form.email" type="email" required :placeholder="t.phEmail"
                class="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
                :class="inputCls" />
            </div>
          </div>

          <div>
            <label for="register-password" class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelPass }}</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock class="w-4 h-4 text-gray-400" stroke-width="2" />
              </span>
              <input id="register-password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required placeholder="••••••••"
                class="w-full rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
                :class="inputCls" />
              <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors">
                <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4" stroke-width="2" />
              </button>
            </div>
          </div>

          <div>
            <label for="register-confirm" class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelConfirm }}</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock class="w-4 h-4 text-gray-400" stroke-width="2" />
              </span>
              <input id="register-confirm" v-model="form.confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" required placeholder="••••••••"
                class="w-full rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
                :class="inputCls" />
              <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors">
                <component :is="showConfirmPassword ? EyeOff : Eye" class="w-4 h-4" stroke-width="2" />
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <input id="agree-terms" v-model="agreeTerms" type="checkbox" class="w-4 h-4 rounded border-gray-300 focus:ring-ferremat-orange/40 cursor-pointer accent-ferremat-orange" />
            <label for="agree-terms" class="text-sm cursor-pointer select-none" :class="dividerTxt">{{ t.agreeTerms }}</label>
          </div>

          <button type="submit" :disabled="loading"
            class="w-full bg-ferremat-orange hover:bg-ferremat-orange/90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-ferremat-orange/20">
            <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <UserPlus v-else class="w-4 h-4" stroke-width="2.5" />
            {{ loading ? t.btnLoading : t.btnRegister }}
          </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-6">
          <span class="flex-1 h-px" :class="dividerCls" />
          <span class="text-xs font-medium" :class="dividerTxt">{{ t.haveAccount }}</span>
          <span class="flex-1 h-px" :class="dividerCls" />
        </div>

        <!-- Login CTA -->
        <NuxtLink to="/login"
          class="w-full flex items-center justify-center gap-2 border-2 border-ferremat-blue text-ferremat-blue font-bold py-3 rounded-xl hover:bg-ferremat-blue hover:text-white transition-all duration-200">
          <ArrowLeft class="w-4 h-4" stroke-width="2.5" />
          {{ t.btnLogin }}
        </NuxtLink>
      </div>

      <!-- Trust Badge -->
      <div class="mt-6 text-center">
        <p class="text-xs text-gray-400">
          {{ t.terms }}
          <a href="#" class="text-ferremat-orange hover:underline font-semibold">{{ t.termsLink }}</a>
          {{ t.andText }}
          <a href="#" class="text-ferremat-orange hover:underline font-semibold">{{ t.privacyLink }}</a>.
        </p>
      </div>
    </section>

  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease, transform 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
