'use client';
import { getDashboardStats } from '@/data/AdminStats';
import { orderService } from '@/services/Order.service';
import { productService } from '@/services/Product.service';
import { userService } from '@/services/User.service';
import { withdravalService } from '@/services/Withdrawal.service';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import CardStats from '../ui/CardStats';
import AdminDashboardHeader from './AdminDashboardHeader';
import AdminLatestProducts from './AdminLatestProducts';
import AdminOrderList from './AdminOrderList';
import AdminRecentUsers from './AdminRecentUsers';
import DashboardSidebar from './DashboardSidebar';

const AdminDashboardPage: FC = () => {
  const { data } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const orderLength = await orderService.getOrdersLength();
      const productsLength = await productService.getProductsLength();
      const usersLength = await userService.getUsersLength();
      const withdrawalPendingLength = await withdravalService.getWithdrawalPendingLength();
      return { orderLength, productsLength, usersLength, withdrawalPendingLength };
    },
  });
  const stats = getDashboardStats({
    productsLength: data?.productsLength || 0,
    orderLength: data?.orderLength || 0,
    usersLength: data?.usersLength || 0,
    withdrawalPendingLength: data?.withdrawalPendingLength || 0,
  });

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: () => orderService.getOrdersDashboard(),
    select: (res) => res?.data,
  });
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getUsersDashboard(),
    select: (res) => res?.data,
  });
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => productService.getProductsDashboard(),
    select: (res) => res?.data,
  });

  return (
    <main className="min-w-0 bg-[#fbfcfe] py-8 text-slate-700 lg:py-10">
      <AdminDashboardHeader />

      <CardStats className="mt-4 grid grid-cols-4 gap-x-5" data={stats} />

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_228px] ">
        <AdminOrderList orders={orders} />
        <DashboardSidebar />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_228px]">
        <AdminLatestProducts products={products} />
        <AdminRecentUsers users={users} />
      </div>
    </main>
  );
};

export default AdminDashboardPage;
