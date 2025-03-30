
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-chillspace-navy text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">
              Chill<span className="text-chillspace-teal">Space</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Finding the perfect space to relax and unwind has never been easier.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                  Safety
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                  Cancellation options
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                  COVID-19 Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Hosting</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                  List your space
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                  Host resources
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                  Community forum
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-chillspace-teal transition-colors">
                  Host responsibly
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ChillSpace. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-chillspace-teal transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-chillspace-teal transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-chillspace-teal transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
