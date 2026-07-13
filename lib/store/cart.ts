// lib/store/cart.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Asset } from "@/lib/mock/assets";

interface CartItem {
  asset: Asset;
  licenseType: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (asset: Asset, licenseType?: string) => void;
  removeItem: (assetId: string) => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (asset, licenseType = "commercial") => {
        const existing = get().items.find((i) => i.asset.id === asset.id);
        if (!existing) {
          set((s) => ({
            items: [...s.items, { asset, licenseType, quantity: 1 }],
            isOpen: true,
          }));
        }
      },
      removeItem: (assetId) =>
        set((s) => ({ items: s.items.filter((i) => i.asset.id !== assetId) })),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      total: () => get().items.reduce((sum, i) => sum + i.asset.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "dacp-cart" }
  )
);
