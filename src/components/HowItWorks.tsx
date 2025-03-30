
import { Search, Calendar, Home } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Find Your Space",
    description: "Search and filter through thousands of unique spaces designed for relaxation.",
    icon: <Search className="h-8 w-8" />,
    color: "bg-chillspace-teal/10",
    textColor: "text-chillspace-teal",
  },
  {
    id: 2,
    title: "Book Your Dates",
    description: "Select your check-in and check-out dates and complete your reservation.",
    icon: <Calendar className="h-8 w-8" />,
    color: "bg-chillspace-orange/10",
    textColor: "text-chillspace-orange",
  },
  {
    id: 3,
    title: "Enjoy Your Stay",
    description: "Arrive at your space and enjoy a peaceful, rejuvenating experience.",
    icon: <Home className="h-8 w-8" />,
    color: "bg-chillspace-navy/10",
    textColor: "text-chillspace-navy",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-chillspace-navy mb-4">
            How ChillSpace Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Finding and booking your perfect chill space is simple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="p-6 rounded-lg border border-gray-200 relative animate-slide-up">
              <div className={`absolute -top-5 left-6 ${step.color} ${step.textColor} w-10 h-10 rounded-full flex items-center justify-center`}>
                {step.icon}
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-chillspace-navy mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
