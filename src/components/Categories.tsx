
import { Compass, Mountain, Waves, TreePine, Coffee, Building, Palmtree, Tent } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Mountain",
    icon: <Mountain className="h-6 w-6" />,
    count: 245,
  },
  {
    id: 2,
    name: "Beach",
    icon: <Waves className="h-6 w-6" />,
    count: 183,
  },
  {
    id: 3,
    name: "Forest",
    icon: <TreePine className="h-6 w-6" />,
    count: 152,
  },
  {
    id: 4,
    name: "Cafe",
    icon: <Coffee className="h-6 w-6" />,
    count: 127,
  },
  {
    id: 5,
    name: "Urban",
    icon: <Building className="h-6 w-6" />,
    count: 194,
  },
  {
    id: 6,
    name: "Tropical",
    icon: <Palmtree className="h-6 w-6" />,
    count: 89,
  },
  {
    id: 7,
    name: "Camping",
    icon: <Tent className="h-6 w-6" />,
    count: 76,
  },
  {
    id: 8,
    name: "Adventure",
    icon: <Compass className="h-6 w-6" />,
    count: 112,
  },
];

const Categories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-chillspace-navy mb-4">
            Browse by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect space by exploring our different categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href="#"
              className="flex flex-col items-center p-4 rounded-lg bg-white border border-gray-200 hover:border-chillspace-teal hover:shadow-md transition-all duration-300 group animate-fade-in"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full mb-3 bg-chillspace-sand group-hover:bg-chillspace-teal/10 transition-colors duration-300">
                <div className="text-chillspace-teal group-hover:text-chillspace-navy transition-colors duration-300">
                  {category.icon}
                </div>
              </div>
              <h3 className="font-medium text-gray-800">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} spaces</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
