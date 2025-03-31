
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Star, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data for search results
const allProperties = [
  {
    id: 1,
    title: "Mountain View Cabin",
    location: "Aspen, Colorado",
    image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    price: 129,
    rating: 4.9,
    reviews: 124,
    type: "cabin",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["Wifi", "Hot Tub", "Fireplace"]
  },
  {
    id: 2,
    title: "Beachfront Villa",
    location: "Malibu, California",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: 249,
    rating: 4.8,
    reviews: 89,
    type: "villa",
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Pool", "Beach Access", "Kitchen"]
  },
  {
    id: 3,
    title: "Modern Downtown Loft",
    location: "New York, New York",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    price: 189,
    rating: 4.7,
    reviews: 156,
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Wifi", "Gym Access", "City View"]
  },
  {
    id: 4,
    title: "Lakeside Cottage",
    location: "Lake Tahoe, Nevada",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1749&q=80",
    price: 159,
    rating: 4.9,
    reviews: 102,
    type: "cottage",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["Lake View", "Fireplace", "Deck"]
  },
  {
    id: 5,
    title: "Cozy Forest Cabin",
    location: "Portland, Oregon",
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    price: 139,
    rating: 4.8,
    reviews: 76,
    type: "cabin",
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["Forest View", "Fireplace", "Hiking Trails"]
  },
  {
    id: 6,
    title: "Desert Retreat",
    location: "Sedona, Arizona",
    image: "https://images.unsplash.com/photo-1469796466635-455ede028ac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    price: 179,
    rating: 4.9,
    reviews: 65,
    type: "house",
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Desert View", "Pool", "Patio"]
  },
  {
    id: 7,
    title: "Urban Penthouse",
    location: "Chicago, Illinois",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    price: 229,
    rating: 4.7,
    reviews: 93,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["City View", "Rooftop", "Modern Appliances"]
  },
  {
    id: 8,
    title: "Country Farmhouse",
    location: "Nashville, Tennessee",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    price: 145,
    rating: 4.8,
    reviews: 58,
    type: "farmhouse",
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Farm View", "Porch", "BBQ"]
  }
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [properties, setProperties] = useState(allProperties);
  const [sortBy, setSortBy] = useState("relevance");

  // Get search params
  const locationParam = searchParams.get("location");
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");
  const guestsParam = searchParams.get("guests");

  useEffect(() => {
    // Filter properties based on search params (in a real app, this would be an API call)
    let filtered = [...allProperties];
    
    if (locationParam) {
      setSearchText(locationParam);
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(locationParam.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    
    setProperties(filtered);
  }, [locationParam, sortBy]);

  const handlePropertyClick = (id: number) => {
    navigate(`/property/${id}`);
  };

  const handleSearch = () => {
    if (searchText.trim() === "") return;
    navigate(`/search?location=${encodeURIComponent(searchText)}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
          {/* Search header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-chillspace-navy">
                  {properties.length} places to stay
                  {locationParam && <span> in {locationParam}</span>}
                </h1>
                {(checkInParam && checkOutParam) && (
                  <p className="text-gray-600 mt-1">
                    {new Date(checkInParam).toLocaleDateString()} - {new Date(checkOutParam).toLocaleDateString()}
                    {guestsParam && <span> · {guestsParam} guest{Number(guestsParam) > 1 ? 's' : ''}</span>}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search locations"
                    className="px-4 py-2 pr-10 border border-gray-300 rounded-md w-full sm:w-64"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Search 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" 
                    size={18}
                    onClick={handleSearch}
                  />
                </div>
                <select 
                  className="px-4 py-2 border border-gray-300 rounded-md"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="relevance">Sort by: Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1 rounded-full">
                <Filter size={14} />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">Price</Button>
              <Button variant="outline" size="sm" className="rounded-full">Type of place</Button>
              <Button variant="outline" size="sm" className="rounded-full">Bedrooms</Button>
              <Button variant="outline" size="sm" className="rounded-full">Amenities</Button>
            </div>
          </div>

          {/* Search results */}
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Card 
                  key={property.id} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handlePropertyClick(property.id)}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-chillspace-navy">{property.title}</h3>
                        <div className="flex items-center text-gray-500 text-sm mt-1">
                          <MapPin className="h-4 w-4 mr-1 text-chillspace-teal" />
                          {property.location}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-chillspace-orange fill-current mr-1" />
                        <span className="text-sm font-medium">{property.rating}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {property.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="inline-block bg-gray-100 px-2 py-1 text-xs rounded-full text-gray-600">
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      {property.bedrooms} bedroom{property.bedrooms > 1 ? 's' : ''} · {property.bathrooms} bathroom{property.bathrooms > 1 ? 's' : ''}
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between items-center w-full">
                      <p className="text-chillspace-navy">
                        <span className="font-bold">${property.price}</span>
                        <span className="text-sm text-gray-500"> / night</span>
                      </p>
                      <Button size="sm" className="bg-chillspace-teal hover:bg-chillspace-teal/90">
                        View Details
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">No results found</h3>
              <p className="mt-2 text-gray-600">
                We couldn't find any properties matching your search.
              </p>
              <Button 
                className="mt-4 bg-chillspace-teal hover:bg-chillspace-teal/90"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
