import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { getCurrentUser } from '../api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await SecureStore.getItemAsync('auth_token');
      if (token) {
        setIsAuthenticated(true);
        const userData = await getCurrentUser();
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed', error);
      await logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (token: string) => {
    await SecureStore.setItemAsync('auth_token', token);
    setIsAuthenticated(true);
    const userData = await getCurrentUser();
    setUser(userData);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('auth_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
