<script setup lang="ts">
import './main.css';

// initTheme is called by the layout's useAsyncData + onMounted.
// The inline <head> script (nuxt.config.ts) already applies the dark class
// before first paint, so no FOUC here.
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
