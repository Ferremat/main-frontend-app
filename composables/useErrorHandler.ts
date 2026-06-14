import { AppError, parseError, logError, getErrorMessage } from '~/utils/errors';

export interface ErrorNotification {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  duration: number;
}

export const useErrorHandler = () => {
  const errors = useState<ErrorNotification[]>('errors', () => []);
  const { lang } = useSettings();

  const generateId = () => Math.random().toString(36).substring(7);

  const showErrorNotification = (
    message: string,
    type: 'error' | 'warning' | 'info' = 'error',
    duration = 5000
  ) => {
    const id = generateId();
    errors.value.push({ id, message, type, duration });

    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration);
    }

    return id;
  };

  const removeNotification = (id: string) => {
    const index = errors.value.findIndex((e) => e.id === id);
    if (index !== -1) {
      errors.value.splice(index, 1);
    }
  };

  const clearNotifications = () => {
    errors.value = [];
  };

  const handleError = (
    error: any,
    options?: {
      context?: string;
      showNotification?: boolean;
      redirect?: string;
      onError?: (error: AppError) => void;
    }
  ) => {
    const appError = error instanceof AppError ? error : parseError(error);

    // Log error
    logError(appError, options?.context);

    // Show notification
    if (options?.showNotification !== false) {
      const message = getErrorMessage(appError, lang.value);
      showErrorNotification(message, 'error');
    }

    // Call callback
    if (options?.onError) {
      options.onError(appError);
    }

    // Redirect if needed (e.g., 401 → login)
    if (options?.redirect && appError.statusCode === 401) {
      navigateTo(options.redirect);
    }

    return appError;
  };

  return {
    errors: readonly(errors),
    showErrorNotification,
    removeNotification,
    clearNotifications,
    handleError,
  };
};
