'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Help Center', href: '/' },
    { label: 'Resolution Center', href: '/disputes', badge: '2 Active' },
    { label: 'Account Security', href: '/recovery' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Identifier */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-[#0066cc] text-white flex items-center justify-center font-black text-sm shadow-xs group-hover:scale-105 transition-transform duration-200">
              <i>P</i>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight text-slate-900 leading-none">
                PayPal
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                Support
              </span>
            </div>
          </Link>

          {/* Minimalist Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'text-[#0066cc] bg-blue-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-bold bg-amber-400 text-slate-950 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search Launcher Trigger */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenSearch}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-500 hover:border-slate-300 text-xs font-medium transition-all group"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0066cc] transition-colors" />
            <span className="hidden sm:inline">Search support & disputes...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.2 text-[9px] font-bold bg-white border border-slate-200 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>
        </div>

      </div>
    </header>
  );
}
