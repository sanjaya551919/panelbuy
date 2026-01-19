
export type ProductType = 'panel' | 'bot' | 'app';

export interface Product {
  id: string;
  name: string;
  specs: string;
  price: number;
  type: ProductType;
}

export interface Voucher {
  code: string;
  discount: number;
  expiry: string;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  price: number;
  customerWhatsApp: string;
  customerNote: string;
  status: 'processing' | 'success' | 'failed';
  timestamp: number;
  voucherCode?: string;
}

export interface AdminSettings {
  marqueeText: string;
  marqueeDuration: number;
  ads: string[];
}
