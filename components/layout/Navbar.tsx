"use client";
// components/layout/Navbar.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Bell,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Layers,
  Users,
  Zap,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/lib/store/cart";
import { Avatar } from "@/components/ui/Avatar";
import { useSession, signIn, signOut } from "next-auth/react";

const navLinks = [
  {
    label: "Marketplace",
    href: "/marketplace",
    icon: <Layers className="w-4 h-4" />,
    children: [
      { label: "All Characters", href: "/marketplace" },
      { label: "AAA Characters", href: "/marketplace?category=aaa" },
      { label: "Anime", href: "/marketplace?category=anime" },
      { label: "Creatures", href: "/marketplace?category=creatures" },
      { label: "Staff Picks", href: "/marketplace?filter=staff-picks" },
    ],
  },
  {
    label: "Creators",
    href: "/creators",
    icon: <Users className="w-4 h-4" />,
  },
  {
    label: "Studio",
    href: "/studio",
    icon: <Zap className="w-4 h-4" />,
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { count, toggleCart } = useCartStore();
  const cartCount = count();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-strong border-b border-[var(--border-subtle)] py-3"
            : "py-5"
        )}
        style={!scrolled ? { background: "linear-gradient(to bottom, rgba(10,10,26,0.92) 0%, rgba(10,10,26,0.6) 70%, transparent 100%)" } : {}}
      >
        <div className="container-xl flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <Image src="/logo.png" alt="Polyforge Logo" width={32} height={32} className="object-contain" />
            <span
              className="font-display font-800 text-xl tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <span className="text-white">POLYFORGE</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    pathname.startsWith(link.href) && link.href !== "/"
                      ? "text-violet-300 bg-violet-500/10"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5"
                  )}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-transform",
                        activeDropdown === link.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {link.children && activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 w-52">
                    <div className="glass-strong rounded-xl border border-[var(--border-default)] p-1.5 shadow-2xl">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar — desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-xs xl:max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="search"
                placeholder="Search characters, creators…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-9 py-2 text-sm h-9 bg-white/5 border-white/10 focus:bg-white/8"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            {/* Mobile search toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <button className="hidden sm:flex p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors relative" aria-label="Notifications">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
            </button>

            {/* Cart */}
            <button
              id="cart-button"
              onClick={toggleCart}
              className="relative p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-violet-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth */}
            <AuthButtons />

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3 animate-fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="search"
                placeholder="Search characters, creators…"
                autoFocus
                className="input pl-9 text-sm"
              />
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 glass-strong border-l border-[var(--border-default)] p-6 flex flex-col gap-6 animate-fade-in">
            <div className="pt-14 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>
            <hr className="divider" />
            <div className="flex flex-col gap-3">
              <MobileAuthButtons />
            </div>
            <div className="mt-auto text-xs text-[var(--text-muted)]">
              © 2026 POLYFORGE · All rights reserved
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ── Auth Buttons (desktop) ───────────────────────────────────────
function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="w-20 h-8 skeleton rounded-lg" />;
  }

  if (session?.user) {
    return (
      <div className="hidden sm:flex items-center gap-2">
        <span className="text-sm text-[var(--text-secondary)] hidden lg:block">
          {session.user.name ?? session.user.email}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="btn btn-ghost btn-sm hidden lg:flex items-center gap-1"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex items-center gap-2">
      <Link
        href="/login"
        className="btn btn-ghost btn-sm hidden lg:flex"
      >
        Sign In
      </Link>
      <Link
        href="/register"
        className="btn btn-primary btn-sm"
      >
        Get Started
      </Link>
    </div>
  );
}

// ── Auth Buttons (mobile) ────────────────────────────────────────
function MobileAuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (session?.user) {
    return (
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="btn btn-ghost btn-md w-full"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    );
  }

  return (
    <>
      <Link
        href="/register"
        className="btn btn-primary btn-md w-full text-center justify-center flex"
      >
        Get Started
      </Link>
      <Link
        href="/login"
        className="btn btn-ghost btn-md w-full text-center justify-center flex"
      >
        Sign In
      </Link>
    </>
  );
}
