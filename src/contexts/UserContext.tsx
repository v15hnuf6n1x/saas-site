
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
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
  const [user] = useState<User>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    company: 'TechCorp Solutions'
  });

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
      markNotificationAsRead,
      markAllAsRead,
      addNotification
    }}>
      {children}
    </UserContext.Provider>
  );
};
