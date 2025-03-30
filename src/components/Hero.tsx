
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Search } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1564078516393-cf04bd966897?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto z-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center md:text-left md:max-w-2xl lg:max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Find your space to <span className="text-chillspace-teal">chill</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Discover unique stays to relax, unwind, and recharge.
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-lg shadow-xl p-4 lg:p-6 mt-8 md:mt-12 max-w-4xl mx-auto md:mx-0">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MapPin className="h-4 w-4 text-chillspace-teal mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chillspace-teal"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Calendar className="h-4 w-4 text-chillspace-teal mr-1" />
                  Check in
                </label>
                <input
                  type="date"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chillspace-teal"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Calendar className="h-4 w-4 text-chillspace-teal mr-1" />
                  Check out
                </label>
                <input
                  type="date"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chillspace-teal"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Users className="h-4 w-4 text-chillspace-teal mr-1" />
                  Guests
                </label>
                <div className="flex">
                  <select className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-chillspace-teal">
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                    <option value="5">5+ guests</option>
                  </select>
                  <Button className="rounded-l-none bg-chillspace-teal hover:bg-chillspace-teal/90">
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
