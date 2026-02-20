<script setup lang="ts">
import { ref } from 'vue';
import ProductCard from './ProductCard.vue';

const products = ref(Array(8).fill({
  title: 'Taladro Profesional',
  description: 'Es un taladro para profesionales y trabajos pesados.',
  price: 50.33,
  category: 'Herramientas',
  inStock: true,
  image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=2000&auto=format&fit=crop' // Placeholder drill image
}));
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard 
        v-for="(product, index) in products" 
        :key="index"
        v-bind="product"
      />
    </div>
  </div>
</template>
