import React, { useState } from 'react';
import { Product } from '../types/store';
import { X, Heart, ShoppingBag, MessageCircle, ShieldCheck, Sparkles, Check, Ruler, Truck, RotateCcw } from 'lucide-react';
import { formatPrice, formatWhatsAppSingleProduct, STORE_PHONE_NUMBER } from '../utils/storage';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, selectedSize: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [added, setAdded] = useState(false);

  const discountPercent = product.originalMrp > product.price
    ? Math.round(((product.originalMrp - product.price) / product.originalMrp) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!product.inStock || product.stock <= 0) return;
    onAddToCart(product, selectedSize || product.sizes[0]);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWhatsApp = () => {
    const encoded = formatWhatsAppSingleProduct(product, selectedSize || product.sizes[0]);
    window.open(`https://wa.me/${STORE_PHONE_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#121216] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white hover:bg-black/90 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Product Image */}
          <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-zinc-900 min-h-[360px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-400 text-black shadow-md">
                {product.tag}
              </span>
            )}
          </div>

          {/* Right: Purchase & Details Module */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Category & Status */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  {product.category}
                </span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  product.inStock && product.stock > 0
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80'
                    : 'bg-rose-950/80 text-rose-300 border border-rose-800/80'
                }`}>
                  {product.inStock && product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                </span>
              </div>

              {/* Title & Fit */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight">
                  {product.name}
                </h2>
                <p className="text-sm font-medium text-zinc-400 mt-1">
                  Fit Profile: <span className="text-zinc-200">{product.fitType}</span>
                </p>
              </div>

              {/* Price Banner */}
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold">
                    Guaranteed Best Fixed Rate
                  </div>
                  <div className="flex items-baseline gap-2.5 mt-0.5">
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalMrp > product.price && (
                      <span className="text-sm text-zinc-500 line-through font-mono">
                        {formatPrice(product.originalMrp)}
                      </span>
                    )}
                  </div>
                </div>
                {discountPercent > 0 && (
                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20">
                      Save ₹{(product.originalMrp - product.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {product.description}
              </p>

              {/* Fabric Specs */}
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 text-xs space-y-1">
                <div className="text-zinc-400 font-medium">Fabric Details:</div>
                <div className="text-zinc-200 font-semibold">{product.fabricDetails}</div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    Select Size:
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{showSizeGuide ? 'Hide Size Guide' : 'Size Guide'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-amber-400 text-black ring-2 ring-amber-400/40 shadow-sm'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                {/* Inline Size Guide helper */}
                {showSizeGuide && (
                  <div className="mt-3 p-3 bg-zinc-900 border border-zinc-800 rounded-lg text-xs space-y-1 text-zinc-300">
                    <p className="font-semibold text-amber-400">DND Streetwear Sizing Standard:</p>
                    <p>• Jeans (28, 30, 32, 34, 36): True to waist with relaxed skater thigh & leg flare stack.</p>
                    <p>• Shirts & Tees (S, M, L, XL, XXL): Designed with authentic boxy oversized drop shoulder fit.</p>
                  </div>
                )}
              </div>

            </div>

            {/* Action CTAs */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={!product.inStock || product.stock <= 0}
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    !product.inStock || product.stock <= 0
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : added
                      ? 'bg-emerald-500 text-black'
                      : 'bg-amber-400 hover:bg-amber-300 text-black shadow-lg shadow-amber-400/10'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border border-emerald-500/40 hover:border-emerald-500/80 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Buy via WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer ${
                    isWishlisted ? 'text-amber-400 font-semibold' : ''
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>
                <span className="flex items-center gap-1 text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sandeep & Chetan Guaranteed</span>
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
