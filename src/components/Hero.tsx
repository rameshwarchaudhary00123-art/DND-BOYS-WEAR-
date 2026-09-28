import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, Sparkles, Flame, CheckCircle } from 'lucide-react';
import { HERO_IMAGE_PATH } from '../data/seedProducts';
import { STORE_PHONE_NUMBER } from '../utils/storage';

interface HeroProps {
  onExploreClick: () => void;
  onWhatsAppClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onWhatsAppClick }) => {
  return (
    <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center bg-[#09090b] overflow-hidden border-b border-zinc-800">
      
      {/* Background Graphic & Atmospheric Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE_PATH}
          alt="DND Boys Wear Streetwear Lookbook"
          className="w-full h-full object-cover object-center filter brightness-45 contrast-110 scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Graceful fallback gradient background
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Measured dark scrim overlays to maintain 4.5:1 WCAG contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/85 to-transparent lg:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-2xl space-y-6">
          
          {/* Subtle Lead Label */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
            <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
            <span>Curated by Sandeep Jat & Chetan Sharma</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400">Season Drop 2026</span>
          </div>

          {/* Bold Streetwear Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] font-heading">
            UPGRADE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-amber-400">
              STREETWEAR.
            </span>
          </h1>

          {/* Subtitle & Value Proposition */}
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl font-normal">
            Exclusive Collection of Baggy Jeans, Bell Bottoms & Oversized Shirts at Guaranteed Fixed Rates. No bargaining, no marked-up prices—just raw high-street quality.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-amber-400/10 cursor-pointer group"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onWhatsAppClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 font-semibold text-sm transition-all duration-200 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Order via WhatsApp</span>
            </button>
          </div>

          {/* Trust Highlights Checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-zinc-800/80 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-zinc-300 font-medium">100% Fixed Rates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-zinc-300 font-medium">Premium Denim & Cotton</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-zinc-300 font-medium">Weekly Trending Drops</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
