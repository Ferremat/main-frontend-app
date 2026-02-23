<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col font-sans">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
