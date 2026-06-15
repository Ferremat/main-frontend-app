<script setup lang="ts">
import { computed, ref } from 'vue';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Tag, Truck, Shield, MapPin, ChevronRight } from 'lucide-vue-next';

const { lang, theme } = useSettings();
const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
const { user } = useAuth();
const router = useRouter();
const route = useRoute();

const showCanceledNotice = computed(() => route.query.canceled === 'true');

// ── Modal de dirección de envío ──────────────────────────────────────────
const showShippingModal = ref(false);
const checkoutLoading   = ref(false);
const checkoutError     = ref('');

const shippingForm = ref({
  address:  '',
  city:     '',
  zipCode:  '',
  province: '',
  notes:    '',
});

const shippingValid = computed(() =>
  shippingForm.value.address.trim().length > 0 &&
  shippingForm.value.city.trim().length > 0 &&
  shippingForm.value.zipCode.trim().length > 0
);

// Paso 1: abrir modal de dirección
function handleCheckout() {
  if (!user.value?.id) {
    router.push('/login');
    return;
  }
  showShippingModal.value = true;
}

// Paso 2: confirmar dirección → llamar a API → redirigir a Stripe
async function confirmCheckout() {
  checkoutLoading.value = true;
  checkoutError.value   = '';

  try {
    const apiUrl = useRuntimeConfig().public.apiUrl || 'http://localhost:3001';
    const response = await fetch(`${apiUrl}orders/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId:           user.value!.id,
        payment_method:   'stripe',
        shipping_address: shippingForm.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      checkoutError.value = data.message || (lang.value === 'es' ? 'Error al procesar el pedido' : 'Error processing order');
      checkoutLoading.value = false;
      return;
    }

    // Redirigir a Stripe Checkout
    window.location.href = data.checkoutUrl;
  } catch {
    checkoutError.value   = lang.value === 'es' ? 'Error al conectar con el servidor' : 'Error connecting to server';
    checkoutLoading.value = false;
  }
}

const IVA_RATE = 0.21;

const subtotal  = computed(() => totalPrice.value);
const iva       = computed(() => subtotal.value * IVA_RATE);
const shipping  = computed(() => subtotal.value >= 50 ? 0 : 4.99);
const total     = computed(() => subtotal.value + iva.value + shipping.value);

const fmtPrice = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(n);

// Theme helpers — softer dark mode
const pageBg   = computed(() => theme.value === 'dark' ? 'bg-slate-950' : 'bg-gray-50');
const cardBg   = computed(() => theme.value === 'dark' ? 'bg-slate-800/60 border-slate-700/50' : 'bg-white border-gray-100');
const headTxt  = computed(() => theme.value === 'dark' ? 'text-gray-100' : 'text-gray-800');
const subTxt   = computed(() => theme.value === 'dark' ? 'text-gray-500' : 'text-gray-500');
const divider  = computed(() => theme.value === 'dark' ? 'border-slate-700/50' : 'border-gray-100');
const inputBg  = computed(() => theme.value === 'dark' ? 'bg-slate-700/40 border-slate-600/50 text-gray-100' : 'bg-gray-50 border-gray-200 text-gray-700');

const inputCls = computed(() => theme.value === 'dark'
  ? 'border-slate-600 bg-slate-700 text-gray-100 placeholder-slate-400'
  : 'border-gray-200 bg-white text-gray-700 placeholder-gray-400');
const labelCls = computed(() => theme.value === 'dark' ? 'text-slate-300' : 'text-gray-700');

const t = computed(() => ({
  // Shipping modal
  shippingTitle:  lang.value === 'es' ? 'Dirección de envío'            : 'Shipping address',
  shippingSub:    lang.value === 'es' ? 'Necesitamos saber dónde enviarte el pedido' : 'We need to know where to send your order',
  labelAddress:   lang.value === 'es' ? 'Dirección *'                   : 'Address *',
  labelCity:      lang.value === 'es' ? 'Ciudad *'                      : 'City *',
  labelZip:       lang.value === 'es' ? 'Código Postal *'               : 'Zip Code *',
  labelProvince:  lang.value === 'es' ? 'Provincia'                     : 'Province',
  labelNotes:     lang.value === 'es' ? 'Notas (opcional)'              : 'Notes (optional)',
  phAddress:      lang.value === 'es' ? 'Calle Mayor 12, 3º B'          : '123 Main St, Apt 3B',
  phNotes:        lang.value === 'es' ? 'Timbre roto, llamar al móvil…' : 'Leave at door…',
  btnConfirm:     lang.value === 'es' ? 'Continuar al pago'             : 'Continue to payment',
  btnCancel:      lang.value === 'es' ? 'Cancelar'                      : 'Cancel',
  redirectingStripe: lang.value === 'es' ? 'Redirigiendo a Stripe…'    : 'Redirecting to Stripe…',

  title:       lang.value === 'es' ? 'Mi carrito'           : 'My cart',
  subtitle:    lang.value === 'es' ? `${totalItems.value} producto${totalItems.value !== 1 ? 's' : ''}` : `${totalItems.value} item${totalItems.value !== 1 ? 's' : ''}`,
  empty:       lang.value === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty',
  emptySub:    lang.value === 'es' ? 'Añade productos para empezar a comprar' : 'Add products to start shopping',
  goShop:      lang.value === 'es' ? 'Ir a la tienda'       : 'Go to shop',
  back:        lang.value === 'es' ? 'Seguir comprando'      : 'Continue shopping',
  clearAll:    lang.value === 'es' ? 'Vaciar carrito'        : 'Clear cart',
  summary:     lang.value === 'es' ? 'Resumen del pedido'    : 'Order summary',
  subtotal:    lang.value === 'es' ? 'Subtotal'              : 'Subtotal',
  ivaLabel:    lang.value === 'es' ? 'IVA (21%)'             : 'Tax (21%)',
  shippingLbl: lang.value === 'es' ? 'Envío'                 : 'Shipping',
  freeShip:    lang.value === 'es' ? 'Gratis'                : 'Free',
  total:       lang.value === 'es' ? 'Total'                 : 'Total',
  checkout:    lang.value === 'es' ? 'Tramitar pedido'       : 'Proceed to checkout',
  redirecting: lang.value === 'es' ? 'Redirigiendo...'       : 'Redirecting...',
  freeFrom:    lang.value === 'es' ? 'Envío gratis a partir de 50 €' : 'Free shipping from €50',
  secure:      lang.value === 'es' ? 'Pago 100% seguro'      : '100% secure payment',
  canceled:    lang.value === 'es' ? 'Pago cancelado. Tu carrito sigue intacto.' : 'Payment canceled. Your cart is still here.',
}));

useSeo({
  title: 'Mi Carrito - Ferremat | Compra Online Segura',
  description: 'Revisa tu carrito de compra en Ferremat. Compra segura con envío gratis a partir de 50€. Pago rápido y sencillo.',
  url: '/carrito',
  keywords: 'carrito, compra online, productos, ferremat',
  type: 'website',
});
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="pageBg">

    <!-- Page Header -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-4">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-extrabold" :class="headTxt">{{ t.title }}</h1>
          <p class="mt-1 text-sm font-medium" :class="subTxt">{{ t.subtitle }}</p>
        </div>
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-sm font-semibold text-ferremat-blue hover:text-ferremat-blue/80 transition-colors"
        >
          <ArrowLeft class="w-4 h-4" stroke-width="2.5" />
          {{ t.back }}
        </NuxtLink>
      </div>
    </div>

    <!-- Canceled payment notice -->
    <div v-if="showCanceledNotice" class="max-w-6xl mx-auto px-4 sm:px-6 mb-4">
      <div class="flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-xl px-4 py-3 text-sm font-medium">
        ⚠ {{ t.canceled }}
      </div>
    </div>

    <!-- ── EMPTY STATE ──────────────────────────────────────────────────────── -->
    <div v-if="items.length === 0" class="max-w-lg mx-auto px-6 py-20 text-center">
      <div class="w-28 h-28 bg-ferremat-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <ShoppingBag class="w-14 h-14 text-ferremat-orange" stroke-width="1.5" />
      </div>
      <h2 class="text-2xl font-extrabold mb-2" :class="headTxt">{{ t.empty }}</h2>
      <p class="mb-8" :class="subTxt">{{ t.emptySub }}</p>
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 bg-ferremat-orange hover:bg-ferremat-orange/90 active:scale-95 text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 shadow-md shadow-ferremat-orange/20"
      >
        <ShoppingCart class="w-5 h-5" stroke-width="2" />
        {{ t.goShop }}
      </NuxtLink>
    </div>

    <!-- ── CART + SUMMARY ────────────────────────────────────────────────────── -->
    <div v-else class="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
      <div class="flex flex-col lg:flex-row gap-8 items-start">

        <!-- Left — Items list -->
        <div class="flex-1 min-w-0">

          <!-- Clear cart -->
          <div class="flex justify-end mb-3">
            <button
              @click="clearCart"
              class="flex items-center gap-1.5 text-xs font-semibold text-red-400 hover:text-red-500 transition-colors"
            >
              <Trash2 class="w-3.5 h-3.5" stroke-width="2" />
              {{ t.clearAll }}
            </button>
          </div>

          <!-- Items -->
          <TransitionGroup name="cart-item" tag="div" class="flex flex-col gap-4">
            <div
              v-for="item in items"
              :key="item.id"
              class="rounded-2xl border p-5 flex gap-5 items-start shadow-sm transition-colors duration-300"
              :class="cardBg"
            >
              <!-- Product image -->
              <div class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-ferremat-orange/10">
                  <ShoppingBag class="w-8 h-8 text-ferremat-orange/60" stroke-width="1.5" />
                </div>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p v-if="item.category" class="text-xs font-bold uppercase tracking-widest text-ferremat-orange mb-0.5">
                      {{ item.category }}
                    </p>
                    <h3 class="font-bold leading-tight" :class="headTxt">{{ item.name }}</h3>
                    <p class="text-sm font-semibold text-ferremat-blue mt-0.5">
                      {{ fmtPrice(item.price) }}
                      <span v-if="item.unit" class="text-xs font-normal" :class="subTxt">/ {{ item.unit }}</span>
                    </p>
                  </div>
                  <!-- Remove -->
                  <button
                    @click="removeItem(item.id)"
                    class="text-gray-300 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
                    aria-label="Eliminar"
                  >
                    <Trash2 class="w-4 h-4" stroke-width="2" />
                  </button>
                </div>

                <!-- Quantity + line total -->
                <div class="flex items-center justify-between mt-4">
                  <!-- Quantity controls -->
                  <div class="flex items-center rounded-xl border overflow-hidden" :class="inputBg">
                    <button
                      @click="updateQuantity(item.id, item.quantity - 1)"
                      class="px-3 py-2 hover:bg-ferremat-orange/10 transition-colors"
                      aria-label="Reducir cantidad"
                    >
                      <Minus class="w-3.5 h-3.5" stroke-width="2.5" />
                    </button>
                    <span class="px-4 py-2 text-sm font-bold min-w-[2.5rem] text-center">{{ item.quantity }}</span>
                    <button
                      @click="updateQuantity(item.id, item.quantity + 1)"
                      class="px-3 py-2 hover:bg-ferremat-orange/10 transition-colors"
                      aria-label="Aumentar cantidad"
                    >
                      <Plus class="w-3.5 h-3.5" stroke-width="2.5" />
                    </button>
                  </div>
                  <!-- Line total -->
                  <p class="font-extrabold text-gray-800" :class="headTxt">
                    {{ fmtPrice(item.price * item.quantity) }}
                  </p>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Right — Order summary -->
        <div class="w-full lg:w-80 xl:w-96 flex-shrink-0 sticky top-24">
          <div class="rounded-2xl border shadow-sm p-6 transition-colors duration-300" :class="cardBg">

            <h2 class="text-lg font-extrabold mb-5" :class="headTxt">{{ t.summary }}</h2>

            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span :class="subTxt">{{ t.subtotal }}</span>
                <span class="font-semibold" :class="headTxt">{{ fmtPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span :class="subTxt">{{ t.ivaLabel }}</span>
                <span class="font-semibold" :class="headTxt">{{ fmtPrice(iva) }}</span>
              </div>
              <div class="flex justify-between">
                <span :class="subTxt">{{ t.shippingLbl }}</span>
                <span class="font-semibold" :class="[headTxt, { 'text-green-500': shipping === 0 }]">
                  {{ shipping === 0 ? t.freeShip : fmtPrice(shipping) }}
                </span>
              </div>

              <div class="border-t pt-3 mt-3 flex justify-between" :class="divider">
                <span class="font-extrabold text-base" :class="headTxt">{{ t.total }}</span>
                <span class="font-extrabold text-base text-ferremat-orange">{{ fmtPrice(total) }}</span>
              </div>
            </div>

            <!-- Free shipping banner -->
            <div
              v-if="shipping > 0"
              class="mt-4 flex items-center gap-2 bg-ferremat-blue/5 border border-ferremat-blue/20 rounded-xl px-3 py-2"
            >
              <Truck class="w-4 h-4 text-ferremat-blue flex-shrink-0" stroke-width="2" />
              <p class="text-xs text-ferremat-blue font-medium">{{ t.freeFrom }}</p>
            </div>

            <!-- Checkout error -->
            <div
              v-if="checkoutError"
              class="mt-4 flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-3 py-2 text-xs font-medium"
            >
              ⚠ {{ checkoutError }}
            </div>

            <!-- CTA -->
            <button
              @click="handleCheckout"
              :disabled="checkoutLoading"
              class="mt-5 w-full bg-ferremat-orange hover:bg-ferremat-orange/90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-md shadow-ferremat-orange/20"
            >
              <span v-if="checkoutLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <ShoppingBag v-else class="w-5 h-5" stroke-width="2" />
              {{ checkoutLoading ? t.redirecting : t.checkout }}
            </button>

            <!-- Trust badge -->
            <div class="mt-4 flex items-center justify-center gap-2 text-xs" :class="subTxt">
              <Shield class="w-3.5 h-3.5 text-green-500" stroke-width="2" />
              {{ t.secure }}
            </div>
          </div>

          <!-- Promo code -->
          <div class="mt-4 rounded-2xl border shadow-sm p-4 transition-colors duration-300" :class="cardBg">
            <div class="flex items-center gap-2 mb-3">
              <Tag class="w-4 h-4 text-ferremat-orange" stroke-width="2" />
              <span class="text-sm font-bold" :class="headTxt">
                {{ lang === 'es' ? 'Código de descuento' : 'Promo code' }}
              </span>
            </div>
            <div class="flex gap-2">
              <input
                type="text"
                :placeholder="lang === 'es' ? 'Introduce tu código' : 'Enter your code'"
                class="flex-1 text-sm rounded-xl px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition"
                :class="inputBg"
              />
              <button class="px-4 py-2 bg-ferremat-blue hover:bg-ferremat-blue/90 text-white text-sm font-bold rounded-xl transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  <!-- ── Modal dirección de envío ──────────────────────────────────────── -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="showShippingModal"
        class="fixed inset-0 z-50 flex items-center justify-center px-4"
        @click.self="showShippingModal = false"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <!-- Panel -->
        <div class="relative w-full max-w-md rounded-2xl shadow-2xl border p-8 transition-colors duration-300" :class="cardBg">

          <!-- Cabecera -->
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-10 bg-ferremat-blue/10 rounded-xl flex items-center justify-center">
              <MapPin class="w-5 h-5 text-ferremat-blue" stroke-width="2" />
            </div>
            <div>
              <h3 class="text-lg font-extrabold" :class="headTxt">{{ t.shippingTitle }}</h3>
              <p class="text-xs" :class="subTxt">{{ t.shippingSub }}</p>
            </div>
          </div>

          <div class="space-y-4">
            <!-- Dirección -->
            <div>
              <label class="block text-sm font-semibold mb-1.5" :class="labelCls">{{ t.labelAddress }}</label>
              <input
                v-model="shippingForm.address"
                type="text"
                :placeholder="t.phAddress"
                class="w-full rounded-xl px-4 py-3 border text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition"
                :class="inputCls"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <!-- Ciudad -->
              <div>
                <label class="block text-sm font-semibold mb-1.5" :class="labelCls">{{ t.labelCity }}</label>
                <input
                  v-model="shippingForm.city"
                  type="text"
                  placeholder="Valencia"
                  class="w-full rounded-xl px-4 py-3 border text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition"
                  :class="inputCls"
                />
              </div>
              <!-- CP -->
              <div>
                <label class="block text-sm font-semibold mb-1.5" :class="labelCls">{{ t.labelZip }}</label>
                <input
                  v-model="shippingForm.zipCode"
                  type="text"
                  placeholder="46001"
                  class="w-full rounded-xl px-4 py-3 border text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition"
                  :class="inputCls"
                />
              </div>
            </div>

            <!-- Provincia -->
            <div>
              <label class="block text-sm font-semibold mb-1.5" :class="labelCls">{{ t.labelProvince }}</label>
              <input
                v-model="shippingForm.province"
                type="text"
                placeholder="Valencia"
                class="w-full rounded-xl px-4 py-3 border text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition"
                :class="inputCls"
              />
            </div>

            <!-- Notas -->
            <div>
              <label class="block text-sm font-semibold mb-1.5" :class="labelCls">{{ t.labelNotes }}</label>
              <textarea
                v-model="shippingForm.notes"
                :placeholder="t.phNotes"
                rows="2"
                class="w-full rounded-xl px-4 py-3 border text-sm focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition resize-none"
                :class="inputCls"
              />
            </div>

            <!-- Error -->
            <div v-if="checkoutError" class="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              ⚠ {{ checkoutError }}
            </div>

            <!-- Botones -->
            <div class="flex gap-3 pt-1">
              <button
                @click="showShippingModal = false"
                class="flex-1 py-3 rounded-xl border-2 font-bold text-sm transition-colors"
                :class="theme === 'dark' ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'"
              >
                {{ t.btnCancel }}
              </button>
              <button
                @click="confirmCheckout"
                :disabled="checkoutLoading || !shippingValid"
                class="flex-1 flex items-center justify-center gap-2 bg-ferremat-orange hover:bg-ferremat-orange/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200"
              >
                <span v-if="checkoutLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <ChevronRight v-else class="w-4 h-4" stroke-width="2.5" />
                {{ checkoutLoading ? t.redirectingStripe : t.btnConfirm }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

</div>
</template>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.cart-item-enter-from,
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>