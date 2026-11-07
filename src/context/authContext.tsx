"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/utils/supabaseClient';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: { email: string | null | undefined; id: string } | null;
  subscription: { tier: string; duration: string } | null;
  login: (token: string) => void; // Kept for compatibility, but Supabase handles it
  logout: () => void;
  fetchSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ email: string | null | undefined; id: string } | null>(null);
  const [subscription, setSubscription] = useState<{ tier: string; duration: string } | null>(null);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ email: session.user.email, id: session.user.id });
        fetchSubscription(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({ email: session.user.email, id: session.user.id });
          fetchSubscription(session.user.id);
        } else {
          setUser(null);
          setSubscription(null);
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const login = (newToken: string) => {
    // With Supabase, login is usually handled by the authService
    // and caught by onAuthStateChange. This is kept for compatibility if needed.
    console.log("Login called with token. Supabase handles session automatically.");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSubscription(null);
  };

  const fetchSubscription = async (userId: string) => {
    try {
      // Fetch subscription from your 'subscriptions' table in Supabase
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      if (data) {
        setSubscription({ tier: data.tier, duration: data.duration });
      }
    } catch (error) {
      console.error('Failed to fetch subscription:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, subscription, login, logout, fetchSubscription: () => fetchSubscription(user?.id!) }}>
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

export { AuthProvider, useAuth };

