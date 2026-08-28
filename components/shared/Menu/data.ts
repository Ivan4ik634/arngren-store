import { ProductT } from '@/types/ProductT';
import { Car, Drill, Gamepad2, Home, Monitor, Shirt } from 'lucide-react';

export const categories = [
  { name: 'All', icon: null },
  { name: 'Electronics', icon: Monitor },
  { name: 'Home & Garden', icon: Home },
  { name: 'Sports', icon: Shirt },
  { name: 'Tools', icon: Drill },
  { name: 'Toys', icon: Gamepad2 },
  { name: 'Automotive', icon: Car },
];

export const products: ProductT[] = [
  {
    id: '1',
    name: 'Honda CBR 1000RR',
    category: 'Sport',
    price: '$18,499',
    rating: '4.9',
    brand: 'Honda',
    reviews: '128',
    image: 'https://pngimg.com/uploads/motorcycle/motorcycle_PNG5341.png',
  },
  {
    id: '2',
    name: 'Yamaha MT-09',
    category: 'Naked',
    price: '$11,299',
    rating: '4.8',
    brand: 'Yamaha',
    reviews: '96',
    image: 'https://pngimg.com/uploads/motorcycle/motorcycle_PNG3146.png',
  },
  {
    id: '3',
    name: 'Kawasaki Ninja ZX-6R',
    category: 'Sport',
    price: '$11,399',
    rating: '4.9',
    brand: 'Kawasaki',
    reviews: '214',
    image: 'https://pngimg.com/uploads/motorcycle/motorcycle_PNG5341.png',
  },
  {
    id: '4',
    name: 'BMW R 1250 GS',
    category: 'Adventure',
    price: '$19,995',
    rating: '4.8',
    brand: 'BMW',
    reviews: '87',
    image: 'https://pngimg.com/uploads/motorcycle/motorcycle_PNG3146.png',
  },
  {
    id: '5',
    name: 'Ducati Panigale V4',
    category: 'Sport',
    price: '$25,995',
    rating: '5.0',
    brand: 'Ducati',
    reviews: '156',
    image: 'https://pngimg.com/uploads/motorcycle/motorcycle_PNG5341.png',
  },
  {
    id: '6',
    name: 'Harley-Davidson Fat Bob',
    category: 'Cruiser',
    price: '$18,599',
    rating: '4.7',
    brand: 'Harley-Davidson',
    reviews: '73',
    image: 'https://pngimg.com/uploads/motorcycle/motorcycle_PNG3146.png',
  },
];

export const categoryFilters = [
  'All Categories',
  'Electronics',
  'Home & Garden',
  'Sports & Outdoors',
  'Tools & Equipment',
  'Toys & Games',
  'Automotive',
  'Other',
];

export const brands = ['Samsung', 'Apple', 'Xiaomi', 'Bosch', 'Nike'];
