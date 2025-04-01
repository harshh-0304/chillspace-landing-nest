
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
          
          if (currentSession?.user) {
            // When user logs in, set user type from metadata
            const userType = currentSession.user.user_metadata?.user_type;
            if (userType) {
              localStorage.setItem('userType', userType);
              console.log('User type set from auth state change:', userType);
            }
          } else if (event === 'SIGNED_OUT') {
            // Clear user type on sign out
            localStorage.removeItem('userType');
            console.log('User type cleared on sign out');
          }
          
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          setIsLoading(false);
        }
      );
      
      // Then check for existing session
      const { data } = await supabase.auth.getSession();
      console.log('Initial session check:', data.session?.user?.id);
      
      if (data.session?.user) {
        // Set user type from metadata if it exists
        const userType = data.session.user.user_metadata?.user_type;
        if (userType) {
          localStorage.setItem('userType', userType);
          console.log('User type set from initial session:', userType);
        }
      }
      
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
        console.error('Login error:', error.message, 'Error code:', error.status, error);
        toast.error(error.message || 'Login failed');
        return { error };
      }

      console.log('Sign in successful:', data.user?.id);
      
      // Set user type in localStorage if it exists in user metadata
      if (data.user?.user_metadata?.user_type) {
        localStorage.setItem('userType', data.user.user_metadata.user_type);
        console.log('User type set from sign in:', data.user.user_metadata.user_type);
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
      console.log('Attempting sign up for:', email, 'as', userType);
      
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
        console.error('Sign up error:', error.message, 'Error code:', error.status);
        toast.error(error.message || 'Sign up failed');
        return { error };
      }

      console.log('Sign up successful, confirmation status:', data.user?.confirmed_at ? 'confirmed' : 'pending confirmation');
      
      // Store user type in localStorage
      localStorage.setItem('userType', userType);
      console.log('User type set on sign up:', userType);
      
      toast.success('Signed up successfully! Please check your email to confirm your account.');
      return { error: null };
    } catch (err) {
      console.error('Unexpected sign up error:', err);
      toast.error('An unexpected error occurred');
      return { error: err as AuthError };
    }
  };

  const signOut = async () => {
    try {
      console.log('Attempting sign out');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Logout error:', error.message);
        toast.error(error.message || 'Sign out failed');
      } else {
        // Clear user type from localStorage
        localStorage.removeItem('userType');
        console.log('User type cleared on sign out');
        toast.success('Signed out successfully');
      }
    } catch (err) {
      console.error('Unexpected sign out error:', err);
      toast.error('An unexpected error occurred while signing out');
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
