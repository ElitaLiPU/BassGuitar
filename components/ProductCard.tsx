import React from 'react';
import { Product } from '../types';
import { Button } from './Button';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative flex flex-col bg-white overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
        
        {!product.inStock && (
          <div className="absolute top-4 right-4 bg-brand-black text-white text-xs px-2 py-1 uppercase tracking-widest">
            Sold Out
          </div>
        )}
      </div>
      
      <div className="flex flex-col flex-1 p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-serif font-medium text-brand-black">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-gray-500 uppercase tracking-wider">
              {product.category}
            </p>
          </div>
          <p className="text-sm font-medium text-brand-black">
            ${product.price.toLocaleString()}
          </p>
        </div>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto pt-4">
          <Button 
            variant="outline" 
            fullWidth 
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="flex items-center gap-2"
          >
            {product.inStock ? (
              <>
                <span>Add to Cart</span>
                <Plus size={16} />
              </>
            ) : 'Join Waitlist'}
          </Button>
        </div>
      </div>
    </div>
  );
};
