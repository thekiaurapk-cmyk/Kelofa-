export type Role = 'admin' | 'manager' | 'staff';

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  themeColor: string;
  category: string;
  website: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  description: string;
}

export interface Order {
  id: string;
  restaurantId: string;
  customerName: string;
  items: { itemId: string; name: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface WasteLog {
  id: string;
  restaurantId: string;
  itemName: string;
  quantity: number;
  unit: string;
  cost: number;
  date: string;
  reason: string;
}

export interface Customer {
  id: string;
  restaurantId: string;
  name: string;
  phone: string;
  email: string;
  totalSpent: number;
  visits: number;
  lastVisit: string;
}

export interface Category {
  id: string;
  name: string;
}
