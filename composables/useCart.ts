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

  function addItem(item: CartItem) {
    const existing = items.value.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.value.push({ ...item });
    }
    _save();
  }

  function removeItem(id: string) {
    items.value = items.value.filter((i) => i.id !== id);
    _save();
  }

  function updateQuantity(id: string, quantity: number) {
    if (quantity <= 0) { removeItem(id); return; }
    const item = items.value.find((i) => i.id === id);
    if (item) { item.quantity = quantity; _save(); }
  }

  function clearCart() {
    items.value = [];
    if (import.meta.client) localStorage.removeItem('ferremat-cart');
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
