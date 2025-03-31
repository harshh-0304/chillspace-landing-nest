
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Star, Users, Bath, BedDouble, Home, CheckCircle2, Coffee, Wifi, Car, Tv } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

// Our mock property data - in a real app this would come from an API
const properties = [
  {
    id: 1,
    title: "Mountain View Cabin",
    location: "Aspen, Colorado",
    image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    price: 129,
    rating: 4.9,
    reviews: 124,
    description: "Experience the beauty of the Rockies in this cozy cabin with breathtaking mountain views. Perfect for a romantic getaway or a peaceful retreat in nature.",
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    amenities: ["Wifi", "Hot Tub", "Fireplace", "Kitchen", "Mountain View", "Free Parking"],
    images: [
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1562610744-7c427b542ccd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    ],
    host: {
      name: "Jennifer",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      joined: "2018",
      responseRate: 98,
    }
  },
  {
    id: 2,
    title: "Beachfront Villa",
    location: "Malibu, California",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: 249,
    rating: 4.8,
    reviews: 89,
    description: "Relax in this stunning beachfront villa with direct access to a private beach. Enjoy gorgeous sunsets and the sound of waves from your terrace.",
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    amenities: ["Wifi", "Pool", "Beach Access", "Kitchen", "AC", "Free Parking"],
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    ],
    host: {
      name: "Michael",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      joined: "2019",
      responseRate: 100,
    }
  },
  {
    id: 3,
    title: "Modern Downtown Loft",
    location: "New York, New York",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    price: 189,
    rating: 4.7,
    reviews: 156,
    description: "Stay in the heart of NYC in this stylish loft with high ceilings and modern amenities. Walking distance to restaurants, shops, and major attractions.",
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    amenities: ["Wifi", "Gym Access", "Kitchen", "AC", "City View", "Public Transport"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    ],
    host: {
      name: "Sophia",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      joined: "2020",
      responseRate: 95,
    }
  },
  {
    id: 4,
    title: "Lakeside Cottage",
    location: "Lake Tahoe, Nevada",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1749&q=80",
    price: 159,
    rating: 4.9,
    reviews: 102,
    description: "Enjoy the tranquility of Lake Tahoe in this charming cottage with a deck overlooking the water. Perfect for outdoor enthusiasts year-round.",
    bedrooms: 2,
    bathrooms: 1,
    guests: 5,
    amenities: ["Wifi", "Lake View", "Fireplace", "Kitchen", "Deck", "BBQ Grill"],
    images: [
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1749&q=80",
      "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    ],
    host: {
      name: "Robert",
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      joined: "2017",
      responseRate: 99,
    }
  },
];

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [guestCount, setGuestCount] = useState(1);
  
  // Find the property based on the ID
  const property = properties.find(p => p.id === Number(id));

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // If property not found, redirect to home page
    if (!property && id) {
      navigate('/');
    }
  }, [id, navigate, property]);

  if (!property) {
    return <div>Loading...</div>;
  }

  const handleBooking = () => {
    if (!selectedDates || selectedDates.length < 2) {
      toast({
        title: "Select dates",
        description: "Please select check-in and check-out dates",
        variant: "destructive",
      });
      return;
    }

    // Calculate the number of nights
    const start = new Date(selectedDates[0]);
    const end = new Date(selectedDates[1]);
    const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    // Navigate to booking page with query params
    navigate(`/booking?propertyId=${property.id}&guests=${guestCount}&checkIn=${start.toISOString().split('T')[0]}&checkOut=${end.toISOString().split('T')[0]}&nights=${nights}`);
  };

  const totalPrice = (selectedDates?.length === 2)
    ? Math.round((new Date(selectedDates[1]).getTime() - new Date(selectedDates[0]).getTime()) / (1000 * 60 * 60 * 24)) * property.price
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8">
          {/* Property title and location */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-chillspace-navy mb-2">{property.title}</h1>
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex items-center text-gray-600 mb-2 sm:mb-0">
                <MapPin className="h-4 w-4 mr-1 text-chillspace-teal" />
                <span>{property.location}</span>
                <div className="flex items-center ml-4">
                  <Star className="h-4 w-4 text-chillspace-orange fill-current mr-1" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-500 ml-1">({property.reviews} reviews)</span>
                </div>
              </div>
              <div>
                <Button
                  variant="outline"
                  className="text-chillspace-teal border-chillspace-teal hover:bg-chillspace-teal/10"
                  onClick={() => window.history.back()}
                >
                  Back to results
                </Button>
              </div>
            </div>
          </div>

          {/* Image gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
              <img
                src={property.images[selectedImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {property.images.slice(0, 4).map((image, index) => (
                <div 
                  key={index} 
                  className={`h-32 md:h-44 overflow-hidden rounded-lg cursor-pointer transition-all ${selectedImageIndex === index ? 'ring-2 ring-chillspace-teal' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${property.title} - image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Property details and booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column: Property details */}
            <div className="lg:col-span-2">
              {/* Host and basic info */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-chillspace-navy">
                    Hosted by {property.host.name}
                  </h2>
                  <p className="text-gray-600">
                    {property.bedrooms} bedrooms · {property.bathrooms} bathrooms · {property.guests} guests max
                  </p>
                </div>
                <div className="flex items-center">
                  <img
                    src={property.host.image}
                    alt={property.host.name}
                    className="w-12 h-12 rounded-full mr-2"
                  />
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <BedDouble className="h-6 w-6 text-chillspace-teal mb-2" />
                  <span className="text-sm text-gray-600">{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Bath className="h-6 w-6 text-chillspace-teal mb-2" />
                  <span className="text-sm text-gray-600">{property.bathrooms} Bathroom{property.bathrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-6 w-6 text-chillspace-teal mb-2" />
                  <span className="text-sm text-gray-600">Up to {property.guests} guests</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-chillspace-navy mb-2">Description</h3>
                <p className="text-gray-600">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-chillspace-navy mb-4">Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {amenity.includes("Wifi") && <Wifi className="h-5 w-5 text-chillspace-teal mr-2" />}
                      {amenity.includes("Kitchen") && <Coffee className="h-5 w-5 text-chillspace-teal mr-2" />}
                      {amenity.includes("Parking") && <Car className="h-5 w-5 text-chillspace-teal mr-2" />}
                      {amenity.includes("TV") && <Tv className="h-5 w-5 text-chillspace-teal mr-2" />}
                      {!amenity.includes("Wifi") && !amenity.includes("Kitchen") && 
                        !amenity.includes("Parking") && !amenity.includes("TV") && 
                        <CheckCircle2 className="h-5 w-5 text-chillspace-teal mr-2" />}
                      <span className="text-gray-600">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabs for reviews, location, etc */}
              <Tabs defaultValue="reviews" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="rules">House Rules</TabsTrigger>
                </TabsList>
                <TabsContent value="reviews" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <img src="https://randomuser.me/api/portraits/women/22.jpg" alt="Reviewer" className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-semibold">Sarah J.</h4>
                          <span className="text-gray-500 text-sm ml-2">March 2023</span>
                        </div>
                        <div className="flex items-center my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-chillspace-orange fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm">Amazing place! The views were absolutely breathtaking. Will definitely be back.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <img src="https://randomuser.me/api/portraits/men/42.jpg" alt="Reviewer" className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-semibold">David T.</h4>
                          <span className="text-gray-500 text-sm ml-2">January 2023</span>
                        </div>
                        <div className="flex items-center my-1">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-chillspace-orange fill-current" />
                          ))}
                          {[...Array(1)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-gray-300" />
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm">Great location and very comfortable space. The host was responsive and helpful.</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="mt-2">View all {property.reviews} reviews</Button>
                  </div>
                </TabsContent>
                <TabsContent value="location" className="pt-4">
                  <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-chillspace-teal mx-auto mb-2" />
                      <p className="text-gray-600">Map view of {property.location}</p>
                      <p className="text-sm text-gray-500 mt-2">Exact location provided after booking</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="rules" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-chillspace-navy">Check-in/out</h4>
                      <p className="text-gray-600 text-sm">Check-in after 3:00 PM, Check-out before 11:00 AM</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-chillspace-navy">House Rules</h4>
                      <ul className="text-gray-600 text-sm list-disc list-inside">
                        <li>No smoking</li>
                        <li>No parties or events</li>
                        <li>Pets allowed (with prior approval)</li>
                        <li>Quiet hours between 10:00 PM and 8:00 AM</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-chillspace-navy">Cancellation Policy</h4>
                      <p className="text-gray-600 text-sm">Free cancellation up to 48 hours before check-in</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right column: Booking card */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-chillspace-navy">${property.price}</span>
                    <span className="text-gray-500"> / night</span>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-chillspace-orange fill-current mr-1" />
                      <span className="text-sm font-medium">{property.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({property.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Date picker */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Dates</h4>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            {selectedDates?.length === 2
                              ? `${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`
                              : "Select dates"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            defaultMonth={new Date()}
                            selected={selectedDates}
                            onSelect={setSelectedDates}
                            numberOfMonths={2}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Guests */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Guests</h4>
                      <select
                        className="w-full h-10 px-3 py-2 border border-input rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                      >
                        {[...Array(property.guests)].map((_, i) => (
                          <option key={i} value={i + 1}>
                            {i + 1} guest{i > 0 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Button 
                      className="w-full bg-chillspace-teal hover:bg-chillspace-teal/90"
                      onClick={handleBooking}
                    >
                      Reserve
                    </Button>
                    <p className="text-center text-sm text-gray-500">You won't be charged yet</p>

                    {selectedDates?.length === 2 && (
                      <div className="space-y-2 pt-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            ${property.price} x {Math.round((new Date(selectedDates[1]).getTime() - new Date(selectedDates[0]).getTime()) / (1000 * 60 * 60 * 24))} nights
                          </span>
                          <span>${totalPrice}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cleaning fee</span>
                          <span>$35</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Service fee</span>
                          <span>$30</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${totalPrice + 35 + 30}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
