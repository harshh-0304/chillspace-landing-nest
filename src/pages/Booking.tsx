
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon, Users, Home, CreditCard, Check, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const bookingSchema = z.object({
  checkIn: z.date({
    required_error: "Check-in date is required.",
  }),
  checkOut: z.date({
    required_error: "Check-out date is required.",
  }),
  guests: z.string().min(1, {
    message: "Number of guests is required.",
  }),
  specialRequests: z.string().optional(),
}).refine(data => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

const Booking = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: "1",
      specialRequests: "",
    },
  });

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    setIsSubmitting(true);
    console.log("Booking values:", values);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Booking confirmed!",
        description: "Proceeding to payment details.",
      });
      
      navigate("/payment");
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-chillspace-navy mb-8 text-center">Book Your Dream Getaway</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Property Details */}
            <div className="md:col-span-2">
              <Card className="border-none shadow-lg overflow-hidden">
                <div className="aspect-video relative bg-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                    alt="Luxury Lakeside Cabin" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-chillspace-navy text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" fill="currentColor" /> 4.9 (128 reviews)
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Luxury Lakeside Cabin</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Home className="h-4 w-4" /> 3 bed · 2 bath · Mountain View
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">About this retreat</h3>
                    <p className="text-gray-600">
                      Escape to this stunning cabin nestled in the mountains with breathtaking lake views. 
                      Perfect for a peaceful getaway, this spacious cabin offers modern amenities while 
                      being surrounded by nature. Wake up to the sounds of birds and enjoy your coffee 
                      on the private deck overlooking the water.
                    </p>
                    
                    <h3 className="font-semibold text-lg">Premium Amenities</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-chillspace-teal" /> High-speed WiFi
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-chillspace-teal" /> Fireplace
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-chillspace-teal" /> Full kitchen
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-chillspace-teal" /> Smart TV
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-chillspace-teal" /> Private parking
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-chillspace-teal" /> Hot tub
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg">House guidelines</h3>
                    <p className="text-gray-600">
                      Check-in after 4:00 PM. Check-out before 11:00 AM. Quiet hours from 10:00 PM. No smoking. Pet friendly.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Booking Form */}
            <div>
              <Card className="border-none shadow-lg sticky top-24">
                <CardHeader className="bg-chillspace-navy text-white rounded-t-lg">
                  <CardTitle className="text-xl font-bold">$175 / night</CardTitle>
                  <CardDescription className="text-gray-300">
                    Reserve your stay
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="checkIn"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Check-in date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="checkOut"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Check-out date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => {
                                    const checkIn = form.getValues("checkIn");
                                    return date < (checkIn || new Date());
                                  }}
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="guests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of guests</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Users className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                <Input 
                                  type="number" 
                                  min="1"
                                  max="6"
                                  className="pl-10" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="specialRequests"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special requests (optional)</FormLabel>
                            <FormControl>
                              <textarea
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                                placeholder="Any special requests or accommodations needed for your stay?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4 border-t">
                        <div className="flex justify-between mb-2">
                          <span>3 nights × $175</span>
                          <span>$525</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Cleaning fee</span>
                          <span>$75</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>Service fee</span>
                          <span>$35</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t">
                          <span>Total</span>
                          <span>$635</span>
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-chillspace-teal hover:bg-chillspace-teal/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <span className="mr-2">Processing</span>
                            <span className="animate-spin">◌</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" /> Reserve Now
                          </span>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="text-xs text-gray-500 text-center">
                  Your payment will be securely processed. Free cancellation up to 48 hours before check-in.
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
