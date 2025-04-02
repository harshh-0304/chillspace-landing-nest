
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AuthContext = createContext({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  loading: false,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user exists in localStorage
    const storedUser = localStorage.getItem("chillspace_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("chillspace_user");
      }
    }

    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error fetching session:", error);
          setUser(null);
          localStorage.removeItem("chillspace_user");
        } else if (data?.session?.user) {
          setUser(data.session.user);
          localStorage.setItem("chillspace_user", JSON.stringify(data.session.user));
        }
      } catch (error) {
        console.error("Error in auth setup:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Set up subscription for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        
        if (event === "SIGNED_IN" && session?.user) {
          setUser(session.user);
          localStorage.setItem("chillspace_user", JSON.stringify(session.user));
          toast({
            title: "Welcome back!",
            description: "You've successfully signed in.",
          });
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          localStorage.removeItem("chillspace_user");
          toast({
            title: "Signed out",
            description: "You've been successfully signed out.",
          });
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [toast]);

  const signUp = async ({ email, password, firstName, lastName }) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        return { success: false, error };
      }

      toast({
        title: "Sign up successful",
        description: "Please check your email to confirm your account.",
      });
      
      return { success: true, data };
    } catch (error) {
      console.error("Sign up error:", error);
      toast({
        title: "Sign up failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Accept email and password directly, not wrapped in an object
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      console.log('useAuth.jsx: Attempting to sign in with email:', email);
      // Properly pass email and password to signInWithPassword
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Special handling for email confirmation
        if (error.message.includes("Email not confirmed")) {
          toast({
            title: "Email not confirmed",
            description: "Please check your email and confirm your account before signing in.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        }
        console.error("Sign in error:", error);
        return { success: false, error };
      }

      setUser(data.user);
      localStorage.setItem("chillspace_user", JSON.stringify(data.user));
      
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      });
      
      return { success: true, data };
    } catch (error) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
        return { success: false, error };
      }
      
      setUser(null);
      localStorage.removeItem("chillspace_user");
      
      return { success: true };
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        title: "Sign out failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    signUp,
    signIn,
    signOut,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
