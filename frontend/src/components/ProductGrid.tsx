
import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
  onAddToCart: (product: any) => void;
  viewMode?: 'grid' | 'list';
}

const ProductGrid = ({ title, products, onAddToCart, viewMode = 'grid' }: ProductGridProps) => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-amber-400 mx-auto rounded-full"></div>
          </div>
        )}
        
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "flex flex-col space-y-4"
        }>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={onAddToCart}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
