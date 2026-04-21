<script setup lang="ts">
import ProductCard from './ProductCard.vue';

const { lang, theme } = useSettings();
const { fetchProducts } = useApi();

const products = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const data = await fetchProducts();
    products.value = data;
  } catch {
    error.value = lang.value === 'es'
      ? 'No se pudieron cargar los productos. Intenta de nuevo más tarde.'
      : 'Products could not be loaded. Please try again later.';
  } finally {
    loading.value = false;
  }
});

watch(lang, (l) => {
  if (error.value) {
    error.value = l === 'es'
      ? 'No se pudieron cargar los productos. Intenta de nuevo más tarde.'
      : 'Products could not be loaded. Please try again later.';
  }
});

const mappedProducts = computed(() =>
  products.value.map((p) => ({
    title:       p.name,
    brand:       p.category?.name ?? '',
    image:       p.imageUrl ?? 'https://placehold.co/400x300?text=Sin+Imagen',
    description: p.description ?? '',
    price:       Number(p.price) || 0,
    category:    p.category?.name ?? '',
    stock:       p.stock ?? 0,
  }))
);

const sectionTitle  = computed(() => lang.value === 'es' ? 'Todos los Productos' : 'All Products');
const productsFound = computed(() =>
  lang.value === 'es'
    ? `${mappedProducts.value.length} productos encontrados`
    : `${mappedProducts.value.length} products found`
);
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Section header — adapts text color to theme -->
    <div class="mb-6">
      <h2
        class="font-bold text-2xl transition-colors duration-300"
        :class="theme === 'dark' ? 'text-blue-300' : 'text-ferremat-blue'"
      >
        {{ sectionTitle }}
      </h2>
      <p
        class="text-sm mt-1 transition-colors duration-300"
        :class="theme === 'dark' ? 'text-slate-400' : 'text-slate-500'"
      >
        {{ productsFound }}
      </p>
    </div>

    <!-- Error -->
    <div v-if="error" class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span class="text-sm">{{ error }}</span>
    </div>

    <!-- Loading skeleton — white cards always -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="n in 8" :key="n" class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 animate-pulse">
        <div class="h-52 bg-slate-200"></div>
        <div class="p-4 space-y-3">
          <div class="h-3 bg-slate-200 rounded w-1/3"></div>
          <div class="h-4 bg-slate-200 rounded w-3/4"></div>
          <div class="h-3 bg-slate-200 rounded w-full"></div>
          <div class="h-3 bg-slate-200 rounded w-2/3"></div>
          <div class="h-6 bg-slate-200 rounded w-1/4 mt-2"></div>
        </div>
      </div>
    </div>

    <!-- Products grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard
        v-for="(product, index) in mappedProducts"
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
