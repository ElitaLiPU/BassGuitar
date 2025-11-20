export interface Product {
  id: string;
  name: string;
  category: 'Bass' | 'Preamp' | 'Accessory';
  price: number;
  description: string;
  features: string[];
  image: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum ViewState {
  HOME = 'HOME',
  SHOP = 'SHOP',
  ABOUT = 'ABOUT',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL'
}
