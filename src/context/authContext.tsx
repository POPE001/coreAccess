"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: { email: string | null | undefined; id: string } | null;
  subscription: { tier: string; duration: string } | null;
  login: (token: string) => void;
  logout: () => void;
  fetchSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ email: string | null | undefined; id: string } | null>(null);
  const [subscription, setSubscription] = useState<{ tier: string; duration: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decodedUser = getUserFromToken(storedToken);
      setUser(decodedUser);
      setToken(storedToken);
      fetchSubscription(storedToken);
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    const decodedUser = getUserFromToken(newToken);
    setUser(decodedUser);
    setToken(newToken);
    fetchSubscription(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setSubscription(null);
    setToken(null);
  };

  const fetchSubscription = async (authToken: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pricing/subscription`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setSubscription(response.data.subscription);
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, subscription, login, logout, fetchSubscription: () => fetchSubscription(token!) }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const getUserFromToken = (token: string): { email: string | null | undefined; id: string } | null => {
  try {
    const decodedToken = jwtDecode<{ email: string; id: string }>(token);
    return { email: decodedToken.email, id: decodedToken.id };
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

export { AuthProvider, useAuth };
