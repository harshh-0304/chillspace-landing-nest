
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Star } from "lucide-react";

const spaces = [
  {
    id: 1,
    title: "Mountain View Cabin",
    location: "Aspen, Colorado",
    image: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    price: 129,
    rating: 4.9,
    reviews: 124,
  },
  {
    id: 2,
    title: "Beachfront Villa",
    location: "Malibu, California",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    price: 249,
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    title: "Modern Downtown Loft",
    location: "New York, New York",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
    price: 189,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    title: "Lakeside Cottage",
    location: "Lake Tahoe, Nevada",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-4.0.3&auto=format&fit=crop&w=1749&q=80",
    price: 159,
    rating: 4.9,
    reviews: 102,
  },
];

const FeaturedSpaces = () => {
  return (
    <section className="py-16 bg-chillspace-sand">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-chillspace-navy mb-4">
            Featured Spaces
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most loved spaces, perfect for your next getaway.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {spaces.map((space) => (
            <Card key={space.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group animate-fade-in">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-chillspace-navy">{space.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1 text-chillspace-teal" />
                      {space.location}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-chillspace-orange fill-current mr-1" />
                    <span className="text-sm font-medium">{space.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({space.reviews})</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-chillspace-navy">
                  <span className="font-bold">${space.price}</span>
                  <span className="text-sm text-gray-500"> / night</span>
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="text-chillspace-teal hover:text-chillspace-navy font-medium inline-flex items-center transition-colors">
            View all spaces
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpaces;
