<script setup lang="ts">
const { theme, initTheme } = useSettings();
const { initAuth } = useAuth();
const { initCart } = useCart();

useAsyncData('layout-init', async () => {
  initAuth();
  initTheme();
  initCart();
});

onMounted(() => {
  initTheme();
  initCart();
  refreshNuxtData(['products', 'categories', 'currentUser']);
});

// Keep the <html> dark class in sync with the reactive theme state
watch(theme, (val) => {
  if (process.client) {
    document.documentElement.classList.toggle('dark', val === 'dark');
  }
}, { immediate: false });
</script>

<template>
  <div
    class="min-h-screen flex flex-col font-sans transition-colors duration-300"
    :class="theme === 'dark' ? 'bg-slate-900 text-gray-100' : 'bg-white text-gray-900'"
  >
    <!-- Notificaciones de error -->
    <ErrorNotification />

    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
