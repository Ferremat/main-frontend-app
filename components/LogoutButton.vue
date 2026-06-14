<template>
  <button
    @click="handleLogout"
    :disabled="isLoading"
    class="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    <span v-if="!isLoading">Cerrar sesión</span>
    <span v-else>Cerrando sesión...</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '~/composables/useAuth';
import { useErrorHandler } from '~/composables/useErrorHandler';

const router = useRouter();
const { logout } = useAuth();
const { showErrorNotification } = useErrorHandler();
const isLoading = ref(false);

const handleLogout = async () => {
  isLoading.value = true;

  try {
    // Llamar al logout - esto:
    // 1. Limpia el usuario del estado
    // 2. Limpia el carrito (cantidad y items)
    // 3. Elimina ambos del localStorage
    logout();

    // Redirigir al home o login
    await router.push('/');

    showErrorNotification('Sesión cerrada correctamente', 'info');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    showErrorNotification('Error al cerrar sesión', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>
