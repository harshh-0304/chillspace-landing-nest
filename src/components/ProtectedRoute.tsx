
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

type ProtectedRouteProps = {
  children: React.ReactNode;
  adminOnly?: boolean;
};

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route requires admin and user is not admin, redirect to home
  // Note: This is a placeholder. You would need to implement adminOnly check based on your user data
  if (adminOnly) {
    // Here you would typically check if the user has admin role
    // For example: if (!user.isAdmin) {...}
    // For now, we'll just return the children
  }

  return <>{children}</>;
};

export default ProtectedRoute;
