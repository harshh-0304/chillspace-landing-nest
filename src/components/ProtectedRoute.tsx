
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type ProtectedRouteProps = {
  children: React.ReactNode;
  adminOnly?: boolean;
  hostOnly?: boolean;
};

const ProtectedRoute = ({ 
  children, 
  adminOnly = false,
  hostOnly = false 
}: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If the route requires specific roles, check if user has them
    if (user) {
      const userType = localStorage.getItem('userType') || user.user_metadata?.user_type || 'guest';
      
      if (adminOnly && userType !== 'admin') {
        toast.error("You don't have permission to access this page");
        navigate('/');
      }
      
      if (hostOnly && userType !== 'host') {
        toast.error("Only hosts can access this page");
        navigate('/');
      }
    }
  }, [user, adminOnly, hostOnly, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-chillspace-teal" />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    toast.error("Please log in to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
