import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Vulkan Tube Preamp DI',
    category: 'Preamp',
    price: 1050,
    description: 'The flagship all-tube preamplifier. Features two vacuum tubes for high voltage rail operation, delivering unrivaled headroom and 3D harmonic content.',
    features: ['2x 12AX7 Vacuum Tubes', 'Jensen DI Transformer', 'Bass & Treble Baxandall EQ', 'Low Cut Filter'],
    image: 'https://raw.githubusercontent.com/ElitaLiPU/BassGuitar/refs/heads/main/components/Preamp.jpeg', // Silver audio faceplate
    inStock: true,
  },
  {
    id: '2',
    name: 'Vulkan 4-String Classic',
    category: 'Bass',
    price: 3200,
    description: 'A handcrafted masterpiece featuring a roasted alder body, quartersawn maple neck, and our custom-wound split-coil pickup.',
    features: ['Roasted Alder Body', 'Indian Rosewood Fretboard', 'Custom Hand-Wound Pickup', 'Hipshot Hardware'],
    image: 'https://raw.githubusercontent.com/ElitaLiPU/BassGuitar/refs/heads/main/components/VaccumTube.png', // Bass guitar detail
    inStock: true,
  },
  {
    id: '3',
    name: 'Dual Opto-Compressor',
    category: 'Effects',
    price: 850,
    description: 'An optical compressor designed specifically for low-frequency instruments. Smooth, musical compression that tightens your low end.',
    features: ['Optical Gain Reduction Element', 'Ratio, Attack, Release controls', 'True Bypass', 'Internal High Voltage Scaling'],
    image: 'https://raw.githubusercontent.com/ElitaLiPU/BassGuitar/refs/heads/main/components/Compress.jpeg', // Pedal detail
    inStock: true,
  },
  {
    id: '4',
    name: 'Strings',
    category: 'Accessory',
    price: 45,
    description: 'Hand-soldered patch cables using Mogami oxygen-free copper wire and gold-plated connectors.',
    features: ['Mogami 2524 Wire', 'Gold Plated Plugs', 'Double Shielding', 'Lifetime Warranty'],
    image: 'https://raw.githubusercontent.com/ElitaLiPU/BassGuitar/refs/heads/main/components/VaccumTube.png', // Cable coil
    inStock: true,
  },
];
