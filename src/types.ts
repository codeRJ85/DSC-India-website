export interface Product {
  id: string;
  title: string;
  shortDescription: string;
  category: 'class3' | 'dgft' | 'foreign' | 'token' | 'renewal';
  price: number;
  originalPrice: number;
  features: string[];
  isBestSeller?: boolean;
  onSale?: boolean;
  rating: number;
  reviewsCount: number;
  type: 'individual' | 'organization' | 'combo' | 'token';
}

export interface CartItem {
  id: string; // unique cart item ID (combines product.id + years + token option)
  product: Product;
  quantity: number;
  selectedYears: 1 | 2 | 3;
  includeToken: boolean;
  calculatedPrice: number;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  dscClass: string;
  state: string;
  message: string;
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  pan?: string;
  aadhaar?: string;
  companyName?: string;
  gstIn?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Pending Verification' | 'Approved' | 'Completed';
  createdAt: string;
}

export interface DriverDownload {
  id: string;
  name: string;
  os: 'Windows' | 'Mac' | 'Linux' | 'All';
  version: string;
  size: string;
  downloadUrl: string;
  category: 'USB Token Driver' | 'Signer Software' | 'Utility';
}
