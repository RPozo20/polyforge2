// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { SessionProvider } from "@/components/providers/SessionProvider";


export const metadata: Metadata = {
  title: {
    default: "POLYFORGE — Digital Asset Commerce Platform",
    template: "%s | POLYFORGE",
  },
  description:
    "Discover, buy, and sell premium AAA-quality 3D characters and digital assets. The world's most advanced marketplace for game developers, VFX studios, and 3D artists.",
  keywords: [
    "3D characters",
    "game assets",
    "AAA characters",
    "digital assets marketplace",
    "3D models",
    "character rigging",
    "Unreal Engine assets",
    "Unity assets",
  ],
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dacp.io",
    siteName: "POLYFORGE",
    title: "POLYFORGE — Digital Asset Commerce Platform",
    description:
      "The world's most advanced marketplace for premium 3D characters and digital assets.",
  },
  twitter: {
    card: "summary_large_image",
    title: "POLYFORGE — Digital Asset Commerce Platform",
    description: "Discover premium AAA-quality 3D characters and digital assets.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <SessionProvider>
          <Navbar />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
