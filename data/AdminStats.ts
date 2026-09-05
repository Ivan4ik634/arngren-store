import { ApplicationWithProductT, CardStatsT } from '@/types/ApplicationT';
import { ProductT } from '@/types/ProductT';
import {
  Check,
  Clock,
  DollarSign,
  FileText,
  Handbag,
  MessageSquare,
  Package,
  ShoppingBag,
  Star,
  UserPlus,
  Users,
  XCircleIcon,
} from 'lucide-react';

type OrderStatus = 'pending' | 'success' | 'cancelled';

type OrderStatsItem = {
  status?: OrderStatus;
  total?: number;
};

type CustomerStatsItem = {
  active?: boolean;
  orders?: unknown[];
  totalSpent?: number;
  status?: 'pending' | 'active';
};

const formatNumber = (value: number) => value.toLocaleString('en-US');

const formatMoney = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export const getApplicationsStats = (applications: ApplicationWithProductT[]): CardStatsT[] => [
  {
    icon: FileText,
    title: 'Total applications',
    info: formatNumber(applications.length),
  },
  {
    icon: Clock,
    title: 'Pending review',
    info: formatNumber(
      applications.filter((application) => application.status === 'pending').length,
    ),
    iconWrapperClassName: 'bg-yellow-500/10',
    iconClassName: 'text-yellow-500',
  },
  {
    icon: Check,
    title: 'Approved',
    info: formatNumber(
      applications.filter((application) => application.status === 'approved').length,
    ),
    iconWrapperClassName: 'bg-green-500/10',
    iconClassName: 'text-green-500',
  },
  {
    icon: XCircleIcon,
    title: 'Rejected',
    info: formatNumber(
      applications.filter((application) => application.status === 'rejected').length,
    ),
    iconWrapperClassName: 'bg-red-500/10',
    iconClassName: 'text-red-500',
  },
  {
    icon: DollarSign,
    title: 'Products Added',
    info: formatNumber(new Set(applications.map((application) => application.product_id)).size),
  },
];

export const getOrdersStats = (orders: OrderStatsItem[]): CardStatsT[] => [
  {
    icon: ShoppingBag,
    title: 'Total orders',
    info: formatNumber(orders.length),
  },
  {
    icon: Clock,
    title: 'Pending orders',
    info: formatNumber(orders.filter((order) => order.status === 'pending').length),
    iconWrapperClassName: 'bg-yellow-500/10',
    iconClassName: 'text-yellow-500',
  },
  {
    icon: Check,
    title: 'Success orders',
    info: formatNumber(orders.filter((order) => order.status === 'success').length),
    iconWrapperClassName: 'bg-green-500/10',
    iconClassName: 'text-green-500',
  },
  {
    icon: XCircleIcon,
    title: 'Cancelled orders',
    info: formatNumber(orders.filter((order) => order.status === 'cancelled').length),
    iconWrapperClassName: 'bg-red-500/10',
    iconClassName: 'text-red-500',
  },
  {
    icon: DollarSign,
    title: 'Total money',
    info: formatMoney(orders.reduce((total, order) => total + (order.total ?? 0), 0)),
  },
];

export const getCustomersStats = (customers: CustomerStatsItem[]): CardStatsT[] => [
  {
    icon: Users,
    title: 'Total customers',
    info: formatNumber(customers.length),
  },
  {
    icon: UserPlus,
    title: 'Pending review',
    info: formatNumber(customers.filter((customer) => customer.status === 'pending').length),
    iconWrapperClassName: 'bg-green-500/10',
    iconClassName: 'text-green-500',
  },
  {
    icon: Check,
    title: 'Active Customers',
    info: formatNumber(
      customers.filter((customer) => customer.active || customer.status === 'active').length,
    ),
    iconWrapperClassName: 'bg-green-500/10',
    iconClassName: 'text-green-500',
  },
  {
    icon: Handbag,
    title: 'Customer with orders',
    info: formatNumber(customers.filter((customer) => customer.orders?.length).length),
    iconWrapperClassName: 'bg-red-500/10',
    iconClassName: 'text-red-500',
  },
  {
    icon: DollarSign,
    title: 'Total spent',
    info: formatMoney(customers.reduce((total, customer) => total + (customer.totalSpent ?? 0), 0)),
  },
];
export const getProductsStats = (products: ProductT[]): CardStatsT[] => [
  {
    icon: Package,
    title: 'Total products',
    info: formatNumber(products.length),
  },
  {
    icon: Check,
    title: 'Products with application',
    info: formatNumber(products.filter((product) => product.application).length),
    iconWrapperClassName: 'bg-green-500/10',
    iconClassName: 'text-green-500',
  },
  {
    icon: Star,
    title: 'Highly rated',
    info: formatNumber(products.filter((product) => Number(product.rating) >= 4).length),
    iconWrapperClassName: 'bg-yellow-500/10',
    iconClassName: 'text-yellow-500',
  },
  {
    icon: MessageSquare,
    title: 'With reviews',
    info: formatNumber(products.filter((product) => Number(product.reviews) > 0).length),
    iconWrapperClassName: 'bg-blue-500/10',
    iconClassName: 'text-blue-500',
  },
  {
    icon: DollarSign,
    title: 'Average price',
    info: formatMoney(
      products.length
        ? products.reduce((total, product) => total + product.price, 0) / products.length
        : 0,
    ),
  },
];
