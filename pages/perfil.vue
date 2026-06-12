<script setup lang="ts">
import { ref, computed } from 'vue';
import {
  User, Mail, Phone, MapPin, Calendar, Edit2, Save, X,
  Shield, Heart, Package, Clock, CheckCircle,
} from 'lucide-vue-next';

const { lang, theme } = useSettings();
const { user } = useAuth();
const router = useRouter();

const isEditing = ref(false);
const isSaving = ref(false);
const successMessage = ref('');

const formData = ref({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: user.value?.phone || '',
  address: user.value?.address || '',
  city: user.value?.city || '',
  zipCode: user.value?.zipCode || '',
});

const stats = computed(() => [
  { label: lang.value === 'es' ? 'Pedidos' : 'Orders', value: '12', icon: Package },
  { label: lang.value === 'es' ? 'En progreso' : 'In progress', value: '2', icon: Clock },
  { label: lang.value === 'es' ? 'Completados' : 'Completed', value: '10', icon: CheckCircle },
  { label: lang.value === 'es' ? 'Guardados' : 'Saved', value: '5', icon: Heart },
]);

const translations = computed(() => ({
  pageTitle: lang.value === 'es' ? 'Mi Perfil' : 'My Profile',
  pageSubtitle: lang.value === 'es' ? 'Administra tu información personal' : 'Manage your personal information',
  section1: lang.value === 'es' ? 'Información Personal' : 'Personal Information',
  section2: lang.value === 'es' ? 'Mi Estadísticas' : 'My Statistics',
  section3: lang.value === 'es' ? 'Opciones Adicionales' : 'Additional Options',
  labelName: lang.value === 'es' ? 'Nombre Completo' : 'Full Name',
  labelEmail: lang.value === 'es' ? 'Correo Electrónico' : 'Email Address',
  labelPhone: lang.value === 'es' ? 'Teléfono' : 'Phone',
  labelAddress: lang.value === 'es' ? 'Dirección' : 'Address',
  labelCity: lang.value === 'es' ? 'Ciudad' : 'City',
  labelZipCode: lang.value === 'es' ? 'Código Postal' : 'Zip Code',
  btnEdit: lang.value === 'es' ? 'Editar Perfil' : 'Edit Profile',
  btnSave: lang.value === 'es' ? 'Guardar Cambios' : 'Save Changes',
  btnCancel: lang.value === 'es' ? 'Cancelar' : 'Cancel',
  btnChangePassword: lang.value === 'es' ? 'Cambiar Contraseña' : 'Change Password',
  btnNotifications: lang.value === 'es' ? 'Preferencias de Notificaciones' : 'Notification Preferences',
  btnSecurity: lang.value === 'es' ? 'Configuración de Seguridad' : 'Security Settings',
  successMessage: lang.value === 'es' ? 'Perfil actualizado correctamente' : 'Profile updated successfully',
  memberSince: lang.value === 'es' ? 'Miembro desde' : 'Member since',
}));

const pageBg = computed(() => theme.value === 'dark' ? 'bg-slate-900' : 'bg-gray-50');
const cardBg = computed(() => theme.value === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100');
const labelCls = computed(() => theme.value === 'dark' ? 'text-slate-300' : 'text-gray-700');
const inputCls = computed(() => theme.value === 'dark'
  ? 'border-slate-600 bg-slate-700 text-gray-100 placeholder-slate-400'
  : 'border-gray-200 bg-white text-gray-700 placeholder-gray-400');
const textColor = computed(() => theme.value === 'dark' ? 'text-gray-100' : 'text-gray-800');
const subTextColor = computed(() => theme.value === 'dark' ? 'text-gray-400' : 'text-gray-600');

if (!user.value) {
  router.push('/login');
}

async function handleSave() {
  isSaving.value = true;
  try {
    // Simular guardado en API
    setTimeout(() => {
      successMessage.value = translations.value.successMessage;
      isEditing.value = false;
      isSaving.value = false;
      setTimeout(() => {
        successMessage.value = '';
      }, 3000);
    }, 1000);
  } catch (error) {
    isSaving.value = false;
  }
}

useSeo({
  title: 'Mi Perfil - Ferremat | Gestiona tu Cuenta',
  description: 'Accede a tu perfil en Ferremat. Visualiza y actualiza tu información personal, pedidos y preferencias.',
  url: '/perfil',
  keywords: 'perfil, cuenta, usuario, ferremat',
  type: 'website',
});
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="pageBg">

    <!-- Hero Banner -->
    <div class="relative h-48 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-ferremat-blue via-ferremat-blue/80 to-ferremat-blue/60" />
      <div class="relative h-full flex flex-col items-center justify-center text-center px-6">
        <h1 class="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg">{{ translations.pageTitle }}</h1>
        <p class="text-white/80 mt-2 text-lg">{{ translations.pageSubtitle }}</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-4xl mx-auto px-6 py-12 pb-20">

      <!-- Success Message -->
      <Transition name="fade">
        <div v-if="successMessage" class="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 font-medium">
          <CheckCircle class="w-5 h-5 flex-shrink-0" stroke-width="2" />
          {{ successMessage }}
        </div>
      </Transition>

      <!-- Profile Header Card -->
      <div class="rounded-2xl shadow-md border p-8 mb-8 transition-colors duration-300" :class="cardBg">
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <!-- Avatar -->
          <div class="w-24 h-24 bg-ferremat-orange rounded-2xl flex items-center justify-center text-white text-4xl font-extrabold flex-shrink-0 ring-4 ring-ferremat-orange/20">
            {{ user?.name?.split(' ').slice(0, 2).map((n: string) => n[0]).join('').toUpperCase() }}
          </div>

          <!-- User Info -->
          <div class="flex-1">
            <h2 class="text-3xl font-extrabold" :class="textColor">{{ user?.name }}</h2>
            <p class="text-sm" :class="subTextColor">{{ user?.email }}</p>
            <p class="text-xs mt-2" :class="subTextColor">
              {{ translations.memberSince }} 15 de Marzo de 2024
            </p>
          </div>

          <!-- Edit Button -->
          <button
            @click="isEditing = !isEditing"
            class="flex items-center gap-2 px-6 py-3 bg-ferremat-orange hover:bg-ferremat-orange/90 text-white font-bold rounded-xl transition-colors duration-200 flex-shrink-0"
          >
            <component :is="isEditing ? X : Edit2" class="w-4 h-4" stroke-width="2" />
            {{ isEditing ? translations.btnCancel : translations.btnEdit }}
          </button>
        </div>
      </div>

      <!-- Personal Information Card -->
      <div class="rounded-2xl shadow-md border p-8 mb-8 transition-colors duration-300" :class="cardBg">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-ferremat-blue/10 dark:bg-ferremat-blue/20 rounded-xl flex items-center justify-center">
            <User class="w-5 h-5 text-ferremat-blue dark:text-blue-400" stroke-width="2" />
          </div>
          <h3 class="text-xl font-extrabold" :class="textColor">{{ translations.section1 }}</h3>
        </div>

        <div v-if="!isEditing" class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="flex items-center gap-3 p-4 rounded-xl" :class="theme === 'dark' ? 'bg-slate-700/40' : 'bg-gray-50'">
              <User class="w-5 h-5 text-ferremat-blue flex-shrink-0" stroke-width="2" />
              <div>
                <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{{ translations.labelName }}</p>
                <p class="text-sm font-semibold mt-1" :class="textColor">{{ user?.name }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-4 rounded-xl" :class="theme === 'dark' ? 'bg-slate-700/40' : 'bg-gray-50'">
              <Mail class="w-5 h-5 text-ferremat-blue flex-shrink-0" stroke-width="2" />
              <div>
                <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{{ translations.labelEmail }}</p>
                <p class="text-sm font-semibold mt-1" :class="textColor">{{ user?.email }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-4 rounded-xl" :class="theme === 'dark' ? 'bg-slate-700/40' : 'bg-gray-50'">
              <Phone class="w-5 h-5 text-ferremat-blue flex-shrink-0" stroke-width="2" />
              <div>
                <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{{ translations.labelPhone }}</p>
                <p class="text-sm font-semibold mt-1" :class="textColor">{{ user?.phone || '—' }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3 p-4 rounded-xl" :class="theme === 'dark' ? 'bg-slate-700/40' : 'bg-gray-50'">
              <MapPin class="w-5 h-5 text-ferremat-blue flex-shrink-0" stroke-width="2" />
              <div>
                <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{{ translations.labelCity }}</p>
                <p class="text-sm font-semibold mt-1" :class="textColor">{{ user?.city || '—' }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-semibold mb-2" :class="labelCls">{{ translations.labelName }}</label>
              <input
                v-model="formData.name"
                type="text"
                class="w-full rounded-xl px-4 py-3 border text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition"
                :class="inputCls"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold mb-2" :class="labelCls">{{ translations.labelEmail }}</label>
              <input
                v-model="formData.email"
                type="email"
                disabled
                class="w-full rounded-xl px-4 py-3 border text-sm focus:outline-none transition opacity-60 cursor-not-allowed"
                :class="inputCls"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold mb-2" :class="labelCls">{{ translations.labelPhone }}</label>
              <input
                v-model="formData.phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                class="w-full rounded-xl px-4 py-3 border text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition"
                :class="inputCls"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold mb-2" :class="labelCls">{{ translations.labelCity }}</label>
              <input
                v-model="formData.city"
                type="text"
                placeholder="Nueva York"
                class="w-full rounded-xl px-4 py-3 border text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition"
                :class="inputCls"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-semibold mb-2" :class="labelCls">{{ translations.labelAddress }}</label>
              <input
                v-model="formData.address"
                type="text"
                placeholder="Calle Principal 123"
                class="w-full rounded-xl px-4 py-3 border text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition"
                :class="inputCls"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold mb-2" :class="labelCls">{{ translations.labelZipCode }}</label>
              <input
                v-model="formData.zipCode"
                type="text"
                placeholder="10001"
                class="w-full rounded-xl px-4 py-3 border text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition"
                :class="inputCls"
              />
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button
              @click="handleSave"
              :disabled="isSaving"
              class="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-ferremat-orange hover:bg-ferremat-orange/90 disabled:opacity-60 text-white font-bold rounded-xl transition-colors duration-200"
            >
              <span v-if="isSaving" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <Save v-else class="w-4 h-4" stroke-width="2" />
              {{ isSaving ? 'Guardando...' : translations.btnSave }}
            </button>
          </div>
        </div>
      </div>

      <!-- Statistics Card -->
      <div class="rounded-2xl shadow-md border p-8 mb-8 transition-colors duration-300" :class="cardBg">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-ferremat-blue/10 dark:bg-ferremat-blue/20 rounded-xl flex items-center justify-center">
            <Package class="w-5 h-5 text-ferremat-blue dark:text-blue-400" stroke-width="2" />
          </div>
          <h3 class="text-xl font-extrabold" :class="textColor">{{ translations.section2 }}</h3>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex flex-col items-center justify-center p-6 rounded-xl text-center"
            :class="theme === 'dark' ? 'bg-slate-700/40' : 'bg-gray-50'"
          >
            <component :is="stat.icon" class="w-6 h-6 text-ferremat-orange mb-2" stroke-width="2" />
            <p class="text-2xl font-extrabold" :class="textColor">{{ stat.value }}</p>
            <p class="text-xs font-semibold mt-1" :class="subTextColor">{{ stat.label }}</p>
          </div>
        </div>
      </div>

      <!-- Additional Options Card -->
      <div class="rounded-2xl shadow-md border p-8 transition-colors duration-300" :class="cardBg">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-ferremat-blue/10 dark:bg-ferremat-blue/20 rounded-xl flex items-center justify-center">
            <Shield class="w-5 h-5 text-ferremat-blue dark:text-blue-400" stroke-width="2" />
          </div>
          <h3 class="text-xl font-extrabold" :class="textColor">{{ translations.section3 }}</h3>
        </div>

        <div class="space-y-3">
          <button class="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors group">
            <span class="font-semibold" :class="textColor">{{ translations.btnChangePassword }}</span>
            <span class="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">→</span>
          </button>

          <button class="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors group">
            <span class="font-semibold" :class="textColor">{{ translations.btnNotifications }}</span>
            <span class="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">→</span>
          </button>

          <button class="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors group">
            <span class="font-semibold" :class="textColor">{{ translations.btnSecurity }}</span>
            <span class="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300">→</span>
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
