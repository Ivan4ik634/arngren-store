import { PAGES } from '@/configs/PAGES';
import { LinkT } from '@/types/LinkT';
import {
  AppWindowMac,
  CreditCard,
  Heart,
  LayoutDashboard,
  ListOrdered,
  Package,
  ShoppingCart,
  User,
  UserRound,
  Users,
  Wallet,
} from 'lucide-react';

export const HeaderLinks: LinkT[] = [
  {
    name: 'Home',
    href: PAGES.HOME,
  },
  {
    name: 'Menu',
    href: PAGES.MENU,
  },
  {
    name: 'Contact',
    href: PAGES.CONTACT,
  },
  {
    name: 'About',
    href: PAGES.ABOUT,
  },
];

export const HeaderUserLinks: LinkT[] = [
  {
    icon: Wallet,
    name: 'My balance',
    href: PAGES.BALANCE,
  },
  {
    icon: UserRound,
    name: 'My profile',
    href: PAGES.PROFILE,
  },

  {
    icon: ShoppingCart,
    name: 'Cart and checkout',
    href: PAGES.CART,
  },
  {
    icon: Heart,
    name: 'Wishlist',
    href: PAGES.WISHLIST,
  },
];

export const AdminLinks: LinkT[] = [
  {
    icon: LayoutDashboard,
    name: 'Dashboard',
    href: PAGES.ADMIN_DASHBOARD,
  },
  {
    icon: ListOrdered,
    name: 'Orders',
    href: PAGES.ADMIN_ORDERS,
  },
  {
    icon: Package,
    name: 'Products',
    href: PAGES.ADMIN_PRODUCTS,
  },
  {
    icon: CreditCard,
    name: 'Withdrawal Requests',
    href: PAGES.WITHDRAWAL,
  },
  {
    icon: AppWindowMac,
    name: 'Application',
    href: PAGES.APPLICATION,
  },
  {
    icon: Users,
    name: 'Customers',
    href: PAGES.CUSTOMERS,
  },
];
export const UserLinks: LinkT[] = [
  {
    icon: User,
    name: 'My profile',
    href: PAGES.PROFILE,
  },
  {
    icon: Wallet,
    name: 'My balance',
    href: PAGES.BALANCE,
  },
  {
    icon: ListOrdered,
    name: 'My Orders',
    href: PAGES.ORDERS,
  },
  {
    icon: Heart,
    name: 'Wishlist',
    href: PAGES.WISHLIST,
  },
  {
    icon: Users,
    name: 'My Products',
    href: PAGES.PRODUCTS,
  },
  {
    icon: ListOrdered,
    name: 'Seller Orders',
    href: PAGES.ORDERS_SELLER,
  },
];
