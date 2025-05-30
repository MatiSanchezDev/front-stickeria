// stores/orderStore.ts
import { Sticker } from "@/interface/sticker.interface";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface OrderItem extends Sticker {
  quantity: number;
}

interface OrderState {
  items: OrderItem[];
  client: string;
  discount: number;
  total_price: number;
  addToOrder: (sticker: Sticker, quantity?: number) => void;
  removeFromOrder: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearOrder: () => void;
  clearTotalOrder: () => void;
  addClient: (client: string) => void;
  addDiscount: (discount: number) => void;
  calculateTotal: () => void;
}

export const useOrderStore = create<OrderState>()(
  devtools((set, get) => ({
    items: [],
    client: "",
    discount: 0,
    total_price: 0,

    addToOrder: (sticker, quantity = 1) =>
      set((state) => {
        const existing = state.items.find((item) => item.id === sticker.id);
        if (existing) {
          return {
            items: state.items.map((item) =>
              item.id === sticker.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          };
        }
        return {
          items: [...state.items, { ...sticker, quantity }],
        };
      }),

    removeFromOrder: (id) =>
      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      })),

    updateQuantity: (id, quantity) =>
      set((state) => ({
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      })),

    addClient: (client) => set({ client }),

    addDiscount: (discount) => set({ discount }),

    calculateTotal: () => {
      const { items, discount } = get();

      const subtotal = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const total = subtotal * (1 - discount / 100);

      set({ total_price: total });
    },

    clearOrder: () => set({ items: [] }),
    clearTotalOrder: () =>
      set({ items: [], client: "", discount: 0, total_price: 0 }),
  }))
);
