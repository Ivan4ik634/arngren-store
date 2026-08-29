import { PAGES } from '@/configs/PAGES';
import { LinkT } from '@/types/LinkT';
import { Ad, AppWindowMac, ListOrdered, Package, Users } from 'lucide-react';

export const AdminLinks: LinkT[] = [
  {
    icon: ListOrdered,
    name: 'Orders',
    href: PAGES.ORDERS,
  },
  {
    icon: Package,
    name: 'Products',
    href: PAGES.PRODUCTS,
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
];
