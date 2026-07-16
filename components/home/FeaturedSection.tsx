// components/home/FeaturedSection.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { AssetCard } from "@/components/marketplace/AssetCard";
import { dynamoDb } from "@/lib/dynamodb";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.DYNAMODB_ASSETS_TABLE || "PolyforgeAssets";

async function getRealAssets() {
  try {
    const response = await dynamoDb.send(
      new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1PK = :gsiPk",
        ExpressionAttributeValues: {
          ":gsiPk": "ASSETS",
        },
        ScanIndexForward: false, // Newest first
      })
    );

    const data = response.Items || [];

    return data.map((a: any) => ({
      id: a.id,
      slug: a.id,
      title: a.title || "Untitled",
      description: a.description || "",
      thumbnail: a.coverImageKey
        ? `${process.env.NEXT_PUBLIC_R2_DEV_URL}/${a.coverImageKey}`
        : "https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=600&q=80",
      gallery: [],
      creatorId: a.PK,
      creatorName: a.author?.name || "Studio Admin",
      creatorAvatar: a.author?.avatar || "https://api.dicebear.com/7.x/shapes/svg?seed=fallback",
      category: a.category || "stylized",
      tags: a.tags ? (typeof a.tags === "string" ? a.tags.split(",") : a.tags) : [],
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
      accentColor: "#7c3aed",
    }));
  } catch (error) {
    console.error("Failed to fetch featured assets", error);
    return [];
  }
}

export async function FeaturedSection() {
  const allAssets = await getRealAssets();
  const featured = allAssets.slice(0, 4);

  return (
    <section
      className="section-padding border-t border-[var(--border-subtle)]"
      aria-labelledby="featured-heading"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="container-xl">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Flame className="w-3.5 h-3.5" /> Featured
            </p>
            <h2
              id="featured-heading"
              className="display-md text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Handpicked by Our Experts
            </h2>
          </div>
          <Link
            href="/marketplace?filter=featured"
            className="hidden md:flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-violet-400 transition-colors group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)]">
            No assets found. Be the first to upload!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((asset: any, i: number) => (
              <div
                key={asset.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <AssetCard asset={asset} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export async function TrendingSection() {
  const allAssets = await getRealAssets();
  // For trending, we can just take the next 4, or shuffle them. Here we just take up to 4.
  const trending = allAssets.slice(0, 4);

  return (
    <section className="section-padding" aria-labelledby="trending-heading">
      <div className="container-xl">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              🔥 Trending Now
            </p>
            <h2
              id="trending-heading"
              className="display-md text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What Studios Are Buying
            </h2>
          </div>
          <Link
            href="/marketplace?filter=trending"
            className="hidden md:flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-violet-400 transition-colors group"
          >
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {trending.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)]">
            No trending assets yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {trending.map((asset: any, i: number) => (
              <div
                key={asset.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <AssetCard asset={asset} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
