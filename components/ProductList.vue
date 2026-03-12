<script setup lang="ts">
import ProductCard from './ProductCard.vue';

const products = [
  {
    title: 'Taladro Percutor Profesional',
    brand: 'DeWalt',
    image: 'https://imgs.search.brave.com/4K9bBdg3M7waAm7vZfr0Bx0F8cX8cpd0-1MUZbgs5GI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODFkLVk5OWx2VEwu/anBn',
    description: 'Taladro percutor de alto rendimiento con velocidad variable y función de martillo. Ideal para trabajos exigentes.',
    price: 1299.99,
    category: 'herramientas',
    stock: 15,
  },
  {
    title: 'Juego de Destornilladores 12 Piezas',
    brand: 'Stanley',
    image: 'https://imgs.search.brave.com/0ASGG330HnBYnvHP6gGMDW7vxtGQQlcf0AmcCXZvBgg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hZGVvLmNvbS9t/a3AvM2NlNDk5ZGIy/YWYwYjcwZTE3ZGY2/N2NkNDRmNGYyN2Iv/bWVkaWEuanBlZz93/aWR0aD02NDA',
    description: 'Set completo de destornilladores con puntas magnéticas y mangos ergonómicos.',
    price: 349.99,
    category: 'herramientas',
    stock: 30,
  },
  {
    title: 'Martillo de Carpintero',
    brand: 'Truper',
    image: 'https://imgs.search.brave.com/gjdZZHXlHpcohKWCrlN6OqzWXc8puKrWOlpmN96Ltao/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zaWFz/dW1pbmlzdHJvcy5j/b20vMTg2NzMyNy1i/aWdfZGVmYXVsdC9t/YXJ0aWxsby1jYXJw/aW50ZXJvLWJlbGxv/dGEtODAwNy5qcGc',
    description: 'Martillo profesional con mango de fibra de vidrio, cabeza de acero forjado y extractor de clavos.',
    price: 189.99,
    category: 'herramientas',
    stock: 25,
  },
  {
    title: 'Sierra Circular 7 1/4"',
    brand: 'Makita',
    image: 'https://imgs.search.brave.com/QtLcHE4RIZya6XLEGhFgKUipTxhHvn9YPtLdEtNKiqU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kYXRh/LnNhbml0aW5vLmV1/L1BST0RVQ1QtNTc4/NzQ5LzcxYjFlOWJk/YWQ0M2U3MThlYTky/ZDcwOD92PThhM2Vi/Y2Zl',
    description: 'Sierra circular eléctrica con guía láser, ideal para cortes precisos en madera y materiales de construcción.',
    price: 899.99,
    category: 'herramientas',
    stock: 10,
  },
  {
    title: 'Pintura Interior Blanco Mate 4L',
    brand: 'Bruguer',
    image: 'https://imgs.search.brave.com/6Pa3_DdFrimuyfAZ0yqoE79w0JuQpuF2Qyw_CzS7AsM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5hZGVvLmNvbS9t/ZWRpYS8zNTg2MDQx/L21lZGlhLmpwZz93/aWR0aD02NDA',
    description: 'Pintura de alta cobertura para interiores, acabado mate y resistente a la humedad.',
    price: 159.99,
    category: 'pintura',
    stock: 20,
  },
  {
    title: 'Brocha Profesional 4"',
    brand: 'Purdy',
    image: 'https://imgs.search.brave.com/54YsJTTvxEW-4DNH9ZTKpz8kC5fwR2IvCwtkAvl7xro/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YnlwLmNvbS5teC9j/ZG4vc2hvcC9wcm9k/dWN0cy9CUkU0MF9C/Uk9DSEFfTEFfUkVH/SUFfNGluY2guanBn/P3Y9MTU3Mjk4ODg3/OCZ3aWR0aD0xMDAw',
    description: 'Brocha de cerdas naturales para aplicación uniforme de pintura. Mango ergonómico antideslizante.',
    price: 89.99,
    category: 'pintura',
    stock: 40,
  },
  {
    title: 'Cable Cobre THW 12 AWG',
    brand: 'Condumex',
    image: 'https://imgs.search.brave.com/8qAKjBnWPnJ4LMhpR-srPpFgQPpe1eIf8b9txWcaIwI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZWxla3Ryb24uY29t/Lm14L21lZGlhL2Nh/dGFsb2cvcHJvZHVj/dC9jYWNoZS9kMGEz/MDI4YzlhZjZmYmVl/MTdlZDYwMTI4MTYy/ZGI1My9pL3UvaXUt/Y3Rody0xMnYuanBn',
    description: 'Cable eléctrico de cobre puro calibre 12, aislamiento THW resistente al calor y humedad. Rollo de 100m.',
    price: 549.99,
    category: 'eléctrico',
    stock: 12,
  },
  {
    title: 'Tubería PVC 1/2" x 3m',
    brand: 'Amanco',
    image: 'https://imgs.search.brave.com/yXxKUtU4S8NBuaZcyhbH1wV0P1p3hG9cDrrnTtgrRl4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8wYTQ3/MDc4NGRiLmNiYXVs/LWNkbnduZC5jb20v/YzgzZjJkOTdiNDY4/OGRjNzhkOWQ5ZDAw/ZTYyMTIyYmUvMjAw/MDAwMDIzLTg3M2Q5/ODczZGIvVFVCTy1Q/QVJBLURFU0FHVUUt/UFZDLVNBTC5qcGc_/cGg9MGE0NzA3ODRk/Yg',
    description: 'Tubo de PVC hidráulico de alta presión, para instalaciones de agua potable y sistemas de riego.',
    price: 45.00,
    category: 'plomería',
    stock: 60,
  },
];
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Section header -->
    <div class="mb-6">
      <h2 class="text-ferremat-blue font-bold text-2xl">Todos los Productos</h2>
      <p class="text-slate-500 text-sm mt-1">{{ products.length }} productos encontrados</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="(product, index) in products"
        :key="index"
        :title="product.title"
        :brand="product.brand"
        :image="product.image"
        :description="product.description"
        :price="product.price"
        :category="product.category"
        :stock="product.stock"
      />
    </div>
  </div>
</template>
