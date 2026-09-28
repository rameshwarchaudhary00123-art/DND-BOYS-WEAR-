import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles,
  Lock,
  Unlock,
  SlidersHorizontal,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { ProductCategory } from '../types/store';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAdmin,
  isAdminLoggedIn,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onNavigateSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpenMobile, setSearchOpenMobile] = useState(false);

  const categories: ProductCategory[] = [
    'All',
    'Baggy Jeans',
    'Bell Bottoms',
    'Cargo Pants',
    'Shirts',
    'Oversized Tees',
  ];

  return (
    <>
      {/* Slim Fixed Rate Guarantee Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border-b border-amber-500/20 py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs font-medium text-amber-300">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Guaranteed Best Fixed Rates · No Bargaining Needed · 100% Genuine Streetwear</span>
          <span className="hidden md:inline text-zinc-500">|</span>
          <span className="hidden md:inline text-zinc-400">Curated by Sandeep Jat & Chetan Sharma</span>
        </div>
      </div>

      {/* Main Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Zone 1: Single-Element Brand Zone */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  onSelectCategory('All');
                  onNavigateSection('home');
                }}
                className="flex items-baseline gap-2 group text-left cursor-pointer focus:outline-none"
              >
                <span className="text-2xl sm:text-3xl font-black tracking-tighter text-white font-heading group-hover:text-amber-400 transition-colors">
                  DND
                </span>
                <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
                  BOYS WEAR
                </span>
              </button>
            </div>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300">
              <button 
                onClick={() => onNavigateSection('home')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
              <button 
                onClick={() => {
                  onSelectCategory('All');
                  onNavigateSection('shop');
                }} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Shop Collection
              </button>
              <button 
                onClick={() => onNavigateSection('categories')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Categories
              </button>
              <button 
                onClick={() => {
                  onSelectCategory('Baggy Jeans');
                  onNavigateSection('shop');
                }} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Baggy Jeans
              </button>
              <button 
                onClick={() => {
                  onSelectCategory('Bell Bottoms');
                  onNavigateSection('shop');
                }} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Bell Bottoms
              </button>
              <button 
                onClick={() => onNavigateSection('guarantee')} 
                className="hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-amber-400/90 hover:text-amber-300"
              >
                <span>Fixed Rate Promise</span>
              </button>
              <button 
                onClick={() => onNavigateSection('founders')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Our Story
              </button>
            </nav>

            {/* Zone 3: Search + Actions + Admin Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Desktop Live Search Bar */}
              <div className="relative hidden md:block w-44 lg:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search denim, tees, shirts..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-zinc-900/90 border border-zinc-700/70 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => onSearchChange('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white text-xs cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Mobile Search Icon Toggle */}
              <button
                onClick={() => setSearchOpenMobile(!searchOpenMobile)}
                aria-label="Toggle search"
                className="md:hidden p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                aria-label="Wishlist"
                className="relative p-2 text-zinc-300 hover:text-amber-400 hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[10px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center font-mono">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag / Cart Button */}
              <button
                onClick={onOpenCart}
                aria-label="Shopping Cart"
                className="relative p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                {cartCount > 0 && (
                  <span className="bg-amber-400 text-black text-xs font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center font-mono">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Admin Panel Toggle Button */}
              <button
                onClick={onOpenAdmin}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  isAdminLoggedIn
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:text-amber-300 hover:border-amber-500/50'
                }`}
                title={isAdminLoggedIn ? "Admin Panel (Unlocked)" : "Admin Login (PIN: 1234)"}
              >
                {isAdminLoggedIn ? (
                  <>
                    <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Admin</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1 rounded font-mono">Active</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Admin</span>
                  </>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 text-zinc-300 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar Dropdown */}
          {searchOpenMobile && (
            <div className="md:hidden py-2 border-t border-zinc-800">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search baggy jeans, bell bottoms, shirts..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                  autoFocus
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-800 bg-[#0c0c0e] px-4 py-5 space-y-4">
            <div className="space-y-1">
              <button
                onClick={() => {
                  onNavigateSection('home');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800/60 rounded-md"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onSelectCategory('All');
                  onNavigateSection('shop');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800/60 rounded-md"
              >
                All Streetwear Collection
              </button>
              <button
                onClick={() => {
                  onNavigateSection('categories');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800/60 rounded-md"
              >
                Browse Categories
              </button>
              <button
                onClick={() => {
                  onSelectCategory('Baggy Jeans');
                  onNavigateSection('shop');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-amber-300 hover:bg-zinc-800/60 rounded-md"
              >
                Baggy Jeans Collection
              </button>
              <button
                onClick={() => {
                  onSelectCategory('Bell Bottoms');
                  onNavigateSection('shop');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-amber-300 hover:bg-zinc-800/60 rounded-md"
              >
                Bell Bottom Jeans
              </button>
              <button
                onClick={() => {
                  onNavigateSection('guarantee');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800/60 rounded-md"
              >
                Fixed Rate Guarantee
              </button>
              <button
                onClick={() => {
                  onNavigateSection('founders');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800/60 rounded-md"
              >
                Founders (Sandeep & Chetan)
              </button>
            </div>

            {/* Mobile Category Fast Bar */}
            <div className="pt-3 border-t border-zinc-800">
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 px-1">
                Quick Category Switch
              </p>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigateSection('shop');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${
                      selectedCategory === cat
                        ? 'bg-amber-400 text-black font-semibold'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
