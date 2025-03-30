
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 bg-chillspace-teal text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
          Ready to Find Your Perfect Chill Space?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90 animate-fade-in">
          Join thousands of happy guests who have discovered their ideal space for relaxation.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
          <Button 
            className="bg-white text-chillspace-teal hover:bg-white/90 hover:text-chillspace-navy text-lg px-8 py-6 h-auto"
            asChild
          >
            <Link to="/payment">Book Now</Link>
          </Button>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            asChild
          >
            <Link to="/">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
