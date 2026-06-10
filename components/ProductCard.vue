<script setup lang="ts">
import { ShoppingCart, Eye, LogIn } from 'lucide-vue-next';

const { lang, theme } = useSettings();
const { addItem } = useCart();
const { isLoggedIn } = useAuth();
const router = useRouter();

const props = defineProps<{
  id: string;
  image: string;
  title: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}>();

const t = computed(() => ({
  available:   lang.value === 'es' ? 'disponibles' : 'available',
  viewDetails: lang.value === 'es' ? 'Ver Detalles' : 'View Details',
  addToCart:   lang.value === 'es' ? 'Agregar'      : 'Add',
  loginRequired: lang.value === 'es' ? 'Inicia sesión para comprar' : 'Sign in to shop',
}));

function goToDetail() {
  router.push(`/productos/${props.id}`);
}

function handleAddToCart() {
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }

  addItem({
    id:       props.id,
    name:     props.title,
    price:    props.price,
    quantity: 1,
    image:    props.image,
    category: props.category,
  });
}
</script>

<template>
  <!-- Card con tema oscuro -->
  <div class="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-md dark:shadow-black/20 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-black/30 transition-shadow duration-300 flex flex-col border border-slate-100 dark:border-slate-700">

    <!-- Image with badges -->
    <div class="relative overflow-hidden">
      <img
        :src="image"
        :alt="title"
        class="w-full h-52 object-cover transition-transform duration-300 hover:scale-105"
      />
      <!-- Category badge -->
      <span class="absolute top-3 left-3 bg-ferremat-blue text-white text-xs font-semibold px-3 py-1 rounded-full">
        {{ category }}
      </span>
      <!-- Stock badge -->
      <span class="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        {{ stock }} {{ t.available }}
      </span>
    </div>

    <!-- Content -->
    <div class="flex flex-col flex-1 px-4 pt-4 pb-4 gap-2">
      <span class="text-ferremat-orange dark:text-orange-400 text-xs font-bold uppercase tracking-wide">{{ brand }}</span>
      <h3 class="text-slate-800 dark:text-gray-100 font-bold text-base leading-snug line-clamp-2">{{ title }}</h3>
      <p class="text-slate-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 flex-1">{{ description }}</p>
      <p class="text-ferremat-orange dark:text-orange-400 font-extrabold text-xl mt-1">
        ${{ price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
      </p>
      <div class="flex gap-2 mt-1">
        <button
          @click="goToDetail"
          class="flex-1 flex items-center justify-center gap-1.5 border-2 border-ferremat-blue dark:border-blue-500 text-ferremat-blue dark:text-blue-400 text-sm font-semibold py-2 rounded-lg hover:bg-ferremat-blue hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors duration-200"
        >
          <Eye class="w-4 h-4" />
          {{ t.viewDetails }}
        </button>
        <button
          @click="handleAddToCart"
          :title="!isLoggedIn ? t.loginRequired : ''"
          class="flex-1 flex items-center justify-center gap-1.5 text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-200"
          :class="isLoggedIn
            ? 'bg-ferremat-orange dark:bg-orange-600 hover:bg-orange-500 dark:hover:bg-orange-500'
            : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-75 hover:bg-gray-400 dark:hover:bg-gray-600'"
        >
          <component :is="isLoggedIn ? ShoppingCart : LogIn" class="w-4 h-4" />
          {{ isLoggedIn ? t.addToCart : t.loginRequired }}
        </button>
      </div>
    </div>
  </div>
</template>
