import { create } from 'zustand';
import { Restaurant, MenuItem, Order, WasteLog, Customer, Category } from './types';
import { RESTAURANTS, INITIAL_MENU, INITIAL_ORDERS, INITIAL_WASTE, INITIAL_CUSTOMERS, CATEGORIES } from './data';

interface AppState {
  currentRestaurant: Restaurant | null;
  restaurants: Restaurant[];
  menuItems: MenuItem[];
  orders: Order[];
  wasteLogs: WasteLog[];
  customers: Customer[];
  categories: Category[];
  
  // Actions
  selectRestaurant: (id: string) => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addMenuItem: (item: MenuItem) => void;
  toggleItemAvailability: (id: string) => void;
  addWasteLog: (log: WasteLog) => void;
  addCustomer: (customer: Customer) => void;
}

export const useStore = create<AppState>((set) => ({
  restaurants: RESTAURANTS,
  currentRestaurant: null, // Starts null to show landing page, or pre-select for demo
  menuItems: INITIAL_MENU,
  orders: INITIAL_ORDERS,
  wasteLogs: INITIAL_WASTE,
  customers: INITIAL_CUSTOMERS,
  categories: CATEGORIES,

  selectRestaurant: (id) => set((state) => ({ 
    currentRestaurant: state.restaurants.find(r => r.id === id) || null 
  })),

  addOrder: (order) => set((state) => ({ 
    orders: [order, ...state.orders] 
  })),

  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
  })),

  addMenuItem: (item) => set((state) => ({
    menuItems: [...state.menuItems, item]
  })),

  toggleItemAvailability: (id) => set((state) => ({
    menuItems: state.menuItems.map(m => m.id === id ? { ...m, isAvailable: !m.isAvailable } : m)
  })),

  addWasteLog: (log) => set((state) => ({
    wasteLogs: [log, ...state.wasteLogs]
  })),

  addCustomer: (customer) => set((state) => ({
    customers: [customer, ...state.customers]
  })),
}));
