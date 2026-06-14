<template>
  <transition-group name="fade" tag="div" class="fixed top-4 right-4 z-50 space-y-2">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      :class="[
        'p-4 rounded-lg shadow-lg text-white max-w-md',
        {
          'bg-red-500': notification.type === 'error',
          'bg-yellow-500': notification.type === 'warning',
          'bg-blue-500': notification.type === 'info',
        }
      ]"
    >
      <div class="flex items-start justify-between gap-2">
        <p class="flex-1">{{ notification.message }}</p>
        <button
          @click="removeNotification(notification.id)"
          class="text-white hover:text-gray-200 font-bold"
        >
          ✕
        </button>
      </div>
    </div>
  </transition-group>
</template>

<script setup lang="ts">
import { useErrorHandler } from '~/composables/useErrorHandler';

const { notifications, removeNotification } = useErrorHandler();
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
