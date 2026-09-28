import React from 'react';
import { Product } from '../types/store';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/storage';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProductIds: string[];
  allProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product, selectedSize: string) => void;
  onClearWishlist: () => void;
  onShopClick: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProductIds,
  allProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onClearWishlist,
  onShopClick,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = allProducts.filter((p) =>
    wishlistProductIds.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121216] border-l border-zinc-800 flex flex-col shadow-2xl animate-slideLeft">
          
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-[#0e0e12]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-amber-400 fill-current" />
              <h2 className="text-lg font-bold text-white font-heading">
                My Wishlist ({wishlistedProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                  <Heart className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white font-heading">Your wishlist is empty</h3>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    Save your favorite baggy jeans, bell bottoms, and streetwear pieces.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onShopClick();
                  }}
                  className="px-5 py-2.5 rounded-lg bg-amber-400 text-black font-bold text-xs tracking-wide hover:bg-amber-300 transition-colors cursor-pointer"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              <>
                {wishlistedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex gap-3.5 items-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-20 object-cover rounded-lg bg-zinc-800 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-zinc-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs text-zinc-400">
                        {product.category} · <span className="font-mono text-amber-400 font-bold">{formatPrice(product.price)}</span>
                      </div>

                      <div className="pt-2">
                        <button
                          disabled={!product.inStock || product.stock <= 0}
                          onClick={() => {
                            onAddToCart(product, product.sizes[0] || 'M');
                            onRemoveFromWishlist(product.id);
                          }}
                          className={`w-full py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            !product.inStock || product.stock <= 0
                              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                              : 'bg-amber-400 hover:bg-amber-300 text-black shadow-sm'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" /> Move to Bag (Size {product.sizes[0] || 'M'})
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-2">
                  <button
                    onClick={onClearWishlist}
                    className="text-[11px] text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    Clear Wishlist
                  </button>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
