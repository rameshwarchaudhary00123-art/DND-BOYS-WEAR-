import { CartItem, CustomerOrderInfo, Product, StoreStats } from '../types/store';
import { INITIAL_PRODUCTS } from '../data/seedProducts';

const PRODUCTS_STORAGE_KEY = 'dnd_boys_wear_products_v1';
const CART_STORAGE_KEY = 'dnd_boys_wear_cart_v1';
const WISHLIST_STORAGE_KEY = 'dnd_boys_wear_wishlist_v1';
const ADMIN_AUTH_KEY = 'dnd_admin_authenticated_v1';

export const STORE_PHONE_NUMBER = '919876543210'; // WhatsApp concierge for Sandeep Jat & Chetan Sharma

export function getStoredProducts(): Product[] {
  try {
    const data = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function saveStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.error('Failed to save products to localStorage', err);
  }
}

export function resetToSampleProducts(): Product[] {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  } catch {
    return INITIAL_PRODUCTS;
  }
}

export function getStoredCart(): CartItem[] {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveStoredCart(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
  }
}

export function getStoredWishlist(): string[] {
  try {
    const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveStoredWishlist(ids: string[]): void {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(ids));
  } catch (err) {
    console.error('Failed to save wishlist to localStorage', err);
  }
}

export function getAdminAuthState(): boolean {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthState(isAuthed: boolean): void {
  try {
    if (isAuthed) {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch (err) {
    console.error('Failed to save admin auth state', err);
  }
}

export function calculateStoreStats(products: Product[]): StoreStats {
  const totalProducts = products.length;
  const outOfStockCount = products.filter(p => !p.inStock || p.stock <= 0).length;
  const lowStockCount = products.filter(p => p.inStock && p.stock > 0 && p.stock <= 5).length;
  const jeansCount = products.filter(p => p.category === 'Baggy Jeans' || p.category === 'Bell Bottoms').length;
  const shirtsCount = products.filter(p => p.category === 'Shirts').length;
  const cargoCount = products.filter(p => p.category === 'Cargo Pants').length;
  const teesCount = products.filter(p => p.category === 'Oversized Tees').length;
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * (p.stock || 0)), 0);

  return {
    totalProducts,
    outOfStockCount,
    lowStockCount,
    jeansCount,
    shirtsCount,
    cargoCount,
    teesCount,
    totalInventoryValue,
  };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatWhatsAppCartOrder(cart: CartItem[], orderInfo: CustomerOrderInfo): string {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  let msg = `🔥 *NEW ORDER - DND BOYS WEAR*\n`;
  msg += `*Attn: Sandeep Jat & Chetan Sharma*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `👤 *Customer Details:*\n`;
  msg += `• *Name:* ${orderInfo.customerName || 'Valued Customer'}\n`;
  msg += `• *Phone:* ${orderInfo.customerPhone || 'Not provided'}\n`;
  msg += `• *Delivery Address:* ${orderInfo.address || 'Address on confirmation'}\n`;
  if (orderInfo.cityPincode) {
    msg += `• *City/Pin:* ${orderInfo.cityPincode}\n`;
  }
  if (orderInfo.notes) {
    msg += `• *Notes:* ${orderInfo.notes}\n`;
  }
  msg += `\n📦 *Order Items (Fixed Rate Guarantee):*\n`;
  
  cart.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.product.name}*\n`;
    msg += `   └ Size: *${item.selectedSize}* | Qty: *${item.quantity}* | Rate: ₹${item.product.price * item.quantity}\n`;
  });

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *TOTAL FIXED AMOUNT: ₹${subtotal.toLocaleString('en-IN')}*\n`;
  msg += `🏷️ *Price Policy:* Guaranteed Best Fixed Rates (No Bargaining Needed)\n`;
  msg += `\nPlease confirm order dispatch and delivery details. Thank you!`;

  return encodeURIComponent(msg);
}

export function formatWhatsAppSingleProduct(product: Product, size: string): string {
  let msg = `🔥 *INQUIRY / DIRECT BUY - DND BOYS WEAR*\n`;
  msg += `*Attn: Sandeep Jat & Chetan Sharma*\n\n`;
  msg += `Hello, I want to order this fixed-rate streetwear item:\n\n`;
  msg += `• *Item:* ${product.name}\n`;
  msg += `• *Category:* ${product.category}\n`;
  msg += `• *Fixed Price:* ₹${product.price.toLocaleString('en-IN')} (MRP ₹${product.originalMrp.toLocaleString('en-IN')})\n`;
  msg += `• *Selected Size:* ${size || product.sizes[0] || 'Default'}\n`;
  msg += `• *Fit:* ${product.fitType}\n`;
  msg += `\nPlease let me know the availability and payment/dispatch steps.`;

  return encodeURIComponent(msg);
}
