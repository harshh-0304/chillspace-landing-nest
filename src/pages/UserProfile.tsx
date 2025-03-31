import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building, CalendarDays, CreditCard, Heart, MessageSquare, User, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  propertyName: string;
  location: string;
  dates: string;
  status: "upcoming" | "completed" | "cancelled";
  price: number;
}

interface SavedProperty {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  joined: string;
  role: string;
}

const UserProfile = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    { id: "1", propertyName: "Seaside Villa", location: "Miami, FL", dates: "May 15-20, 2023", status: "upcoming", price: 750 },
    { id: "2", propertyName: "Mountain Retreat", location: "Denver, CO", dates: "Mar 10-15, 2023", status: "completed", price: 680 },
    { id: "3", propertyName: "Downtown Loft", location: "New York, NY", dates: "Jan 5-10, 2023", status: "cancelled", price: 980 },
  ]);

  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([
    { id: "1", name: "Luxury Penthouse", location: "Los Angeles, CA", price: 350, image: "https://placeholder.svg" },
    { id: "2", name: "Cozy Cottage", location: "Portland, OR", price: 120, image: "https://placeholder.svg" },
  ]);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/signup");
          return;
        }
        
        const user = session.user;
        
        setUserData({
          id: user.id,
          email: user.email || "",
          name: user.user_metadata?.full_name || "User",
          joined: new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          role: "user",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate("/signup");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const removeSaved = (id: string) => {
    setSavedProperties(savedProperties.filter(property => property.id !== id));
  };

  const cancelBooking = (id: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: "cancelled" } : booking
      )
    );
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      
      navigate("/signup");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow bg-gradient-to-b from-white to-chillspace-sand py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Card className="sticky top-20">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-chillspace-teal text-white w-24 h-24 rounded-full flex items-center justify-center mb-4">
                    <User size={40} />
                  </div>
                  <CardTitle>{loading ? "Loading..." : userData?.name}</CardTitle>
                  <CardDescription>{loading ? "" : userData?.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <User className="mr-2 h-4 w-4 text-chillspace-teal" />
                      <span>Role: {loading ? "" : userData?.role}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CalendarDays className="mr-2 h-4 w-4 text-chillspace-teal" />
                      <span>Member since: {loading ? "" : userData?.joined}</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <Button className="w-full bg-chillspace-teal hover:bg-chillspace-teal/90">
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full text-red-500 hover:text-red-700 border-red-200 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="md:w-2/3">
              <Tabs defaultValue="bookings">
                <TabsList className="mb-6 bg-white">
                  <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                  <TabsTrigger value="saved">Saved Properties</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                </TabsList>
                
                <TabsContent value="bookings">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Bookings</CardTitle>
                      <CardDescription>Manage your upcoming and past stays</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {bookings.length === 0 ? (
                        <div className="text-center py-10">
                          <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">You don't have any bookings yet</p>
                          <Button className="mt-4 bg-chillspace-teal hover:bg-chillspace-teal/90">
                            Find a place to stay
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {bookings.map((booking) => (
                            <div 
                              key={booking.id} 
                              className="border rounded-lg p-4 flex flex-col md:flex-row justify-between"
                            >
                              <div>
                                <h3 className="font-medium text-lg">{booking.propertyName}</h3>
                                <p className="text-gray-500">{booking.location}</p>
                                <div className="flex items-center mt-2">
                                  <CalendarDays className="h-4 w-4 mr-1 text-gray-500" />
                                  <span className="text-sm">{booking.dates}</span>
                                </div>
                                <div className="mt-2">
                                  <span 
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      booking.status === "upcoming" 
                                        ? "bg-blue-100 text-blue-800" 
                                        : booking.status === "completed" 
                                        ? "bg-green-100 text-green-800" 
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {booking.status}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-4 md:mt-0 flex flex-col items-end justify-between">
                                <div className="text-lg font-bold">${booking.price}</div>
                                {booking.status === "upcoming" && (
                                  <Button 
                                    variant="outline" 
                                    className="mt-2"
                                    onClick={() => cancelBooking(booking.id)}
                                  >
                                    Cancel
                                  </Button>
                                )}
                                {booking.status === "completed" && (
                                  <Button 
                                    variant="outline" 
                                    className="mt-2"
                                  >
                                    Write Review
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="saved">
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Properties</CardTitle>
                      <CardDescription>Properties you've saved for later</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {savedProperties.length === 0 ? (
                        <div className="text-center py-10">
                          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">You haven't saved any properties yet</p>
                          <Button className="mt-4 bg-chillspace-teal hover:bg-chillspace-teal/90">
                            Explore properties
                          </Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {savedProperties.map((property) => (
                            <div key={property.id} className="border rounded-lg overflow-hidden">
                              <div className="h-40 bg-gray-200"></div>
                              <div className="p-4">
                                <div className="flex justify-between">
                                  <h3 className="font-medium">{property.name}</h3>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="p-0 h-auto"
                                    onClick={() => removeSaved(property.id)}
                                  >
                                    <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                                  </Button>
                                </div>
                                <p className="text-gray-500 text-sm">{property.location}</p>
                                <div className="mt-2 flex justify-between items-center">
                                  <div className="font-bold">${property.price}<span className="text-sm font-normal">/night</span></div>
                                  <Button size="sm" className="bg-chillspace-teal hover:bg-chillspace-teal/90">
                                    Book
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="messages">
                  <Card>
                    <CardHeader>
                      <CardTitle>Messages</CardTitle>
                      <CardDescription>Your conversations with hosts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-10">
                        <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">You don't have any messages yet</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="payment">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your payment information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-10">
                        <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">You don't have any payment methods saved</p>
                        <Button className="mt-4 bg-chillspace-teal hover:bg-chillspace-teal/90">
                          Add Payment Method
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
