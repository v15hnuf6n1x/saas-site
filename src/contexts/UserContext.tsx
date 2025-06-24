import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabaseAuthService, AuthResult } from '@/services/supabaseAuthService';

type UserRole = 'client' | 'admin' | 'owner';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  role: UserRole;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

interface UserContextType {
  user: User | null;
  session: Session | null;
  notifications: Notification[];
  unreadCount: number;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  signup: (email: string, password: string, metadata?: {
    firstName?: string;
    lastName?: string;
    company?: string;
    role?: string;
  }) => Promise<AuthResult>;
  logout: () => Promise<void>;
  markNotificationAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ... keep existing code (notifications state and initial data)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Project Update',
      message: 'E-Commerce Platform performance optimization completed',
      type: 'success',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '2',
      title: 'Security Testing',
      message: 'Mobile Banking App security testing in progress',
      type: 'info',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      read: false
    },
    {
      id: '3',
      title: 'New Feature Deployed',
      message: 'Analytics Dashboard new features deployed successfully',
      type: 'success',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: true
    }
  ]);

  // Set up auth state listener and check for existing session
  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabaseAuthService.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth state changed:', event, session);
        setSession(session);
        
        if (session?.user) {
          const currentUser = await supabaseAuthService.getCurrentUser();
          if (mounted && currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        
        if (mounted) {
          setIsLoading(false);
        }
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const currentUser = await supabaseAuthService.getCurrentUser();
        if (mounted) {
          if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const result = await supabaseAuthService.signIn(email, password);
      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      return result;
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: 'Authentication failed' };
    }
  };

  const signup = async (email: string, password: string, metadata?: {
    firstName?: string;
    lastName?: string;
    company?: string;
    role?: string;
  }): Promise<AuthResult> => {
    try {
      const result = await supabaseAuthService.signUp(email, password, metadata);
      return result;
    } catch (error) {
      console.error('Signup failed:', error);
      return { success: false, error: 'Account creation failed' };
    }
  };

  const logout = async () => {
    try {
      await supabaseAuthService.signOut();
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <UserContext.Provider value={{
      user,
      session,
      notifications,
      unreadCount,
      isAuthenticated,
      isLoading,
      login,
      signup,
      logout,
      markNotificationAsRead,
      markAllAsRead,
      addNotification
    }}>
      {children}
    </UserContext.Provider>
  );
};
