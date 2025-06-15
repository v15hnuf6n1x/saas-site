
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  role: 'client' | 'admin' | 'owner';
  passwordHash: string;
}

// In a real app, this would be in environment variables
const JWT_SECRET = process.env.VITE_JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRES_IN = '24h';
const COOKIE_NAME = 'nexus_auth_token';

// Sample users with hashed passwords (password: 'demo')
const DEMO_PASSWORD_HASH = '$2a$10$rOzJq9eJQqJ5Km5sKqF5qeKQYHJQqJ5Km5sKqF5qeKQYHJQqJ5Km5';

const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'client@demo.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    company: 'TechCorp Solutions',
    role: 'client',
    passwordHash: DEMO_PASSWORD_HASH
  },
  {
    id: '2',
    name: 'Sarah Admin',
    email: 'admin@nexus.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
    company: 'Nexus Agency',
    role: 'admin',
    passwordHash: DEMO_PASSWORD_HASH
  },
  {
    id: '3',
    name: 'Alex Owner',
    email: 'owner@nexus.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
    company: 'Nexus Agency',
    role: 'owner',
    passwordHash: DEMO_PASSWORD_HASH
  }
];

export interface AuthResult {
  success: boolean;
  user?: Omit<User, 'passwordHash'>;
  error?: string;
}

export const authService = {
  async login(email: string, password: string): Promise<AuthResult> {
    try {
      // Input validation
      if (!email || !password) {
        return { success: false, error: 'Email and password are required' };
      }

      // Find user
      const user = sampleUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return { success: false, error: 'Invalid credentials' };
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.passwordHash);
      if (!isValidPassword) {
        return { success: false, error: 'Invalid credentials' };
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Set secure cookie
      Cookies.set(COOKIE_NAME, token, {
        expires: 1, // 1 day
        secure: window.location.protocol === 'https:',
        sameSite: 'strict'
      });

      const { passwordHash, ...userWithoutPassword } = user;
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  },

  async logout(): Promise<void> {
    Cookies.remove(COOKIE_NAME);
  },

  async getCurrentUser(): Promise<Omit<User, 'passwordHash'> | null> {
    try {
      const token = Cookies.get(COOKIE_NAME);
      if (!token) return null;

      const decoded = jwt.verify(token, JWT_SECRET) as any;
      const user = sampleUsers.find(u => u.id === decoded.userId);
      
      if (!user) return null;

      const { passwordHash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Token verification failed:', error);
      Cookies.remove(COOKIE_NAME);
      return null;
    }
  },

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
};
