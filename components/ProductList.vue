<script setup lang="ts">
import ProductCard from './ProductCard.vue';

const products = [
  { title: 'Destornillador eléctrico', image: 'https://imgs.search.brave.com/lPiWNtrX9VB5WU6f6qcARrz50HFNIGXM8df1v9ZGBAM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdDUu/ZGVwb3NpdHBob3Rv/cy5jb20vNTEwMTI4/MDYvNjYwOTMvaS80/NTAvZGVwb3NpdHBo/b3Rvc182NjA5MzA2/OTQtc3RvY2stcGhv/dG8tY3Jvc3Mtc2Ny/ZXdkcml2ZXItcmVk/LWhhbmRsZS13b29k/ZW4uanBn' },
  { title: 'Taladro Bosch', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=500' },
  { title: 'Taladro Makita', image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&q=80&w=500' },
  { title: 'Bruguer Pintura', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=500' },
  { title: 'Brocha', image: 'https://images.unsplash.com/photo-1520209268518-973151f39ad9?auto=format&fit=crop&q=80&w=500' },
  { title: 'Brocas set', image: 'https://images.unsplash.com/photo-1581147036324-c17da42ef5e0?auto=format&fit=crop&q=80&w=500' },
  { title: 'Sierra Circular', image: 'https://images.unsplash.com/photo-1586864387917-f53bc404e750?auto=format&fit=crop&q=80&w=500' },
  { title: 'Cincel', image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?auto=format&fit=crop&q=80&w=500' },
  { title: 'Cable cobre', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=500' },
  { title: 'Tubería negra', image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&q=80&w=500' },
];
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <ProductCard 
        v-for="(product, index) in products" 
        :key="index"
        :title="product.title"
        :image="product.image"
      />
    </div>
  </div>
</template>
