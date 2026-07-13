"use client";
// components/layout/CartDrawer.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, total } = useCartStore();
  const cartTotal = total();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm z-50 glass-strong border-l border-[var(--border-default)] flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-violet-400" />
            <h2 className="font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Cart
            </h2>
            {items.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-xs font-semibold">
                {items.length}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-[var(--bg-elevated)] flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-[var(--text-muted)]" />
              </div>
              <p className="text-[var(--text-secondary)] font-medium mb-1">Your cart is empty</p>
              <p className="text-sm text-[var(--text-muted)]">Browse the marketplace to find premium assets</p>
              <Link href="/marketplace" onClick={closeCart} className="btn btn-primary btn-sm mt-5">
                Browse Marketplace
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.asset.id}
                className="flex gap-3 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] group"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.asset.thumbnail}
                    alt={item.asset.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{item.asset.title}</p>
                  <p className="text-xs text-[var(--text-muted)] mb-1">{item.asset.creatorName}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-violet-300">
                      {formatPrice(item.asset.price)}
                    </span>
                    <button
                      onClick={() => removeItem(item.asset.id)}
                      className="text-[var(--text-muted)] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[var(--border-subtle)] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[var(--text-secondary)]">Subtotal</span>
              <span className="font-semibold text-white">{formatPrice(cartTotal)}</span>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Checkout
            </Button>
            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-[var(--text-muted)] hover:text-white transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
