"use client";
import Link from "next/link";
import { Package, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Package className="w-6 h-6 text-sky-400" />
            <span>henry-delivr</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <Link href="/features" className="hover:text-zinc-100 transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-zinc-100 transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-zinc-100 transition-colors">Docs</Link>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors px-3 py-1.5">
              Sign In
            </Link>
            <Link href="/dashboard" className="text-sm bg-sky-500 hover:bg-sky-400 text-white px-4 py-1.5 rounded-lg transition-colors font-medium">
              Get Started Free
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-zinc-800 px-4 py-4 flex flex-col gap-4 text-sm">
          <Link href="/features" className="text-zinc-400 hover:text-zinc-100">Features</Link>
          <Link href="/pricing" className="text-zinc-400 hover:text-zinc-100">Pricing</Link>
          <Link href="/docs" className="text-zinc-400 hover:text-zinc-100">Docs</Link>
          <Link href="/dashboard" className="bg-sky-500 text-white text-center px-4 py-2 rounded-lg">Get Started Free</Link>
        </div>
      )}
    </nav>
  );
}
