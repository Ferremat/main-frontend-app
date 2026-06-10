<script setup lang="ts">
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
    <CategoryFilter />
    <ProductList />
  </div>
</template>
