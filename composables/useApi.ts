// Composable centralizado para llamadas a la API de Ferremat
import { useErrorHandler } from './useErrorHandler';

export interface Category {
  id: string
  name: string
}

export interface Product {
  id: string
  name: string
  description?: string
  price: string | number
  stock: number
  imageUrl?: string | null
  category?: Category
  categoryId?: string
}

export const useApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiUrl as string

  // Solo inicializar errorHandler en el cliente
  const errorHandler = process.client ? useErrorHandler() : null

  const fetchProducts = async (): Promise<Product[]> => {
    try {
      const data = await $fetch<Product[]>(`${baseUrl}products/list_products`)
      return data
    } catch (error) {
      if (errorHandler) {
        errorHandler.handleError(error, { context: 'fetchProducts', showNotification: true });
      }
      throw error;
    }
  }

  const fetchProductById = async (id: string): Promise<Product> => {
    try {
      if (!id || id === 'undefined') {
        throw new Error('ID de producto inválido');
      }
      const data = await $fetch<Product>(`${baseUrl}products/${id}`)
      if (!data || typeof data !== 'object') {
        throw new Error('Respuesta de servidor inválida');
      }
      return data
    } catch (error) {
      if (errorHandler) {
        errorHandler.handleError(error, { context: `fetchProductById(${id})`, showNotification: true });
      }
      throw error;
    }
  }

  const fetchCategories = async (): Promise<Category[]> => {
    try {
      const data = await $fetch<Category[]>(`${baseUrl}products/list_categories`)
      return data
    } catch (error) {
      if (errorHandler) {
        errorHandler.handleError(error, { context: 'fetchCategories', showNotification: true });
      }
      throw error;
    }
  }

  return {
    fetchProducts,
    fetchProductById,
    fetchCategories,
  }
}
