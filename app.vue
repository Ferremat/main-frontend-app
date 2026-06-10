<script setup lang="ts">
import './main.css';

const { initTheme, theme } = useSettings();

onMounted(() => {
  initTheme();
  if (typeof window !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme.value === 'dark');
  }
});

watch(theme, (newTheme) => {
  if (typeof window !== 'undefined') {
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }
});
</script>

<template>
  <div :class="{ dark: theme === 'dark' }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
