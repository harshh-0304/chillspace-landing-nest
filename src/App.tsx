
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Payment from "./pages/Payment";
import HostProperty from "./pages/HostProperty";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Booking from "./pages/Booking";
import PropertyDetails from "./pages/PropertyDetails";
import SearchResults from "./pages/SearchResults";

const App = () => {
  // Create a client instance that persists across component renders
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/host-property" element={<HostProperty />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/search" element={<SearchResults />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
