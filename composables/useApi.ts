// Composable centralizado para llamadas a la API de Ferremat

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

  const fetchProducts = async (): Promise<Product[]> => {
    const data = await $fetch<Product[]>(`${baseUrl}products/list_products`)
    return data
  }

  const fetchProductById = async (id: string): Promise<Product> => {
    if (!id || id === 'undefined') {
      throw new Error('ID de producto inválido');
    }
    const data = await $fetch<Product>(`${baseUrl}products/${id}`)
    if (!data || typeof data !== 'object') {
      throw new Error('Respuesta de servidor inválida');
    }
    return data
  }

  const fetchCategories = async (): Promise<Category[]> => {
    const data = await $fetch<Category[]>(`${baseUrl}products/list_categories`)
    return data
  }

  return {
    fetchProducts,
    fetchProductById,
    fetchCategories,
  }
}
