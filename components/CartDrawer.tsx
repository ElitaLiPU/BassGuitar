import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { Button } from './Button';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-serif text-xl text-brand-black">Your Cart</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-brand-black transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-gray-400 font-serif text-lg">Your signal path is empty.</p>
                <Button variant="outline" onClick={onClose}>Start Building</Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-gray-100 flex-shrink-0 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-brand-black text-sm">{item.name}</h3>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">${item.price.toLocaleString()}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-gray-100 rounded"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="flex justify-between items-center text-lg font-serif font-medium">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-gray-500 text-center">Shipping & taxes calculated at checkout.</p>
              <Button fullWidth onClick={() => alert("Proceeding to checkout...")}>
                Checkout
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
