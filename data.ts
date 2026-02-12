import { Restaurant, MenuItem, Order, WasteLog, Customer, Category } from './types';

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Mystique Restaurants',
    logo: 'https://images.unsplash.com/photo-1514362545857-3bc16549766b?w=100&h=100&fit=crop',
    themeColor: '#C8A951',
    category: 'Premium Dining',
    website: 'mystiquerestaurants.com'
  },
  {
    id: '2',
    name: 'Baranh',
    logo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=100&h=100&fit=crop',
    themeColor: '#1E3A8A',
    category: 'Fine Dining',
    website: 'baranh.pk'
  },
  {
    id: '3',
    name: 'Haveli',
    logo: 'https://images.unsplash.com/photo-1585937421612-70a008356f36?w=100&h=100&fit=crop',
    themeColor: '#E63946',
    category: 'Desi Cuisine',
    website: 'haveli.com.pk'
  }
];

export const CATEGORIES: Category[] = [
  { id: 'cat1', name: 'Starters' },
  { id: 'cat2', name: 'Main Course' },
  { id: 'cat3', name: 'Beverages' },
  { id: 'cat4', name: 'Desserts' },
];

export const INITIAL_MENU: MenuItem[] = [
  { id: 'm1', restaurantId: '1', categoryId: 'cat2', name: 'Gold Leaf Steak', price: 120, isAvailable: true, description: 'Premium cut with 24k gold leaf', image: 'https://images.unsplash.com/photo-1546241072-48010ad2862c?w=400' },
  { id: 'm2', restaurantId: '1', categoryId: 'cat1', name: 'Truffle Fries', price: 18, isAvailable: true, description: 'Hand-cut fries with black truffle oil', image: 'https://images.unsplash.com/photo-1573080496987-a199f8cd6213?w=400' },
  { id: 'm3', restaurantId: '2', categoryId: 'cat2', name: 'Lobster Risotto', price: 45, isAvailable: true, description: 'Creamy arborio rice with fresh lobster', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400' },
  { id: 'm4', restaurantId: '3', categoryId: 'cat2', name: 'Chicken Karahi', price: 25, isAvailable: true, description: 'Traditional spicy chicken stew', image: 'https://images.unsplash.com/photo-1603496987351-f12a3e4d529c?w=400' },
];

export const INITIAL_ORDERS: Order[] = [
  { id: 'o1', restaurantId: '1', customerName: 'John Doe', items: [{ itemId: 'm1', name: 'Gold Leaf Steak', quantity: 1, price: 120 }], total: 120, status: 'pending', createdAt: new Date().toISOString() },
  { id: 'o2', restaurantId: '1', customerName: 'Alice Smith', items: [{ itemId: 'm2', name: 'Truffle Fries', quantity: 2, price: 18 }], total: 36, status: 'preparing', createdAt: new Date(Date.now() - 3600000).toISOString() },
  { id: 'o3', restaurantId: '1', customerName: 'Bob Brown', items: [{ itemId: 'm1', name: 'Gold Leaf Steak', quantity: 1, price: 120 }], total: 120, status: 'completed', createdAt: new Date(Date.now() - 86400000).toISOString() },
];

export const INITIAL_WASTE: WasteLog[] = [
  { id: 'w1', restaurantId: '1', itemName: 'Tomatoes', quantity: 2, unit: 'kg', cost: 15, date: new Date().toISOString(), reason: 'Spoiled' },
  { id: 'w2', restaurantId: '1', itemName: 'Lettuce', quantity: 5, unit: 'heads', cost: 10, date: new Date().toISOString(), reason: 'Wilted' },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c1', restaurantId: '1', name: 'Sarah Connor', phone: '+1234567890', email: 'sarah@example.com', totalSpent: 450, visits: 12, lastVisit: new Date().toISOString() },
  { id: 'c2', restaurantId: '1', name: 'Kyle Reese', phone: '+9876543210', email: 'kyle@example.com', totalSpent: 120, visits: 3, lastVisit: new Date(Date.now() - 86400000 * 5).toISOString() },
];
