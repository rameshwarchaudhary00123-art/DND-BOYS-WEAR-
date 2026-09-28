/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Product, 
  ProductCategory, 
  CartItem, 
  StoreStats 
} from './types/store';
import { 
  getStoredProducts, 
  saveStoredProducts, 
  getStoredCart, 
  saveStoredCart, 
  getStoredWishlist, 
  saveStoredWishlist, 
  getAdminAuthState, 
  setAdminAuthState, 
  calculateStoreStats,
  resetToSampleProducts,
  STORE_PHONE_NUMBER
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustGuarantees } from './components/TrustGuarantees';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { FoundersStory } from './components/FoundersStory';
import { FixedRateGuarantee } from './components/FixedRateGuarantee';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';
import { 
  SlidersHorizontal, 
  Search, 
  Sparkles, 
  Check, 
  ArrowUpDown, 
  Flame, 
  ShieldCheck,
  Package,
  Layers,
  ShoppingBag
} from 'lucide-react';

export default function App() {
  // Products Catalog State
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);

  // Shop Filters & Sorting
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // Initial Data Load
  useEffect(() => {
    const loadedProducts = getStoredProducts();
    setProducts(loadedProducts);
    setCart(getStoredCart());
    setWishlist(getStoredWishlist());
    setIsAdminLoggedIn(getAdminAuthState());
  }, []);

  // Sync helpers
  const updateAndSaveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    saveStoredProducts(newProducts);
  };

  const updateAndSaveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    saveStoredCart(newCart);
  };

  const updateAndSaveWishlist = (newWishlist: string[]) => {
    setWishlist(newWishlist);
    saveStoredWishlist(newWishlist);
  };

  // Cart Operations
  const handleAddToCart = (product: Product, selectedSize: string) => {
    const size = selectedSize || product.sizes[0] || 'M';
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedSize === size
    );

    let updatedCart: CartItem[];
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { product, selectedSize: size, quantity: 1 }];
    }

    updateAndSaveCart(updatedCart);
    showToast(`Added ${product.name} (Size: ${size}) to Bag!`);
  };

  const handleUpdateCartQuantity = (productId: string, selectedSize: string, delta: number) => {
    const updated = cart
      .map((item) => {
        if (item.product.id === productId && item.selectedSize === selectedSize) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      })
      .filter(Boolean) as CartItem[];

    updateAndSaveCart(updated);
  };

  const handleRemoveFromCart = (productId: string, selectedSize: string) => {
    const updated = cart.filter(
      (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
    );
    updateAndSaveCart(updated);
    showToast('Item removed from cart');
  };

  const handleClearCart = () => {
    updateAndSaveCart([]);
    showToast('Cart cleared');
  };

  // Wishlist Operations
  const handleToggleWishlist = (productId: string) => {
    let updated: string[];
    if (wishlist.includes(productId)) {
      updated = wishlist.filter((id) => id !== productId);
      showToast('Removed from wishlist');
    } else {
      updated = [...wishlist, productId];
      showToast('Saved to wishlist ❤️');
    }
    updateAndSaveWishlist(updated);
  };

  const handleClearWishlist = () => {
    updateAndSaveWishlist([]);
    showToast('Wishlist cleared');
  };

  // Admin Operations
  const handleAdminLogin = (pin: string) => {
    if (pin.trim() === '1234') {
      setIsAdminLoggedIn(true);
      setAdminAuthState(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminAuthState(false);
    showToast('Admin locked');
  };

  const handleAddProduct = (newProductData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: `dnd-custom-${Date.now()}`,
      createdAt: Date.now(),
    };
    const updated = [newProduct, ...products];
    updateAndSaveProducts(updated);
    showToast(`Published "${newProduct.name}" to catalog!`);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    updateAndSaveProducts(updated);
    
    // Also sync in modal if viewing
    if (selectedProductForModal?.id === updatedProduct.id) {
      setSelectedProductForModal(updatedProduct);
    }
    showToast(`Updated "${updatedProduct.name}"`);
  };

  const handleDeleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    updateAndSaveProducts(updated);
    // Remove from cart/wishlist as well
    updateAndSaveCart(cart.filter((item) => item.product.id !== productId));
    updateAndSaveWishlist(wishlist.filter((id) => id !== productId));
    if (selectedProductForModal?.id === productId) {
      setSelectedProductForModal(null);
    }
    showToast('Product removed from catalog');
  };

  const handleQuickToggleStock = (productId: string) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const nextInStock = !p.inStock;
        return {
          ...p,
          inStock: nextInStock,
          stock: nextInStock && p.stock === 0 ? 10 : p.stock,
        };
      }
      return p;
    });
    updateAndSaveProducts(updated);
  };

  const handleQuickUpdatePrice = (productId: string, newPrice: number) => {
    if (isNaN(newPrice) || newPrice < 0) return;
    const updated = products.map((p) => (p.id === productId ? { ...p, price: newPrice } : p));
    updateAndSaveProducts(updated);
  };

  const handleResetData = () => {
    const reset = resetToSampleProducts();
    setProducts(reset);
    showToast('Catalog restored to default streetwear sample items');
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fitType.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabricDetails.toLowerCase().includes(q)
      );
    }

    // Size filter
    if (selectedSizeFilter !== 'All') {
      list = list.filter((p) => p.sizes.includes(selectedSizeFilter));
    }

    // In Stock filter
    if (inStockOnly) {
      list = list.filter((p) => p.inStock && p.stock > 0);
    }

    // Sort order
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else {
      // featured
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [products, selectedCategory, searchQuery, selectedSizeFilter, inStockOnly, sortBy]);

  // Derived Stats for Admin
  const stats: StoreStats = useMemo(() => calculateStoreStats(products), [products]);

  // Total cart count
  const cartBadgeCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Navigation smoothly
  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories: ProductCategory[] = [
    'All',
    'Baggy Jeans',
    'Bell Bottoms',
    'Cargo Pants',
    'Shirts',
    'Oversized Tees',
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* 1. Header & Navigation */}
      <Navbar
        cartCount={cartBadgeCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        
        {/* 2. Hero Section */}
        <Hero
          onExploreClick={() => handleNavigateSection('shop')}
          onWhatsAppClick={() => {
            const defaultMsg = encodeURIComponent('Hello Sandeep & Chetan, I want to explore DND Boys Wear latest fixed rate drops!');
            window.open(`https://wa.me/${STORE_PHONE_NUMBER}?text=${defaultMsg}`, '_blank', 'noopener,noreferrer');
          }}
        />

        {/* 3. Trust & USP Badges */}
        <TrustGuarantees />

        {/* 4. Category Showcase Grid */}
        <CategoryShowcase
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 5. Dynamic Shop & Product Listing Section */}
        <section id="shop" className="py-14 sm:py-20 bg-[#0c0c0f] border-b border-zinc-800 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            {/* Section Header & Subtitle */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>Curated Streetwear Catalog</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight">
                  THE COLLECTION ({filteredProducts.length})
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
                Every silhouette is tested for heavyweight drape, authentic streetwear aesthetics, and transparent fixed pricing.
              </p>
            </div>

            {/* Interactive Filters & Controls Bar */}
            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              
              {/* Category Segmented Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-amber-400 text-black shadow-sm font-bold'
                        : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sorting & Filter Dropdowns */}
              <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end text-xs">
                
                {/* Size Filter */}
                <div className="flex items-center gap-1.5 bg-zinc-800/80 px-2.5 py-1.5 rounded-lg border border-zinc-700/60">
                  <span className="text-zinc-400 font-medium">Size:</span>
                  <select
                    value={selectedSizeFilter}
                    onChange={(e) => setSelectedSizeFilter(e.target.value)}
                    className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="All" className="bg-zinc-900">All Sizes</option>
                    <option value="28" className="bg-zinc-900">28 (Jeans)</option>
                    <option value="30" className="bg-zinc-900">30 (Jeans)</option>
                    <option value="32" className="bg-zinc-900">32 (Jeans)</option>
                    <option value="34" className="bg-zinc-900">34 (Jeans)</option>
                    <option value="36" className="bg-zinc-900">36 (Jeans)</option>
                    <option value="S" className="bg-zinc-900">S (Tees/Shirts)</option>
                    <option value="M" className="bg-zinc-900">M (Tees/Shirts)</option>
                    <option value="L" className="bg-zinc-900">L (Tees/Shirts)</option>
                    <option value="XL" className="bg-zinc-900">XL (Tees/Shirts)</option>
                    <option value="XXL" className="bg-zinc-900">XXL (Tees/Shirts)</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div className="flex items-center gap-1.5 bg-zinc-800/80 px-2.5 py-1.5 rounded-lg border border-zinc-700/60">
                  <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-zinc-400 font-medium">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="featured" className="bg-zinc-900">Featured Drops</option>
                    <option value="price-asc" className="bg-zinc-900">Price: Low to High</option>
                    <option value="price-desc" className="bg-zinc-900">Price: High to Low</option>
                    <option value="newest" className="bg-zinc-900">Newest Arrivals</option>
                  </select>
                </div>

                {/* In-Stock Toggle */}
                <button
                  type="button"
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    inStockOnly
                      ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                      : 'bg-zinc-800/80 border-zinc-700/60 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${inStockOnly ? 'bg-emerald-400' : 'bg-zinc-500'}`} />
                  <span>In Stock Only</span>
                </button>

                {/* Clear all active filters if applied */}
                {(selectedCategory !== 'All' || searchQuery || selectedSizeFilter !== 'All' || inStockOnly) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                      setSelectedSizeFilter('All');
                      setInStockOnly(false);
                      setSortBy('featured');
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold px-2 py-1 underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}

              </div>
            </div>

            {/* Active Search & Filter Indicator */}
            {searchQuery && (
              <div className="text-xs text-zinc-400 flex items-center gap-2">
                <span>Showing results matching &ldquo;<strong className="text-white">{searchQuery}</strong>&rdquo;</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                >
                  Clear search ×
                </button>
              </div>
            )}

            {/* Product Card Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-4">
                <Package className="w-12 h-12 text-zinc-600 mx-auto" />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white font-heading">
                    No streetwear items match this filter
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Try switching categories or clearing search keywords to view our full collection.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setSelectedSizeFilter('All');
                    setInStockOnly(false);
                  }}
                  className="px-5 py-2 rounded-lg bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 transition-colors cursor-pointer"
                >
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={handleAddToCart}
                    onQuickView={setSelectedProductForModal}
                  />
                ))}
              </div>
            )}

          </div>
        </section>

        {/* 6. Fixed Rate Guarantee Deep-Dive */}
        <FixedRateGuarantee />

        {/* 7. Founders Story (Sandeep Jat & Chetan Sharma) */}
        <FoundersStory />

      </main>

      {/* 8. Store Footer */}
      <Footer
        onSelectCategory={setSelectedCategory}
        onNavigateSection={handleNavigateSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* PRODUCT DETAIL MODAL */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        isWishlisted={selectedProductForModal ? wishlist.includes(selectedProductForModal.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* CART SLIDE-OVER DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onShopClick={() => handleNavigateSection('shop')}
      />

      {/* WISHLIST SLIDE-OVER DRAWER */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProductIds={wishlist}
        allProducts={products}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onClearWishlist={handleClearWishlist}
        onShopClick={() => handleNavigateSection('shop')}
      />

      {/* ADMIN CONTROL PANEL MODAL (PIN: 1234) */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        products={products}
        stats={stats}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onQuickToggleStock={handleQuickToggleStock}
        onQuickUpdatePrice={handleQuickUpdatePrice}
        onResetData={handleResetData}
      />

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16161c] text-white px-4 py-3 rounded-xl border border-amber-400/40 shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-slideUp">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
