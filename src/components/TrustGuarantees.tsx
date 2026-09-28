import React from 'react';
import { Tag, Sparkles, RefreshCw, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

export const TrustGuarantees: React.FC = () => {
  const guarantees = [
    {
      icon: <Tag className="w-6 h-6 text-amber-400" />,
      title: "Guaranteed Best Fixed Rates",
      subtitle: "No inflated retail markups or bargaining fatigue. Every item is fixed at honest, competitive direct rates.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: "Premium Heavyweight Fabrics",
      subtitle: "13.5 oz heavy denim and 280+ GSM combed cotton. Built for drape, durability, and true streetwear silhouettes.",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-amber-400" />,
      title: "Weekly High-Street Drops",
      subtitle: "From viral flare bell bottoms to skater baggies and oversized cuban shirts, fresh designs drop every 7 days.",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      title: "Direct WhatsApp Concierge",
      subtitle: "Chat straight with founders Sandeep Jat & Chetan Sharma for size advice, photos, and instant order dispatch.",
    },
  ];

  return (
    <section className="bg-[#0e0e12] border-b border-zinc-800/80 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="p-2.5 w-fit rounded-lg bg-zinc-800/70 mb-4">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-white font-heading mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
