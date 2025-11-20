import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Vulkan Tube Preamp DI',
    category: 'Preamp',
    price: 1050,
    description: 'The flagship all-tube preamplifier. Features two vacuum tubes for high voltage rail operation, delivering unrivaled headroom and 3D harmonic content.',
    features: ['2x 12AX7 Vacuum Tubes', 'Jensen DI Transformer', 'Bass & Treble Baxandall EQ', 'Low Cut Filter'],
    image: 'https://images.unsplash.com/photo-1521410825489-90307d84eb79?q=80&w=2574&auto=format&fit=crop', // Tube / Gear shot
    inStock: true,
  },
  {
    id: '2',
    name: 'Vulkan 4-String Classic',
    category: 'Bass',
    price: 3200,
    description: 'A handcrafted masterpiece featuring a roasted alder body, quartersawn maple neck, and our custom-wound split-coil pickup.',
    features: ['Roasted Alder Body', 'Indian Rosewood Fretboard', 'Custom Hand-Wound Pickup', 'Hipshot Hardware'],
    image: 'https://images.unsplash.com/photo-1550985543-f47f38aeee65?q=80&w=2535&auto=format&fit=crop', // Bass guitar detail
    inStock: false,
  },
  {
    id: '3',
    name: 'Dual Opto-Compressor',
    category: 'Effects',
    price: 850,
    description: 'An optical compressor designed specifically for low-frequency instruments. Smooth, musical compression that tightens your low end.',
    features: ['Optical Gain Reduction Element', 'Ratio, Attack, Release controls', 'True Bypass', 'Internal High Voltage Scaling'],
    image: 'https://images.unsplash.com/photo-1562660668-e24899043d31?q=80&w=2670&auto=format&fit=crop', // Pedal/Knob close up
    inStock: true,
  },
  {
    id: '4',
    name: 'Studio Patch Cable',
    category: 'Accessory',
    price: 45,
    description: 'Hand-soldered patch cables using Mogami oxygen-free copper wire and gold-plated connectors.',
    features: ['Mogami 2524 Wire', 'Gold Plated Plugs', 'Double Shielding', 'Lifetime Warranty'],
    image: 'https://images.unsplash.com/photo-1557858074-96eb90c34397?q=80&w=2535&auto=format&fit=crop',
    inStock: true,
  },
];