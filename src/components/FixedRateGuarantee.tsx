import React from 'react';
import { ShieldCheck, CheckCircle2, XCircle, Sparkles, Scale, Zap } from 'lucide-react';

export const FixedRateGuarantee: React.FC = () => {
  return (
    <section id="guarantee" className="py-16 sm:py-20 bg-[#09090b] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>The DND Promise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
            WHY FIXED RATES BENEFIT YOU
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Unlike regular shopping markets that artificially inflate tags by 300% to create a fake illusion of discount bargaining, DND sets the absolute lowest possible price from the first second.
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Traditional Street Market / Bargain Model */}
          <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold font-heading text-lg">
              <XCircle className="w-5 h-5 shrink-0" />
              <span>Other Stores (Bargaining & Markups)</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Inflated MRP tags (e.g., ₹3,000 for standard denim) to trick buyers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Tiring bargaining sessions where different customers pay different rates.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Cheap synthetic blends masquerading as heavy cotton.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>No direct access to the store founders or quality managers.</span>
              </li>
            </ul>
          </div>

          {/* DND Fixed Rate Model */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/30 shadow-xl shadow-amber-500/5 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold font-heading text-lg">
              <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span>DND Boys Wear (Guaranteed Fixed Rate)</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-zinc-200">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Honest Transparent Rates:</strong> Direct fixed rates (₹699–₹1,449) with zero markup tricks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Equal Fair Pricing:</strong> Every customer gets the same verified best price.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Heavyweight Fabrics:</strong> 13.5 oz authentic denim & 280 GSM combed cotton.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">✓</span>
                <span><strong>Direct Support:</strong> Sandeep Jat & Chetan Sharma personally handle order support.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
