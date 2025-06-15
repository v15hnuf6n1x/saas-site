
import React, { createContext, useContext, useState, useEffect } from 'react';

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
  notifications: Notification[];
  unreadCount: number;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
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

// Sample users for different roles
const sampleUsers: Record<string, User> = {
  'client@demo.com': {
    id: '1',
    name: 'John Doe',
    email: 'client@demo.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    company: 'TechCorp Solutions',
    role: 'client'
  },
  'admin@nexus.com': {
    id: '2',
    name: 'Sarah Admin',
    email: 'admin@nexus.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    company: 'Nexus Agency',
    role: 'admin'
  },
  'owner@nexus.com': {
    id: '3',
    name: 'Alex Owner',
    email: 'owner@nexus.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    company: 'Nexus Agency',
    role: 'owner'
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('nexus_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple demo authentication
    const foundUser = sampleUsers[email];
    if (foundUser && password === 'demo') {
      setUser(foundUser);
      setIsAuthenticated(true);
      localStorage.setItem('nexus_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('nexus_user');
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
      notifications,
      unreadCount,
      isAuthenticated,
      login,
      logout,
      markNotificationAsRead,
      markAllAsRead,
      addNotification
    }}>
      {children}
    </UserContext.Provider>
  );
};
