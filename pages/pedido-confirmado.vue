<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { CheckCircle2, Hammer, ArrowRight, Home } from 'lucide-vue-next';

const { lang, theme } = useSettings();
const { clearCart } = useCart();
const route = useRoute();

onMounted(() => {
  // El pago se completó correctamente: vaciamos el carrito local.
  clearCart();
});

const orderId = route.query.order_id as string | undefined;

const t = computed(() => ({
  pageTitle:    lang.value === 'es' ? '¡Pedido confirmado!'                  : 'Order confirmed!',
  pageSubtitle: lang.value === 'es' ? 'Gracias por tu compra'                : 'Thank you for your purchase',
  cardTitle:    lang.value === 'es' ? 'Pago realizado correctamente'         : 'Payment completed successfully',
  cardSub:      lang.value === 'es'
    ? 'Hemos recibido tu pedido y comenzaremos a procesarlo en breve. Te enviaremos un correo con los detalles.'
    : "We've received your order and will start processing it shortly. We'll send you an email with the details.",
  orderRef:     lang.value === 'es' ? 'Referencia del pedido'                : 'Order reference',
  btnOrders:    lang.value === 'es' ? 'Ver mis pedidos'                      : 'View my orders',
  btnHome:      lang.value === 'es' ? 'Volver al inicio'                     : 'Back to home',
}));

const pageBg  = computed(() => theme.value === 'dark' ? 'bg-slate-900' : 'bg-gray-50');
const cardBg  = computed(() => theme.value === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100');
const heading = computed(() => theme.value === 'dark' ? 'text-gray-100' : 'text-gray-800');
const textCls = computed(() => theme.value === 'dark' ? 'text-slate-300' : 'text-gray-600');
const subCls  = computed(() => theme.value === 'dark' ? 'text-slate-500' : 'text-gray-400');

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

    <!-- Card -->
    <section class="relative z-10 max-w-md mx-auto px-6 -mt-10 pb-20">
      <div class="rounded-2xl shadow-md border p-8 text-center transition-colors duration-300" :class="cardBg">

        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 class="w-8 h-8 text-green-600" stroke-width="2" />
        </div>

        <h2 class="text-xl font-extrabold mb-2" :class="heading">{{ t.cardTitle }}</h2>
        <p class="text-sm mb-6" :class="textCls">{{ t.cardSub }}</p>

        <div v-if="orderId" class="mb-6 rounded-xl px-4 py-3 text-sm" :class="theme === 'dark' ? 'bg-slate-700/40' : 'bg-gray-50'">
          <p class="font-semibold" :class="subCls">{{ t.orderRef }}</p>
          <p class="font-mono text-xs mt-1 break-all" :class="textCls">{{ orderId }}</p>
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
    </section>

  </div>
</template>