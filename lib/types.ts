export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  specs: {
    screen: string;
    cpu: string;
    ram: string;
    storage: string;
    battery: string;
    camera: string;
  };
  colors: string[];
  inStock: boolean;
  isHot?: boolean;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}

export interface OrderData {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  note?: string;
  items: CartItem[];
  total: number;
  orderDate: string;
}
