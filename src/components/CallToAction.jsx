
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-chillspace-sand to-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-pattern"></div>
      <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-chillspace-navy bg-clip-text text-transparent bg-gradient-to-r from-chillspace-navy to-chillspace-teal">
          Ready to find your perfect getaway?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover unique places to stay and unforgettable experiences with ChillSpace.
        </p>
        <Link to="/search">
          <Button className="bg-chillspace-teal hover:bg-chillspace-teal/90 text-white text-lg px-8 py-6 h-auto rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Explore Places
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
