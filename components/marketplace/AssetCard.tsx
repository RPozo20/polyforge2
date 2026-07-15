"use client";
// components/marketplace/AssetCard.tsx
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart, Eye, Zap, CheckCircle } from "lucide-react";
import type { Asset } from "@/lib/mock/assets";
import { formatPrice } from "@/lib/utils";
import { RatingStars } from "@/components/ui/RatingStars";
import { Avatar } from "@/components/ui/Avatar";
import { useCartStore } from "@/lib/store/cart";

interface AssetCardProps {
  asset: Asset;
  variant?: "default" | "compact" | "featured";
}

export function AssetCard({ asset, variant = "default" }: AssetCardProps) {
  const [liked, setLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem, items } = useCartStore();
  const inCart = items.some((i) => i.asset.id === asset.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCart) return;
    addItem(asset);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
  };

  return (
    <article className="group card overflow-hidden h-full flex flex-col relative transition-all hover:border-[rgba(124,58,237,0.35)] hover:-translate-y-0.5 hover:shadow-lg">
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-[var(--bg-elevated)]">
        <Link href={`/marketplace/${asset.slug}`} className="block">
          <div
            className={variant === "compact" ? "aspect-[3/2]" : "aspect-[4/3]"}
          >
            <Image
              src={asset.thumbnail}
              alt={asset.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          </div>

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </Link>

        {/* Quick actions */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={handleAddToCart}
            id={`add-to-cart-${asset.id}`}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all ${
              inCart || justAdded
                ? "bg-green-500/90 text-white"
                : "bg-violet-600/90 hover:bg-violet-500 text-white"
            }`}
            aria-label={inCart ? "In cart" : "Add to cart"}
          >
            {justAdded || inCart ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                Add to Cart
              </>
            )}
          </button>
          <button
            onClick={handleLike}
            id={`like-${asset.id}`}
            className={`p-2 rounded-lg backdrop-blur-sm transition-all ${
              liked
                ? "bg-red-500/80 text-white"
                : "bg-black/40 text-white hover:bg-red-500/60"
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
          </button>
          <Link
            href={`/marketplace/${asset.slug}`}
            className="p-2 rounded-lg bg-black/40 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
            onClick={(e) => e.stopPropagation()}
            aria-label="Preview"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {asset.staffPick && (
            <span className="badge badge-gold text-[10px]">⭐ Staff Pick</span>
          )}
          {asset.newRelease && (
            <span className="badge badge-success text-[10px]">✦ New</span>
          )}
          {asset.trending && !asset.newRelease && (
            <span className="badge badge-danger text-[10px]">🔥 Hot</span>
          )}
        </div>

        {/* Discount badge */}
        {asset.originalPrice && (
          <div className="absolute top-2.5 right-2.5">
            <span className="badge badge-primary text-[10px]">
              -{Math.round((1 - asset.price / asset.originalPrice) * 100)}%
            </span>
          </div>
        )}

        {/* 3D indicator */}
        <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white/80 text-[10px] font-semibold">
            <Zap className="w-2.5 h-2.5" />
            3D
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-2.5">
        {/* Creator */}
        <div className="flex items-center gap-2">
          <Avatar
            src={asset.creatorAvatar}
            name={asset.creatorName}
            size="xs"
          />
          <span className="text-xs text-[var(--text-muted)] hover:text-violet-400 transition-colors truncate">
            {asset.creatorName}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug truncate-2 transition-colors">
          <Link href={`/marketplace/${asset.slug}`} className="text-[var(--text-primary)] hover:text-violet-300">
            {asset.title}
          </Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <RatingStars rating={asset.rating} size="sm" showValue reviewCount={asset.reviewCount} />
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--border-subtle)]">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-white text-sm">
              {formatPrice(asset.price)}
            </span>
            {asset.originalPrice && (
              <span className="text-xs text-[var(--text-muted)] line-through">
                {formatPrice(asset.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-[var(--text-muted)] capitalize border border-[var(--border-subtle)] px-1.5 py-0.5 rounded">
            {asset.licenseType}
          </span>
        </div>
      </div>
    </article>
  );
}
