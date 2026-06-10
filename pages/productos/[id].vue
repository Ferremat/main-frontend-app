<script setup lang="ts">
import {
  ShoppingCart,
  ArrowLeft,
  Package,
  Tag,
  Layers,
  CheckCircle,
  AlertTriangle,
  Plus,
  Minus,
  Share2,
  Truck,
  Shield,
  LogIn,
} from 'lucide-vue-next';
import type { Product } from '~/composables/useApi';

const route  = useRoute();
const router = useRouter();
const { lang, theme } = useSettings();
const { addItem } = useCart();
const { isLoggedIn } = useAuth();
const { fetchProductById } = useApi();

const product  = ref<Product | null>(null);
const loading  = ref(true);
const error    = ref<string | null>(null);
const quantity = ref(1);
const added    = ref(false); // feedback tras añadir al carrito

// ── Fetch ────────────────────────────────────────────────────────────────────
onMounted(async () => {
  try {
    const id = route.params.id as string;
    if (!id) {
      throw new Error('Product ID not provided');
    }
    const fetchedProduct = await fetchProductById(id);
    if (!fetchedProduct) {
      throw new Error('Product not found');
    }
    product.value = fetchedProduct;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : '';
    error.value = lang.value === 'es'
      ? (errorMessage.includes('not found') ? 'Producto no encontrado.' : 'No se pudo cargar el producto.')
      : (errorMessage.includes('not found') ? 'Product not found.' : 'Product could not be loaded.');
  } finally {
    loading.value = false;
  }
});

// ── Computed helpers ─────────────────────────────────────────────────────────
const price      = computed(() => Number(product.value?.price) || 0);
const stock      = computed(() => product.value?.stock ?? 0);
const inStock    = computed(() => stock.value > 0);
const categoryName = computed(() => product.value?.category?.name ?? '');
const imageUrl   = computed(() =>
  product.value?.imageUrl ?? 'https://placehold.co/800x600?text=Sin+Imagen'
);

const fmtPrice = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);

const lineTotal = computed(() => fmtPrice(price.value * quantity.value));

// ── Quantity controls ────────────────────────────────────────────────────────
function dec() { if (quantity.value > 1) quantity.value--; }
function inc() { if (quantity.value < stock.value) quantity.value++; }

// ── Add to cart ──────────────────────────────────────────────────────────────
function handleAddToCart() {
  if (!isLoggedIn.value) {
    router.push('/login');
    return;
  }

  if (!product.value) return;
  addItem({
    id:       product.value.id,
    name:     product.value.name,
    price:    price.value,
    quantity: quantity.value,
    image:    product.value.imageUrl ?? undefined,
    category: categoryName.value,
  });
  added.value = true;
  setTimeout(() => (added.value = false), 2000);
}

// ── Theme helpers ────────────────────────────────────────────────────────────
const pageBg  = computed(() => theme.value === 'dark' ? 'bg-slate-900' : 'bg-gray-50');
const cardBg  = computed(() => theme.value === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100');
const headTxt = computed(() => theme.value === 'dark' ? 'text-gray-100' : 'text-gray-800');
const subTxt  = computed(() => theme.value === 'dark' ? 'text-slate-400' : 'text-gray-500');
const divider = computed(() => theme.value === 'dark' ? 'border-slate-700' : 'border-gray-200');
const badgeBg = computed(() => theme.value === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600');

// ── SEO ──────────────────────────────────────────────────────────────────────
useHead({
  title: computed(() =>
    product.value
      ? `${product.value.name} | Ferremat`
      : (lang.value === 'es' ? 'Producto | Ferremat' : 'Product | Ferremat')
  ),
  meta: [
    {
      name: 'description',
      content: computed(() => product.value?.description ?? 'Detalle de producto en Ferretería Ferremat.'),
    },
  ],
});
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="pageBg">

    <!-- ── Back button ──────────────────────────────────────────────────── -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-2">
      <button
        @click="router.back()"
        class="inline-flex items-center gap-2 text-sm font-semibold text-ferremat-blue hover:text-ferremat-blue/80 transition-colors group"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" stroke-width="2.5" />
        {{ lang === 'es' ? 'Volver' : 'Back' }}
      </button>
    </div>

    <!-- ── Loading skeleton ─────────────────────────────────────────────── -->
    <div v-if="loading" class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div class="flex flex-col lg:flex-row gap-10 animate-pulse">
        <div class="w-full lg:w-1/2 h-96 rounded-3xl" :class="theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'"></div>
        <div class="flex-1 space-y-4 pt-4">
          <div class="h-4 rounded w-1/4" :class="theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'"></div>
          <div class="h-8 rounded w-3/4" :class="theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'"></div>
          <div class="h-4 rounded w-full" :class="theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'"></div>
          <div class="h-4 rounded w-5/6" :class="theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'"></div>
          <div class="h-10 rounded w-1/3 mt-4" :class="theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'"></div>
          <div class="h-12 rounded-xl w-full mt-6" :class="theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'"></div>
        </div>
      </div>
    </div>

    <!-- ── Error state ──────────────────────────────────────────────────── -->
    <div v-else-if="error" class="max-w-lg mx-auto px-6 py-20 text-center">
      <div class="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle class="w-10 h-10 text-red-400" stroke-width="1.5" />
      </div>
      <h2 class="text-xl font-bold mb-2" :class="headTxt">{{ error }}</h2>
      <button
        @click="router.back()"
        class="mt-4 inline-flex items-center gap-2 bg-ferremat-blue hover:bg-ferremat-blue/90 text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
      >
        <ArrowLeft class="w-4 h-4" />
        {{ lang === 'es' ? 'Volver' : 'Go back' }}
      </button>
    </div>

    <!-- ── Product detail ───────────────────────────────────────────────── -->
    <div v-else-if="product" class="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-20">
      <div class="flex flex-col lg:flex-row gap-10 items-start">

        <!-- Left — Image panel -->
        <div class="w-full lg:w-1/2">
          <div class="relative rounded-3xl overflow-hidden shadow-xl border" :class="cardBg">
            <img
              :src="imageUrl"
              :alt="product.name"
              class="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
            />
            <!-- Category badge -->
            <span
              v-if="categoryName"
              class="absolute top-4 left-4 bg-ferremat-blue text-white text-xs font-bold px-4 py-1.5 rounded-full shadow"
            >
              {{ categoryName }}
            </span>
            <!-- Stock badge -->
            <span
              class="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center gap-1"
              :class="inStock ? 'bg-emerald-500 text-white' : 'bg-red-400 text-white'"
            >
              <CheckCircle v-if="inStock" class="w-3.5 h-3.5" stroke-width="2.5" />
              <AlertTriangle v-else class="w-3.5 h-3.5" stroke-width="2.5" />
              {{ inStock
                ? (lang === 'es' ? `${stock} disponibles` : `${stock} in stock`)
                : (lang === 'es' ? 'Sin stock' : 'Out of stock') }}
            </span>
          </div>
        </div>

        <!-- Right — Info panel -->
        <div class="flex-1 min-w-0">

          <!-- Brand / Category label -->
          <p class="text-ferremat-orange text-xs font-extrabold uppercase tracking-widest mb-1">
            {{ categoryName }}
          </p>

          <!-- Product name -->
          <h1 class="text-3xl font-extrabold leading-tight mb-3" :class="headTxt">
            {{ product.name }}
          </h1>

          <!-- Price -->
          <p class="text-ferremat-orange font-extrabold text-4xl mb-4">
            {{ fmtPrice(price) }}
          </p>

          <!-- Description -->
          <div class="border-t border-b py-4 mb-5" :class="divider">
            <p class="text-sm leading-relaxed" :class="subTxt">
              {{ product.description || (lang === 'es' ? 'Sin descripción disponible.' : 'No description available.') }}
            </p>
          </div>

          <!-- Meta info cards -->
          <div class="grid grid-cols-2 gap-3 mb-6">
            <!-- Stock -->
            <div class="flex items-center gap-3 rounded-xl border p-3 transition-colors duration-300" :class="cardBg">
              <div class="w-8 h-8 rounded-lg bg-ferremat-orange/10 flex items-center justify-center flex-shrink-0">
                <Package class="w-4 h-4 text-ferremat-orange" stroke-width="2" />
              </div>
              <div>
                <p class="text-xs font-semibold" :class="subTxt">{{ lang === 'es' ? 'Stock' : 'Stock' }}</p>
                <p class="text-sm font-bold" :class="headTxt">{{ stock }} uds.</p>
              </div>
            </div>
            <!-- Category -->
            <div class="flex items-center gap-3 rounded-xl border p-3 transition-colors duration-300" :class="cardBg">
              <div class="w-8 h-8 rounded-lg bg-ferremat-blue/10 flex items-center justify-center flex-shrink-0">
                <Layers class="w-4 h-4 text-ferremat-blue" stroke-width="2" />
              </div>
              <div>
                <p class="text-xs font-semibold" :class="subTxt">{{ lang === 'es' ? 'Categoría' : 'Category' }}</p>
                <p class="text-sm font-bold" :class="headTxt">{{ categoryName || '—' }}</p>
              </div>
            </div>
            <!-- Product ID -->
            <div class="flex items-center gap-3 rounded-xl border p-3 transition-colors duration-300" :class="cardBg">
              <div class="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                <Tag class="w-4 h-4 text-slate-500" stroke-width="2" />
              </div>
              <div class="overflow-hidden">
                <p class="text-xs font-semibold" :class="subTxt">{{ lang === 'es' ? 'Referencia' : 'Reference' }}</p>
                <p class="text-sm font-bold truncate" :class="headTxt">{{ product.id }}</p>
              </div>
            </div>
            <!-- Price per unit -->
            <div class="flex items-center gap-3 rounded-xl border p-3 transition-colors duration-300" :class="cardBg">
              <div class="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Shield class="w-4 h-4 text-emerald-500" stroke-width="2" />
              </div>
              <div>
                <p class="text-xs font-semibold" :class="subTxt">{{ lang === 'es' ? 'Garantía' : 'Warranty' }}</p>
                <p class="text-sm font-bold" :class="headTxt">{{ lang === 'es' ? '2 años' : '2 years' }}</p>
              </div>
            </div>
          </div>

          <!-- Quantity selector + Add to cart -->
          <div class="flex flex-col sm:flex-row gap-3">
            <!-- Quantity -->
            <div
              class="flex items-center rounded-xl border overflow-hidden w-fit"
              :class="theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-200'"
            >
              <button
                @click="dec"
                :disabled="quantity <= 1"
                class="px-4 py-3 hover:bg-ferremat-orange/10 transition-colors disabled:opacity-40"
                aria-label="Reducir cantidad"
              >
                <Minus class="w-4 h-4" :class="headTxt" stroke-width="2.5" />
              </button>
              <span class="px-5 py-3 text-base font-bold min-w-[3rem] text-center" :class="headTxt">
                {{ quantity }}
              </span>
              <button
                @click="inc"
                :disabled="quantity >= stock"
                class="px-4 py-3 hover:bg-ferremat-orange/10 transition-colors disabled:opacity-40"
                aria-label="Aumentar cantidad"
              >
                <Plus class="w-4 h-4" :class="headTxt" stroke-width="2.5" />
              </button>
            </div>

            <!-- Line total -->
            <div class="flex items-center px-4 py-3 rounded-xl border font-extrabold text-ferremat-orange" :class="cardBg">
              {{ lineTotal }}
            </div>

            <!-- Add button -->
            <button
              @click="handleAddToCart"
              :disabled="!inStock || !isLoggedIn"
              :title="!isLoggedIn ? (lang === 'es' ? 'Inicia sesión para comprar' : 'Sign in to shop') : ''"
              class="flex-1 flex items-center justify-center gap-2.5 font-bold text-white py-3 px-6 rounded-xl transition-all duration-200 shadow-md"
              :class="added
                ? 'bg-emerald-500 shadow-emerald-200'
                : isLoggedIn && inStock
                  ? 'bg-ferremat-orange hover:bg-orange-500 shadow-ferremat-orange/20 active:scale-95'
                  : !isLoggedIn
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-75 hover:bg-gray-400 dark:hover:bg-gray-600'
                    : 'bg-gray-400 cursor-not-allowed opacity-50'"
            >
              <CheckCircle v-if="added" class="w-5 h-5" stroke-width="2" />
              <component
                :is="isLoggedIn ? ShoppingCart : LogIn"
                v-else
                class="w-5 h-5"
                stroke-width="2"
              />
              {{
                added
                  ? (lang === 'es' ? '¡Añadido!' : 'Added!')
                  : !isLoggedIn
                    ? (lang === 'es' ? 'Inicia sesión para comprar' : 'Sign in to shop')
                    : (lang === 'es' ? 'Agregar al carrito' : 'Add to cart')
              }}
            </button>
          </div>

          <!-- Shipping / trust badges -->
          <div class="mt-6 flex flex-wrap gap-4">
            <div class="flex items-center gap-2 text-xs" :class="subTxt">
              <Truck class="w-4 h-4 text-ferremat-blue" stroke-width="2" />
              {{ lang === 'es' ? 'Envío gratis desde 50 €' : 'Free shipping from €50' }}
            </div>
            <div class="flex items-center gap-2 text-xs" :class="subTxt">
              <Shield class="w-4 h-4 text-emerald-500" stroke-width="2" />
              {{ lang === 'es' ? 'Pago 100% seguro' : '100% secure payment' }}
            </div>
          </div>

        </div><!-- /Right panel -->
      </div><!-- /flex row -->
    </div><!-- /product -->

  </div>
</template>

<style scoped>
/* Smooth scale on image hover is handled by Tailwind utilities */
</style>
