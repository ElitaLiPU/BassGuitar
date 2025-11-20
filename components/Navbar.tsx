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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getNavColor = () => {
    if (mobileMenuOpen) return 'text-brand-black';
    if (scrolled) return 'text-brand-black';
    if (currentView === ViewState.HOME) return 'text-white';
    return 'text-brand-black';
  };

  const navColorClass = getNavColor();
  const bgClass = scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6';

  const navLinks = [
    { label: 'Shop', view: ViewState.SHOP },
    { label: 'About', view: ViewState.ABOUT },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b border-transparent ${
        scrolled ? 'border-gray-100' : ''
      } ${bgClass}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Nav (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 w-1/3">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => onChangeView(link.view)}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-brand-gold ${
                currentView === link.view ? 'text-brand-gold' : navColorClass
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Logo (Centered) */}
        <div className="w-1/3 flex justify-center md:justify-center justify-start">
          <button 
            onClick={() => onChangeView(ViewState.HOME)} 
            className="z-50 relative group"
          >
            <h1 className={`font-serif text-2xl md:text-3xl font-bold tracking-tighter transition-colors ${navColorClass}`}>
              LUMINOSO
            </h1>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center justify-end gap-6 z-50 w-1/3">
          <button 
            onClick={onToggleCart}
            className={`relative group transition-colors flex items-center gap-2 ${navColorClass}`}
          >
            <span className="hidden md:inline text-xs uppercase tracking-widest font-medium">Cart</span>
            <div className="relative">
              <ShoppingCart size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand-gold text-white text-[9px] flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </button>
          
          <button 
            className={`md:hidden transition-colors ${navColorClass}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 md:hidden animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                onChangeView(link.view);
                setMobileMenuOpen(false);
              }}
              className="text-3xl font-serif text-brand-black hover:text-brand-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
