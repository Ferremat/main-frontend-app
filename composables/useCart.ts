// Composable de carrito de la compra — estado compartido entre todos los componentes

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category?: string;
  unit?: string; // 'ud', 'kg', 'm', etc.
}

export function useCart() {
  const items = useState<CartItem[]>('cart-items', () => []);

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  // Obtener userId y apiUrl de forma segura
  function _getUserId(): string | null {
    const { user } = useAuth();
    return user.value?.id ?? null;
  }

  function _getApiUrl(): string {
    return useRuntimeConfig().public.apiUrl || 'http://localhost:3001';
  }

  // Sincronizar con backend (fire-and-forget, no bloquea la UI)
  async function _syncAdd(productId: string, quantity: number): Promise<void> {
    const userId = _getUserId();
    if (!userId || !import.meta.client) return;
    try {
      await fetch(`${_getApiUrl()}/orders/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId, quantity }),
      });
    } catch {
      // Silencioso — el carrito local ya está actualizado
    }
  }

  async function _syncRemove(productId: string): Promise<void> {
    const userId = _getUserId();
    if (!userId || !import.meta.client) return;
    try {
      await fetch(`${_getApiUrl()}/orders/cart/${userId}/remove/${productId}`, {
        method: 'POST',
      });
    } catch {}
  }

  async function _syncClear(): Promise<void> {
    const userId = _getUserId();
    if (!userId || !import.meta.client) return;
    try {
      await fetch(`${_getApiUrl()}/orders/cart/${userId}/clear`, {
        method: 'POST',
      });
    } catch {}
  }

  function addItem(item: CartItem) {
    const existing = items.value.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.value.push({ ...item });
    }
    _save();
    _syncAdd(item.id, item.quantity); // sync en background
  }

  function removeItem(id: string) {
    items.value = items.value.filter((i) => i.id !== id);
    _save();
    _syncRemove(id); // sync en background
  }

  function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) { removeItem(id); return; }
    const item = items.value.find((i) => i.id === id);
    if (item) {
      const diff = quantity - item.quantity;
      item.quantity = quantity;
      _save();
      if (diff !== 0) {
        // Enviamos el delta: si diff > 0 añadimos, si < 0 necesitamos reemplazar.
        // La forma más simple: limpiar y re-añadir con la cantidad final.
        _syncRemove(id).then(() => _syncAdd(id, quantity));
      }
    }
  }

  function clearCart() {
    items.value = [];
    if (import.meta.client) localStorage.removeItem('ferremat-cart');
    _syncClear(); // sync en background
  }

  function _save() {
    if (import.meta.client)
      localStorage.setItem('ferremat-cart', JSON.stringify(items.value));
  }

  /** Llamar en el layout para restaurar el carrito desde localStorage */
  function initCart() {
    if (import.meta.client) {
      const saved = localStorage.getItem('ferremat-cart');
      if (saved) {
        try { items.value = JSON.parse(saved); } catch {}
      }
    }
  }

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    initCart,
  };
}