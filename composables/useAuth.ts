// Composable de autenticación global — estado compartido entre todos los componentes
import { useCart } from './useCart';

export interface AuthUser {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  registeredDate?: string;
}

export function useAuth() {
  const user = useState<AuthUser | null>('auth-user', () => null);
  const isLoggedIn = computed(() => !!user.value);

  /** Primera palabra del nombre (para mostrar en el header) */
  const firstName = computed(() =>
    user.value?.name?.split(' ')[0] ?? ''
  );

  /** Iniciales para el avatar (máx. 2 letras) */
  const initials = computed(() =>
    user.value?.name
      ?.split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase() ?? ''
  );

  function login(userData: AuthUser, isNewUser: boolean = false) {
    user.value = userData;
    if (import.meta.client) {
      localStorage.setItem('ferremat-user', JSON.stringify(userData));
      // Marcar si es usuario nuevo para mostrar el tour
      if (isNewUser) {
        localStorage.removeItem('ferremat-tour-completed');
      }
    }
  }

  function logout() {
    const { clearCart } = useCart();

    user.value = null;
    clearCart();

    if (import.meta.client) {
      localStorage.removeItem('ferremat-user');
    }
  }

  /** Llamar en el layout para restaurar la sesión desde localStorage */
  function initAuth() {
    if (import.meta.client) {
      const saved = localStorage.getItem('ferremat-user');
      if (saved) {
        try {
          user.value = JSON.parse(saved);
        } catch {
          localStorage.removeItem('ferremat-user');
        }
      }
    }
  }

  return { user, isLoggedIn, firstName, initials, login, logout, initAuth };
}
