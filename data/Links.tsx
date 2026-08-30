import { PAGES } from '@/configs/PAGES';
import { LinkT } from '@/types/LinkT';
import { Ad, AppWindowMac, Heart, ListOrdered, Package, Settings, User, Users } from 'lucide-react';

export const AdminLinks: LinkT[] = [
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
    icon: AppWindowMac,
    name: 'Application',
    href: PAGES.APPLICATION,
  },
  {
    icon: Users,
    name: 'Customers',
    href: PAGES.CUSTOMERS,
  },
  {
    icon: Ad,
    name: 'Brands',
    href: PAGES.BRANDS,
  },
  {
    icon: Settings,
    name: 'Settings',
    href: PAGES.ADMIN_SETTINGS,
  },
];
export const UserLinks: LinkT[] = [
  {
    icon: User,
    name: 'My profile',
    href: PAGES.PROFILE,
  },
  {
    icon: ListOrdered,
    name: 'My Orders',
    href: PAGES.ORDERS,
  },
  {
    icon: Heart,
    name: 'Wishlist',
    href: PAGES.PRODUCTS,
  },
  {
    icon: Users,
    name: 'My Products',
    href: PAGES.PRODUCTS,
  },
  {
    icon: Settings,
    name: 'Settings',
    href: PAGES.SETTINGS,
  },
];
