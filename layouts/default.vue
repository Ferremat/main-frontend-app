<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans">
    <AppHeader />
    <main class="flex-1">
      <slot />
    </main>
    <footer class="bg-gray-800 text-white p-8 text-center mt-auto">
      <p>&copy; {{ new Date().getFullYear() }} Ferremat. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>
