import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Button } from './components/Button';
import { ToneConcierge } from './components/ToneConcierge';
import { CartDrawer } from './components/CartDrawer';
import { PRODUCTS } from './constants';
import { ViewState, CartItem, Product } from './types';
import { ArrowRight, Settings, Music, Radio } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          {/* Use a dark, moody image of tubes or a bass */}
          <img 
            src="https://picsum.photos/id/146/1920/1080" 
            alt="Background" 
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-black/50" />
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center space-y-8">
          <h2 className="text-brand-gold text-sm tracking-[0.3em] uppercase animate-in fade-in slide-in-from-bottom-4 duration-700">
            Est. 2024
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            Pure Tone. <br />
            <span className="italic text-gray-400">Handcrafted.</span>
          </h1>
          <div className="pt-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-black px-12 py-4"
              onClick={() => setCurrentView(ViewState.SHOP)}
            >
              Enter Shop
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
          <ArrowRight className="rotate-90" />
        </div>
      </section>

      {/* Features / Value Prop */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
          <div className="space-y-4">
            <Settings className="w-10 h-10 text-brand-gold mx-auto md:mx-0" strokeWidth={1} />
            <h3 className="font-serif text-2xl text-brand-black">High Voltage</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Unlike solid-state emulators, our preamps run on true high-voltage rails, delivering the headroom and harmonic richness of a full tube stack in a portable format.
            </p>
          </div>
          <div className="space-y-4">
            <Music className="w-10 h-10 text-brand-gold mx-auto md:mx-0" strokeWidth={1} />
            <h3 className="font-serif text-2xl text-brand-black">Studio Grade</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Equipped with custom-wound Jensen transformers, our DIs provide a noise-free, balanced signal ready for the world's finest recording consoles.
            </p>
          </div>
          <div className="space-y-4">
            <Radio className="w-10 h-10 text-brand-gold mx-auto md:mx-0" strokeWidth={1} />
            <h3 className="font-serif text-2xl text-brand-black">Built to Tour</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Hand-wired point-to-point construction housed in aircraft-grade aluminum. Designed to withstand the rigors of international touring.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Teaser */}
      <section className="py-32 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-serif text-brand-black">Latest Creations</h2>
            <button 
              onClick={() => setCurrentView(ViewState.SHOP)}
              className="text-sm uppercase tracking-widest border-b border-brand-black pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors"
            >
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* Artist Quote / Image Break */}
      <section className="relative py-40 px-6 bg-brand-black overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src="https://picsum.photos/id/348/1920/800" className="w-full h-full object-cover grayscale" alt="Stage" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <p className="text-2xl md:text-4xl font-serif italic text-white leading-normal">
            "The Vulkan Preamp has become the central nervous system of my pedalboard. It's the sound I've heard in my head for 20 years."
          </p>
          <p className="text-brand-gold uppercase tracking-widest text-sm font-medium">
            — Marcus Miller (Fictional Endorsement)
          </p>
        </div>
      </section>
    </>
  );

  const renderShop = () => (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-5xl font-serif text-brand-black mb-4">The Shop</h2>
      <p className="text-gray-500 mb-12 max-w-xl">
        Every instrument and amplifier is built by hand in our small workshop. 
        Please allow 4-6 weeks for delivery on backordered items.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen text-center md:text-left">
      <h2 className="text-5xl font-serif text-brand-black mb-12">Our Philosophy</h2>
      
      <div className="space-y-8 text-lg text-gray-700 leading-relaxed">
        <p>
          <span className="font-serif text-2xl italic text-brand-black">Vulkan Audio</span> was born from a frustration with modern, sterilized bass tone. We believe that the electric bass is an instrument that demands weight, texture, and dynamic response—qualities that are often lost in digital modeling and mass-produced solid-state gear.
        </p>
        <p>
          Founded in 2024 by a small team of engineers and session musicians, we set out to recreate the signal paths of the legendary tube consoles of the 1960s, but packaged for the modern touring musician.
        </p>
        <div className="my-12 relative h-[400px] bg-gray-200">
          <img src="https://picsum.photos/id/25/1200/800" alt="Workshop" className="w-full h-full object-cover grayscale" />
        </div>
        <p>
          Every solder joint is made by hand. Every tube is tested for microphonics. Every bass is set up to perfection before it leaves our bench. We don't just build gear; we build the foundation of your sound.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-white selection:bg-brand-gold selection:text-white font-sans">
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

      <footer className="bg-brand-black text-white py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl">VULKAN.</h2>
            <p className="text-gray-400 text-sm">
              Handcrafted in Portland, Oregon.<br />
              Est. 2024
            </p>
          </div>
          
          <div>
            <h3 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-6">Shop</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Preamps</li>
              <li className="hover:text-white cursor-pointer">Basses</li>
              <li className="hover:text-white cursor-pointer">Accessories</li>
              <li className="hover:text-white cursor-pointer">Gift Cards</li>
            </ul>
          </div>

          <div>
            <h3 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer">Manuals</li>
              <li className="hover:text-white cursor-pointer">Warranty</li>
              <li className="hover:text-white cursor-pointer">Dealers</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>

          <div>
            <h3 className="text-brand-gold uppercase tracking-widest text-xs font-bold mb-6">Newsletter</h3>
            <div className="flex border-b border-gray-700 pb-2">
              <input type="email" placeholder="Enter your email" className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-600" />
              <button className="text-brand-gold uppercase text-xs font-bold hover:text-white">Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
