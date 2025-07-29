import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, mockAPI } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: Partial<User>) => Promise<void>;
  signOut: () => void;
  markOnboarded: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const currentUser = mockAPI.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await mockAPI.signIn(email, password);
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: Partial<User>) => {
    setLoading(true);
    try {
      const user = await mockAPI.signUp(userData);
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    mockAPI.signOut();
    setUser(null);
  };

  const markOnboarded = () => {
    mockAPI.markOnboarded();
    if (user) {
      setUser({ ...user, isOnboarded: true });
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    markOnboarded
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};