import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  RotateCcw, 
  Lock, 
  Unlock, 
  Package, 
  AlertTriangle, 
  DollarSign, 
  BarChart3, 
  Check, 
  Upload, 
  Download, 
  Sparkles,
  Layers,
  Image as ImageIcon,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { Product, ProductCategory, ProductTag, StoreStats } from '../types/store';
import { PRESET_IMAGE_OPTIONS } from '../data/seedProducts';
import { formatPrice } from '../utils/storage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdminLoggedIn: boolean;
  onLogin: (pin: string) => boolean;
  onLogout: () => void;
  products: Product[];
  stats: StoreStats;
  onAddProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onQuickToggleStock: (productId: string) => void;
  onQuickUpdatePrice: (productId: string, newPrice: number) => void;
  onResetData: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAdminLoggedIn,
  onLogin,
  onLogout,
  products,
  stats,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onQuickToggleStock,
  onQuickUpdatePrice,
  onResetData,
}) => {
  if (!isOpen) return null;

  // PIN Login State
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Admin Tab: 'inventory' | 'add' | 'stats'
  const [activeTab, setActiveTab] = useState<'inventory' | 'add' | 'stats'>('inventory');

  // Editing Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Add / Edit Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'Baggy Jeans' as ProductCategory,
    price: 1299,
    originalMrp: 2499,
    sizesInput: '28, 30, 32, 34, 36',
    stock: 20,
    inStock: true,
    tag: 'New Arrival' as ProductTag,
    image: PRESET_IMAGE_OPTIONS[0].url,
    description: 'High-density premium streetwear fabric with authentic relaxed drape and reinforced stitching.',
    fabricDetails: '100% Combed Heavy Cotton Denim (13.5 oz)',
    fitType: 'Relaxed Skater Baggy Fit',
    featured: true,
  });

  const [feedbackMsg, setFeedbackMsg] = useState('');

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 2500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(pinInput);
    if (success) {
      setLoginError(false);
      setPinInput('');
      showFeedback('Admin Access Unlocked!');
    } else {
      setLoginError(true);
    }
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      originalMrp: product.originalMrp,
      sizesInput: product.sizes.join(', '),
      stock: product.stock,
      inStock: product.inStock,
      tag: product.tag || 'None' as ProductTag,
      image: product.image,
      description: product.description,
      fabricDetails: product.fabricDetails,
      fitType: product.fitType,
      featured: !!product.featured,
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const parsedSizes = formData.sizesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updated: Product = {
      ...editingProduct,
      name: formData.name,
      category: formData.category as Product['category'],
      price: Number(formData.price),
      originalMrp: Number(formData.originalMrp),
      sizes: parsedSizes.length > 0 ? parsedSizes : ['M', 'L'],
      stock: Number(formData.stock),
      inStock: formData.inStock && Number(formData.stock) > 0,
      tag: formData.tag === ('None' as any) ? undefined : formData.tag,
      image: formData.image,
      description: formData.description,
      fabricDetails: formData.fabricDetails,
      fitType: formData.fitType,
      featured: formData.featured,
    };

    onUpdateProduct(updated);
    setEditingProduct(null);
    showFeedback('Product updated successfully!');
  };

  const handleAddNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedSizes = formData.sizesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onAddProduct({
      name: formData.name || 'New Streetwear Drop',
      category: formData.category as Product['category'],
      price: Number(formData.price) || 999,
      originalMrp: Number(formData.originalMrp) || 1999,
      sizes: parsedSizes.length > 0 ? parsedSizes : ['M', 'L', 'XL'],
      stock: Number(formData.stock) || 10,
      inStock: formData.inStock,
      tag: formData.tag === ('None' as any) ? undefined : formData.tag,
      image: formData.image,
      description: formData.description,
      fabricDetails: formData.fabricDetails,
      fitType: formData.fitType,
      featured: formData.featured,
    });

    setActiveTab('inventory');
    showFeedback('New product added to store catalog!');
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dnd_products_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showFeedback('Exported catalog backup JSON');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#101014] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-[#0b0b0e]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                  DND Store Manager & Admin
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                  PIN: 1234
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Sandeep Jat & Chetan Sharma · Complete CRUD & Live Inventory Control
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={onLogout}
                className="text-xs text-zinc-400 hover:text-rose-400 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 transition-colors cursor-pointer"
              >
                Lock Admin
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Alert Pill */}
        {feedbackMsg && (
          <div className="bg-emerald-500/20 border-b border-emerald-500/30 px-4 py-2 text-center text-xs font-bold text-emerald-300 flex items-center justify-center gap-1.5 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Content View: Login Gate vs Admin Dashboard */}
        {!isAdminLoggedIn ? (
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-8 h-8" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white font-heading">
                Admin Authentication Required
              </h3>
              <p className="text-xs text-zinc-400">
                Enter your security PIN to manage products, update fixed rates, and control stock.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="Enter PIN (Default: 1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center text-xl tracking-widest bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                  autoFocus
                />
                {loginError && (
                  <p className="text-xs text-rose-400 mt-2 font-medium">
                    Incorrect PIN. Use default <code className="text-white font-bold">1234</code>.
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPinInput('1234')}
                  className="w-1/2 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs font-semibold cursor-pointer"
                >
                  Quick Fill (1234)
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs tracking-wide shadow-md cursor-pointer"
                >
                  Unlock Access
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto flex flex-col">
            
            {/* Navigation Tabs Bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-[#0e0e12] border-b border-zinc-800 gap-2 overflow-x-auto">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'inventory'
                      ? 'bg-amber-400 text-black shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Products Catalog ({products.length})</span>
                </button>

                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setActiveTab('add');
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'add'
                      ? 'bg-amber-400 text-black shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add New Product</span>
                </button>

                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'stats'
                      ? 'bg-amber-400 text-black shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Inventory Analytics</span>
                </button>
              </div>

              {/* Reset & Export Superpowers */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleExportJSON}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Download JSON Backup"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Backup</span>
                </button>

                <button
                  onClick={() => {
                    if (window.confirm('Reset all catalog items to original sample streetwear drops?')) {
                      onResetData();
                      showFeedback('Catalog restored to default sample data!');
                    }
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-rose-950/60 text-zinc-300 hover:text-rose-300 text-xs font-semibold border border-zinc-700 transition-colors flex items-center gap-1 cursor-pointer"
                  title="Restore default sample products"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Data</span>
                </button>
              </div>
            </div>

            {/* TAB 1: PRODUCT CATALOG & QUICK EDIT */}
            {activeTab === 'inventory' && (
              <div className="p-4 sm:p-6 space-y-4">
                
                {/* Stats Metric Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="text-[11px] text-zinc-400">Total Products</div>
                    <div className="text-xl font-bold text-white font-mono">{stats.totalProducts}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="text-[11px] text-zinc-400">Jeans Collection</div>
                    <div className="text-xl font-bold text-amber-400 font-mono">{stats.jeansCount}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="text-[11px] text-zinc-400">Shirts & Tees</div>
                    <div className="text-xl font-bold text-emerald-400 font-mono">{stats.shirtsCount + stats.teesCount}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800">
                    <div className="text-[11px] text-zinc-400">Out of Stock</div>
                    <div className={`text-xl font-bold font-mono ${stats.outOfStockCount > 0 ? 'text-rose-400' : 'text-zinc-400'}`}>
                      {stats.outOfStockCount}
                    </div>
                  </div>
                </div>

                {/* Table of Products */}
                <div className="rounded-xl border border-zinc-800 overflow-hidden bg-zinc-900/40">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#0b0b0e] text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
                        <tr>
                          <th className="py-3 px-4">Item & Silhouette</th>
                          <th className="py-3 px-3">Category</th>
                          <th className="py-3 px-3">Fixed Rate (₹)</th>
                          <th className="py-3 px-3">Sizes</th>
                          <th className="py-3 px-3">Stock Status</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60">
                        {products.map((item) => (
                          <tr key={item.id} className="hover:bg-zinc-800/40 transition-colors">
                            
                            {/* Product Info */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-12 rounded object-cover bg-zinc-800 shrink-0"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="min-w-0 max-w-[200px] sm:max-w-xs">
                                  <div className="font-bold text-white truncate">{item.name}</div>
                                  <div className="text-[11px] text-zinc-400 truncate">{item.fitType}</div>
                                  {item.tag && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono">
                                      {item.tag}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="py-3 px-3 text-zinc-300 whitespace-nowrap">
                              {item.category}
                            </td>

                            {/* Fixed Price (With inline editable input) */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-bold text-amber-400">₹</span>
                                <input
                                  type="number"
                                  value={item.price}
                                  onChange={(e) => onQuickUpdatePrice(item.id, Number(e.target.value))}
                                  className="w-20 bg-zinc-800 border border-zinc-700 rounded px-2 py-1 font-mono font-bold text-white focus:border-amber-400 focus:outline-none"
                                />
                              </div>
                            </td>

                            {/* Available Sizes */}
                            <td className="py-3 px-3">
                              <div className="flex flex-wrap gap-1 max-w-[140px]">
                                {item.sizes.map((s) => (
                                  <span key={s} className="px-1.5 py-0.5 bg-zinc-800 text-zinc-300 rounded font-mono text-[10px]">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* Stock Toggle Button */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <button
                                onClick={() => onQuickToggleStock(item.id)}
                                className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer border ${
                                  item.inStock && item.stock > 0
                                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900'
                                    : 'bg-rose-950/80 text-rose-300 border-rose-700/60 hover:bg-rose-900'
                                }`}
                              >
                                {item.inStock && item.stock > 0 ? `In Stock (${item.stock})` : 'Out of Stock'}
                              </button>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEdit(item)}
                                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-amber-400 hover:text-black text-zinc-300 transition-colors cursor-pointer"
                                  title="Full Edit Modal"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm(`Are you sure you want to permanently delete "${item.name}"?`)) {
                                      onDeleteProduct(item.id);
                                      showFeedback('Product deleted.');
                                    }
                                  }}
                                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-rose-600 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: ADD PRODUCT FORM */}
            {activeTab === 'add' && (
              <div className="p-4 sm:p-6 max-w-3xl mx-auto w-full">
                <div className="mb-6 space-y-1">
                  <h3 className="text-xl font-bold text-white font-heading">
                    Add New Streetwear Drop
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Add a new Baggy Jeans, Bell Bottom, Shirt, or Tee item to the live customer catalog.
                  </p>
                </div>

                <form onSubmit={handleAddNewSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Product Name */}
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Product Title / Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vintage Light Wash Skate Baggy Denim"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="Baggy Jeans">Baggy Jeans</option>
                        <option value="Bell Bottoms">Bell Bottoms</option>
                        <option value="Cargo Pants">Cargo Pants</option>
                        <option value="Shirts">Shirts</option>
                        <option value="Oversized Tees">Oversized Tees</option>
                      </select>
                    </div>

                    {/* Tag */}
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Display Tag
                      </label>
                      <select
                        value={formData.tag}
                        onChange={(e) => setFormData({ ...formData, tag: e.target.value as ProductTag })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="Hot Drop">Hot Drop</option>
                        <option value="New Arrival">New Arrival</option>
                        <option value="Best Seller">Best Seller</option>
                        <option value="Limited Run">Limited Run</option>
                        <option value="Fixed Rate Hero">Fixed Rate Hero</option>
                        <option value="Trending">Trending</option>
                        <option value="None">None</option>
                      </select>
                    </div>

                    {/* Fixed Rate Price */}
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Guaranteed Fixed Price (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2 text-sm text-white font-mono focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    {/* Original MRP */}
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Market MRP Reference (₹)
                      </label>
                      <input
                        type="number"
                        value={formData.originalMrp}
                        onChange={(e) => setFormData({ ...formData, originalMrp: Number(e.target.value) })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2 text-sm text-white font-mono focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    {/* Sizes */}
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Available Sizes (comma-separated)
                      </label>
                      <input
                        type="text"
                        placeholder="28, 30, 32, 34, 36 or S, M, L, XL"
                        value={formData.sizesInput}
                        onChange={(e) => setFormData({ ...formData, sizesInput: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    {/* Initial Stock */}
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Stock Quantity (Units)
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2 text-sm text-white font-mono focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    {/* Fit Type */}
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Fit Profile
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ultra-Relaxed Skater Fit"
                        value={formData.fitType}
                        onChange={(e) => setFormData({ ...formData, fitType: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    {/* Fabric Details */}
                    <div>
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Fabric Composition
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 100% Cotton 13.5 oz Denim"
                        value={formData.fabricDetails}
                        onChange={(e) => setFormData({ ...formData, fabricDetails: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    {/* Image URL with Preset Selector */}
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 block">
                        Product Image Source
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PRESET_IMAGE_OPTIONS.map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() => setFormData({ ...formData, image: opt.url })}
                            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                              formData.image === opt.url
                                ? 'bg-amber-400 text-black font-bold'
                                : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                            }`}
                          >
                            Preset: {opt.label}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Or enter custom Image URL / path"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    {/* Description */}
                    <div className="sm:col-span-2">
                      <label className="text-xs font-semibold text-zinc-300 block mb-1">
                        Product Description
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none resize-none"
                      />
                    </div>

                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                    <button
                      type="button"
                      onClick={() => setActiveTab('inventory')}
                      className="px-4 py-2.5 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs tracking-wide shadow-md cursor-pointer"
                    >
                      Publish Product to Store
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: STATS & ANALYTICS */}
            {activeTab === 'stats' && (
              <div className="p-4 sm:p-6 max-w-4xl mx-auto w-full space-y-6">
                
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white font-heading">
                    Store Inventory & Revenue Breakdown
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Live telemetry calculated from current active store products.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                    <div className="text-xs text-zinc-400">Total Warehouse Stock Valuation</div>
                    <div className="text-2xl font-black text-amber-400 font-mono">
                      {formatPrice(stats.totalInventoryValue)}
                    </div>
                    <div className="text-[11px] text-zinc-500">Based on guaranteed fixed price sum</div>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                    <div className="text-xs text-zinc-400">Active Live SKUs</div>
                    <div className="text-2xl font-black text-white font-mono">
                      {stats.totalProducts} Designs
                    </div>
                    <div className="text-[11px] text-zinc-500">Spread across 5 street categories</div>
                  </div>

                  <div className="p-5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                    <div className="text-xs text-zinc-400">Stock Health</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      {stats.totalProducts - stats.outOfStockCount} Ready
                    </div>
                    <div className="text-[11px] text-rose-400">{stats.outOfStockCount} items need restock</div>
                  </div>
                </div>

                {/* Category Breakdown Bar */}
                <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                  <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Inventory Ratio by Silhouette
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-zinc-400 mb-1">
                        <span>Baggy & Bell Bottom Jeans</span>
                        <span className="font-mono text-white font-bold">{stats.jeansCount} items</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-400 h-full rounded-full" 
                          style={{ width: `${(stats.jeansCount / (stats.totalProducts || 1)) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-zinc-400 mb-1">
                        <span>Printed & Solid Shirts</span>
                        <span className="font-mono text-white font-bold">{stats.shirtsCount} items</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-400 h-full rounded-full" 
                          style={{ width: `${(stats.shirtsCount / (stats.totalProducts || 1)) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-zinc-400 mb-1">
                        <span>Heavyweight Oversized Tees</span>
                        <span className="font-mono text-white font-bold">{stats.teesCount} items</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-400 h-full rounded-full" 
                          style={{ width: `${(stats.teesCount / (stats.totalProducts || 1)) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-zinc-400 mb-1">
                        <span>Tactical Cargo Pants</span>
                        <span className="font-mono text-white font-bold">{stats.cargoCount} items</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-purple-400 h-full rounded-full" 
                          style={{ width: `${(stats.cargoCount / (stats.totalProducts || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>

      {/* SUB-MODAL: FULL EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div 
            className="relative w-full max-w-2xl bg-[#14141a] border border-zinc-700 rounded-2xl p-6 sm:p-8 space-y-5 my-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Edit Streetwear Item
                </h3>
                <p className="text-xs text-zinc-400">ID: {editingProduct.id}</p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1 rounded text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ProductCategory })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Baggy Jeans">Baggy Jeans</option>
                    <option value="Bell Bottoms">Bell Bottoms</option>
                    <option value="Cargo Pants">Cargo Pants</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Oversized Tees">Oversized Tees</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Tag</label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value as ProductTag })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  >
                    <option value="Hot Drop">Hot Drop</option>
                    <option value="New Arrival">New Arrival</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="Limited Run">Limited Run</option>
                    <option value="Fixed Rate Hero">Fixed Rate Hero</option>
                    <option value="Trending">Trending</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Fixed Rate Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Sizes (comma separated)</label>
                  <input
                    type="text"
                    value={formData.sizesInput}
                    onChange={(e) => setFormData({ ...formData, sizesInput: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-zinc-300 block mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

              </div>

              <div className="flex justify-end gap-2.5 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
