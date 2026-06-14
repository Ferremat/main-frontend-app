<template>
  <div v-if="isTourActive" class="fixed inset-0 z-50">
    <!-- Overlay oscuro -->
    <div class="absolute inset-0 bg-black/50" @click="skipTour" />

    <!-- Elemento destacado con spotlight -->
    <div
      v-if="currentStep?.target"
      class="absolute border-2 border-yellow-400 rounded-lg pointer-events-none shadow-lg shadow-yellow-400/50"
      :style="getHighlightStyle"
    />

    <!-- Tooltip -->
    <div
      class="absolute bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 max-w-sm z-10"
      :style="getTooltipPosition"
    >
      <!-- Indicador de progreso -->
      <div class="flex items-center justify-between mb-3">
        <span class="text-sm font-semibold text-blue-600">
          Paso {{ currentStep?.id === 'welcome' ? 1 : currentStep?.id === 'complete' ? tourSteps.length : currentStep?.id === 'search' ? 2 : currentStep?.id === 'categories' ? 3 : currentStep?.id === 'product-card' ? 4 : currentStep?.id === 'cart' ? 5 : currentStep?.id === 'user-menu' ? 6 : 1 }} de {{ tourSteps.length }}
        </span>
        <button
          @click="skipTour"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
        >
          ✕
        </button>
      </div>

      <!-- Barra de progreso -->
      <div class="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full mb-4">
        <div
          class="bg-blue-600 h-1 rounded-full transition-all duration-300"
          :style="{ width: `${((currentStep?.index ?? 0) + 1) / tourSteps.length * 100}%` }"
        />
      </div>

      <!-- Contenido -->
      <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {{ currentStep?.title }}
      </h2>
      <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
        {{ currentStep?.description }}
      </p>

      <!-- Botones -->
      <div class="flex gap-3 justify-between">
        <div class="flex gap-2">
          <button
            v-if="currentStep?.id !== 'welcome'"
            @click="previousStep"
            class="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
          >
            ← Anterior
          </button>
          <button
            v-if="currentStep?.id !== 'complete'"
            @click="nextStep"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Siguiente →
          </button>
          <button
            v-else
            @click="completeTour"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            ¡Completar!
          </button>
        </div>
        <button
          @click="skipTour"
          class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
        >
          Saltar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue';
import { useTour } from '~/composables/useTour';

const {
  currentStep,
  isTourActive,
  nextStep,
  previousStep,
  skipTour,
  completeTour,
  tourSteps,
  getCurrentStep,
  currentStep: currentStepIndex,
} = useTour();

const highlightElement = ref<HTMLElement | null>(null);

const getHighlightStyle = computed(() => {
  if (!highlightElement.value || !getCurrentStep.value?.target) {
    return {};
  }

  const rect = highlightElement.value.getBoundingClientRect();
  return {
    top: `${rect.top - 8}px`,
    left: `${rect.left - 8}px`,
    width: `${rect.width + 16}px`,
    height: `${rect.height + 16}px`,
  };
});

const getTooltipPosition = computed(() => {
  if (!highlightElement.value || !getCurrentStep.value?.target) {
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }

  const rect = highlightElement.value.getBoundingClientRect();
  const position = getCurrentStep.value?.position || 'bottom';
  const gap = 20;

  const positions: Record<string, any> = {
    top: {
      top: `${rect.top - gap - 200}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translateX(-50%)',
    },
    bottom: {
      top: `${rect.bottom + gap}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: 'translateX(-50%)',
    },
    left: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.left - gap - 400}px`,
      transform: 'translateY(-50%)',
    },
    right: {
      top: `${rect.top + rect.height / 2}px`,
      left: `${rect.right + gap}px`,
      transform: 'translateY(-50%)',
    },
  };

  return positions[position] || positions.bottom;
});

// Buscar el elemento a destacar cuando cambie el paso
watch(
  () => getCurrentStep.value?.target,
  (target) => {
    if (target) {
      setTimeout(() => {
        highlightElement.value = document.querySelector(target) as HTMLElement;
      }, 100);
    } else {
      highlightElement.value = null;
    }
  },
  { immediate: true }
);

// Re-calcular posiciones al hacer scroll o resize
onMounted(() => {
  window.addEventListener('scroll', () => {
    // Trigger re-compute
  });
  window.addEventListener('resize', () => {
    // Trigger re-compute
  });
});
</script>

<style scoped>
/* Animación de entrada */
:deep(.fixed) {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Efecto de pulsación en el elemento destacado */
@keyframes pulse-highlight {
  0%, 100% {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.2);
  }
}

:deep(.border-yellow-400) {
  animation: pulse-highlight 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
