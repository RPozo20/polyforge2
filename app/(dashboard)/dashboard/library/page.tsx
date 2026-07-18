"use client";

import { Download, ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "react-hot-toast";

function LibraryContent() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Cart clearing logic if we just returned from a successful checkout
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (searchParams.get("success")) {
      clearCart();
      toast.success("Purchase successful! Your assets are now in your library.");
      // Optional: remove query param from URL so it doesn't trigger again on refresh
      router.replace("/dashboard/library");
    }
  }, [searchParams, clearCart, router]);

  useEffect(() => {
    async function fetchPurchasedAssets() {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setAssets(data.assets || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPurchasedAssets();
  }, []);

  const filteredAssets = assets.filter((asset) => 
    asset.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">My Library</h1>
          <p className="text-gray-400">Download and manage your purchased 3D models.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search purchases..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {assets.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center text-gray-500 bg-white/5 border border-white/10 rounded-2xl">
            You haven't purchased any models yet. <br />
            <Link href="/marketplace" className="text-violet-400 hover:text-violet-300 mt-2 inline-block">
              Browse the Marketplace
            </Link>
          </div>
        )}
        
        {loading && (
          <div className="col-span-full py-20 flex justify-center">
            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {filteredAssets.map((asset, index) => {
          // Use the secure download API endpoint which generates a presigned URL
          const downloadUrl = `/api/assets/download/${asset.id}`;

          return (
            <div key={`${asset.id}-${index}`} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/50 transition-colors flex flex-col">
              <div className="aspect-[4/3] bg-[#0a0a1a] relative overflow-hidden">
                <Image 
                  src={asset.thumbnail || "https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=600&q=80"} 
                  alt={asset.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="font-medium text-white mb-1">{asset.title}</h3>
                  <p className="text-xs text-gray-500">By {asset.creatorName}</p>
                  <p className="text-[10px] text-gray-600 mt-1">Purchased: {new Date(asset.purchasedAt).toLocaleDateString()}</p>
                </div>
                
                <div className="mt-auto flex flex-col gap-2">
                  <a 
                    href={downloadUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  {asset.receiptUrl && (
                    <a 
                      href={asset.receiptUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Receipt
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LibraryContent />
    </Suspense>
  );
}
