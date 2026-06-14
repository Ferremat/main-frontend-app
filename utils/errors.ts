// Sistema centralizado de manejo de errores para Ferremat

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
  // Si ya es un AppError, devolverlo tal cual
  if (error instanceof AppError) return error;

  // Error de fetch/red
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return new AppError(
      ErrorType.NETWORK,
      'Error de conexión. Verifica tu conexión a internet.',
      0,
      error
    );
  }

  // Error de validación
  if (error?.name === 'ZodError') {
    return new AppError(
      ErrorType.VALIDATION,
      'Los datos proporcionados no son válidos.',
      400,
      error
    );
  }

  // HTTP errors con status code
  if (error?.statusCode) {
    const statusCode = error.statusCode;

    if (statusCode === 401 || statusCode === 403) {
      return new AppError(
        statusCode === 401 ? ErrorType.AUTHENTICATION : ErrorType.AUTHORIZATION,
        statusCode === 401 ? 'No autenticado. Por favor, inicia sesión.' : 'No tienes permiso para realizar esta acción.',
        statusCode,
        error
      );
    }

    if (statusCode === 404) {
      return new AppError(
        ErrorType.NOT_FOUND,
        'El recurso solicitado no existe.',
        statusCode,
        error
      );
    }

    if (statusCode >= 500) {
      return new AppError(
        ErrorType.SERVER,
        'Error en el servidor. Por favor, intenta más tarde.',
        statusCode,
        error
      );
    }

    if (statusCode >= 400) {
      return new AppError(
        ErrorType.VALIDATION,
        error.message || 'Error en la solicitud.',
        statusCode,
        error
      );
    }
  }

  // Error genérico de objeto Error
  if (error instanceof Error) {
    return new AppError(
      ErrorType.UNKNOWN,
      error.message || 'Un error desconocido ocurrió.',
      undefined,
      error
    );
  }

  // String o valor primitivo
  if (typeof error === 'string') {
    return new AppError(ErrorType.UNKNOWN, error);
  }

  return new AppError(
    ErrorType.UNKNOWN,
    'Un error desconocido ocurrió.',
    undefined,
    error
  );
}

export function getErrorMessage(error: any): string {
  const appError = parseError(error);
  return appError.message;
}

export function logError(error: any, context?: string): void {
  const appError = parseError(error);

  const logData = {
    timestamp: new Date().toISOString(),
    type: appError.type,
    message: appError.message,
    statusCode: appError.statusCode,
    context,
    stack: appError.originalError?.stack,
  };

  console.error('[AppError]', logData);

  // Aquí puedes enviar a un servicio de logging (Sentry, etc.)
  // sendToLoggingService(logData);
}
