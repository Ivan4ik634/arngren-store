import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Package,
  ShoppingCart,
  UserRound,
  UsersRound,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

type OrderStatus = 'Pending' | 'Approved' | 'In shipping' | 'Rejected';

const orders: {
  id: string;
  product: string;
  price: string;
  image: string;
  user: string;
  status: OrderStatus;
  date: string;
}[] = [
  {
    id: '#ORD-1048',
    product: 'iPhone 13 Pro 128GB',
    price: '$1,200',
    image: '/design.png',
    user: 'john.doe@gmail.com',
    status: 'Pending',
    date: 'Sep 16, 2026',
  },
  {
    id: '#ORD-1047',
    product: 'Headphones',
    price: '$199',
    image: '/cart-page.png',
    user: 'maria.s@gmail.com',
    status: 'Approved',
    date: 'Sep 16, 2026',
  },
  {
    id: '#ORD-1046',
    product: 'MacBook Air',
    price: '$1,299',
    image: '/design.png',
    user: 'alex20@gmail.com',
    status: 'In shipping',
    date: 'Sep 15, 2026',
  },
  {
    id: '#ORD-1045',
    product: 'Nike Sneakers',
    price: '$129',
    image: '/cart-page.png',
    user: 'maksim.k@ukr.net',
    status: 'Rejected',
    date: 'Sep 15, 2026',
  },
  {
    id: '#ORD-1044',
    product: 'Smart Watch',
    price: '$249',
    image: '/design.png',
    user: 'sophia.l@gmail.com',
    status: 'Approved',
    date: 'Sep 14, 2026',
  },
];

const products = [
  ['iPhone 13 Pro 128GB', 'Electronics', '$1200'],
  ['MacBook Air M2', 'Electronics', '$1299'],
  ['AirPods Pro', 'Electronics', '$249'],
  ['Samsung Galaxy S24', 'Electronics', '$899'],
  ['Nike Sneakers', 'Sports & Outdoors', '$129'],
];

const statusStyles: Record<OrderStatus, string> = {
  Pending: 'bg-amber-50 text-amber-600 border-amber-100',
  Approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'In shipping': 'bg-blue-50 text-blue-600 border-blue-100',
  Rejected: 'bg-rose-50 text-rose-600 border-rose-100',
};

const StatCard = ({
  icon: Icon,
  title,
  value,
  change,
  tone,
}: {
  icon: typeof Package;
  title: string;
  value: string;
  change: string;
  tone: string;
}) => (
  <Card className="border-slate-200/80 shadow-none">
    <CardContent className="flex items-center gap-4 p-5">
      <div className={`flex size-11 shrink-0 items-center justify-center rounded-full ${tone}`}>
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{title}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
        <p className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">
          <ArrowUpRight className="size-3 text-emerald-500" />
          <span className="font-medium text-emerald-600">{change}</span> vs. last 7 days
        </p>
      </div>
    </CardContent>
  </Card>
);

const AdminDashboard: FC = () => {
  return (
    <main className="min-w-0 bg-[#fbfcfe] py-8 text-slate-700 lg:py-10">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Good evening,</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Here’s what’s happening on your platform today.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 shadow-sm">
          <CalendarDays className="size-4" /> Sep 16, 2026
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Package}
          title="Total Products"
          value="124"
          change="12%"
          tone="bg-blue-50 text-blue-500"
        />
        <StatCard
          icon={ShoppingCart}
          title="Total Orders"
          value="48"
          change="8%"
          tone="bg-sky-50 text-sky-500"
        />
        <StatCard
          icon={UserRound}
          title="Total Users"
          value="37"
          change="15%"
          tone="bg-emerald-50 text-emerald-500"
        />
        <StatCard
          icon={FileText}
          title="Pending Withdrawals"
          value="5"
          change="2"
          tone="bg-rose-50 text-rose-500"
        />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_228px]">
        <Card className="border-slate-200/80 shadow-none">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-5 py-4">
            <CardTitle className="text-sm font-semibold">Recent Orders</CardTitle>
            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600">
              View all <ArrowRight className="size-3" />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-170 text-left text-xs">
                <thead className="border-b border-slate-100 text-[10px] uppercase tracking-wide text-slate-400">
                  <tr>
                    <th className="px-5 py-3">ID</th>
                    <th className="py-3">Product</th>
                    <th className="py-3">User</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Date</th>
                    <th className="py-3">Total</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70">
                      <td className="px-5 py-3 font-medium text-slate-500">{order.id}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative size-8 overflow-hidden rounded-md bg-slate-100">
                            <Image src={order.image} alt="" fill className="object-cover" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-700">{order.product}</p>
                            <p className="mt-0.5 text-[10px] text-slate-400">{order.price}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-slate-500">{order.user}</td>
                      <td className="py-3">
                        <Badge variant="outline" className={statusStyles[order.status]}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-slate-500">
                        {order.date}
                        <span className="block text-[10px] text-slate-400">03:42 PM</span>
                      </td>
                      <td className="py-3 font-medium text-slate-600">{order.price}</td>
                      <td className="pr-4 text-center text-slate-400">•••</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit border-slate-200/80 shadow-none">
          <CardHeader className="border-b border-slate-100 px-5 py-4">
            <CardTitle className="flex items-center gap-2 text-sm">
              <BarChart3 className="size-4 text-slate-500" /> Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            {(
              [
                ['Products', '124', Package, '12%'],
                ['Orders', '48', ShoppingCart, '8%'],
                ['Users', '37', UsersRound, '15%'],
                ['Withdrawals', '5', WalletCards, '2%'],
              ] as [string, string, LucideIcon, string][]
            ).map(([label, value, Icon, change]) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-slate-50">
                <Icon className="size-4 text-slate-500" />
                <span className="flex-1 text-xs text-slate-500">{label}</span>
                <span className="text-xs font-semibold text-slate-700">{value}</span>
                <span className="text-[10px] text-emerald-500">↑ {change}</span>
                <ChevronRight className="size-3 text-slate-300" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_228px]">
        <DashboardList title="Latest Products" icon={Package} action="/admin/products">
          <div className="space-y-1">
            {products.map(([name, category, price], index) => (
              <div
                key={name}
                className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50">
                <div className="relative size-8 overflow-hidden rounded-md bg-slate-100">
                  <Image
                    src={index % 2 ? '/cart-page.png' : '/design.png'}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="flex-1 text-[11px] font-medium text-slate-600">{name}</span>
                <span className="hidden text-[10px] text-slate-400 sm:block">{category}</span>
                <span className="w-12 text-right text-[10px] text-slate-600">{price}</span>
                <Badge className="bg-emerald-50 text-[10px] text-emerald-600">Active</Badge>
                <span className="text-slate-400">•••</span>
              </div>
            ))}
          </div>
        </DashboardList>
        <DashboardList title="Recent Users" icon={UsersRound} action="/admin/customers">
          <div className="space-y-1">
            {[
              'john.doe@gmail.com',
              'maria.s@gmail.com',
              'alex20@gmail.com',
              'maksim.k@ukr.net',
              'sophia.l@gmail.com',
            ].map((email, index) => (
              <div
                key={email}
                className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50">
                <div className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-500">
                  {email[0].toUpperCase()}
                </div>
                <span className="flex-1 truncate text-[10px] text-slate-600">{email}</span>
                <span className="hidden text-[10px] text-slate-400 sm:block">
                  Sep {16 - index}, 2026
                </span>
                <Badge className="bg-emerald-50 text-[9px] text-emerald-600">Active</Badge>
              </div>
            ))}
          </div>
        </DashboardList>
        <div className="space-y-4">
          <Card className="border-blue-100 bg-linear-to-br from-blue-50 via-white to-indigo-50 shadow-none">
            <CardContent className="p-5">
              <div className="mb-4 flex size-9 items-center justify-center rounded-full bg-white text-blue-500 shadow-sm">
                <CheckCircle2 className="size-5" />
              </div>
              <p className="text-sm font-semibold text-slate-700">Keep your platform safe</p>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                Monitor orders, users and withdrawals in real time.
              </p>
              <div className="mt-3 flex justify-end">
                <span className="flex size-7 items-center justify-center rounded-full bg-white text-blue-500 shadow-sm">
                  <ArrowRight className="size-3" />
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-200/80 shadow-none">
            <CardHeader className="px-5 py-4">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Clock3 className="size-4" /> Status Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-5 pb-5 text-xs">
              {[
                ['Pending', '7', 'bg-amber-400'],
                ['Approved', '24', 'bg-emerald-400'],
                ['In shipping', '12', 'bg-blue-400'],
                ['Rejected', '5', 'bg-rose-400'],
              ].map(([label, count, color]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className={`size-2 rounded-full ${color}`} />
                  <span className="flex-1 text-slate-500">{label}</span>
                  <span className="font-medium text-slate-600">{count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

const DashboardList = ({
  title,
  icon: Icon,
  action,
  children,
}: {
  title: string;
  icon: typeof Package;
  action: string;
  children: React.ReactNode;
}) => (
  <Card className="border-slate-200/80 shadow-none">
    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-5 py-4">
      <CardTitle className="flex items-center gap-2 text-sm">
        <Icon className="size-4 text-slate-500" />
        {title}
      </CardTitle>
      <Link
        href={action}
        className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600">
        View all <ArrowRight className="size-3" />
      </Link>
    </CardHeader>
    <CardContent className="p-3">{children}</CardContent>
  </Card>
);

export default AdminDashboard;
