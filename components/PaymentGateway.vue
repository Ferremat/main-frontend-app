<script setup lang="ts">
import { ref, computed } from 'vue';
import { X, CreditCard, Lock, Loader } from 'lucide-vue-next';

const { lang, theme } = useSettings();
const emit = defineEmits<{
  close: [];
  success: [];
}>();

interface Props {
  total: number;
}
const props = defineProps<Props>();

const currentStep = ref<'summary' | 'address' | 'payment' | 'confirmation'>('summary');
const isProcessing = ref(false);

// Form data
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvv: '',
});

const t = computed(() => ({
  title:           lang.value === 'es' ? 'Pasarela de Pago'              : 'Payment Gateway',
  orderSummary:    lang.value === 'es' ? 'Resumen del pedido'           : 'Order summary',
  shippingInfo:    lang.value === 'es' ? 'Información de envío'         : 'Shipping information',
  paymentInfo:     lang.value === 'es' ? 'Información de pago'          : 'Payment information',
  orderComplete:   lang.value === 'es' ? 'Pedido completado'            : 'Order completed',
  total:           lang.value === 'es' ? 'Total a pagar'                : 'Total to pay',
  firstName:       lang.value === 'es' ? 'Nombre'                       : 'First name',
  lastName:        lang.value === 'es' ? 'Apellido'                     : 'Last name',
  email:           lang.value === 'es' ? 'Email'                        : 'Email',
  phone:           lang.value === 'es' ? 'Teléfono'                     : 'Phone',
  address:         lang.value === 'es' ? 'Dirección'                    : 'Address',
  city:            lang.value === 'es' ? 'Ciudad'                       : 'City',
  postalCode:      lang.value === 'es' ? 'Código postal'                : 'Postal code',
  cardNumber:      lang.value === 'es' ? 'Número de tarjeta'            : 'Card number',
  cardHolder:      lang.value === 'es' ? 'Titular de la tarjeta'        : 'Card holder',
  expiryDate:      lang.value === 'es' ? 'Fecha de vencimiento'         : 'Expiry date',
  cvv:             lang.value === 'es' ? 'CVV'                          : 'CVV',
  next:            lang.value === 'es' ? 'Siguiente'                    : 'Next',
  back:            lang.value === 'es' ? 'Atrás'                        : 'Back',
  pay:             lang.value === 'es' ? 'Pagar ahora'                  : 'Pay now',
  cancel:          lang.value === 'es' ? 'Cancelar'                     : 'Cancel',
  processing:      lang.value === 'es' ? 'Procesando pago...'           : 'Processing payment...',
  successMsg:      lang.value === 'es' ? 'Tu pedido ha sido procesado exitosamente' : 'Your order has been processed successfully',
  orderNumber:     lang.value === 'es' ? 'Número de pedido'             : 'Order number',
  returnHome:      lang.value === 'es' ? 'Volver al inicio'             : 'Return home',
  required:        lang.value === 'es' ? 'Este campo es requerido'      : 'This field is required',
}));

const bgClass = computed(() => theme.value === 'dark' ? 'bg-slate-800/70 border-slate-700/50' : 'bg-white border-gray-100');
const textClass = computed(() => theme.value === 'dark' ? 'text-gray-100' : 'text-gray-800');
const inputClass = computed(() => theme.value === 'dark' ? 'bg-slate-700/40 border-slate-600/50 text-gray-100' : 'bg-gray-50 border-gray-200 text-gray-800');
const labelClass = computed(() => theme.value === 'dark' ? 'text-gray-300' : 'text-gray-700');

const orderNumber = ref(`ORD-${Date.now()}`);

const isFormValid = computed(() => {
  if (currentStep.value === 'address') {
    return formData.value.firstName && formData.value.lastName && formData.value.email &&
           formData.value.phone && formData.value.address && formData.value.city && formData.value.postalCode;
  }
  if (currentStep.value === 'payment') {
    return formData.value.cardNumber && formData.value.cardHolder && formData.value.expiryDate && formData.value.cvv;
  }
  return true;
});

function handleNext() {
  if (currentStep.value === 'summary') {
    currentStep.value = 'address';
  } else if (currentStep.value === 'address' && isFormValid.value) {
    currentStep.value = 'payment';
  }
}

function handleBack() {
  if (currentStep.value === 'address') {
    currentStep.value = 'summary';
  } else if (currentStep.value === 'payment') {
    currentStep.value = 'address';
  }
}

async function handlePayment() {
  if (!isFormValid.value) return;
  isProcessing.value = true;
  await new Promise(resolve => setTimeout(resolve, 2000));
  isProcessing.value = false;
  currentStep.value = 'confirmation';
}

function handleComplete() {
  emit('success');
  emit('close');
}
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
    <div :class="[bgClass, 'rounded-2xl border shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto']">
      <!-- Header -->
      <div class="sticky top-0 flex items-center justify-between p-6 border-b transition-colors duration-300" :class="theme === 'dark' ? 'border-slate-700/50 bg-slate-800/30' : 'border-gray-100 bg-white/50'">
        <h1 :class="['text-2xl font-extrabold', textClass]">{{ t.title }}</h1>
        <button
          @click="() => emit('close')"
          :class="['p-2 rounded-lg transition-colors', theme === 'dark' ? 'hover:bg-slate-700/40 text-gray-400 hover:text-gray-200' : 'hover:bg-gray-100 text-gray-600']"
        >
          <X class="w-6 h-6" stroke-width="2" />
        </button>
      </div>

      <!-- Content -->
      <div class="p-6 min-h-[400px]">
        <!-- Step 1: Order Summary -->
        <div v-if="currentStep === 'summary'" class="space-y-6">
          <div>
            <h2 class="text-lg font-bold mb-4" :class="textClass">{{ t.orderSummary }}</h2>
            <div class="bg-ferremat-orange/10 border border-ferremat-orange/20 rounded-xl p-6 text-center">
              <p class="text-sm font-medium text-ferremat-orange mb-2">{{ t.total }}</p>
              <p class="text-4xl font-extrabold text-ferremat-orange">
                {{ new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(props.total) }}
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <Lock class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" stroke-width="2" />
            <p class="text-sm text-blue-700">
              {{ lang === 'es' ? 'Tu pago es 100% seguro y está encriptado.' : 'Your payment is 100% secure and encrypted.' }}
            </p>
          </div>
        </div>

        <!-- Step 2: Address Information -->
        <div v-else-if="currentStep === 'address'" class="space-y-6">
          <h2 class="text-lg font-bold" :class="textClass">{{ t.shippingInfo }}</h2>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label :class="['block text-sm font-semibold mb-2', labelClass]">{{ t.firstName }}</label>
              <input
                v-model="formData.firstName"
                type="text"
                :class="['w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition', inputClass]"
              />
            </div>
            <div>
              <label :class="['block text-sm font-semibold mb-2', labelClass]">{{ t.lastName }}</label>
              <input
                v-model="formData.lastName"
                type="text"
                :class="['w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition', inputClass]"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label :class="['block text-sm font-semibold mb-2', labelClass]">{{ t.email }}</label>
              <input
                v-model="formData.email"
                type="email"
                :class="['w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition', inputClass]"
              />
            </div>
            <div>
              <label :class="['block text-sm font-semibold mb-2', labelClass]">{{ t.phone }}</label>
              <input
                v-model="formData.phone"
                type="tel"
                :class="['w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition', inputClass]"
              />
            </div>
          </div>

          <div>
            <label :class="['block text-sm font-semibold mb-2', labelClass]">{{ t.address }}</label>
            <input
              v-model="formData.address"
              type="text"
              :class="['w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition', inputClass]"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label :class="['block text-sm font-semibold mb-2', labelClass]">{{ t.city }}</label>
              <input
                v-model="formData.city"
                type="text"
                :class="['w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition', inputClass]"
              />
            </div>
            <div>
              <label :class="['block text-sm font-semibold mb-2', labelClass]">{{ t.postalCode }}</label>
              <input
                v-model="formData.postalCode"
                type="text"
                :class="['w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition', inputClass]"
              />
            </div>
          </div>
        </div>

        <!-- Step 3: Payment Information -->
        <div v-else-if="currentStep === 'payment'" class="space-y-6">
          <h2 class="text-lg font-bold" :class="textClass">{{ t.paymentInfo }}</h2>

          <div>
            <label :class="['block text-sm font-semibold mb-2', labelClass]">{{ t.cardNumber }}</label>
            <div class="flex items-center gap-3">
              <input
                v-model="formData.cardNumber"
                type="text"
                placeholder="1234 5678 9012 3456"
                maxlength="19"
                :class="['flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition', inputClass]"
              />
              <CreditCard :class="['w-6 h-6', theme === 'dark' ? 'text-gray-400' : 'text-gray-500']" stroke-width="2" />
            </div>
          </div>

          <div>
            <label :class="['block text-sm font-semibold mb-2', labelClass]">{{ t.cardHolder }}</label>
            <input
              v-model="formData.cardHolder"
              type="text"
              :class="['w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition', inputClass]"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label :class="['block text-sm font-semibold mb-2', labelClass]">{{ t.expiryDate }}</label>
              <input
                v-model="formData.expiryDate"
                type="text"
                placeholder="MM/YY"
                maxlength="5"
                :class="['w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition', inputClass]"
              />
            </div>
            <div>
              <label :class="['block text-sm font-semibold mb-2', labelClass]">{{ t.cvv }}</label>
              <input
                v-model="formData.cvv"
                type="text"
                placeholder="123"
                maxlength="4"
                :class="['w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-ferremat-orange/40 transition', inputClass]"
              />
            </div>
          </div>

          <div class="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
            <Lock class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" stroke-width="2" />
            <p class="text-sm text-green-700">
              {{ lang === 'es' ? 'Tu información de pago está protegida por encriptación SSL.' : 'Your payment information is protected by SSL encryption.' }}
            </p>
          </div>
        </div>

        <!-- Step 4: Confirmation -->
        <div v-else-if="currentStep === 'confirmation'" class="space-y-6 text-center">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>

          <div>
            <h2 class="text-2xl font-extrabold mb-2" :class="textClass">{{ t.orderComplete }}</h2>
            <p :class="theme === 'dark' ? 'text-gray-400' : 'text-gray-600'">{{ t.successMsg }}</p>
          </div>

          <div :class="['bg-gray-100 rounded-xl p-4', theme === 'dark' ? 'bg-slate-700' : '']">
            <p class="text-sm font-medium mb-2" :class="labelClass">{{ t.orderNumber }}</p>
            <p class="text-xl font-extrabold text-ferremat-blue">{{ orderNumber }}</p>
          </div>

          <p :class="theme === 'dark' ? 'text-gray-400' : 'text-gray-600'">
            {{ lang === 'es' ? 'Recibirás un email de confirmación en breve.' : 'You will receive a confirmation email shortly.' }}
          </p>
        </div>
      </div>

      <!-- Footer with actions -->
      <div class="sticky bottom-0 border-t p-6 flex gap-3 justify-end transition-colors duration-300" :class="theme === 'dark' ? 'border-slate-700/50 bg-slate-800/30' : 'border-gray-100 bg-white/50'">
        <button
          v-if="currentStep !== 'confirmation'"
          @click="() => emit('close')"
          :class="['px-6 py-2.5 rounded-lg font-semibold transition-colors', theme === 'dark' ? 'bg-slate-700/50 hover:bg-slate-700 text-gray-100' : 'bg-gray-200 hover:bg-gray-300 text-gray-800']"
        >
          {{ t.cancel }}
        </button>

        <button
          v-if="currentStep === 'address' || currentStep === 'payment'"
          @click="handleBack"
          :class="['px-6 py-2.5 rounded-lg font-semibold transition-colors', theme === 'dark' ? 'bg-slate-700/50 hover:bg-slate-700 text-gray-100' : 'bg-gray-200 hover:bg-gray-300 text-gray-800']"
        >
          {{ t.back }}
        </button>

        <button
          v-if="currentStep === 'summary' || currentStep === 'address'"
          @click="handleNext"
          :disabled="currentStep === 'address' && !isFormValid"
          class="px-6 py-2.5 rounded-lg font-semibold bg-ferremat-blue hover:bg-ferremat-blue/90 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ t.next }}
        </button>

        <button
          v-if="currentStep === 'payment'"
          @click="handlePayment"
          :disabled="!isFormValid || isProcessing"
          class="px-6 py-2.5 rounded-lg font-semibold bg-ferremat-orange hover:bg-ferremat-orange/90 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Loader v-if="isProcessing" class="w-4 h-4 animate-spin" />
          {{ isProcessing ? t.processing : t.pay }}
        </button>

        <button
          v-if="currentStep === 'confirmation'"
          @click="handleComplete"
          class="px-6 py-2.5 rounded-lg font-semibold bg-ferremat-orange hover:bg-ferremat-orange/90 text-white transition-colors"
        >
          {{ t.returnHome }}
        </button>
      </div>
    </div>
  </div>
</template>
