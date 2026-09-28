import React from 'react';
import { ShieldCheck, MessageCircle, Heart, Flame, ArrowUp } from 'lucide-react';
import { ProductCategory } from '../types/store';
import { STORE_PHONE_NUMBER } from '../utils/storage';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateSection,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070709] border-t border-zinc-800 text-zinc-400">
      
      {/* Top Banner Strip */}
      <div className="border-b border-zinc-800/80 py-8 bg-[#0a0a0d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-white font-bold font-heading text-sm sm:text-base">
                Direct WhatsApp Concierge & Custom Sizing
              </h4>
              <p className="text-xs text-zinc-400">
                Founders Sandeep Jat & Chetan Sharma assist you personally for every order.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${STORE_PHONE_NUMBER}?text=${encodeURIComponent('Hello Sandeep & Chetan! I would like to place an order from DND Boys Wear.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-colors cursor-pointer shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-white font-heading tracking-tight">
                DND
              </span>
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
                BOYS WEAR
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Trend Starts Here. Bringing high-street baggy denim, retro bell bottoms, and heavy oversized fits at honest, guaranteed fixed rates.
            </p>
            <div className="text-xs text-zinc-500">
              Founders: <strong className="text-zinc-300">Sandeep Jat & Chetan Sharma</strong>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Categories
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Baggy Jeans');
                    onNavigateSection('shop');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Baggy Jeans
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Bell Bottoms');
                    onNavigateSection('shop');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Bell Bottom Jeans
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Cargo Pants');
                    onNavigateSection('shop');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Utility Cargo Pants
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Shirts');
                    onNavigateSection('shop');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Printed & Casual Shirts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Oversized Tees');
                    onNavigateSection('shop');
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Heavyweight Oversized Tees
                </button>
              </li>
            </ul>
          </div>

          {/* Brand Principles */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Trust & Guarantees
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateSection('guarantee')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Guaranteed Fixed Rates (No Bargaining)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('founders')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  Founder Quality Inspection
                </button>
              </li>
              <li>
                <span className="text-zinc-500">100% Cotton & Heavy Denim</span>
              </li>
              <li>
                <span className="text-zinc-500">Rapid All-India Shipping</span>
              </li>
              <li>
                <span className="text-zinc-500">Easy Size Exchange Support</span>
              </li>
            </ul>
          </div>

          {/* Store Actions & Admin */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Management & Access
            </h5>
            <p className="text-xs text-zinc-400">
              Administer product catalogue, pricing, and live inventory.
            </p>
            <div>
              <button
                onClick={onOpenAdmin}
                className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-amber-300 border border-zinc-700 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Open Store Admin Panel</span>
              </button>
            </div>
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" /> Back to top
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            © {new Date().getFullYear()} DND Boys Wear · Owned by Sandeep Jat & Chetan Sharma · All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Best Fixed Rates Guaranteed</span>
            <span>·</span>
            <span className="text-amber-400/90 font-mono">Trend Starts Here</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
