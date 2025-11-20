import React, { useEffect, useState } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { ViewState, CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  onToggleCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartItems, currentView, onChangeView, onToggleCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', view: ViewState.SHOP },
    { label: 'About', view: ViewState.ABOUT },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled || mobileMenuOpen ? 'bg-brand-white/95 backdrop-blur-sm border-b border-gray-200 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => onChangeView(ViewState.HOME)} 
          className="z-50 relative group"
        >
          <h1 className={`font-serif text-2xl font-bold tracking-tighter transition-colors ${
            scrolled || mobileMenuOpen ? 'text-brand-black' : 'text-brand-black lg:text-white'
          }`}>
            VULKAN
            <span className="text-brand-gold">.</span>
          </h1>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => onChangeView(link.view)}
              className={`text-sm uppercase tracking-widest font-medium transition-colors hover:text-brand-gold ${
                currentView === link.view ? 'text-brand-gold' : (scrolled ? 'text-brand-black' : 'text-white')
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6 z-50">
          <button 
            onClick={onToggleCart}
            className={`relative group transition-colors ${
              scrolled || mobileMenuOpen ? 'text-brand-black' : 'text-brand-black lg:text-white'
            }`}
          >
            <ShoppingCart size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand-gold text-white text-[10px] flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          
          <button 
            className={`md:hidden transition-colors ${
              scrolled || mobileMenuOpen ? 'text-brand-black' : 'text-white'
            }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-brand-white z-40 flex flex-col items-center justify-center gap-8 md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                onChangeView(link.view);
                setMobileMenuOpen(false);
              }}
              className="text-2xl font-serif text-brand-black hover:text-brand-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
