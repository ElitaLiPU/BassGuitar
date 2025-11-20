import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Button } from './components/Button';
import { ToneConcierge } from './components/ToneConcierge';
import { CartDrawer } from './components/CartDrawer';
import { PRODUCTS } from './constants';
import { ViewState, CartItem, Product } from './types';
import { ArrowRight, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const renderHome = () => (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-black text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550985543-f47f38aeee65?q=80&w=2535&auto=format&fit=crop" 
            alt="Vulkan Tube Preamp" 
            className="w-full h-full object-cover opacity-60 grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-noise opacity-20" />
        </div>

        <div className={`relative z-10 max-w-5xl px-6 text-center space-y-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-4">
            <h2 className="text-brand-gold text-xs md:text-sm font-medium tracking-[0.4em] uppercase">
              Handcrafted in Portland, OR
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-normal tracking-tight leading-[1.1]">
              Analog Tone <br />
              <span className="italic font-light text-gray-300">Redefined.</span>
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
            <Button 
              variant="secondary" 
              className="min-w-[200px]"
              onClick={() => setCurrentView(ViewState.SHOP)}
            >
              View Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-brand-offwhite px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h3 className="font-serif text-3xl md:text-4xl text-brand-black leading-tight">
            "We build gear for the player who understands that tone is not just heard, but felt."
          </h3>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto" />
          <p className="text-gray-600 leading-relaxed font-light text-lg max-w-2xl mx-auto">
            Vulkan Audio was founded on a simple premise: high voltage vacuum tube circuits deliver a dynamic response that digital modeling cannot replicate. Every unit is hand-wired, point-to-point, ensuring your signal remains pure from the first note to the last.
          </p>
          <button 
            onClick={() => setCurrentView(ViewState.ABOUT)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-black hover:text-brand-gold transition-colors mt-8 border-b border-transparent hover:border-brand-gold pb-1"
          >
            Our Story <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* Product Highlight - The Preamp */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        <div className="relative h-[50vh] md:h-auto bg-brand-gray overflow-hidden group">
           <img 
            src="https://images.unsplash.com/photo-1626630726731-33f9d284eb4f?q=80&w=2574&auto=format&fit=crop" 
            alt="Vacuum Tubes" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale contrast-125"
          />
        </div>
        <div className="flex items-center justify-center p-12 md:p-24 bg-white">
          <div className="max-w-md space-y-6">
            <h4 className="text-brand-gold uppercase tracking-widest text-xs font-bold">The Flagship</h4>
            <h2 className="font-serif text-4xl text-brand-black">Vulkan Tube Preamp DI</h2>
            <p className="text-gray-600 leading-relaxed">
              The heart of your rig. Two 12AX7 tubes running at true 300V plate voltage provide massive headroom and 3D harmonic richness. It features a Jensen DI transformer for studio-grade balanced output.
            </p>
            <ul className="space-y-2 pt-4 pb-6">
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-1 h-1 bg-brand-black rounded-full" />
                Independent Gain & Master Volume
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-1 h-1 bg-brand-black rounded-full" />
                Baxandall Bass & Treble EQ
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-1 h-1 bg-brand-black rounded-full" />
                Switchable Low Cut (80Hz)
              </li>
            </ul>
            <Button variant="outline" onClick={() => addToCart(PRODUCTS[0])}>
              Add to Signal Chain — ${PRODUCTS[0].price}
            </Button>
          </div>
        </div>
      </section>

      {/* Product Grid Preview */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-serif text-brand-black mb-4">The Collection</h2>
              <p className="text-gray-500 max-w-md">Tools for the working professional. Built to last a lifetime.</p>
            </div>
            <Button variant="ghost" onClick={() => setCurrentView(ViewState.SHOP)} className="group">
              View All Products <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PRODUCTS.slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderShop = () => (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen animate-in fade-in duration-500">
      <div className="text-center mb-20 space-y-4">
        <h2 className="text-5xl md:text-6xl font-serif text-brand-black">Shop</h2>
        <p className="text-gray-500 text-sm uppercase tracking-widest">Quality over Quantity</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="pt-32 pb-20 px-6 min-h-screen animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto text-center md:text-left">
        <h2 className="text-5xl md:text-7xl font-serif text-brand-black mb-16 leading-none">
          Pursuing <br />Perfection.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-lg text-gray-800 leading-relaxed font-light">
            <p>
              <strong className="font-medium text-brand-black">Vulkan Audio</strong> exists in the space between vintage soul and modern reliability. We got tired of "good enough" tone. We got tired of gear that failed on the road.
            </p>
            <p>
              Our workshop in Portland is small by design. We don't have an assembly line. We have workbenches. We have soldering irons. We have oscilloscopes.
            </p>
            <p>
              When you order a Vulkan preamp or bass, you aren't just buying a product; you are commissioning a piece of musical equipment built specifically to help you find your voice.
            </p>
          </div>
          <div className="relative aspect-[4/5] bg-gray-100">
             <img src="https://images.unsplash.com/photo-1555656407-436f910e74d6?q=80&w=2671&auto=format&fit=crop" alt="Workshop" className="w-full h-full object-cover grayscale contrast-125" />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white selection:bg-brand-black selection:text-white font-sans antialiased">
      <Navbar 
        cartItems={cartItems} 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        onToggleCart={() => setCartOpen(true)} 
      />
      
      <main>
        {currentView === ViewState.HOME && renderHome()}
        {currentView === ViewState.SHOP && renderShop()}
        {currentView === ViewState.ABOUT && renderAbout()}
      </main>

      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      <ToneConcierge />

      <footer className="bg-brand-black text-white py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-8 max-w-xs">
            <h2 className="font-serif text-3xl tracking-tight">VULKAN.</h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Handcrafted tube amplification and instruments for the discerning musician.
            </p>
            <p className="text-gray-600 text-xs">
              © 2024 Vulkan Audio. All rights reserved.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div>
              <h3 className="text-white uppercase tracking-widest text-xs font-bold mb-8">Explore</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setCurrentView(ViewState.SHOP)}>Preamp DI</li>
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setCurrentView(ViewState.SHOP)}>Basses</li>
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setCurrentView(ViewState.SHOP)}>Accessories</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white uppercase tracking-widest text-xs font-bold mb-8">Company</h3>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors" onClick={() => setCurrentView(ViewState.ABOUT)}>About Us</li>
                <li className="hover:text-white cursor-pointer transition-colors">Dealers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white uppercase tracking-widest text-xs font-bold mb-8">Stay Connected</h3>
               <div className="flex flex-col gap-4">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <Button variant="secondary" className="w-full">Subscribe</Button>
               </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;