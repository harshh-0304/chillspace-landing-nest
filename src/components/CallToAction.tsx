
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="relative py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Ready to find your perfect getaway?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Discover unique places to stay and unforgettable experiences with ChillSpace.
        </p>
        <Link to="/search">
          <Button className="bg-chillspace-teal hover:bg-chillspace-teal/90 text-white">
            Explore Places
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
