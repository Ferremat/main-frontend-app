<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header con elementos del tour -->
    <header class="bg-white dark:bg-gray-800 shadow">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <!-- Logo -->
        <h1 class="text-2xl font-bold text-blue-600">Ferremat</h1>

        <!-- Barra de búsqueda -->
        <div class="flex-1 mx-8">
          <input
            data-tour="search"
            type="text"
            placeholder="Buscar productos..."
            class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        <!-- Botones derechos -->
        <div class="flex items-center gap-4">
          <button
            data-tour="cart-button"
            class="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            🛒
            <span class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>

          <div data-tour="user-menu" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
              J
            </div>
            <span class="font-medium text-gray-700 dark:text-gray-300">Juan</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Sección de categorías -->
      <div
        data-tour="categories"
        class="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Categorías</h2>
        <div class="flex gap-3 overflow-x-auto">
          <button
            v-for="category in categories"
            :key="category"
            class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg whitespace-nowrap hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Productos -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="product in products"
          :key="product.id"
          data-tour="product-card"
          class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
        >
          <!-- Imagen placeholder -->
          <div class="w-full h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span class="text-4xl">🔨</span>
          </div>

          <!-- Contenido -->
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{{ product.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ product.category }}</p>

            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-blue-600">{{ product.price }}€</span>
              <button class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Componente del tour -->
    <GuidedTour />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import GuidedTour from '~/components/GuidedTour.vue';
import { useTour } from '~/composables/useTour';

const { initTour } = useTour();

const categories = [
  'Herramientas',
  'Materiales',
  'Electricidad',
  'Fontanería',
  'Pintura',
  'Seguridad',
];

const products = ref([
  { id: 1, name: 'Martillo', category: 'Herramientas', price: 12.99 },
  { id: 2, name: 'Destornillador', category: 'Herramientas', price: 8.50 },
  { id: 3, name: 'Cemento 25kg', category: 'Materiales', price: 15.00 },
  { id: 4, name: 'Tubo PVC', category: 'Fontanería', price: 5.99 },
]);

onMounted(() => {
  // Iniciar el tour automáticamente
  initTour();
});
</script>
