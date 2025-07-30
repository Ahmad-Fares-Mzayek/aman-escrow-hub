// Mock data service for AMN platform
import { useState, useEffect } from 'react';

export interface User {
  id: string;
  sellerId: string;
  name: string;
  email: string;
  avatar?: string;
  totalSpent: number;
  totalReceived: number;
  memberSince: string;
  isOnboarded: boolean;
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  price: number;
  description: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  sellerName: string;
  productId: string;
  productName: string;
  productPrice: number;
  status: 'pending' | 'confirmed' | 'disputed' | 'completed';
  createdAt: string;
  type: 'incoming' | 'outgoing';
}

export interface PlatformStats {
  totalUsers: number;
  totalTransactions: number;
  totalVolumeSAR: number;
}

// Mock data
const mockUsers: User[] = [
  {
    id: 'usr_001',
    sellerId: 'SLR_001',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    totalSpent: 1250.00,
    totalReceived: 3500.00,
    memberSince: '2024-01-15',
    isOnboarded: false
  },
  {
    id: 'usr_002',
    sellerId: 'S12345',
    name: 'Nour Boutique',
    email: 'nour@boutique.com',
    totalSpent: 0,
    totalReceived: 8750.00,
    memberSince: '2024-02-10',
    isOnboarded: true
  },
  {
    id: 'usr_003',
    sellerId: 'S54321',
    name: 'Al Hijaz Crafts',
    email: 'contact@alhijaz.com',
    totalSpent: 0,
    totalReceived: 4200.00,
    memberSince: '2024-03-05',
    isOnboarded: true
  }
];

const mockProducts: Product[] = [
  {
    id: 'P0001',
    sellerId: 'S12345',
    name: 'Handmade Abaya',
    price: 250.00,
    description: 'Beautiful handcrafted abaya with intricate embroidery',
    createdAt: '2024-07-15'
  },
  {
    id: 'P0002',
    sellerId: 'S54321',
    name: 'Desert-Inspired Jewelry Set',
    price: 180.00,
    description: 'Elegant jewelry set inspired by desert themes',
    createdAt: '2024-07-20'
  },
  {
    id: 'PRD_001',
    sellerId: 'SLR_001',
    name: 'iPhone 15 Pro',
    price: 4500.00,
    description: 'iPhone 15 Pro 256GB - جديد بالكرتون',
    createdAt: '2024-07-15'
  },
  {
    id: 'PRD_002',
    sellerId: 'SLR_001',
    name: 'MacBook Air M2',
    price: 6200.00,
    description: 'MacBook Air M2 13" - استخدام خفيف',
    createdAt: '2024-07-20'
  },
  {
    id: 'PRD_003',
    sellerId: 'SLR_002',
    name: 'Samsung Galaxy S24',
    price: 3200.00,
    description: 'Samsung Galaxy S24 Ultra 512GB',
    createdAt: '2024-07-18'
  }
];

const mockTransactions: Transaction[] = [
  {
    id: 'TXN_001',
    buyerId: 'usr_001',
    sellerId: 'S12345',
    sellerName: 'Nour Boutique',
    productId: 'P0001',
    productName: 'Handmade Abaya',
    productPrice: 250.00,
    status: 'pending',
    createdAt: '2024-07-25',
    type: 'outgoing'
  },
  {
    id: 'TXN_002',
    buyerId: 'usr_001',
    sellerId: 'S54321',
    sellerName: 'Al Hijaz Crafts',
    productId: 'P0002',
    productName: 'Desert-Inspired Jewelry Set',
    productPrice: 180.00,
    status: 'confirmed',
    createdAt: '2024-07-24',
    type: 'outgoing'
  },
  {
    id: 'TXN_003',
    buyerId: 'usr_002',
    sellerId: 'SLR_001',
    sellerName: 'أحمد محمد',
    productId: 'PRD_001',
    productName: 'iPhone 15 Pro',
    productPrice: 4500.00,
    status: 'confirmed',
    createdAt: '2024-07-24',
    type: 'incoming'
  },
  {
    id: 'TXN_004',
    buyerId: 'usr_003',
    sellerId: 'SLR_001',
    sellerName: 'أحمد محمد',
    productId: 'PRD_002',
    productName: 'MacBook Air M2',
    productPrice: 6200.00,
    status: 'completed',
    createdAt: '2024-07-22',
    type: 'incoming'
  }
];

// Platform statistics (simulated live data)
export const usePlatformStats = () => {
  const [stats, setStats] = useState<PlatformStats>({
    totalUsers: 12847,
    totalTransactions: 5234,
    totalVolumeSAR: 18750250
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 2),
        totalVolumeSAR: prev.totalVolumeSAR + Math.floor(Math.random() * 1000)
      }));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return stats;
};

// Mock API functions
export const mockAPI = {
  // Authentication
  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem('amn_current_user');
    return stored ? JSON.parse(stored) : null;
  },

  signIn: (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        if (user && password === 'password') {
          localStorage.setItem('amn_current_user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  signUp: (userData: Partial<User>): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: `usr_${Date.now()}`,
          sellerId: `SLR_${Date.now()}`,
          name: userData.name || '',
          email: userData.email || '',
          totalSpent: 0,
          totalReceived: 0,
          memberSince: new Date().toISOString().split('T')[0],
          isOnboarded: false
        };
        localStorage.setItem('amn_current_user', JSON.stringify(newUser));
        resolve(newUser);
      }, 1000);
    });
  },

  signOut: () => {
    localStorage.removeItem('amn_current_user');
  },

  markOnboarded: () => {
    const user = mockAPI.getCurrentUser();
    if (user) {
      user.isOnboarded = true;
      localStorage.setItem('amn_current_user', JSON.stringify(user));
    }
  },

  // Products
  getProductsBySeller: (sellerId: string): Product[] => {
    return mockProducts.filter(p => p.sellerId === sellerId);
  },

  getProductById: (productId: string): Product | null => {
    return mockProducts.find(p => p.id === productId) || null;
  },

  getSellerName: (sellerId: string): string => {
    const user = mockUsers.find(u => u.sellerId === sellerId);
    return user?.name || 'Unknown Seller';
  },

  addProduct: (product: Omit<Product, 'id' | 'createdAt'>): Product => {
    const newProduct: Product = {
      ...product,
      id: `PRD_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  // Transactions
  getUserTransactions: (userId: string): Transaction[] => {
    return mockTransactions.filter(t => t.buyerId === userId || t.sellerId.includes(userId));
  },

  createTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>): Transaction => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `TXN_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    mockTransactions.push(newTransaction);
    return newTransaction;
  },

  updateTransactionStatus: (transactionId: string, status: Transaction['status']): Transaction | null => {
    const transaction = mockTransactions.find(t => t.id === transactionId);
    if (transaction) {
      transaction.status = status;
      return transaction;
    }
    return null;
  }
};

// Formatting utilities
export const formatCurrency = (amount: number, language: string = 'en'): string => {
  if (language === 'ar') {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      currencyDisplay: 'code'
    }).format(amount).replace('SAR', 'SAR');
  }
};

export const formatNumber = (num: number, language: string = 'en'): string => {
  if (language === 'ar') {
    // Use Eastern Arabic numerals
    return new Intl.NumberFormat('ar-EG').format(num);
  } else {
    // Use Western Arabic numerals
    return new Intl.NumberFormat('en-US').format(num);
  }
};

export const formatDate = (dateString: string, language: string = 'en'): string => {
  if (language === 'ar') {
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  } else {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  }
};