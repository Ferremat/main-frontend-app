export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}

export class AppError extends Error {
  constructor(
    public type: ErrorType,
    public message: string,
    public statusCode?: number,
    public originalError?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function parseError(error: any): AppError {
  // Handle fetch/network errors
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return new AppError(
      ErrorType.NETWORK,
      'Error de conexión. Intenta de nuevo.',
      undefined,
      error
    );
  }

  // Handle HTTP errors
  if (error?.response) {
    const status = error.response.status;
    const data = error.response.data;

    if (status === 401 || status === 403) {
      return new AppError(
        status === 401 ? ErrorType.AUTHENTICATION : ErrorType.AUTHORIZATION,
        status === 401 ? 'Sesión expirada' : 'No tienes permiso',
        status,
        error
      );
    }

    if (status === 404) {
      return new AppError(
        ErrorType.NOT_FOUND,
        'Recurso no encontrado',
        404,
        error
      );
    }

    if (status === 400) {
      return new AppError(
        ErrorType.VALIDATION,
        data?.message || 'Datos inválidos',
        400,
        error
      );
    }

    if (status >= 500) {
      return new AppError(
        ErrorType.SERVER,
        'Error del servidor. Intenta más tarde.',
        status,
        error
      );
    }
  }

  // Handle JSON parse errors
  if (error instanceof SyntaxError && error.message.includes('JSON')) {
    return new AppError(
      ErrorType.SERVER,
      'Respuesta inválida del servidor',
      undefined,
      error
    );
  }

  // Default
  return new AppError(
    ErrorType.UNKNOWN,
    error?.message || 'Error desconocido',
    undefined,
    error
  );
}

export function logError(error: AppError, context?: string): void {
  console.error(`[${error.type}]${context ? ` ${context}` : ''}:`, {
    message: error.message,
    statusCode: error.statusCode,
    originalError: error.originalError,
  });
}

export function getErrorMessage(error: AppError, lang: string = 'es'): string {
  const messages: Record<ErrorType, { es: string; en: string }> = {
    [ErrorType.NETWORK]: {
      es: 'Error de conexión. Revisa tu internet e intenta de nuevo.',
      en: 'Connection error. Check your internet and try again.',
    },
    [ErrorType.VALIDATION]: {
      es: 'Datos inválidos. Revisa el formulario.',
      en: 'Invalid data. Check the form.',
    },
    [ErrorType.AUTHENTICATION]: {
      es: 'Tu sesión ha expirado. Inicia sesión de nuevo.',
      en: 'Your session has expired. Sign in again.',
    },
    [ErrorType.AUTHORIZATION]: {
      es: 'No tienes permiso para acceder a esto.',
      en: 'You do not have permission to access this.',
    },
    [ErrorType.NOT_FOUND]: {
      es: 'Recurso no encontrado.',
      en: 'Resource not found.',
    },
    [ErrorType.SERVER]: {
      es: 'Error del servidor. Intenta más tarde.',
      en: 'Server error. Try again later.',
    },
    [ErrorType.UNKNOWN]: {
      es: 'Algo salió mal. Intenta de nuevo.',
      en: 'Something went wrong. Try again.',
    },
  };

  return messages[error.type]?.[lang as 'es' | 'en'] || error.message;
}
