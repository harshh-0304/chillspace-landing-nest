
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Mail, Lock, UserCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  userType: z.enum(["guest", "host"]).default("guest"),
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [emailConfirmationMessage, setEmailConfirmationMessage] = useState(null);
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const { user, isLoading: authLoading, signIn } = useAuth();
  
  useEffect(() => {
    // Check if user is already logged in
    if (!authLoading) {
      if (user) {
        // User is already logged in, redirect to profile page
        navigate("/user-profile");
      } else {
        setAuthChecked(true);
      }
    }
  }, [user, authLoading, navigate]);
  
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      userType: "guest",
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    setEmailConfirmationMessage(null);
    
    try {
      console.log('Login form submitted:', values);
      
      // Important: Pass email and password as separate arguments to signIn
      const { error } = await signIn(values.email, values.password);

      if (error) {
        console.log('Login error:', error);
        
        // Handle specific error cases
        if (error.code === 'email_not_confirmed') {
          setEmailConfirmationMessage(
            "Please check your email to confirm your account before logging in. If you don't see the email, check your spam folder."
          );
        }
        
        throw error;
      }

      // Save the userType to localStorage
      localStorage.setItem('userType', values.userType);
      console.log('User type saved to localStorage:', values.userType);
      
      toast.success("Login successful! Redirecting...");
      navigate("/user-profile");
    } catch (error) {
      console.error("Login error:", error);
      uiToast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (authLoading || !authChecked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-chillspace-teal border-t-transparent rounded-full"></div>
        <p className="mt-4 text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="w-full shadow-lg border-none">
            <CardHeader className="space-y-1 bg-chillspace-navy text-white rounded-t-lg">
              <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
              <CardDescription className="text-gray-300 text-center">
                Sign in to your ChillSpace account
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {emailConfirmationMessage && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-300 text-amber-800 rounded-md">
                  {emailConfirmationMessage}
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input 
                              placeholder="you@example.com" 
                              type="email" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <Input 
                              placeholder="********" 
                              type="password" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="userType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>I am a</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <div className="relative">
                              <UserCircle className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                              <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select user type" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="guest">Guest</SelectItem>
                            <SelectItem value="host">Host</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Link to="#" className="text-sm text-chillspace-teal hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-chillspace-teal hover:bg-chillspace-teal/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <span className="mr-2">Signing In</span>
                        <span className="animate-spin">◌</span>
                      </span>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center flex-col space-y-4">
              <div className="text-sm text-center text-gray-500 mt-4">
                Don't have an account yet?{" "}
                <Link to="/signup" className="text-chillspace-teal font-medium hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
