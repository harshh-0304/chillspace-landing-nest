
import { useState, useEffect, createContext, useContext } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUp: (email: string, password: string, userType: string, fullName: string) => Promise<{ error: AuthError | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      setIsLoading(true);
      
      // Set up auth state listener first
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (event, currentSession) => {
          console.log('Auth state changed:', event, currentSession?.user?.id);
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setIsLoading(false);
        }
      );
      
      // Then check for existing session
      const { data } = await supabase.auth.getSession();
      console.log('Initial session check:', data.session?.user?.id);
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setIsLoading(false);
      
      return () => {
        subscription.unsubscribe();
      };
    };

    const unsubscribe = initializeAuth();
    
    return () => {
      // Cleanup function
      unsubscribe.then(fn => fn && fn());
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting sign in for:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error.message);
        toast.error(error.message || 'Login failed');
        return { error };
      }

      console.log('Sign in successful:', data.user?.id);
      
      // Set user type in localStorage if it was passed in signUp
      if (data.user?.user_metadata?.user_type) {
        localStorage.setItem('userType', data.user.user_metadata.user_type);
      }
      
      toast.success('Logged in successfully');
      return { error: null };
    } catch (err) {
      console.error('Unexpected login error:', err);
      toast.error('An unexpected error occurred');
      return { error: err as AuthError };
    }
  };

  const signUp = async (email: string, password: string, userType: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_type: userType,
            full_name: fullName,
          },
        },
      });

      if (error) {
        toast.error(error.message || 'Sign up failed');
        return { error };
      }

      // Store user type in localStorage
      localStorage.setItem('userType', userType);
      
      toast.success('Signed up successfully! Please check your email to confirm your account.');
      return { error: null };
    } catch (err) {
      toast.error('An unexpected error occurred');
      return { error: err as AuthError };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error.message);
      toast.error(error.message || 'Sign out failed');
    } else {
      // Clear user type from localStorage
      localStorage.removeItem('userType');
      toast.success('Signed out successfully');
    }
  };

  const value = {
    session,
    user,
    isLoading,
    signOut,
    signIn,
    signUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
