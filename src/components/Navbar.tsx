
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code2 } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import UserProfileDropdown from "./UserProfileDropdown";

const Navbar = () => {
  const { user, isAuthenticated } = useUser();

  return (
    <nav className="absolute top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
            <Code2 className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">Nexus</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/products" className="text-white/80 hover:text-white transition-colors">
            Services
          </Link>
          <Link to="/pricing" className="text-white/80 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link to="/support" className="text-white/80 hover:text-white transition-colors">
            Support
          </Link>
          
          {isAuthenticated && user ? (
            <>
              {user.role === 'client' && (
                <Link to="/dashboard" className="text-white/80 hover:text-white transition-colors">
                  Client Portal
                </Link>
              )}
              {(user.role === 'admin' || user.role === 'owner') && (
                <>
                  <Link to="/dashboard" className="text-white/80 hover:text-white transition-colors">
                    Client Portal
                  </Link>
                  <Link to="/admin" className="text-white/80 hover:text-white transition-colors">
                    Admin Portal
                  </Link>
                </>
              )}
              <UserProfileDropdown />
            </>
          ) : (
            <>
              <Link to="/login" className="text-white/80 hover:text-white transition-colors">
                Client Portal
              </Link>
              <Link to="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Start Project
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
