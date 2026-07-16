"use client";

import { Bell, Search, UploadCloud } from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { useState, useEffect } from "react";

export function DashboardHeader() {
  const [userName, setUserName] = useState("Studio Admin");
  const [userAvatar, setUserAvatar] = useState("https://i.pravatar.cc/150?u=creator");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            if (data.user.name) setUserName(data.user.name);
            if (data.user.avatarKey) {
              setUserAvatar(`${process.env.NEXT_PUBLIC_R2_DEV_URL}/${data.user.avatarKey}`);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load user profile in header", err);
      }
    }
    fetchUser();
  }, []);

  return (
    <header className="h-20 border-b border-white/5 bg-[#0a0a1a]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8 md:px-10 lg:px-12">
      
      {/* Search Bar */}
      <div className="relative w-full max-w-md hidden md:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search your assets..." 
          className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 ml-auto">
        <Link href="/dashboard/upload" className="btn btn-primary py-2 px-5 hidden sm:flex items-center gap-2 text-sm shadow-[0_0_15px_rgba(124,58,237,0.3)]">
          <UploadCloud className="w-4 h-4" />
          <span>New Asset</span>
        </Link>
        
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0a0a1a]"></span>
        </button>

        <div className="h-8 w-px bg-white/10"></div>

        <button className="flex items-center gap-3">
          <Avatar 
            src={userAvatar} 
            size="sm" 
            name={userName} 
          />
          <div className="text-left hidden lg:block">
            <p className="text-sm font-medium text-white leading-tight">{userName}</p>
            <p className="text-xs text-gray-400">Pro Creator</p>
          </div>
        </button>
      </div>
    </header>
  );
}
