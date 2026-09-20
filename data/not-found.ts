import { PAGES } from '@/configs/PAGES';
import {
  ClipboardList,
  Heart,
  Package,
  PackageSearch,
  ShoppingCart,
  UserRound,
  UsersRound,
  Wallet,
  type LucideIcon,
} from 'lucide-react';

export interface NotFoundDataT {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export const NOT_FOUND_DATA: Record<string, NotFoundDataT> = {
  wishlist: {
    icon: Heart,
    title: 'Your wishlist is empty',
    description: 'Save products you like to find them here later.',
    buttonText: 'Explore products',
    buttonLink: PAGES.MENU,
  },
  cart: {
    icon: ShoppingCart,
    title: 'Your cart is empty',
    description: 'Add products you like and they will appear here.',
    buttonText: 'Explore products',
    buttonLink: PAGES.MENU,
  },
  orders: {
    icon: ClipboardList,
    title: 'No orders yet',
    description: 'When you place an order it will show up here.',
    buttonText: 'Explore products',
    buttonLink: PAGES.MENU,
  },
  products: {
    icon: Package,
    title: 'No products yet',
    description: 'Create your first product to start selling.',
    buttonText: 'Add product',
    buttonLink: PAGES.PRODUCTS,
  },
  balance: {
    icon: Wallet,
    title: 'No transactions yet',
    description: 'Your balance transactions will appear here.',
    buttonText: 'Top up balance',
    buttonLink: PAGES.BALANCE,
  },
  menu: {
    icon: PackageSearch,
    title: 'No products found',
    description: 'Try adjusting your search or filters.',
  },
  'seller-orders': {
    icon: ClipboardList,
    title: 'No orders yet',
    description: 'When customers order your products they will appear here.',
  },
  'admin-orders': {
    icon: ClipboardList,
    title: 'No orders found',
    description: 'There are no orders matching your filters.',
  },
  'admin-products': {
    icon: Package,
    title: 'No products found',
    description: 'There are no products matching your filters.',
  },
  customers: {
    icon: UsersRound,
    title: 'No customers found',
    description: 'There are no customers matching your search.',
  },
  applications: {
    icon: ClipboardList,
    title: 'No applications found',
    description: 'There are no applications matching your filters.',
  },
  withdrawals: {
    icon: Wallet,
    title: 'No withdrawal requests',
    description: 'There are no withdrawal requests matching your filters.',
  },
  'dashboard-products': {
    icon: Package,
    title: 'No products yet',
    description: 'Products will appear here once they are added.',
  },
  'dashboard-orders': {
    icon: ClipboardList,
    title: 'No orders yet',
    description: 'Orders will appear here once they are placed.',
  },
  'dashboard-users': {
    icon: UserRound,
    title: 'No users yet',
    description: 'New users will appear here.',
  },
};
