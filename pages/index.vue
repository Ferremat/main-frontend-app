<script setup lang="ts">
const { fetchProducts } = useApi();
const selectedCategory = ref('');

const { data: products } = useAsyncData('products', () => fetchProducts(), { cache: false });

const categories = computed(() => {
  if (!products.value) return [];
  const seen = new Set();
  return products.value
    .filter(p => p.category && !seen.has(p.category.id) && seen.add(p.category.id))
    .map(p => p.category!);
});
useSeo({
  title: 'Ferremat - Tienda Online de Herramientas y Materiales de Construcción',
  description: 'Descubre Ferremat, tu ferretería online con las mejores herramientas, materiales de construcción y productos profesionales. Envío gratis a partir de 50€. ¡Compra ahora!',
  url: '/',
  keywords: 'ferretería online, herramientas, materiales construcción, comprar herramientas, bricolaje',
  type: 'website',
});
</script>

<template>
  <div>
    <HeroSection />
    <CategoryFilter :selected="selectedCategory" :categories="categories" @select="selectedCategory = $event" />
    <ProductList :selectedCategory="selectedCategory" />
  </div>
</template>