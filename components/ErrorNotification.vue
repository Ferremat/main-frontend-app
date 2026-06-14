<script setup lang="ts">
import { XCircle, AlertCircle, Info } from 'lucide-vue-next';

const { errors, removeNotification } = useErrorHandler();

const iconMap = {
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const bgMap = {
  error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
  warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
  info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
};

const textMap = {
  error: 'text-red-700 dark:text-red-400',
  warning: 'text-yellow-700 dark:text-yellow-400',
  info: 'text-blue-700 dark:text-blue-400',
};

const iconColorMap = {
  error: 'text-red-500 dark:text-red-400',
  warning: 'text-yellow-500 dark:text-yellow-400',
  info: 'text-blue-500 dark:text-blue-400',
};
</script>

<template>
  <div class="fixed top-4 right-4 z-50 max-w-sm space-y-2">
    <transition-group
      name="slide-fade"
      tag="div"
      class="space-y-2"
    >
      <div
        v-for="notification in errors"
        :key="notification.id"
        class="flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm"
        :class="bgMap[notification.type]"
      >
        <component
          :is="iconMap[notification.type]"
          class="w-5 h-5 flex-shrink-0"
          :class="iconColorMap[notification.type]"
          stroke-width="2"
        />
        <p class="text-sm font-medium flex-1" :class="textMap[notification.type]">
          {{ notification.message }}
        </p>
        <button
          @click="removeNotification(notification.id)"
          class="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors"
          :class="textMap[notification.type]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}
</style>
