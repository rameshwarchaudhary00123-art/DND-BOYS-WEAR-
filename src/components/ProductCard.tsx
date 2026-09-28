import React, { useState } from 'react';
import { Product } from '../types/store';
import { Heart, ShoppingBag, MessageCircle, Eye, Check, AlertCircle } from 'lucide-react';
import { formatPrice, formatWhatsAppSingleProduct, STORE_PHONE_NUMBER } from '../utils/storage';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, selectedSize: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const discountPercent = product.originalMrp > product.price
    ? Math.round(((product.originalMrp - product.price) / product.originalMrp) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock || product.stock <= 0) return;
    onAddToCart(product, selectedSize || product.sizes[0]);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleWhatsAppBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const encoded = formatWhatsAppSingleProduct(product, selectedSize || product.sizes[0]);
    window.open(`https://wa.me/${STORE_PHONE_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-[#121216] rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 overflow-hidden cursor-pointer"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-[3/4] w-full bg-zinc-900 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback gracefully to styled dark placeholder
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=600&q=80';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex flex-col gap-1">
            {product.tag && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-black shadow-sm">
                {product.tag}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-[10px] font-semibold tracking-tight px-1.5 py-0.5 rounded bg-zinc-900/90 text-amber-300 border border-amber-500/20 backdrop-blur-sm">
                Save {discountPercent}% vs Retail
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            aria-label="Toggle wishlist"
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 pointer-events-auto cursor-pointer ${
              isWishlisted
                ? 'bg-amber-500 text-black hover:bg-amber-400'
                : 'bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Stock Status Badge if Low or Out of stock */}
        {(!product.inStock || product.stock <= 0) ? (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] flex items-center justify-center p-4">
            <span className="px-3 py-1.5 bg-rose-950/90 text-rose-300 border border-rose-800/80 rounded text-xs font-bold uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        ) : product.stock <= 5 ? (
          <div className="absolute bottom-2.5 left-2.5">
            <span className="text-[10px] font-semibold bg-amber-950/90 text-amber-300 border border-amber-800/80 px-2 py-0.5 rounded backdrop-blur-sm">
              Only {product.stock} left in stock!
            </span>
          </div>
        ) : null}

        {/* Quick View Hover Indicator */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </div>

      {/* Card Info Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        
        {/* Category & Title */}
        <div>
          <div className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider mb-1">
            {product.category}
          </div>
          <h3 className="text-sm sm:text-base font-bold text-white font-heading group-hover:text-amber-300 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
            {product.fitType}
          </p>
        </div>

        {/* Size Selection Pill Buttons */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5">
            <span>Select Size:</span>
            <span className="font-semibold text-amber-400">{selectedSize}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSize(size);
                }}
                className={`px-2 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                  selectedSize === size
                    ? 'bg-amber-400 text-black shadow-sm font-bold'
                    : 'bg-zinc-800/90 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Price & Fixed Rate Badge */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-black text-white font-mono">
              {formatPrice(product.price)}
            </span>
            {product.originalMrp > product.price && (
              <span className="text-xs text-zinc-500 line-through font-mono">
                {formatPrice(product.originalMrp)}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
            Fixed Rate
          </span>
        </div>

        {/* Action Buttons: Add to Cart & WhatsApp Order */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            disabled={!product.inStock || product.stock <= 0}
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              !product.inStock || product.stock <= 0
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : addedAnimation
                ? 'bg-emerald-500 text-black'
                : 'bg-amber-400 hover:bg-amber-300 text-black shadow-sm'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleWhatsAppBuy}
            className="w-full py-2.5 px-2 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            title="Direct inquiry with Sandeep Jat & Chetan Sharma"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
