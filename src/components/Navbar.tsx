
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="absolute top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">SaaSify</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/products" className="text-white/80 hover:text-white transition-colors">
            Products
          </Link>
          <Link to="/pricing" className="text-white/80 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link to="/support" className="text-white/80 hover:text-white transition-colors">
            Support
          </Link>
          <Link to="/login" className="text-white/80 hover:text-white transition-colors">
            Login
          </Link>
          <Link to="/login">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
