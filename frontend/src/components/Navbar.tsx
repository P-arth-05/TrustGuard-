
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onCartClick: () => void;
  cartItemCount: number;
  isAdmin?: boolean; 
}


const Navbar = ({ onCartClick, cartItemCount, isAdmin }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlistCount, setWishlistCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books', 'Toys'];

  const handleCategoryClick = (category: string) => {
    navigate('/shop', { state: { category } });
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm);
      // Navigate to shop with search term
      navigate('/shop', { state: { searchTerm } });
    }
  };

  const handleWishlistClick = () => {
    console.log('Wishlist clicked');
    // TODO: Implement wishlist functionality
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main navbar */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={handleLogoClick}>
            <div className="text-2xl font-bold text-blue-600">
              TrustGuard
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full flex">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-3 rounded-l-full border-2 border-gray-300 focus:border-blue-500 transition-colors"
              />
              <Button
                type="submit"
                size="sm"
                className="px-6 rounded-r-full bg-blue-600 hover:bg-blue-700 border-2 border-blue-600 flex items-center justify-center h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" size="sm" className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              onClick={() => navigate('/login')}
            >
              <User className="h-5 w-5" />
              <span>Account</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleWishlistClick}
              className="hidden md:flex relative text-gray-700 hover:text-blue-600"
            >
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-blue-600"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Categories - Desktop */}
        <div className="hidden md:flex items-center space-x-8 py-3 border-t border-gray-100">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <form onSubmit={handleSearch} className="relative flex">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 rounded-l-full border-2 border-gray-300"
                />
                <Button type="submit" size="sm" className="px-6 rounded-r-full bg-blue-600">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              
              <div className="flex flex-col space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="text-left text-gray-600 hover:text-blue-600 transition-colors font-medium py-2"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
