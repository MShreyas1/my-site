import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";   // ✅ import Link
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shreyas Muralidharan ",
  description: "PhD student in Electrical Engineering at Stanford. Personal notes, musings, and links.",
  openGraph: {
    title: "Shreyas Muralidharan ",
    description: "PhD student in Electrical Engineering at Stanford. Personal notes, musings, and links.",
    images: ["/images/logo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreyas Muralidharan ",
    description: "PhD student in Electrical Engineering at Stanford. Personal notes, musings, and links.",
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur dark:bg-neutral-950/70">
          <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight">
              mshreyas.com
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="opacity-80 hover:opacity-100">
                Home
              </Link>
              <Link href="/musings" className="opacity-80 hover:opacity-100">
                Musings
              </Link>
              <Link href="/#about" className="opacity-80 hover:opacity-100">
                About
              </Link>
              <Link href="/#contact" className="opacity-80 hover:opacity-100">
                Contact
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
