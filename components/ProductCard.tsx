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
    <div className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 grayscale contrast-110"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button 
            variant="secondary" 
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
        
        {!product.inStock && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-brand-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest border border-gray-200">
            Sold Out
          </div>
        )}
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-xs text-gray-500 uppercase tracking-[0.2em] font-medium">
          {product.category}
        </p>
        <h3 className="text-xl font-serif text-brand-black group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-medium text-gray-900">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};