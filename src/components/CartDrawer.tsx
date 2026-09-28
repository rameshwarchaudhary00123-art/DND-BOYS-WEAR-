import React, { useState } from 'react';
import { CartItem, CustomerOrderInfo } from '../types/store';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  MessageCircle, 
  Copy, 
  Check, 
  ShieldCheck, 
  Truck,
  ArrowRight,
  User,
  Phone,
  MapPin
} from 'lucide-react';
import { formatPrice, formatWhatsAppCartOrder, STORE_PHONE_NUMBER } from '../utils/storage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, selectedSize: string, delta: number) => void;
  onRemoveItem: (productId: string, selectedSize: string) => void;
  onClearCart: () => void;
  onShopClick: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShopClick,
}) => {
  if (!isOpen) return null;

  const [orderInfo, setOrderInfo] = useState<CustomerOrderInfo>({
    customerName: '',
    customerPhone: '',
    address: '',
    cityPincode: '',
    notes: '',
  });

  const [copied, setCopied] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalMarketMrp = cart.reduce(
    (sum, item) => sum + item.product.originalMrp * item.quantity,
    0
  );

  const totalSaved = totalMarketMrp > subtotal ? totalMarketMrp - subtotal : 0;

  const handleWhatsAppCheckout = () => {
    const encoded = formatWhatsAppCartOrder(cart, orderInfo);
    window.open(`https://wa.me/${STORE_PHONE_NUMBER}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleCopyOrderText = () => {
    const raw = decodeURIComponent(formatWhatsAppCartOrder(cart, orderInfo));
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121216] border-l border-zinc-800 flex flex-col shadow-2xl animate-slideLeft">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-[#0e0e12]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white font-heading">
                Shopping Bag ({cart.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Fixed Rate Guarantee Micro Banner */}
          <div className="bg-amber-400/10 border-b border-amber-400/20 px-4 py-2 flex items-center gap-2 text-xs text-amber-300">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Guaranteed Best Fixed Rates applied automatically.</span>
          </div>

          {/* Cart Item List / Empty State */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white font-heading">Your bag is empty</h3>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    Explore our collection of Baggy Jeans, Bell Bottoms, and Oversized Tees.
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onShopClick();
                  }}
                  className="px-5 py-2.5 rounded-lg bg-amber-400 text-black font-bold text-xs tracking-wide hover:bg-amber-300 transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex gap-3.5 items-center"
                  >
                    {/* Item Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded-lg bg-zinc-800 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                          className="text-zinc-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <span className="bg-zinc-800 px-2 py-0.5 rounded font-mono text-zinc-300 font-semibold">
                          Size: {item.selectedSize}
                        </span>
                        <span>·</span>
                        <span className="text-zinc-400">{item.product.category}</span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <div className="text-xs sm:text-sm font-black text-amber-400 font-mono">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-0.5 border border-zinc-700/60">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                            className="w-6 h-6 flex items-center justify-center text-zinc-300 hover:text-white rounded hover:bg-zinc-700 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white font-mono min-w-[16px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                            className="w-6 h-6 flex items-center justify-center text-zinc-300 hover:text-white rounded hover:bg-zinc-700 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <div className="flex justify-end">
                  <button
                    onClick={onClearCart}
                    className="text-[11px] text-zinc-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    Clear all items
                  </button>
                </div>

                {/* Optional Customer Address Details Collapsible */}
                <div className="mt-4 pt-4 border-t border-zinc-800">
                  <button
                    onClick={() => setShowAddressForm(!showAddressForm)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-zinc-300 hover:text-white p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span>{showAddressForm ? 'Hide Delivery Details' : '+ Add Name & Address for Fast Order'}</span>
                    </span>
                    <span className="text-amber-400 font-mono text-xs">
                      {orderInfo.customerName ? 'Added ✓' : 'Optional'}
                    </span>
                  </button>

                  {showAddressForm && (
                    <div className="mt-3 p-3.5 bg-zinc-900/90 rounded-xl border border-zinc-800 space-y-2.5">
                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Your Full Name:</label>
                        <input
                          type="text"
                          placeholder="e.g. Rahul Sharma"
                          value={orderInfo.customerName}
                          onChange={(e) => setOrderInfo({ ...orderInfo, customerName: e.target.value })}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Phone Number (WhatsApp):</label>
                        <input
                          type="tel"
                          placeholder="e.g. 9876543210"
                          value={orderInfo.customerPhone}
                          onChange={(e) => setOrderInfo({ ...orderInfo, customerPhone: e.target.value })}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] text-zinc-400 block mb-1">Complete Address / Landmark:</label>
                        <textarea
                          rows={2}
                          placeholder="House No., Street, Area, Landmark"
                          value={orderInfo.address}
                          onChange={(e) => setOrderInfo({ ...orderInfo, address: e.target.value })}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-1">City & Pincode:</label>
                          <input
                            type="text"
                            placeholder="e.g. Jaipur 302001"
                            value={orderInfo.cityPincode}
                            onChange={(e) => setOrderInfo({ ...orderInfo, cityPincode: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-zinc-400 block mb-1">Special Notes:</label>
                          <input
                            type="text"
                            placeholder="e.g. Call before delivery"
                            value={orderInfo.notes}
                            onChange={(e) => setOrderInfo({ ...orderInfo, notes: e.target.value })}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Drawer Footer & WhatsApp Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-zinc-800 bg-[#0e0e12] space-y-4">
              
              {/* Pricing Math */}
              <div className="space-y-1.5 text-xs">
                {totalSaved > 0 && (
                  <div className="flex justify-between text-zinc-400">
                    <span>Retail Market MRP:</span>
                    <span className="line-through font-mono">{formatPrice(totalMarketMrp)}</span>
                  </div>
                )}
                {totalSaved > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>DND Fixed Rate Discount:</span>
                    <span className="font-mono">- {formatPrice(totalSaved)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Total Payable:</span>
                  <span className="text-xl font-black text-amber-400 font-mono">
                    {formatPrice(subtotal)}
                  </span>
                </div>
              </div>

              {/* Founders Direct Routing Note */}
              <p className="text-[11px] text-zinc-400 text-center">
                Your order is routed directly to founders <strong className="text-zinc-200">Sandeep Jat & Chetan Sharma</strong> for instant confirmation.
              </p>

              {/* Primary Action: 1-Click WhatsApp Checkout */}
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Order Now via WhatsApp (₹{subtotal.toLocaleString('en-IN')})</span>
                </button>

                {/* Secondary: Copy Order Message */}
                <button
                  onClick={handleCopyOrderText}
                  className="w-full py-2.5 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Order Summary to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Order Text</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
