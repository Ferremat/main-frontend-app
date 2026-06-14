// Composable centralizado para manejo de errores en toda la aplicación

import { useRouter } from 'vue-router';
import { parseError, logError, type AppError } from '~/utils/errors';

interface ErrorNotification {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  duration?: number;
}

export function useErrorHandler() {
  const router = useRouter();
  const notificationStack = useState<ErrorNotification[]>('error-notifications', () => []);

  function handleError(
    error: any,
    options?: {
      context?: string;
      showNotification?: boolean;
      redirect?: string;
      onError?: (error: AppError) => void;
    }
  ): AppError {
    const appError = parseError(error);
    const context = options?.context || 'unknown';

    // Loguear el error
    logError(error, context);

    // Manejar notificación
    if (options?.showNotification !== false) {
      showErrorNotification(appError.message);
    }

    // Ejecutar callback personalizado
    if (options?.onError) {
      options.onError(appError);
    }

    // Redirigir si es necesario
    if (options?.redirect) {
      if (appError.statusCode === 401) {
        // Redirigir a login si no autenticado
        router.push('/login');
      } else if (options.redirect) {
        router.push(options.redirect);
      }
    }

    return appError;
  }

  function showErrorNotification(message: string, type: 'error' | 'warning' | 'info' = 'error') {
    const id = `error-${Date.now()}`;
    const notification: ErrorNotification = {
      id,
      message,
      type,
      duration: 5000,
    };

    notificationStack.value.push(notification);

    // Auto-remover después del duration
    if (notification.duration) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration);
    }
  }

  function removeNotification(id: string) {
    const index = notificationStack.value.findIndex((n) => n.id === id);
    if (index > -1) {
      notificationStack.value.splice(index, 1);
    }
  }

  function clearNotifications() {
    notificationStack.value = [];
  }

  return {
    handleError,
    showErrorNotification,
    removeNotification,
    clearNotifications,
    notifications: readonly(notificationStack),
  };
}
