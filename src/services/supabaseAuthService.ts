
import { supabase } from '@/integrations/supabase/client';
import { AuthError, User, Session } from '@supabase/supabase-js';

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  role: 'client' | 'admin' | 'owner';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  role: 'client' | 'admin' | 'owner';
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

export const supabaseAuthService = {
  async signUp(email: string, password: string, metadata?: {
    firstName?: string;
    lastName?: string;
    company?: string;
    role?: string;
  }): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: metadata?.firstName || '',
            last_name: metadata?.lastName || '',
            company: metadata?.company || 'Default Company',
            role: metadata?.role || 'client'
          }
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user && data.session) {
        const profile = await this.getProfile(data.user.id);
        if (profile) {
          const authUser = this.mapProfileToAuthUser(data.user, profile);
          return { success: true, user: authUser };
        }
      }

      return { success: true }; // User created but needs email confirmation
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Failed to create account' };
    }
  },

  async signIn(email: string, password: string): Promise<AuthResult> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.user && data.session) {
        const profile = await this.getProfile(data.user.id);
        if (profile) {
          const authUser = this.mapProfileToAuthUser(data.user, profile);
          return { success: true, user: authUser };
        }
      }

      return { success: false, error: 'Failed to load user profile' };
    } catch (error) {
      console.error('Signin error:', error);
      return { success: false, error: 'Authentication failed' };
    }
  },

  async signOut(): Promise<void> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Signout error:', error);
    }
  },

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) return null;

      const profile = await this.getProfile(session.user.id);
      if (profile) {
        return this.mapProfileToAuthUser(session.user, profile);
      }

      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  async getProfile(userId: string): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      return null;
    }
  },

  mapProfileToAuthUser(user: User, profile: Profile): AuthUser {
    return {
      id: user.id,
      name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || user.email?.split('@')[0] || 'User',
      email: user.email || '',
      avatar: profile.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      company: profile.company || 'Default Company',
      role: profile.role
    };
  },

  onAuthStateChange(callback: (event: string, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};
