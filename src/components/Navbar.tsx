
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <nav className="w-full bg-white/95 backdrop-blur-sm fixed top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-chillspace-teal">
                Chill<span className="text-chillspace-navy">Space</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-chillspace-teal transition-colors">
              Places to stay
            </Link>
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-chillspace-teal transition-colors">
              Experiences
            </Link>
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-chillspace-teal transition-colors">
              About
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-chillspace-teal">
              <Search className="h-5 w-5 mr-1" />
              Search
            </Button>
            <Button className="bg-chillspace-teal hover:bg-chillspace-teal/90 text-white">
              <User className="h-5 w-5 mr-1" />
              Sign in
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-chillspace-teal focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out pt-16",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="px-4 pt-4 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-chillspace-teal border-b"
            onClick={() => setIsMenuOpen(false)}
          >
            Places to stay
          </Link>
          <Link
            to="/"
            className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-chillspace-teal border-b"
            onClick={() => setIsMenuOpen(false)}
          >
            Experiences
          </Link>
          <Link
            to="/"
            className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-chillspace-teal border-b"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
        <div className="px-4 py-8 flex flex-col space-y-4">
          <Button variant="outline" className="w-full">
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
          <Button className="w-full bg-chillspace-teal hover:bg-chillspace-teal/90 text-white">
            <User className="h-5 w-5 mr-2" />
            Sign in
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
