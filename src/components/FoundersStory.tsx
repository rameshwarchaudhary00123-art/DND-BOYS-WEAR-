import React from 'react';
import { ShieldCheck, Sparkles, MessageCircle, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { STORE_PHONE_NUMBER } from '../utils/storage';

export const FoundersStory: React.FC = () => {
  return (
    <section id="founders" className="py-16 sm:py-24 bg-[#0c0c0f] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Mission */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400">
              <HeartHandshake className="w-4 h-4 text-amber-500" />
              <span>The Vision Behind DND Boys Wear</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tight leading-tight">
              MEET THE FOUNDERS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-white">
                SANDEEP JAT & CHETAN SHARMA
              </span>
            </h2>

            <p className="text-base text-zinc-300 leading-relaxed">
              We started <strong className="text-white">DND</strong> with one radical rule: high-street fashion shouldn&apos;t require bargaining games or 400% retail markups. 
            </p>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Every pair of 13.5 oz skater baggy jeans, retro flare bell bottoms, heavyweight 280 GSM tees, and resort shirts in our warehouse is personally sampled, fitted, and priced at our guaranteed best fixed rates. No inflated sticker prices followed by haggling—just authentic youth fashion at transparent, direct rates.
            </p>

            {/* Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-amber-400 font-bold text-sm mb-1 font-heading flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> 100% Fixed Rate Promise
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Fair rates for every customer from day one. Zero bargaining stress.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-amber-400 font-bold text-sm mb-1 font-heading flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Direct Founder WhatsApp
                </div>
                <p className="text-xs text-zinc-400 leading-normal">
                  Have a sizing question or custom request? Chat directly with Sandeep & Chetan.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Contact CTA */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_PHONE_NUMBER}?text=${encodeURIComponent('Hello Sandeep & Chetan, I want to inquire about DND Boys Wear streetwear collection!')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/40 hover:border-emerald-500/80 text-sm font-bold transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat Directly with Sandeep & Chetan on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Founder Badges & Visual Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-[#121216] border border-zinc-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-6 relative z-10">
                
                <div className="border-b border-zinc-800 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Store Leadership
                  </span>
                  <h3 className="text-xl font-black text-white font-heading mt-1">
                    DND Boys Wear Headquarters
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Premium Streetwear & Guaranteed Fixed Rates
                  </p>
                </div>

                {/* Co-founder cards */}
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white font-heading">
                        Sandeep Jat
                      </div>
                      <div className="text-xs text-zinc-400">
                        Co-Founder & Sourcing Director
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                      Active Drop Lead
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white font-heading">
                        Chetan Sharma
                      </div>
                      <div className="text-xs text-zinc-400">
                        Co-Founder & Quality Specialist
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                      Denim & Fit Lead
                    </span>
                  </div>
                </div>

                {/* Store Guarantee Stamp */}
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                    Official Fixed Price Guarantee
                  </div>
                  <p className="text-xs text-zinc-300">
                    &ldquo;We guarantee that you get the highest quality streetwear fabrics at genuine fixed prices. No hidden charges.&rdquo;
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
