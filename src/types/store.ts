export type ProductCategory = 
  | 'All'
  | 'Baggy Jeans' 
  | 'Bell Bottoms' 
  | 'Cargo Pants' 
  | 'Shirts' 
  | 'Oversized Tees';

export type ProductTag = 'Hot Drop' | 'New Arrival' | 'Best Seller' | 'Limited Run' | 'Fixed Rate Hero' | 'Trending';

export interface Product {
  id: string;
  name: string;
  category: 'Baggy Jeans' | 'Bell Bottoms' | 'Cargo Pants' | 'Shirts' | 'Oversized Tees';
  price: number; // Guaranteed Fixed Rate in INR
  originalMrp: number; // Market Reference Price
  sizes: string[];
  stock: number;
  inStock: boolean;
  tag?: ProductTag;
  image: string;
  description: string;
  fabricDetails: string;
  fitType: string;
  featured?: boolean;
  createdAt: number;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export interface CustomerOrderInfo {
  customerName: string;
  customerPhone: string;
  address: string;
  cityPincode: string;
  notes: string;
}

export interface StoreStats {
  totalProducts: number;
  outOfStockCount: number;
  lowStockCount: number;
  jeansCount: number;
  shirtsCount: number;
  cargoCount: number;
  teesCount: number;
  totalInventoryValue: number;
}
