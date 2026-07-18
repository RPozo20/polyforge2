"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  FolderOpen, 
  UploadCloud, 
  Wallet, 
  Settings, 
  LogOut,
  Hexagon,
  Library
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Library", href: "/dashboard/library", icon: Library },
  { name: "My Assets", href: "/dashboard/assets", icon: FolderOpen },
  { name: "Upload", href: "/dashboard/upload", icon: UploadCloud },
  { name: "Earnings", href: "/dashboard/earnings", icon: Wallet },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r border-white/5 bg-[#0a0a1a]/80 backdrop-blur-xl flex flex-col flex-shrink-0 z-50">
      <div className="p-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <Hexagon className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white font-display">
            POLYFORGE
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-4 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "bg-violet-600/10 text-violet-400 border border-violet-500/20 shadow-[inset_0_0_20px_rgba(124,58,237,0.05)]" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-violet-400" : ""}`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5">
        <button className="flex w-full items-center gap-3 px-5 py-4 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
