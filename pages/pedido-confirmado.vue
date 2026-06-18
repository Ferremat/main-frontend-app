<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { CheckCircle2, Hammer, ArrowRight, Home, MapPin, Save } from 'lucide-vue-next';

const { lang, theme } = useSettings();
const { clearCart } = useCart();
const { user } = useAuth();
const route = useRoute();
const config = useRuntimeConfig();
const baseUrl = config.public.apiUrl as string;

const orderId  = route.query.order_id  as string | undefined;
const sessionId = route.query.session_id as string | undefined;

// ── Estado ──────────────────────────────────────────────────────────────
const orderConfirmed  = ref(false);
const orderError      = ref('');
const shippingLoading = ref(false);
const shippingSuccess = ref(false);
const shippingError   = ref('');

const shippingForm = ref({
  address:  '',
  city:     '',
  zipCode:  '',
  province: '',
  notes:    '',
});

// ── Al montar: limpiar carrito + confirmar pago en backend ───────────────
onMounted(async () => {
  clearCart();

  if (!orderId) return;

  try {
    // Actualizar estado del pedido a "pagado" (status 1)
    const res = await fetch(`${baseUrl}orders/update_status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: orderId,
        status: 1,               // 1 = pagado / confirmado
        user_id: user.value?.id ?? null,
        session_id: sessionId ?? null,
      }),
    });

    if (res.ok) {
      orderConfirmed.value = true;
    } else {
      const data = await res.json().catch(() => ({}));
      orderError.value = data.message || (lang.value === 'es' ? 'No se pudo confirmar el pedido' : 'Could not confirm the order');
    }
  } catch {
    orderError.value = lang.value === 'es' ? 'Error de conexión al confirmar el pedido' : 'Connection error while confirming the order';
  }
});

// ── Guardar dirección de envío ───────────────────────────────────────────
async function saveShipping() {
  if (!orderId) return;
  shippingLoading.value = true;
  shippingError.value   = '';

  try {
    const res = await fetch(`${baseUrl}orders/update_status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: orderId,
        status: 1,                        // ← añadir esto
        shipping_address: shippingForm.value,
      }),
    });
    
    if (res.ok) {
      shippingSuccess.value = true;
    } else {
      const data = await res.json().catch(() => ({}));
      shippingError.value = data.message || (lang.value === 'es' ? 'Error al guardar la dirección' : 'Error saving the address');
    }
  } catch {
    shippingError.value = lang.value === 'es' ? 'Error de conexión' : 'Connection error';
  } finally {
    shippingLoading.value = false;
  }
}

// ── Traducciones ─────────────────────────────────────────────────────────
const t = computed(() => ({
  pageTitle:    lang.value === 'es' ? '¡Pedido confirmado!'        : 'Order confirmed!',
  pageSubtitle: lang.value === 'es' ? 'Gracias por tu compra'      : 'Thank you for your purchase',
  cardTitle:    lang.value === 'es' ? 'Pago realizado correctamente' : 'Payment completed successfully',
  cardSub:      lang.value === 'es'
    ? 'Hemos recibido tu pedido y comenzaremos a procesarlo en breve. Te enviaremos un correo con los detalles.'
    : "We've received your order and will start processing it shortly. We'll send you an email with the details.",
  orderRef:     lang.value === 'es' ? 'Referencia del pedido'      : 'Order reference',
  userId:       lang.value === 'es' ? 'Usuario'                    : 'User',
  btnOrders:    lang.value === 'es' ? 'Ver mis pedidos'            : 'View my orders',
  btnHome:      lang.value === 'es' ? 'Volver al inicio'           : 'Back to home',

  // Formulario de envío
  shippingTitle:    lang.value === 'es' ? 'Dirección de envío'       : 'Shipping address',
  shippingSub:      lang.value === 'es' ? 'Indica dónde quieres recibir tu pedido' : 'Tell us where to deliver your order',
  labelAddress:     lang.value === 'es' ? 'Dirección'                : 'Address',
  labelCity:        lang.value === 'es' ? 'Ciudad'                   : 'City',
  labelZip:         lang.value === 'es' ? 'Código Postal'            : 'Zip Code',
  labelProvince:    lang.value === 'es' ? 'Provincia'                : 'Province / State',
  labelNotes:       lang.value === 'es' ? 'Notas adicionales'        : 'Additional notes',
  phAddress:        lang.value === 'es' ? 'Calle Mayor 12, 3º B'     : '123 Main St, Apt 3B',
  phNotes:          lang.value === 'es' ? 'Timbre roto, llamar al móvil…' : 'Leave at door, ring bell…',
  btnSave:          lang.value === 'es' ? 'Guardar dirección'        : 'Save address',
  saving:           lang.value === 'es' ? 'Guardando…'               : 'Saving…',
  savedOk:          lang.value === 'es' ? '✓ Dirección guardada correctamente' : '✓ Address saved successfully',
}));

// ── Theme helpers ─────────────────────────────────────────────────────────
const pageBg  = computed(() => theme.value === 'dark' ? 'bg-slate-900'              : 'bg-gray-50');
const cardBg  = computed(() => theme.value === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100');
const heading = computed(() => theme.value === 'dark' ? 'text-gray-100'             : 'text-gray-800');
const textCls = computed(() => theme.value === 'dark' ? 'text-slate-300'            : 'text-gray-600');
const subCls  = computed(() => theme.value === 'dark' ? 'text-slate-500'            : 'text-gray-400');
const inputCls = computed(() => theme.value === 'dark'
  ? 'border-slate-600 bg-slate-700 text-gray-100 placeholder-slate-400'
  : 'border-gray-200 bg-white text-gray-700 placeholder-gray-400');
const labelCls = computed(() => theme.value === 'dark' ? 'text-slate-300' : 'text-gray-700');

useSeo({
  title: 'Pedido confirmado - Ferremat',
  description: 'Tu pedido ha sido confirmado correctamente.',
  url: '/pedido-confirmado',
  keywords: 'pedido, confirmado, ferremat',
  type: 'website',
});
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="pageBg">

    <!-- Hero Banner -->
    <div class="relative h-64 overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center scale-105" />
      <div class="absolute inset-0 bg-gradient-to-r from-ferremat-blue/90 via-ferremat-blue/70 to-ferremat-blue/40" />
      <div class="relative h-full flex flex-col items-center justify-center text-center px-6 pt-4">
        <div class="flex items-center gap-3 mb-3">
          <div class="bg-ferremat-orange p-2 rounded-md">
            <Hammer class="w-6 h-6 text-white" stroke-width="2.5" />
          </div>
          <span class="text-ferremat-orange font-bold uppercase tracking-widest text-sm">Ferretería Ferremat</span>
        </div>
        <h1 class="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg">{{ t.pageTitle }}</h1>
        <p class="text-white/80 mt-2 text-lg">{{ t.pageSubtitle }}</p>
      </div>
    </div>

    <!-- Contenido principal -->
    <section class="relative z-10 max-w-lg mx-auto px-6 -mt-10 pb-20 space-y-6">

      <!-- ── Tarjeta de confirmación ── -->
      <div class="rounded-2xl shadow-md border p-8 text-center transition-colors duration-300" :class="cardBg">

        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 class="w-8 h-8 text-green-600" stroke-width="2" />
        </div>

        <h2 class="text-xl font-extrabold mb-2" :class="heading">{{ t.cardTitle }}</h2>
        <p class="text-sm mb-6" :class="textCls">{{ t.cardSub }}</p>

        <!-- Error al confirmar (no crítico, el webhook de Stripe también lo hace) -->
        <div v-if="orderError" class="mb-4 text-xs text-yellow-600 bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2">
          ⚠ {{ orderError }}
        </div>

        <!-- Referencia del pedido -->
        <div v-if="orderId" class="mb-3 rounded-xl px-4 py-3 text-sm" :class="theme === 'dark' ? 'bg-slate-700/40' : 'bg-gray-50'">
          <p class="font-semibold" :class="subCls">{{ t.orderRef }}</p>
          <p class="font-mono text-xs mt-1 break-all" :class="textCls">{{ orderId }}</p>
        </div>

        <!-- ID del usuario -->
        <div v-if="user?.id" class="mb-6 rounded-xl px-4 py-3 text-sm" :class="theme === 'dark' ? 'bg-slate-700/40' : 'bg-gray-50'">
          <p class="font-semibold" :class="subCls">{{ t.userId }}</p>
          <p class="font-mono text-xs mt-1 break-all" :class="textCls">{{ user.id }}</p>
        </div>

        <div class="flex flex-col gap-3">
          <NuxtLink to="/perfil"
            class="w-full inline-flex items-center justify-center gap-2 bg-ferremat-orange hover:bg-ferremat-orange/90 active:scale-95 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-md shadow-ferremat-orange/20">
            {{ t.btnOrders }}
            <ArrowRight class="w-4 h-4" stroke-width="2.5" />
          </NuxtLink>

          <NuxtLink to="/"
            class="w-full inline-flex items-center justify-center gap-2 border-2 border-ferremat-blue text-ferremat-blue font-bold py-3 rounded-xl hover:bg-ferremat-blue hover:text-white transition-all duration-200">
            <Home class="w-4 h-4" stroke-width="2.5" />
            {{ t.btnHome }}
          </NuxtLink>
        </div>
      </div>

      <!-- ── Formulario de dirección de envío ── -->
      <div class="rounded-2xl shadow-md border p-8 transition-colors duration-300" :class="cardBg">
        <div class="flex items-center gap-3 mb-1">
          <div class="w-10 h-10 bg-ferremat-blue/10 rounded-xl flex items-center justify-center">
            <MapPin class="w-5 h-5 text-ferremat-blue" stroke-width="2" />
          </div>
          <div>
            <h3 class="text-lg font-extrabold" :class="heading">{{ t.shippingTitle }}</h3>
            <p class="text-xs" :class="subCls">{{ t.shippingSub }}</p>
          </div>
        </div>

        <!-- Éxito -->
        <div v-if="shippingSuccess" class="mt-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">
          <CheckCircle2 class="w-4 h-4 flex-shrink-0" stroke-width="2" />
          {{ t.savedOk }}
        </div>

        <div v-else class="mt-5 space-y-4">
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

          <div class="grid grid-cols-2 gap-4">
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
          <div v-if="shippingError" class="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
            ⚠ {{ shippingError }}
          </div>

          <!-- Botón guardar -->
          <button
            @click="saveShipping"
            :disabled="shippingLoading || !shippingForm.address || !shippingForm.city"
            class="w-full flex items-center justify-center gap-2 bg-ferremat-orange hover:bg-ferremat-orange/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200"
          >
            <span v-if="shippingLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <Save v-else class="w-4 h-4" stroke-width="2" />
            {{ shippingLoading ? t.saving : t.btnSave }}
          </button>
        </div>
      </div>

    </section>
  </div>
</template>