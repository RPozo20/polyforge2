"use client";

import { MoreHorizontal, Pencil, Trash2, ExternalLink, Search, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AssetManagementPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyAssets() {
      try {
        // Fetch all assets (for dev, assume all belong to user)
        const res = await fetch("/api/assets?feed=marketplace");
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
    fetchMyAssets();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">My Assets</h1>
          <p className="text-gray-400">Manage your uploaded 3D models and store listings.</p>
        </div>
        <Link href="/dashboard/upload" className="btn btn-primary whitespace-nowrap">
          Upload New Asset
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:text-white hover:border-white/20 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <select className="flex-1 sm:flex-none bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 outline-none hover:border-white/20 transition-colors">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Asset</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Sales</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {assets.length === 0 && !loading && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                    No assets found. Upload your first 3D model!
                  </td>
                </tr>
              )}
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#0a0a1a] overflow-hidden flex-shrink-0 relative border border-white/10">
                        <Image src={asset.coverImageKey ? `${process.env.NEXT_PUBLIC_R2_DEV_URL}/${asset.coverImageKey}` : "https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=600&q=80"} alt={asset.title} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-white mb-0.5">{asset.title}</div>
                        <div className="text-xs text-gray-500">{asset.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      asset.status === 'PUBLISHED' 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {asset.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">${asset.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">0</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{new Date(asset.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/marketplace/${asset.id}`} className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg hover:bg-white/10 transition-colors" title="View Store Page">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link href={`/dashboard/upload?edit=${asset.id}`} className="p-2 text-gray-400 hover:text-violet-400 bg-white/5 rounded-lg hover:bg-violet-500/10 transition-colors" title="Edit">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={async () => {
                          if (!confirm("Are you sure you want to delete this asset?")) return;
                          try {
                            const res = await fetch(`/api/assets?id=${asset.id}`, { method: 'DELETE' });
                            if (res.ok) {
                              setAssets(assets.filter(a => a.id !== asset.id));
                            } else {
                              alert("Failed to delete");
                            }
                          } catch (e) {
                            console.error(e);
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-rose-400 bg-white/5 rounded-lg hover:bg-rose-500/10 transition-colors" 
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
