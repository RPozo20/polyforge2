"use client";
// app/marketplace/[slug]/page.tsx
import React, { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart, Heart, Share2, Star, Download, Eye,
  CheckCircle, Shield, Zap, Layers, Cpu, ChevronRight,
  Box, Triangle, Bone, Blend
} from "lucide-react";
import { getAssetBySlug, assets as mockAssets } from "@/lib/mock/assets";
import { formatPrice, formatNumber } from "@/lib/utils";
import { RatingStars } from "@/components/ui/RatingStars";
import { Avatar } from "@/components/ui/Avatar";
import { AssetCard } from "@/components/marketplace/AssetCard";
import { useCartStore } from "@/lib/store/cart";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function AssetDetailPage({ params }: PageProps) {
  const { slug } = React.use(params);
  
  const [asset, setAsset] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);
  const [liked, setLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem, items } = useCartStore();

  React.useEffect(() => {
    async function fetchAsset() {
      try {
        const res = await fetch(`/api/assets/${slug}`);
        if (res.ok) {
          const data = await res.json();
          const a = data.asset;
          
          // Map DB format to Asset interface
          setAsset({
            id: a.id,
            slug: a.id,
            title: a.title || "Untitled",
            description: a.description || "",
            thumbnail: a.coverImageKey 
              ? `${process.env.NEXT_PUBLIC_R2_DEV_URL}/${a.coverImageKey}`
              : "https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=600&q=80",
            gallery: a.coverImageKey ? [`${process.env.NEXT_PUBLIC_R2_DEV_URL}/${a.coverImageKey}`] : ["https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=600&q=80"],
            creatorId: a.PK,
            creatorName: a.author?.name || "Studio Admin",
            creatorAvatar: a.author?.avatar || "https://api.dicebear.com/7.x/shapes/svg?seed=fallback",
            category: a.category || "stylized",
            tags: a.tags ? (typeof a.tags === 'string' ? a.tags.split(',') : a.tags) : [],
            price: a.price || 0,
            currency: "USD",
            rating: 5.0,
            reviewCount: 0,
            downloadCount: 0,
            favoriteCount: 0,
            publishedAt: a.createdAt || new Date().toISOString(),
            updatedAt: a.updatedAt || new Date().toISOString(),
            featured: true,
            trending: true,
            staffPick: false,
            newRelease: true,
            polyCount: 0,
            triangleCount: 0,
            hasRig: false,
            lodLevels: 0,
            formats: [],
            software: [],
            textureResolution: "N/A",
            hasBlendShapes: false,
            hasBones: false,
            licenseType: "personal",
            accentColor: "#7c3aed"
          });
        } else {
          // Fallback to mock
          const mock = getAssetBySlug(slug);
          if (mock) setAsset(mock);
        }
      } catch (error) {
        // Fallback to mock
        const mock = getAssetBySlug(slug);
        if (mock) setAsset(mock);
      } finally {
        setLoading(false);
      }
    }
    fetchAsset();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center text-violet-400">
        Loading asset details...
      </div>
    );
  }

  if (!asset) notFound();

  const inCart = items.some((i) => i.asset.id === asset.id);

  const handleAddToCart = () => {
    if (inCart) return;
    addItem(asset);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2500);
  };

  const related = mockAssets
    .filter((a) => a.id !== asset.id && a.category === asset.category)
    .slice(0, 4);

  const specs = [
    { icon: <Triangle className="w-4 h-4" />, label: "Triangles", value: asset.triangleCount.toLocaleString('en-US') },
    { icon: <Box className="w-4 h-4" />, label: "Poly Count", value: asset.polyCount.toLocaleString('en-US') },
    { icon: <Layers className="w-4 h-4" />, label: "LOD Levels", value: `${asset.lodLevels} levels` },
    { icon: <Bone className="w-4 h-4" />, label: "Bones", value: asset.boneCount ? `${asset.boneCount}` : "None" },
    { icon: <Blend className="w-4 h-4" />, label: "Blend Shapes", value: asset.hasBlendShapes ? "Yes" : "No" },
    { icon: <Cpu className="w-4 h-4" />, label: "Textures", value: asset.textureResolution },
  ];

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--bg-base)" }}>
      <div className="container-xl py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[var(--text-secondary)] truncate max-w-48">{asset.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left — Gallery */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main image */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[var(--bg-elevated)]">
              <Image
                src={asset.gallery[selectedImage] || asset.thumbnail}
                alt={asset.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
              {/* Badges overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                {asset.staffPick && <span className="badge badge-gold">⭐ Staff Pick</span>}
                {asset.newRelease && <span className="badge badge-success">✦ New</span>}
                {asset.featured && <span className="badge badge-primary">Featured</span>}
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 text-white text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5 text-violet-400" />
                  3D Preview Available
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {asset.gallery.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-14 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === i
                      ? "border-violet-500 scale-95"
                      : "border-[var(--border-subtle)] hover:border-[var(--border-default)]"
                  }`}
                >
                  <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>

            {/* Description */}
            <div className="card p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                About This Asset
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {asset.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {asset.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/marketplace?q=${tag}`}
                    className="badge badge-surface hover:badge-primary transition-all"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Technical specs */}
            <div className="card p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "var(--font-display)" }}>
                Technical Specifications
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {specs.map((spec: any) => (
                  <div
                    key={spec.label}
                    className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
                  >
                    <div className="flex items-center gap-2 text-violet-400 mb-1.5">{spec.icon}</div>
                    <p className="text-xs text-[var(--text-muted)] mb-0.5">{spec.label}</p>
                    <p className="text-sm font-semibold text-white">{spec.value}</p>
                  </div>
                ))}
              </div>

              {/* Formats */}
              <div>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-3">Included Formats</p>
                <div className="flex flex-wrap gap-2">
                  {asset.formats.map((f: any) => (
                    <span key={f.name} className="badge badge-surface">
                      {f.name}{f.version ? ` ${f.version}` : ""}
                    </span>
                  ))}
                </div>
              </div>

              {/* Software */}
              <div>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-3">Compatible Software</p>
                <div className="flex flex-wrap gap-2">
                  {asset.software.map((sw: string) => (
                    <span key={sw} className="badge badge-primary">{sw}</span>
                  ))}
                </div>
              </div>

              {/* Animations */}
              {asset.animations && asset.animations.length > 0 && (
                <div>
                  <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-3">
                    Included Animations ({asset.animations.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {asset.animations.map((anim: string) => (
                      <span key={anim} className="badge badge-surface">{anim}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right — Purchase panel */}
          <div className="space-y-4">
            {/* Price card */}
            <div className="card p-6 space-y-5 sticky top-24">
              {/* Price */}
              <div>
                <div className="flex items-baseline gap-3 mb-1">
                  <span
                    className="text-4xl font-bold text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {formatPrice(asset.price)}
                  </span>
                  {asset.originalPrice && (
                    <span className="text-lg text-[var(--text-muted)] line-through">
                      {formatPrice(asset.originalPrice)}
                    </span>
                  )}
                </div>
                {asset.originalPrice && (
                  <span className="badge badge-success">
                    Save {formatPrice(asset.originalPrice - asset.price)}
                  </span>
                )}
              </div>

              {/* License type */}
              <div className="p-3 rounded-xl bg-violet-500/8 border border-violet-500/20">
                <p className="text-xs text-violet-300 font-semibold uppercase tracking-wider mb-1">
                  {asset.licenseType} License
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {asset.licenseType === "commercial"
                    ? "Full commercial use — games, films, products"
                    : asset.licenseType === "enterprise"
                    ? "Unlimited use including source files"
                    : asset.licenseType === "indie"
                    ? "Commercial use for studios earning under $100K/year"
                    : "Personal & educational use only"}
                </p>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  id="detail-add-to-cart"
                  onClick={handleAddToCart}
                  className={`w-full btn btn-lg ${
                    inCart || justAdded ? "btn-secondary" : "btn-primary"
                  }`}
                >
                  {justAdded || inCart ? (
                    <><CheckCircle className="w-5 h-5" /> Added to Cart</>
                  ) : (
                    <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
                  )}
                </button>
                <button className="w-full btn btn-gold btn-lg">
                  Buy Now — {formatPrice(asset.price)}
                </button>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex-1 btn btn-ghost btn-sm ${liked ? "text-red-400 border-red-500/30" : ""}`}
                  id="detail-wishlist"
                >
                  <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
                  {liked ? "Saved" : "Save"}
                </button>
                <button className="flex-1 btn btn-ghost btn-sm" id="detail-share">
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>

              <hr className="divider" />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-sm">{asset.rating}</span>
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)]">{asset.reviewCount} reviews</p>
                </div>
                <div>
                  <p className="font-bold text-sm text-white mb-1">{formatNumber(asset.downloadCount)}</p>
                  <p className="text-[10px] text-[var(--text-muted)] flex items-center justify-center gap-0.5">
                    <Download className="w-2.5 h-2.5" /> Downloads
                  </p>
                </div>
                <div>
                  <p className="font-bold text-sm text-white mb-1">{formatNumber(asset.favoriteCount)}</p>
                  <p className="text-[10px] text-[var(--text-muted)] flex items-center justify-center gap-0.5">
                    <Eye className="w-2.5 h-2.5" /> Saves
                  </p>
                </div>
              </div>

              <hr className="divider" />

              {/* Creator mini card */}
              <Link
                href={`/marketplace?creator=${encodeURIComponent(asset.creatorName)}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-elevated)] hover:bg-[var(--bg-overlay)] border border-[var(--border-subtle)] transition-all group"
              >
                <Avatar src={asset.creatorAvatar} name={asset.creatorName} size="md" verified />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                    {asset.creatorName}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-[var(--text-muted)]">Verified Creator</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-violet-400" />
              </Link>

              {/* Guarantees */}
              <div className="space-y-2">
                {[
                  { icon: <Shield className="w-3.5 h-3.5" />, text: "Secure checkout" },
                  { icon: <Download className="w-3.5 h-3.5" />, text: "Instant download after purchase" },
                  { icon: <CheckCircle className="w-3.5 h-3.5" />, text: "30-day quality guarantee" },
                ].map((g) => (
                  <div key={g.text} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span className="text-green-400">{g.icon}</span>
                    {g.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related assets */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              More Like This
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {related.map((a) => (
                <AssetCard key={a.id} asset={a} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
