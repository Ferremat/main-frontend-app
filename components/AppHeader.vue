<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Search, ShoppingBag, User, Settings, Hammer, Languages, Sun, Moon, FileText, ChevronDown } from 'lucide-vue-next';

interface NavLink {
  label: string;
  to: string;
}

const { lang, theme, toggleLang, toggleTheme } = useSettings();

const navLinks: NavLink[] = [
  { label: 'Inicio', to: '/' },
  { label: 'Conócenos', to: '/conocenos' },
  { label: 'Contáctanos', to: '/contactanos' },
];

// ── Settings dropdown ─────────────────────────────────────────────────────────
const settingsOpen = ref(false);
const settingsRef = ref<HTMLElement | null>(null);

function toggleSettings() {
  settingsOpen.value = !settingsOpen.value;
}

function handleOutsideClick(e: MouseEvent) {
  if (settingsRef.value && !settingsRef.value.contains(e.target as Node)) {
    settingsOpen.value = false;
  }
}

onMounted(() => document.addEventListener('click', handleOutsideClick));
onBeforeUnmount(() => document.removeEventListener('click', handleOutsideClick));
</script>

<template>
  <header class="bg-ferremat-blue px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
    <!-- Logo -->
    <NuxtLink to="/" class="flex items-center">
      <div class="bg-ferremat-orange text-white p-2.5 rounded-md flex items-center justify-center">
        <Hammer class="w-8 h-8" stroke-width="2.5" />
      </div>
    </NuxtLink>

    <!-- Navigation Links -->
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
    <div class="flex items-center gap-6 text-white">
      <button class="hover:text-white/80 transition-colors" :aria-label="lang === 'es' ? 'Buscar' : 'Search'">
        <Search class="w-8 h-8" stroke-width="2" />
      </button>
      <button class="hover:text-white/80 transition-colors" :aria-label="lang === 'es' ? 'Mi carrito' : 'My cart'">
        <ShoppingBag class="w-8 h-8" stroke-width="2" />
      </button>
      <NuxtLink
        to="/login"
        class="hover:text-white/80 transition-colors"
        :aria-label="lang === 'es' ? 'Iniciar sesión' : 'Sign in'"
      >
        <User class="w-8 h-8" stroke-width="2" />
      </NuxtLink>

      <!-- Settings Dropdown Trigger -->
      <div ref="settingsRef" class="relative">
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

        <!-- Dropdown Panel -->
        <Transition name="dropdown">
          <div
            v-if="settingsOpen"
            class="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <!-- Panel Header -->
            <div class="bg-ferremat-blue/5 border-b border-gray-100 px-4 py-3">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">
                {{ lang === 'es' ? 'Ajustes' : 'Settings' }}
              </p>
            </div>

            <div class="p-2 flex flex-col gap-1">

              <!-- Language Toggle -->
              <button
                id="settings-lang-toggle"
                @click="toggleLang"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-ferremat-orange/5 transition-colors group text-left"
              >
                <div class="w-9 h-9 rounded-xl bg-ferremat-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ferremat-orange/20 transition-colors">
                  <Languages class="w-5 h-5 text-ferremat-orange" stroke-width="2" />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-gray-800">
                    {{ lang === 'es' ? 'Idioma' : 'Language' }}
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ lang === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish' }}
                  </p>
                </div>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-ferremat-orange/10 text-ferremat-orange">
                  {{ lang.toUpperCase() }}
                </span>
              </button>

              <!-- Theme Toggle -->
              <button
                id="settings-theme-toggle"
                @click="toggleTheme"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-ferremat-blue/5 transition-colors group text-left"
              >
                <div class="w-9 h-9 rounded-xl bg-ferremat-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-ferremat-blue/20 transition-colors">
                  <component
                    :is="theme === 'light' ? Moon : Sun"
                    class="w-5 h-5 text-ferremat-blue"
                    stroke-width="2"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-gray-800">
                    {{ lang === 'es' ? 'Tema' : 'Theme' }}
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ lang === 'es'
                      ? (theme === 'light' ? 'Cambiar a oscuro' : 'Cambiar a claro')
                      : (theme === 'light' ? 'Switch to dark' : 'Switch to light') }}
                  </p>
                </div>
                <span class="text-xs font-bold px-2 py-0.5 rounded-full bg-ferremat-blue/10 text-ferremat-blue">
                  {{ theme === 'light' ? (lang === 'es' ? 'Claro' : 'Light') : (lang === 'es' ? 'Oscuro' : 'Dark') }}
                </span>
              </button>

              <!-- Divider -->
              <div class="my-1 border-t border-gray-100" />

              <!-- Policies Link -->
              <NuxtLink
                id="settings-policies-link"
                to="/politicas"
                @click="settingsOpen = false"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group text-left"
              >
                <div class="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-200 transition-colors">
                  <FileText class="w-5 h-5 text-gray-500" stroke-width="2" />
                </div>
                <div>
                  <p class="text-sm font-bold text-gray-800">
                    {{ lang === 'es' ? 'Políticas' : 'Policies' }}
                  </p>
                  <p class="text-xs text-gray-400">
                    {{ lang === 'es' ? 'Privacidad, cookies y más' : 'Privacy, cookies & more' }}
                  </p>
                </div>
              </NuxtLink>

            </div>
          </div>
        </Transition>
      </div>
    </div>
  </header>
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
</style>
