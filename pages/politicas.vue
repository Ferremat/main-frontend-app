<script setup lang="ts">
import { ShieldCheck, Cookie, FileText, ShoppingCart, Hammer, ChevronRight } from 'lucide-vue-next';

const { lang, theme } = useSettings();

// Reactive theme classes
const pageBg   = computed(() => theme.value === 'dark' ? 'bg-slate-900' : 'bg-gray-50');
const cardBg   = computed(() => theme.value === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100');
const heading  = computed(() => theme.value === 'dark' ? 'text-gray-100' : 'text-gray-800');
const subtext  = computed(() => theme.value === 'dark' ? 'text-slate-400' : 'text-gray-600');
const divLine  = computed(() => theme.value === 'dark' ? 'border-slate-700' : 'border-gray-100');
const sideInactive = computed(() => theme.value === 'dark'
  ? 'bg-slate-800 border-slate-700 text-gray-200 hover:border-ferremat-orange/30'
  : 'bg-white border-gray-100 text-gray-700 hover:border-ferremat-orange/30 hover:shadow-sm');

const policies = [
  {
    id: 'privacidad',
    icon: ShieldCheck,
    color: 'ferremat-orange',
    es: {
      title: 'Política de Privacidad',
      subtitle: 'Tratamiento y protección de tus datos personales',
      content: [
        {
          heading: '1. Responsable del tratamiento',
          body: 'Ferretería Ferremat, S.A. de C.V. es el responsable del tratamiento de los datos personales que nos proporciones a través de nuestros canales digitales y físicos.',
        },
        {
          heading: '2. Finalidad de los datos',
          body: 'Recopilamos tu nombre, correo electrónico y teléfono con el único objetivo de gestionar pedidos, brindarte soporte y, con tu consentimiento, enviarte información sobre promociones.',
        },
        {
          heading: '3. Derechos ARCO',
          body: 'Puedes ejercer tus derechos de Acceso, Rectificación, Cancelación y Oposición escribiendo a privacidad@ferremat.com con un identificador oficial.',
        },
        {
          heading: '4. Seguridad',
          body: 'Implementamos medidas técnicas y organizativas para proteger tus datos contra accesos no autorizados, pérdida o divulgación indebida.',
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      subtitle: 'How we process and protect your personal data',
      content: [
        {
          heading: '1. Data Controller',
          body: 'Ferretería Ferremat, S.A. de C.V. is responsible for processing the personal data you provide through our digital and physical channels.',
        },
        {
          heading: '2. Purpose of Data',
          body: 'We collect your name, email, and phone number solely to manage orders, provide support, and—with your consent—send promotional information.',
        },
        {
          heading: '3. Your Rights',
          body: 'You may exercise your rights of Access, Rectification, Deletion, and Objection by writing to privacidad@ferremat.com with a valid ID.',
        },
        {
          heading: '4. Security',
          body: 'We implement technical and organizational measures to protect your data against unauthorized access, loss, or improper disclosure.',
        },
      ],
    },
  },
  {
    id: 'cookies',
    icon: Cookie,
    color: 'ferremat-blue',
    es: {
      title: 'Política de Cookies',
      subtitle: 'Cómo usamos las cookies en nuestro sitio',
      content: [
        {
          heading: '¿Qué son las cookies?',
          body: 'Las cookies son pequeños archivos que se almacenan en tu dispositivo para mejorar tu experiencia de navegación y recordar tus preferencias.',
        },
        {
          heading: 'Tipos de cookies que usamos',
          body: 'Utilizamos cookies esenciales (necesarias para el funcionamiento del sitio), cookies analíticas (para entender el uso del sitio) y cookies de preferencias (como el tema e idioma elegido).',
        },
        {
          heading: 'Control de cookies',
          body: 'Puedes configurar tu navegador para rechazar cookies o eliminarlas en cualquier momento. Ten en cuenta que algunas funciones del sitio pueden verse afectadas.',
        },
      ],
    },
    en: {
      title: 'Cookie Policy',
      subtitle: 'How we use cookies on our website',
      content: [
        {
          heading: 'What are cookies?',
          body: 'Cookies are small files stored on your device to improve your browsing experience and remember your preferences.',
        },
        {
          heading: 'Types of cookies we use',
          body: 'We use essential cookies (required for the site to function), analytics cookies (to understand site usage), and preference cookies (such as your chosen theme and language).',
        },
        {
          heading: 'Cookie control',
          body: 'You can configure your browser to reject or delete cookies at any time. Please note that some site features may be affected.',
        },
      ],
    },
  },
  {
    id: 'aviso',
    icon: FileText,
    color: 'ferremat-orange',
    es: {
      title: 'Aviso Legal',
      subtitle: 'Términos de uso y responsabilidades del sitio',
      content: [
        {
          heading: 'Titularidad',
          body: 'Este sitio web es propiedad de Ferretería Ferremat, S.A. de C.V. Su uso implica la aceptación de los presentes términos.',
        },
        {
          heading: 'Propiedad intelectual',
          body: 'Todos los contenidos (textos, imágenes, logotipos, diseño) están protegidos por derechos de autor y son propiedad exclusiva de Ferremat o sus licenciantes.',
        },
        {
          heading: 'Limitación de responsabilidad',
          body: 'Ferremat no se hace responsable de interrupciones del servicio, errores en los precios publicados o daños derivados del mal uso del sitio.',
        },
      ],
    },
    en: {
      title: 'Legal Notice',
      subtitle: 'Terms of use and site responsibilities',
      content: [
        {
          heading: 'Ownership',
          body: 'This website is owned by Ferretería Ferremat, S.A. de C.V. Using it implies acceptance of these terms.',
        },
        {
          heading: 'Intellectual Property',
          body: 'All content (text, images, logos, design) is protected by copyright and is the exclusive property of Ferremat or its licensors.',
        },
        {
          heading: 'Limitation of Liability',
          body: 'Ferremat is not responsible for service interruptions, pricing errors, or damages resulting from misuse of the site.',
        },
      ],
    },
  },
  {
    id: 'compras',
    icon: ShoppingCart,
    color: 'ferremat-blue',
    es: {
      title: 'Condiciones de Compra',
      subtitle: 'Cómo funciona el proceso de compra en Ferremat',
      content: [
        {
          heading: 'Proceso de pedido',
          body: 'Al realizar un pedido aceptas el precio, descripción y disponibilidad mostrados en el momento de la compra. Recibirás una confirmación por correo electrónico.',
        },
        {
          heading: 'Formas de pago',
          body: 'Aceptamos tarjetas de crédito/débito, transferencia bancaria y pago en efectivo en tienda. Los pagos en línea están protegidos con cifrado SSL.',
        },
        {
          heading: 'Devoluciones',
          body: 'Aceptamos devoluciones dentro de los 30 días naturales posteriores a la compra, siempre que el producto se encuentre en perfecto estado y con su embalaje original.',
        },
        {
          heading: 'Entregas',
          body: 'El tiempo de entrega estándar es de 3 a 5 días hábiles. Para pedidos urgentes, consulta disponibilidad de entrega exprés.',
        },
      ],
    },
    en: {
      title: 'Purchase Terms',
      subtitle: 'How the buying process works at Ferremat',
      content: [
        {
          heading: 'Order Process',
          body: 'By placing an order you accept the price, description, and availability shown at the time of purchase. You will receive a confirmation email.',
        },
        {
          heading: 'Payment Methods',
          body: 'We accept credit/debit cards, bank transfers, and cash payments in-store. Online payments are secured with SSL encryption.',
        },
        {
          heading: 'Returns',
          body: 'We accept returns within 30 calendar days of purchase, provided the product is in perfect condition and in its original packaging.',
        },
        {
          heading: 'Deliveries',
          body: 'Standard delivery time is 3 to 5 business days. For urgent orders, please inquire about express delivery availability.',
        },
      ],
    },
  },
];

const activeId = ref('privacidad');
const activePolicy = computed(() => policies.find(p => p.id === activeId.value)!);
const activeContent = computed(() => (lang.value === 'es' ? activePolicy.value.es : activePolicy.value.en));

useHead({
  title: computed(() => lang.value === 'es' ? 'Políticas | Ferremat' : 'Policies | Ferremat'),
  meta: [
    {
      name: 'description',
      content: computed(() =>
        lang.value === 'es'
          ? 'Consulta las políticas de privacidad, cookies, aviso legal y condiciones de compra de Ferretería Ferremat.'
          : 'Read the privacy, cookie, legal, and purchase policies of Ferretería Ferremat.'
      ),
    },
  ],
});
</script>

<template>
  <div class="min-h-screen transition-colors duration-300" :class="pageBg">
    <!-- Hero Banner -->
    <div class="relative h-52 overflow-hidden">
      <div
        class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center scale-105"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-ferremat-blue/90 via-ferremat-blue/70 to-ferremat-blue/40" />
      <div class="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div class="flex items-center gap-3 mb-3">
          <div class="bg-ferremat-orange p-2 rounded-md">
            <Hammer class="w-6 h-6 text-white" stroke-width="2.5" />
          </div>
          <span class="text-ferremat-orange font-bold uppercase tracking-widest text-sm">Ferretería Ferremat</span>
        </div>
        <h1 class="text-white text-4xl md:text-5xl font-extrabold drop-shadow-lg">
          {{ lang === 'es' ? 'Políticas' : 'Policies' }}
        </h1>
        <p class="text-white/80 mt-2 text-lg">
          {{ lang === 'es' ? 'Transparencia y confianza en cada detalle' : 'Transparency and trust in every detail' }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <section class="max-w-6xl mx-auto px-6 py-14 grid lg:grid-cols-[260px_1fr] gap-8">

      <!-- Sidebar nav -->
      <aside class="flex flex-col gap-2 h-fit lg:sticky lg:top-24">
        <button
          v-for="policy in policies"
          :key="policy.id"
          @click="activeId = policy.id"
          class="group flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200 text-left w-full"
          :class="activeId === policy.id
            ? 'bg-ferremat-blue text-white border-ferremat-blue shadow-md'
            : sideInactive"
        >
          <div
            class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
            :class="activeId === policy.id
              ? 'bg-white/20'
              : (policy.color === 'ferremat-orange' ? 'bg-ferremat-orange/10 group-hover:bg-ferremat-orange/20' : 'bg-ferremat-blue/10 group-hover:bg-ferremat-blue/20')"
          >
            <component
              :is="policy.icon"
              class="w-5 h-5 transition-colors"
              :class="activeId === policy.id
                ? 'text-white'
                : (policy.color === 'ferremat-orange' ? 'text-ferremat-orange' : 'text-ferremat-blue')"
              stroke-width="2"
            />
          </div>
          <span class="text-sm font-bold leading-tight flex-1">
            {{ lang === 'es' ? policy.es.title : policy.en.title }}
          </span>
          <ChevronRight
            class="w-4 h-4 flex-shrink-0 transition-transform"
            :class="activeId === policy.id ? 'text-white translate-x-0.5' : 'text-gray-300'"
            stroke-width="2.5"
          />
        </button>
      </aside>

      <!-- Policy Content -->
      <div class="rounded-2xl shadow-sm border p-8 transition-colors duration-300" :class="cardBg">
        <Transition name="fade" mode="out-in">
          <div :key="activeId + lang">
            <!-- Card Header -->
            <div class="flex items-start gap-4 mb-8 pb-6 border-b" :class="divLine">
              <div
                class="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                :class="activePolicy.color === 'ferremat-orange' ? 'bg-ferremat-orange/10' : 'bg-ferremat-blue/10'"
              >
                <component
                  :is="activePolicy.icon"
                  class="w-6 h-6"
                  :class="activePolicy.color === 'ferremat-orange' ? 'text-ferremat-orange' : 'text-ferremat-blue'"
                  stroke-width="2"
                />
              </div>
              <div>
                <span
                  class="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
                  :class="activePolicy.color === 'ferremat-orange'
                    ? 'bg-ferremat-orange/10 text-ferremat-orange'
                    : 'bg-ferremat-blue/10 text-ferremat-blue'"
                >
                  Ferremat
                </span>
                <h2 class="text-2xl font-extrabold" :class="heading">{{ activeContent.title }}</h2>
                <p class="text-slate-400 text-sm mt-1">{{ activeContent.subtitle }}</p>
              </div>
            </div>

            <!-- Sections -->
            <div class="space-y-6">
              <div
                v-for="section in activeContent.content"
                :key="section.heading"
              >
                <h3 class="text-base font-bold mb-2" :class="heading">{{ section.heading }}</h3>
                <p class="text-sm leading-relaxed" :class="subtext">{{ section.body }}</p>
              </div>
            </div>

            <!-- Last updated -->
            <div class="mt-10 pt-6 border-t" :class="divLine">
              <p class="text-xs text-gray-400">
                {{ lang === 'es' ? 'Última actualización:' : 'Last updated:' }}
                <span class="font-semibold">Enero 2025</span>
              </p>
            </div>
          </div>
        </Transition>
      </div>

    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(8px);
}
</style>
