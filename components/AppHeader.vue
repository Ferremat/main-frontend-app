<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import {
  Search, ShoppingBag, User, Settings, Hammer,
  Languages, Sun, Moon, FileText, LogOut, ChevronDown, Menu, X,
} from 'lucide-vue-next';

const { lang, theme, toggleLang, toggleTheme } = useSettings();
const { isLoggedIn, firstName, initials, logout } = useAuth();
const { totalItems } = useCart();
const router = useRouter();

const navLinks = computed(() => [
  { label: lang.value === 'es' ? 'Inicio'      : 'Home',      to: '/' },
  { label: lang.value === 'es' ? 'Conócenos'   : 'About us',  to: '/conocenos' },
  { label: lang.value === 'es' ? 'Contáctanos' : 'Contact',   to: '/contactanos' },
]);

// ── Mobile menu ─────────────────────────────────────────────────────────────
const mobileMenuOpen = ref(false);
function toggleMobileMenu() { mobileMenuOpen.value = !mobileMenuOpen.value; }
function closeMobileMenu() { mobileMenuOpen.value = false; }

// ── Search bar ──────────────────────────────────────────────────────────────
const searchOpen = ref(false);
const searchQuery = ref('');
const searchRef = ref<HTMLElement | null>(null);
function toggleSearch() { searchOpen.value = !searchOpen.value; }
function closeSearch() { searchOpen.value = false; }
function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push(`/?search=${encodeURIComponent(searchQuery.value)}`);
    closeSearch();
    searchQuery.value = '';
  }
}

// ── Settings dropdown ───────────────────────────────────────────────────────
const settingsOpen = ref(false);
const settingsRef  = ref<HTMLElement | null>(null);
function toggleSettings() { settingsOpen.value = !settingsOpen.value; }

// ── User dropdown ───────────────────────────────────────────────────────────
const userOpen = ref(false);
const userRef  = ref<HTMLElement | null>(null);
function toggleUserMenu() { userOpen.value = !userOpen.value; }

function handleLogout() {
  logout();
  userOpen.value = false;
  router.push('/login');
}

function handleOutsideClick(e: MouseEvent) {
  if (settingsRef.value && !settingsRef.value.contains(e.target as Node)) {
    settingsOpen.value = false;
  }
  if (userRef.value && !userRef.value.contains(e.target as Node)) {
    userOpen.value = false;
  }
  if (searchRef.value && !searchRef.value.contains(e.target as Node)) {
    closeSearch();
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick));
onBeforeUnmount(() => document.removeEventListener('click', handleOutsideClick));
</script>

<template>
  <header class="bg-ferremat-blue dark:bg-slate-900 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md dark:shadow-lg dark:shadow-black/20 transition-colors duration-300">

    <!-- Logo -->
    <NuxtLink to="/" class="flex items-center" @click="closeMobileMenu">
      <div class="bg-ferremat-orange text-white p-2.5 rounded-md flex items-center justify-center">
        <Hammer class="w-8 h-8" stroke-width="2.5" />
      </div>
    </NuxtLink>

    <!-- Navigation Links — Desktop only -->
    <nav class="hidden lg:flex items-center gap-8 ml-8">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.label"
        :to="link.to"
        class="text-white font-bold text-lg hover:text-white/80 transition-colors"
        active-class="text-ferremat-orange"
        exact-active-class="text-ferremat-orange"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>

    <!-- Action Icons -->
    <div class="flex items-center gap-4 lg:gap-6 text-white">

      <!-- Search -->
      <div ref="searchRef" class="relative">
        <button
          @click.stop="toggleSearch"
          class="hover:text-white/80 transition-colors"
          :aria-label="lang === 'es' ? 'Buscar' : 'Search'"
        >
          <Search class="w-8 h-8" stroke-width="2" />
        </button>

        <Transition
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-200"
          enter-from-class="opacity-0 scale-95"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="searchOpen"
            class="absolute right-0 top-full mt-3 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/40 border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors duration-300"
          >
            <form @submit.prevent="handleSearch" class="p-4 flex gap-2">
              <input
                type="text"
                v-model="searchQuery"
                :placeholder="lang === 'es' ? 'Buscar productos...' : 'Search products...'"
                class="flex-1 text-sm rounded-xl px-4 py-2.5 border border-gray-200 dark:border-slate-600 dark:bg-slate-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition text-gray-800"
                @keyup.escape="closeSearch"
              />
              <button
                type="submit"
                class="px-4 py-2.5 bg-ferremat-orange hover:bg-ferremat-orange/90 dark:bg-ferremat-orange/80 dark:hover:bg-ferremat-orange text-white rounded-xl transition-colors font-semibold"
              >
                <Search class="w-5 h-5" stroke-width="2" />
              </button>
            </form>
          </div>
        </Transition>
      </div>

      <!-- Shopping bag — navega al carrito + badge contador -->
      <NuxtLink
        to="/carrito"
        class="relative hover:text-white/80 transition-colors"
        :aria-label="lang === 'es' ? 'Mi carrito' : 'My cart'"
      >
        <ShoppingBag class="w-8 h-8" stroke-width="2" />
        <!-- Badge -->
        <Transition name="badge">
          <span
            v-if="totalItems > 0"
            class="absolute -top-2 -right-2 bg-ferremat-orange text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center leading-none shadow"
          >
            {{ totalItems > 99 ? '99+' : totalItems }}
          </span>
        </Transition>
      </NuxtLink>

      <!-- ── USER: sin sesión → enlace al login ─────────────────────────── -->
      <NuxtLink
        v-if="!isLoggedIn"
        to="/login"
        class="hover:text-white/80 transition-colors"
        :aria-label="lang === 'es' ? 'Iniciar sesión' : 'Sign in'"
      >
        <User class="w-8 h-8" stroke-width="2" />
      </NuxtLink>

      <!-- ── USER: con sesión → avatar + nombre + dropdown ─────────────── -->
      <div v-else ref="userRef" class="relative">
        <button
          id="user-menu-toggle"
          @click.stop="toggleUserMenu"
          class="flex items-center gap-2 hover:text-white/80 transition-colors"
          :aria-expanded="userOpen"
          :aria-label="lang === 'es' ? 'Menú de usuario' : 'User menu'"
        >
          <!-- Avatar circle -->
          <div class="w-8 h-8 bg-ferremat-orange rounded-full flex items-center justify-center text-white text-sm font-extrabold ring-2 ring-white/30 flex-shrink-0">
            {{ initials }}
          </div>
          <!-- First name (hidden on small screens) -->
          <span class="hidden sm:block text-sm font-bold max-w-[96px] truncate">{{ firstName }}</span>
          <ChevronDown
            class="w-4 h-4 transition-transform duration-200"
            :class="{ 'rotate-180': userOpen }"
            stroke-width="2.5"
          />
        </button>

        <!-- User dropdown -->
        <Transition name="dropdown">
          <div
            v-if="userOpen"
            class="absolute right-0 top-full mt-3 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/40 border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors duration-300"
          >
            <!-- User info header -->
            <div class="bg-ferremat-blue/5 dark:bg-slate-700/40 border-b border-gray-100 dark:border-slate-700 px-4 py-3 transition-colors duration-300">
              <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                {{ lang === 'es' ? 'Mi cuenta' : 'My account' }}
              </p>
            </div>

            <div class="p-2 flex flex-col gap-1">
              <!-- Profile Link -->
              <NuxtLink
                id="user-profile-link"
                to="/perfil"
                @click="userOpen = false"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-ferremat-blue/5 dark:hover:bg-ferremat-blue/10 transition-colors group text-left"
              >
                <div class="w-9 h-9 rounded-xl bg-ferremat-blue/10 dark:bg-ferremat-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-ferremat-blue/20 dark:group-hover:bg-ferremat-blue/30 transition-colors">
                  <User class="w-5 h-5 text-ferremat-blue dark:text-blue-400" stroke-width="2" />
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-800 dark:text-gray-100">
                    {{ lang === 'es' ? 'Perfil' : 'Profile' }}
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">
                    {{ lang === 'es' ? 'Ver tu información' : 'View your information' }}
                  </p>
                </div>
              </NuxtLink>

              <div class="my-1 border-t border-gray-100 dark:border-slate-700 transition-colors" />

              <!-- Logout -->
              <button
                id="user-logout-btn"
                @click="handleLogout"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors group text-left"
              >
                <div class="w-9 h-9 rounded-xl bg-red-100 dark:bg-red-950/40 flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 dark:group-hover:bg-red-950/60 transition-colors">
                  <LogOut class="w-5 h-5 text-red-500 dark:text-red-400" stroke-width="2" />
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-800 dark:text-gray-100">
                    {{ lang === 'es' ? 'Cerrar sesión' : 'Sign out' }}
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">
                    {{ lang === 'es' ? 'Salir de tu cuenta' : 'Sign out of your account' }}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Settings Dropdown — Hidden on mobile -->
      <div ref="settingsRef" class="relative hidden lg:block">
        <button
          id="settings-toggle"
          @click.stop="toggleSettings"
          class="hover:text-white/80 transition-colors flex items-center gap-1"
          :aria-expanded="settingsOpen"
          :aria-label="lang === 'es' ? 'Ajustes' : 'Settings'"
        >
          <Settings
            class="w-8 h-8 transition-transform duration-300"
            :class="{ 'rotate-45': settingsOpen }"
            stroke-width="2"
          />
        </button>

        <Transition name="dropdown">
          <div
            v-if="settingsOpen"
            class="absolute right-0 top-full mt-3 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/40 border border-gray-100 dark:border-slate-700 overflow-hidden transition-colors duration-300"
          >
            <div class="bg-ferremat-blue/5 dark:bg-slate-700/40 border-b border-gray-100 dark:border-slate-700 px-4 py-3 transition-colors duration-300">
              <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                {{ lang === 'es' ? 'Ajustes' : 'Settings' }}
              </p>
            </div>

            <div class="p-2 flex flex-col gap-1">
              <!-- Language Toggle -->
              <button
                id="settings-lang-toggle"
                @click="toggleLang"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-ferremat-orange/5 dark:hover:bg-ferremat-orange/10 transition-colors group text-left"
              >
                <div class="w-9 h-9 rounded-xl bg-ferremat-orange/10 dark:bg-ferremat-orange/20 flex items-center justify-center flex-shrink-0 group-hover:bg-ferremat-orange/20 dark:group-hover:bg-ferremat-orange/30 transition-colors">
                  <Languages class="w-5 h-5 text-ferremat-orange" stroke-width="2" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-gray-800 dark:text-gray-100">{{ lang === 'es' ? 'Idioma' : 'Language' }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">{{ lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish' }}</p>
                </div>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-ferremat-orange/10 dark:bg-ferremat-orange/20 text-ferremat-orange">
                  {{ lang.toUpperCase() }}
                </span>
              </button>

              <!-- Theme Toggle -->
              <button
                id="settings-theme-toggle"
                @click="toggleTheme"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-ferremat-blue/5 dark:hover:bg-ferremat-blue/10 transition-colors group text-left"
              >
                <div class="w-9 h-9 rounded-xl bg-ferremat-blue/10 dark:bg-ferremat-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-ferremat-blue/20 dark:group-hover:bg-ferremat-blue/30 transition-colors">
                  <component
                    :is="theme === 'light' ? Moon : Sun"
                    class="w-5 h-5 text-ferremat-blue dark:text-yellow-400"
                    stroke-width="2"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-gray-800 dark:text-gray-100">{{ lang === 'es' ? 'Tema' : 'Theme' }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">
                    {{ lang === 'es'
                      ? (theme === 'light' ? 'Cambiar a oscuro' : 'Cambiar a claro')
                      : (theme === 'light' ? 'Switch to dark'  : 'Switch to light') }}
                  </p>
                </div>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-ferremat-blue/10 dark:bg-ferremat-blue/20 text-ferremat-blue dark:text-blue-400">
                  {{ theme === 'light' ? (lang === 'es' ? 'Claro' : 'Light') : (lang === 'es' ? 'Oscuro' : 'Dark') }}
                </span>
              </button>

              <!-- Tutorial / Tour Button -->
              <button
                id="settings-tour-btn"
                @click="settingsOpen = false"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-colors group text-left"
              >
                <div class="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 dark:group-hover:bg-purple-950/60 transition-colors">
                  <svg class="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-gray-800 dark:text-gray-100">{{ lang === 'es' ? 'Ver Tutorial' : 'View Tutorial' }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">{{ lang === 'es' ? 'Aprende a usar Ferremat' : 'Learn how to use Ferremat' }}</p>
                </div>
              </button>

              <div class="my-1 border-t border-gray-100 dark:border-slate-700 transition-colors" />

              <!-- Policies Link -->
              <NuxtLink
                id="settings-policies-link"
                to="/politicas"
                @click="settingsOpen = false"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/40 transition-colors group text-left"
              >
                <div class="w-9 h-9 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 dark:group-hover:bg-slate-600 transition-colors">
                  <FileText class="w-5 h-5 text-gray-500 dark:text-gray-400" stroke-width="2" />
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-800 dark:text-gray-100">{{ lang === 'es' ? 'Políticas' : 'Policies' }}</p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">{{ lang === 'es' ? 'Privacidad, cookies y más' : 'Privacy, cookies & more' }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Mobile menu toggle — Visible on mobile only -->
      <button
        @click.stop="toggleMobileMenu"
        class="lg:hidden hover:text-white/80 transition-colors"
        :aria-expanded="mobileMenuOpen"
        :aria-label="lang === 'es' ? 'Menú' : 'Menu'"
      >
        <Menu v-if="!mobileMenuOpen" class="w-6 h-6" stroke-width="2" />
        <X v-else class="w-6 h-6" stroke-width="2" />
      </button>

    </div>
  </header>

  <!-- Mobile Navigation Menu -->
  <Transition
    enter-active-class="transition-all duration-200"
    leave-active-class="transition-all duration-200"
    enter-from-class="opacity-0 -translate-y-2"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <nav
      v-if="mobileMenuOpen"
      class="lg:hidden bg-ferremat-blue/95 dark:bg-slate-800/90 backdrop-blur-sm px-6 py-4 flex flex-col gap-2 border-t border-white/10 dark:border-slate-700/50 transition-colors duration-300"
    >
      <NuxtLink
        v-for="link in navLinks"
        :key="link.label"
        :to="link.to"
        @click="closeMobileMenu"
        class="text-white font-semibold py-3 hover:text-ferremat-orange transition-colors"
        active-class="text-ferremat-orange"
        exact-active-class="text-ferremat-orange"
      >
        {{ link.label }}
      </NuxtLink>

      <!-- Mobile Settings & Policies -->
      <div class="border-t border-white/10 mt-2 pt-2 flex flex-col gap-2">
        <button
          @click="() => { toggleLang(); closeMobileMenu(); }"
          class="text-white font-semibold py-3 hover:text-ferremat-orange transition-colors text-left flex items-center justify-between"
        >
          <span>{{ lang === 'es' ? 'Idioma' : 'Language' }}</span>
          <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-ferremat-orange/20 text-ferremat-orange">
            {{ lang.toUpperCase() }}
          </span>
        </button>

        <button
          @click="() => { toggleTheme(); closeMobileMenu(); }"
          class="text-white font-semibold py-3 hover:text-ferremat-orange transition-colors text-left flex items-center justify-between"
        >
          <span>{{ lang === 'es' ? 'Tema' : 'Theme' }}</span>
          <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-ferremat-blue/20 text-blue-100">
            {{ theme === 'light' ? (lang === 'es' ? 'Claro' : 'Light') : (lang === 'es' ? 'Oscuro' : 'Dark') }}
          </span>
        </button>

        <NuxtLink
          to="/politicas"
          @click="closeMobileMenu"
          class="text-white font-semibold py-3 hover:text-ferremat-orange transition-colors"
        >
          {{ lang === 'es' ? 'Políticas' : 'Policies' }}
        </NuxtLink>
      </div>
    </nav>
  </Transition>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}

.badge-enter-active,
.badge-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.badge-enter-from,
.badge-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
