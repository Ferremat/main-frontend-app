<script setup lang="ts">
import { ref, computed } from 'vue';
import { Mail, Lock, Eye, EyeOff, LogIn, Hammer, ArrowRight } from 'lucide-vue-next';

const { lang, theme } = useSettings();
const { login } = useAuth();
const router = useRouter();

const form = ref({ email: '', password: '' });
const showPassword = ref(false);
const loading = ref(false);
const error = ref('');
const rememberMe = ref(false);

async function handleLogin() {
  error.value = '';
  loading.value = true;
  // Simulación de llamada a API (sustituir por llamada real)
  await new Promise((r) => setTimeout(r, 1200));
  loading.value = false;

  // Extraer nombre del email mientras no haya API real
  const namePart = form.value.email.split('@')[0];
  const name = namePart.charAt(0).toUpperCase() + namePart.slice(1);

  login({ name, email: form.value.email });
  router.push('/');
}

const t = computed(() => ({
  pageTitle:    lang.value === 'es' ? 'Bienvenido'                           : 'Welcome',
  pageSubtitle: lang.value === 'es' ? 'Accede a tu cuenta para continuar'    : 'Sign in to your account to continue',
  cardTitle:    lang.value === 'es' ? 'Iniciar sesión'                       : 'Sign in',
  cardSub:      lang.value === 'es' ? 'Ingresa tus credenciales para acceder': 'Enter your credentials to access',
  labelEmail:   lang.value === 'es' ? 'Correo electrónico'                   : 'Email address',
  phEmail:      lang.value === 'es' ? 'tu@correo.com'                        : 'you@email.com',
  labelPass:    lang.value === 'es' ? 'Contraseña'                           : 'Password',
  forgotPass:   lang.value === 'es' ? '¿Olvidaste tu contraseña?'            : 'Forgot your password?',
  remember:     lang.value === 'es' ? 'Recordar mi sesión'                   : 'Remember me',
  btnLogin:     lang.value === 'es' ? 'Iniciar sesión'                       : 'Sign in',
  btnLoading:   lang.value === 'es' ? 'Ingresando…'                          : 'Signing in…',
  divider:      lang.value === 'es' ? '¿Aún no tienes cuenta?'               : "Don't have an account?",
  btnRegister:  lang.value === 'es' ? 'Crear una cuenta'                     : 'Create an account',
  terms:        lang.value === 'es' ? 'Al ingresar aceptas nuestros'         : 'By signing in you accept our',
  termsLink:    lang.value === 'es' ? 'Términos y condiciones'               : 'Terms and conditions',
  andText:      lang.value === 'es' ? 'y nuestra'                            : 'and our',
  privacyLink:  lang.value === 'es' ? 'Política de privacidad'               : 'Privacy policy',
}));

// Reactive theme classes
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
  title: 'Iniciar Sesión - Ferremat | Accede a tu Cuenta',
  description: 'Accede a tu cuenta en Ferremat para ver tus pedidos, facturas y gestionar tu perfil. Login seguro en nuestra plataforma.',
  url: '/login',
  keywords: 'login, iniciar sesión, cuenta ferremat, acceso',
  type: 'website',
});
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="pageBg">

    <!-- Hero Banner — pt-16 compensa el header sticky -->
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

    <!-- Login Card -->
    <section class="relative z-10 max-w-md mx-auto px-6 -mt-10 pb-20">
      <div class="rounded-2xl shadow-md border p-8 transition-colors duration-300" :class="cardBg">

        <!-- Card Header -->
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-ferremat-orange/10 rounded-xl flex items-center justify-center">
            <LogIn class="w-5 h-5 text-ferremat-orange" stroke-width="2" />
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
        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label for="login-email" class="block text-sm font-semibold mb-1" :class="labelCls">{{ t.labelEmail }}</label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail class="w-4 h-4 text-gray-400" stroke-width="2" />
              </span>
              <input id="login-email" v-model="form.email" type="email" required :placeholder="t.phEmail"
                class="w-full rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
                :class="inputCls" />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="login-password" class="block text-sm font-semibold" :class="labelCls">{{ t.labelPass }}</label>
              <NuxtLink to="/recuperar-contrasena" class="text-xs text-ferremat-orange hover:underline font-semibold">{{ t.forgotPass }}</NuxtLink>
            </div>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock class="w-4 h-4 text-gray-400" stroke-width="2" />
              </span>
              <input id="login-password" v-model="form.password" :type="showPassword ? 'text' : 'password'" required placeholder="••••••••"
                class="w-full rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 focus:border-ferremat-orange transition"
                :class="inputCls" />
              <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors">
                <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4" stroke-width="2" />
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <input id="remember-me" type="checkbox" class="w-4 h-4 rounded border-gray-300 focus:ring-ferremat-orange/40 cursor-pointer accent-ferremat-orange" />
            <label for="remember-me" class="text-sm cursor-pointer select-none" :class="dividerTxt">{{ t.remember }}</label>
          </div>

          <button type="submit" :disabled="loading"
            class="w-full bg-ferremat-orange hover:bg-ferremat-orange/90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-ferremat-orange/20">
            <span v-if="loading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <LogIn v-else class="w-4 h-4" stroke-width="2.5" />
            {{ loading ? t.btnLoading : t.btnLogin }}
          </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-6">
          <span class="flex-1 h-px" :class="dividerCls" />
          <span class="text-xs font-medium" :class="dividerTxt">{{ t.divider }}</span>
          <span class="flex-1 h-px" :class="dividerCls" />
        </div>

        <!-- Register CTA -->
        <NuxtLink to="/registro"
          class="w-full flex items-center justify-center gap-2 border-2 border-ferremat-blue text-ferremat-blue font-bold py-3 rounded-xl hover:bg-ferremat-blue hover:text-white transition-all duration-200">
          {{ t.btnRegister }}
          <ArrowRight class="w-4 h-4" stroke-width="2.5" />
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
