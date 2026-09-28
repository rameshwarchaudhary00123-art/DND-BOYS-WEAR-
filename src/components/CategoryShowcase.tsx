import React from 'react';
import { ProductCategory } from '../types/store';
import { ArrowUpRight } from 'lucide-react';

interface CategoryShowcaseProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const categoryCards = [
    {
      name: 'Baggy Jeans' as ProductCategory,
      subtitle: 'Skater wide-leg & acid washes',
      fixedRateRange: '₹1,249 – ₹1,399',
      image: '/src/assets/images/baggy_jeans_vintage_blue_1790392657171.jpg',
      tag: 'Trending Worldwide',
    },
    {
      name: 'Bell Bottoms' as ProductCategory,
      subtitle: 'Retro flared denim & bootcut',
      fixedRateRange: '₹1,349 – ₹1,499',
      image: '/src/assets/images/bell_bottom_retro_denim_1790392669038.jpg',
      tag: 'Iconic Revival',
    },
    {
      name: 'Cargo Pants' as ProductCategory,
      subtitle: '8-Pocket tactical utility',
      fixedRateRange: '₹1,149 – ₹1,299',
      image: '/src/assets/images/hero_streetwear_dnd_1790392644043.jpg',
      tag: 'Utility Street',
    },
    {
      name: 'Shirts' as ProductCategory,
      subtitle: 'Cuban collar & corduroy shackets',
      fixedRateRange: '₹849 – ₹1,149',
      image: '/src/assets/images/cuban_collar_printed_shirt_1790392690454.jpg',
      tag: 'Resort & Urban',
    },
    {
      name: 'Oversized Tees' as ProductCategory,
      subtitle: '280 GSM heavy drop-shoulder',
      fixedRateRange: '₹599 – ₹749',
      image: '/src/assets/images/oversized_street_tee_black_1790392679798.jpg',
      tag: 'Heavyweight Fit',
    },
  ];

  return (
    <section id="categories" className="py-14 sm:py-20 bg-[#09090b] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1.5">
              Curated Silhouettes
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
              EXPLORE BY CATEGORY
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md">
            Click any silhouette to filter the shop catalog. Every piece is priced with our guaranteed best fixed rates.
          </p>
        </div>

        {/* 5-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {categoryCards.map((cat) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => {
                  onSelectCategory(cat.name);
                  const shopEl = document.getElementById('shop');
                  if (shopEl) {
                    shopEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`group relative text-left rounded-xl overflow-hidden border transition-all duration-300 flex flex-col h-[320px] cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 ring-2 ring-amber-400/30 shadow-lg shadow-amber-400/10'
                    : 'border-zinc-800 hover:border-zinc-600 bg-zinc-900'
                }`}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-60 group-hover:brightness-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent" />
                </div>

                {/* Top Tag */}
                <div className="relative z-10 p-4 flex justify-between items-start">
                  <span className="text-[11px] font-semibold text-zinc-300 uppercase tracking-wider bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    {cat.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-300 group-hover:text-amber-400 group-hover:border-amber-400/40 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 mt-auto p-4 space-y-1">
                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-1">
                    {cat.subtitle}
                  </p>
                  <div className="pt-2 text-[11px] font-mono font-semibold text-amber-400">
                    Fixed Rates: {cat.fixedRateRange}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
