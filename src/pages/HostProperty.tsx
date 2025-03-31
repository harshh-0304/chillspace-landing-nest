
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Building, Home, Hotel, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  propertyName: z.string().min(3, {
    message: "Property name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  address: z.string().min(5, {
    message: "Address is required.",
  }),
  city: z.string().min(1, {
    message: "City is required.",
  }),
  price: z.string().min(1, {
    message: "Price is required.",
  }),
  propertyType: z.string({
    required_error: "Please select a property type.",
  }),
});

const propertyTypes = [
  { value: "apartment", label: "Apartment", icon: Building },
  { value: "house", label: "House", icon: Home },
  { value: "hotel", label: "Hotel", icon: Hotel },
];

const HostProperty = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyName: "",
      description: "",
      address: "",
      city: "",
      price: "",
      propertyType: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setSelectedFiles(filesArray);
    }
  };

  async function uploadImages(propertyId: string): Promise<string[]> {
    const imageUrls: string[] = [];
    
    if (selectedFiles.length === 0) return imageUrls;
    
    const totalFiles = selectedFiles.length;
    let filesUploaded = 0;
    
    for (const file of selectedFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${propertyId}/${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      try {
        const { data, error } = await supabase.storage
          .from('property-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });
          
        if (error) {
          console.error('Error uploading image:', error);
          throw error;
        }
        
        // Get the public URL for the uploaded image
        const { data: urlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);
          
        imageUrls.push(urlData.publicUrl);
        
        // Update progress
        filesUploaded++;
        setUploadProgress(Math.round((filesUploaded / totalFiles) * 100));
        
      } catch (error) {
        console.error('Error in image upload:', error);
      }
    }
    
    return imageUrls;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to list your property.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // First, create the property record
      const { data: property, error: propertyError } = await supabase
        .from('properties')
        .insert({
          name: values.propertyName,
          description: values.description,
          location: `${values.address}, ${values.city}`,
          price: parseFloat(values.price),
          property_type: values.propertyType,
          owner_id: user.id,
        })
        .select()
        .single();
      
      if (propertyError) throw propertyError;
      
      // Upload images if any were selected
      if (selectedFiles.length > 0) {
        const imageUrls = await uploadImages(property.id);
        
        // Update the property with image URLs
        if (imageUrls.length > 0) {
          const { error: updateError } = await supabase
            .from('properties')
            .update({ image_urls: imageUrls })
            .eq('id', property.id);
            
          if (updateError) throw updateError;
        }
      }
      
      toast({
        title: "Property submitted successfully!",
        description: "Your property has been added to our listing.",
      });
      
      // Redirect to the property page
      navigate(`/property/${property.id}`);
      
    } catch (error: any) {
      console.error('Error submitting property:', error);
      toast({
        title: "Submission failed",
        description: error.message || "There was an error listing your property.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow py-20 bg-gradient-to-b from-white to-chillspace-sand">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-chillspace-navy mb-4">
              List Your Property
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our community of hosts and start earning by sharing your space with guests looking for the perfect chill experience.
            </p>
          </div>

          <Card className="shadow-lg border-chillspace-teal/10">
            <CardHeader className="bg-gradient-to-r from-chillspace-teal/10 to-chillspace-sand border-b pb-8">
              <CardTitle className="text-2xl text-chillspace-navy">Property Details</CardTitle>
              <CardDescription>
                Fill out the information below to list your property on ChillSpace.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="propertyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter property name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be displayed as the title of your listing.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value} className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                  <type.icon className="h-4 w-4" />
                                  <span>{type.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per night ($)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter price" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your property" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide details about your property, amenities, and what makes it special.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border border-dashed border-gray-300 rounded-md p-6 text-center">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Drag and drop your property images here, or click to browse.
                    </p>
                    <input 
                      type="file" 
                      id="property-images" 
                      className="hidden" 
                      multiple 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <Button 
                      variant="outline" 
                      className="mt-4" 
                      type="button"
                      onClick={() => document.getElementById('property-images')?.click()}
                    >
                      Upload Photos
                    </Button>
                    {selectedFiles.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-chillspace-teal">
                          {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {file.name.length > 15 ? `${file.name.substring(0, 12)}...` : file.name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {uploadProgress > 0 && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                        <div 
                          className="bg-chillspace-teal h-2.5 rounded-full" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>

                  <CardFooter className="flex justify-end px-0 pt-4">
                    <Button 
                      type="submit" 
                      className="bg-chillspace-teal hover:bg-chillspace-teal/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </span>
                      ) : "List My Property"}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HostProperty;
