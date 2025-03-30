
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be at least 16 digits"),
  cardName: z.string().min(3, "Please enter the cardholder name"),
  expiryDate: z.string().min(5, "Please enter a valid expiry date (MM/YY)"),
  cvv: z.string().min(3, "CVV must be at least 3 digits")
});

const Payment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof paymentSchema>) => {
    setIsProcessing(true);
    console.log("Processing payment with values:", values);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      toast({
        title: "Payment Successful",
        description: "Your booking has been confirmed!",
      });
      
      // Redirect to home after successful payment
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-md">
          {isSuccess ? (
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
              <p className="mb-6 text-gray-600">Your space has been booked successfully.</p>
              <Button onClick={() => navigate("/")} className="w-full">
                Return to Home
              </Button>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Booking</h1>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="mb-4 flex items-center">
                      <CreditCard className="mr-2 text-chillspace-teal" />
                      <h2 className="text-xl font-semibold">Payment Details</h2>
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="cardName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cardholder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <Input placeholder="1234 5678 9012 3456" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-chillspace-teal hover:bg-chillspace-teal/90"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Pay Now"}
                      </Button>
                    </div>
                    
                    <div className="text-xs text-gray-500 text-center mt-4">
                      <p>This is a demo payment page. No actual payments will be processed.</p>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
