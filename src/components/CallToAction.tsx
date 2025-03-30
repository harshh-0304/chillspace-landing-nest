
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Building, User, ShieldCheck } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-chillspace-teal to-chillspace-navy text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-chillspace-orange blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
          Ready to Find Your Perfect Chill Space?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90 animate-fade-in">
          Join thousands of happy guests who have discovered their ideal space for relaxation.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center">
            <div className="bg-white text-chillspace-teal p-3 rounded-full mb-4">
              <User className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Guests</h3>
            <p className="text-white/80 text-sm mb-4">Find and book your perfect relaxation space.</p>
            <Button 
              className="bg-white text-chillspace-teal hover:bg-white/90 mt-auto"
              asChild
            >
              <Link to="/user-profile">My Profile</Link>
            </Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center">
            <div className="bg-white text-chillspace-orange p-3 rounded-full mb-4">
              <Building className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Hosts</h3>
            <p className="text-white/80 text-sm mb-4">List your property and start earning today.</p>
            <Button 
              className="bg-chillspace-orange text-white hover:bg-chillspace-orange/90 mt-auto"
              asChild
            >
              <Link to="/host-property">Add Property</Link>
            </Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center">
            <div className="bg-white text-chillspace-navy p-3 rounded-full mb-4">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Admins</h3>
            <p className="text-white/80 text-sm mb-4">Manage properties and users on the platform.</p>
            <Button 
              className="bg-chillspace-navy text-white hover:bg-chillspace-navy/90 mt-auto"
              asChild
            >
              <Link to="/admin-dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
          <Button 
            className="bg-white text-chillspace-teal hover:bg-white/90 hover:text-chillspace-navy text-lg px-8 py-6 h-auto shadow-lg"
            asChild
          >
            <Link to="/payment">Book Now</Link>
          </Button>
          <Button 
            variant="outline" 
            className="border-white border-2 text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            asChild
          >
            <Link to="/">Explore Spaces</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
