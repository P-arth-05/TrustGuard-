
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Smartphone, Home, Shirt, Gamepad2, Book, Dumbbell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategorySection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      name: 'Home & Garden',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      name: 'Clothing',
      icon: Shirt,
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 4,
      name: 'Gaming',
      icon: Gamepad2,
      image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=400',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 5,
      name: 'Books',
      icon: Book,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 6,
      name: 'Sports',
      icon: Dumbbell,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
      color: 'from-red-500 to-pink-600'
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    navigate('/shop', { state: { category: categoryName } });
  };

  const handleViewAllCategories = () => {
    navigate('/shop');
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                {/* Background Image */}
                <div className="aspect-square relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-80 ${category.color}`}></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                    <IconComponent className="h-8 w-8 mb-2 group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-center text-sm">{category.name}</h3>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ArrowRight className="h-6 w-6 text-white transform translate-x-2 group-hover:translate-x-0 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleViewAllCategories}
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-medium"
          >
            View All Categories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
