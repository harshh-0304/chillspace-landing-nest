
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, User, MapPin, LogOut, Home, CalendarRange, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const searchResults = [
  { id: 1, type: "property", name: "Mountain View Cabin", location: "Aspen, Colorado" },
  { id: 2, type: "property", name: "Beachfront Villa", location: "Malibu, California" },
  { id: 3, type: "property", name: "Modern Downtown Loft", location: "New York, New York" },
  { id: 4, type: "property", name: "Lakeside Cottage", location: "Lake Tahoe, Nevada" },
  { type: "location", name: "Aspen", region: "Colorado" },
  { type: "location", name: "Malibu", region: "California" },
  { type: "location", name: "New York", region: "New York" },
  { type: "location", name: "Lake Tahoe", region: "Nevada" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignIn = () => {
    navigate('/user-profile');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const filteredResults = searchQuery 
    ? searchResults.filter(result => 
        result.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (result.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.region?.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : searchResults;

  const handleSearchSelect = (result) => {
    setIsSearchOpen(false);
    if (result.type === "property") {
      navigate(`/property/${result.id}`);
    } else {
      // For location-based searches
      navigate(`/search?location=${result.name}`);
    }
  };

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
              <Home className="inline-block mr-1 h-4 w-4" />
              Places to stay
            </Link>
            <Link to="/booking" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-chillspace-teal transition-colors">
              <CalendarRange className="inline-block mr-1 h-4 w-4" />
              Book Now
            </Link>
            <Link to="/host-property" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-chillspace-teal transition-colors">
              <Building className="inline-block mr-1 h-4 w-4" />
              Host Property
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-700 hover:text-chillspace-teal" onClick={openSearch}>
              <Search className="h-5 w-5 mr-1" />
              Search
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    className="bg-chillspace-teal hover:bg-chillspace-teal/90 text-white"
                  >
                    <User className="h-5 w-5 mr-1" />
                    My Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleSignIn}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500" onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  className="bg-chillspace-teal hover:bg-chillspace-teal/90 text-white"
                  onClick={() => navigate('/login')}
                >
                  <User className="h-5 w-5 mr-1" />
                  Sign in
                </Button>
                <Button 
                  variant="outline" 
                  className="border-chillspace-teal text-chillspace-teal hover:bg-chillspace-teal/10"
                  onClick={() => navigate('/signup')}
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button 
              variant="ghost" 
              className="mr-2"
              onClick={openSearch}
            >
              <Search className="h-5 w-5" />
            </Button>
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
            <Home className="inline-block mr-2 h-5 w-5" />
            Places to stay
          </Link>
          <Link
            to="/booking"
            className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-chillspace-teal border-b"
            onClick={() => setIsMenuOpen(false)}
          >
            <CalendarRange className="inline-block mr-2 h-5 w-5" />
            Book Now
          </Link>
          <Link
            to="/host-property"
            className="block px-3 py-4 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-chillspace-teal border-b"
            onClick={() => setIsMenuOpen(false)}
          >
            <Building className="inline-block mr-2 h-5 w-5" />
            Host Property
          </Link>
        </div>
        <div className="px-4 py-8 flex flex-col space-y-4">
          <Button variant="outline" className="w-full" onClick={() => {
            setIsMenuOpen(false);
            openSearch();
          }}>
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
          
          {user ? (
            <>
              <Button 
                className="w-full bg-chillspace-teal hover:bg-chillspace-teal/90 text-white"
                onClick={() => {
                  handleSignIn();
                  setIsMenuOpen(false);
                }}
              >
                <User className="h-5 w-5 mr-2" />
                My Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-red-300 text-red-500 hover:bg-red-50"
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button 
                className="w-full bg-chillspace-teal hover:bg-chillspace-teal/90 text-white"
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false);
                }}
              >
                <User className="h-5 w-5 mr-2" />
                Sign in
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-chillspace-teal text-chillspace-teal hover:bg-chillspace-teal/10"
                onClick={() => {
                  navigate('/signup');
                  setIsMenuOpen(false);
                }}
              >
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Search Dialog */}
      <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <CommandInput 
          placeholder="Search properties, locations..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Properties">
            {filteredResults
              .filter(result => result.type === "property")
              .map((result, index) => (
                <CommandItem 
                  key={`property-${index}`}
                  onSelect={() => handleSearchSelect(result)}
                >
                  <Search className="mr-2 h-4 w-4 text-chillspace-teal" />
                  <span>{result.name}</span>
                  <span className="text-sm text-gray-500 ml-2">{result.location}</span>
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Locations">
            {filteredResults
              .filter(result => result.type === "location")
              .map((result, index) => (
                <CommandItem 
                  key={`location-${index}`}
                  onSelect={() => handleSearchSelect(result)}
                >
                  <MapPin className="mr-2 h-4 w-4 text-chillspace-teal" />
                  <span>{result.name}</span>
                  <span className="text-sm text-gray-500 ml-2">{result.region}</span>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </nav>
  );
};

export default Navbar;
