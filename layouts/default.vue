<script setup lang="ts">
const { theme, initTheme } = useSettings();
const { initAuth } = useAuth();
const { initCart } = useCart();

onMounted(() => {
  initTheme();
  initAuth();
  initCart();
});

// Keep the <html> dark class in sync with the reactive theme state
watch(theme, (val) => {
  if (import.meta.client) {
    document.documentElement.classList.toggle('dark', val === 'dark');
  }
}, { immediate: false });
</script>

<template>
  <div
    class="min-h-screen flex flex-col font-sans transition-colors duration-300"
    :class="theme === 'dark' ? 'bg-slate-900 text-gray-100' : 'bg-white text-gray-900'"
  >
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
