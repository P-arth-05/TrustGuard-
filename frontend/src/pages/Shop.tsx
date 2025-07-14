
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import CartDrawer from '@/components/CartDrawer';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Grid, List } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Shop = () => {
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');

  // Get category from navigation state
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state]);

  // Expanded products data with 23 total products
  const allProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max - Latest Smartphone with Advanced Camera",
      price: 134900,
      originalPrice: 149900,
      rating: 4.8,
      reviews: 245,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      badge: "Hot Deal",
      category: "Electronics"
    },
    {
      id: 2,
      name: "Samsung 4K Smart TV 55 inch - Ultra HD Display",
      price: 45999,
      originalPrice: 59999,
      rating: 4.6,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400",
      badge: "25% OFF",
      category: "Electronics"
    },
    {
      id: 3,
      name: "Nike Air Max Sneakers - Comfortable Running Shoes",
      price: 8999,
      originalPrice: 12999,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
      category: "Clothing"
    },
    {
      id: 4,
      name: "MacBook Air M2 - Lightweight Laptop for Professionals",
      price: 114900,
      originalPrice: 124900,
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      badge: "Best Seller",
      category: "Electronics"
    },
    {
      id: 5,
      name: "Sony WH-1000XM4 Wireless Headphones - Noise Cancelling",
      price: 24990,
      originalPrice: 29990,
      rating: 4.8,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      category: "Electronics"
    },
    {
      id: 6,
      name: "Coffee Maker Machine - Automatic Brew System",
      price: 12999,
      originalPrice: 18999,
      rating: 4.5,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
      category: "Home & Garden"
    },
    {
      id: 7,
      name: "Gaming Mechanical Keyboard - RGB Backlit",
      price: 7999,
      originalPrice: 11999,
      rating: 4.6,
      reviews: 94,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
      category: "Electronics"
    },
    {
      id: 8,
      name: "Fitness Tracker Watch - Health Monitoring",
      price: 3999,
      originalPrice: 5999,
      rating: 4.4,
      reviews: 178,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      badge: "Popular",
      category: "Sports"
    },
    {
      id: 9,
      name: "Wireless Bluetooth Speaker - Premium Sound",
      price: 5999,
      originalPrice: 8999,
      rating: 4.5,
      reviews: 132,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
      category: "Electronics"
    },
    {
      id: 10,
      name: "Adidas Running Shoes - Ultraboost 22",
      price: 15999,
      originalPrice: 18999,
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      category: "Clothing"
    },
    {
      id: 11,
      name: "Instant Pot Duo 7-in-1 Electric Pressure Cooker",
      price: 8999,
      originalPrice: 12999,
      rating: 4.6,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      category: "Home & Garden"
    },
    {
      id: 12,
      name: "The Complete Harry Potter Book Set",
      price: 2999,
      originalPrice: 4999,
      rating: 4.9,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
      category: "Books"
    },
    {
      id: 13,
      name: "Yoga Mat - Premium Non-Slip Exercise Mat",
      price: 1999,
      originalPrice: 2999,
      rating: 4.3,
      reviews: 145,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
      category: "Sports"
    },
    {
      id: 14,
      name: "Wooden Dining Table Set - 6 Seater",
      price: 35999,
      originalPrice: 45999,
      rating: 4.4,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      category: "Home & Garden"
    },
    {
      id: 15,
      name: "Women's Winter Jacket - Waterproof",
      price: 6999,
      originalPrice: 9999,
      rating: 4.5,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      category: "Clothing"
    },
    {
      id: 16,
      name: "Gaming Mouse - High Precision Optical",
      price: 3499,
      originalPrice: 4999,
      rating: 4.7,
      reviews: 203,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
      category: "Electronics"
    },
    {
      id: 17,
      name: "Cookware Set - Non-Stick 12 Piece",
      price: 12999,
      originalPrice: 16999,
      rating: 4.5,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1556909114-4f6e8cfa86c7?w=400",
      category: "Home & Garden"
    },
    {
      id: 18,
      name: "Basketball - Official Size and Weight",
      price: 1499,
      originalPrice: 1999,
      rating: 4.6,
      reviews: 167,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400",
      category: "Sports"
    },
    {
      id: 19,
      name: "Digital Camera - 24MP DSLR",
      price: 45999,
      originalPrice: 54999,
      rating: 4.8,
      reviews: 134,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400",
      badge: "Professional",
      category: "Electronics"
    },
    {
      id: 20,
      name: "Men's Casual Shirt - Cotton Blend",
      price: 1999,
      originalPrice: 2999,
      rating: 4.3,
      reviews: 245,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
      category: "Clothing"
    },
    {
      id: 21,
      name: "LED Desk Lamp - Adjustable Brightness",
      price: 2999,
      originalPrice: 3999,
      rating: 4.4,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      category: "Home & Garden"
    },
    {
      id: 22,
      name: "Programming Books Bundle - 5 Books",
      price: 4999,
      originalPrice: 7999,
      rating: 4.7,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
      category: "Books"
    },
    {
      id: 23,
      name: "Tennis Racket - Professional Grade",
      price: 8999,
      originalPrice: 11999,
      rating: 4.6,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      category: "Sports"
    }
  ];

  const categories = ['All', 'Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];

  // Filter and sort products
  let filteredProducts = selectedCategory === 'All' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  if (sortBy === 'price-low-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  const handleAddToCart = (product: any) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onCartClick={() => setIsCartOpen(true)} 
        cartItemCount={cartItemCount}
      />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Shop Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop {selectedCategory !== 'All' ? selectedCategory : 'All Products'}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} products found
            </p>
          </div>

          {/* Filters and Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex border border-gray-300 rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid
            title=""
            products={filteredProducts}
            onAddToCart={handleAddToCart}
            viewMode={viewMode}
          />
        </div>
      </div>

      <Footer />
      
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Shop;
