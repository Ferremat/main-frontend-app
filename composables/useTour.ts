// Composable para manejar el tour guiado (onboarding)

export interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string; // Selector CSS del elemento a destacar
  position?: 'top' | 'bottom' | 'left' | 'right'; // Posición del tooltip
  action?: () => void; // Acción al completar el paso
}

export const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: '¡Bienvenido a Ferremat!',
    description: 'Te mostraremos cómo usar nuestra ferretería online. Haz clic en "Siguiente" para continuar.',
    position: 'bottom',
  },
  {
    id: 'search',
    title: 'Buscar Productos',
    description: 'Usa la barra de búsqueda para encontrar las herramientas y materiales que necesitas.',
    target: 'input[placeholder*="Buscar"]',
    position: 'bottom',
  },
  {
    id: 'categories',
    title: 'Explorar Categorías',
    description: 'Filtra los productos por categoría para una búsqueda más rápida.',
    target: '[data-tour="categories"]',
    position: 'right',
  },
  {
    id: 'product-card',
    title: 'Tarjetas de Productos',
    description: 'Haz clic en cualquier producto para ver más detalles y agregarlo al carrito.',
    target: '[data-tour="product-card"]',
    position: 'top',
  },
  {
    id: 'cart',
    title: 'Tu Carrito',
    description: 'Accede a tu carrito desde aquí. Podrás ver todos los productos que has seleccionado.',
    target: '[data-tour="cart-button"]',
    position: 'bottom',
  },
  {
    id: 'user-menu',
    title: 'Menú de Usuario',
    description: 'Aquí puedes acceder a tu perfil, historial de compras y cerrar sesión.',
    target: '[data-tour="user-menu"]',
    position: 'left',
  },
  {
    id: 'complete',
    title: '¡Listo!',
    description: 'Ya sabes cómo usar Ferremat. Puedes volver a este tour en cualquier momento desde Ajustes.',
    position: 'bottom',
  },
];

export function useTour() {
  const currentStep = useState<number>('tour-step', () => -1); // -1 = no iniciado
  const isTourActive = computed(() => currentStep.value >= 0);
  const isFirstVisit = useState<boolean>('tour-first-visit', () => false);

  const getCurrentStep = computed(() => tourSteps[currentStep.value] || null);

  function startTour() {
    currentStep.value = 0;
  }

  function nextStep() {
    if (currentStep.value < tourSteps.length - 1) {
      currentStep.value++;
    } else {
      completeTour();
    }
  }

  function previousStep() {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  }

  function skipTour() {
    completeTour();
  }

  function completeTour() {
    currentStep.value = -1;
    // Marcar tour como completado
    if (import.meta.client) {
      localStorage.setItem('ferremat-tour-completed', 'true');
    }
  }

  function resetTour() {
    if (import.meta.client) {
      localStorage.removeItem('ferremat-tour-completed');
    }
    startTour();
  }

  function initTour() {
    if (import.meta.client) {
      const tourCompleted = localStorage.getItem('ferremat-tour-completed');
      // Si el usuario es nuevo (login reciente) y no ha completado el tour
      if (!tourCompleted) {
        isFirstVisit.value = true;
        startTour();
      }
    }
  }

  return {
    currentStep,
    isTourActive,
    isFirstVisit,
    getCurrentStep,
    startTour,
    nextStep,
    previousStep,
    skipTour,
    completeTour,
    resetTour,
    initTour,
    tourSteps,
  };
}
