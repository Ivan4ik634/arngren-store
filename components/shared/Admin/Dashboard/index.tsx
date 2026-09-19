'use client';
import { getDashboardStats } from '@/data/AdminStats';
import { orderService } from '@/services/Order.service';
import { productService } from '@/services/Product.service';
import { userService } from '@/services/User.service';
import { withdravalService } from '@/services/Withdrawal.service';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import CardStats from '../ui/CardStats';
import AdminDashboardHeader from './AdminDashboardHeader';
import DashboardSidebar from './AdminDashboardSidebar/DashboardSidebar';
import AdminLatestProducts from './AdminLatestProducts';
import AdminOrderList from './AdminOrderList';
import AdminRecentUsers from './AdminRecentUsers';

const AdminDashboardPage: FC = () => {
  const { data } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const [orderLength, productsLength, usersLength, withdrawalPendingLength] = await Promise.all(
        [
          orderService.getOrdersLength(),
          productService.getProductsLength(),
          userService.getUsersLength(),
          withdravalService.getWithdrawalPendingLength(),
        ],
      );

      return { orderLength, productsLength, usersLength, withdrawalPendingLength };
    },
  });
  const stats = getDashboardStats({
    productsLength: data?.productsLength || 0,
    orderLength: data?.orderLength || 0,
    usersLength: data?.usersLength || 0,
    withdrawalPendingLength: data?.withdrawalPendingLength || 0,
  });
  const [date, setDate] = useState(new Date());
  const { data: dashboardData } = useQuery({
    queryKey: ['dashboard', date],
    queryFn: async () => {
      const [orders, users, products] = await Promise.all([
        orderService.getOrdersDashboard(date),
        userService.getUsersDashboard(date),
        productService.getProductsDashboard(date),
      ]);

      return {
        orders: orders.data,
        users: users.data,
        products: products.data,
      };
    },
  });

  return (
    <main className="min-w-0 bg-[#fbfcfe] py-8 text-slate-700 lg:py-10">
      <AdminDashboardHeader setDate={setDate} date={date} />

      <CardStats className="mt-4 grid grid-cols-4 gap-x-5" data={stats} />

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_228px] ">
        <AdminOrderList orders={dashboardData?.orders} />
        <DashboardSidebar />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_228px]">
        <AdminLatestProducts products={dashboardData?.products} />
        <AdminRecentUsers users={dashboardData?.users} />
      </div>
    </main>
  );
};

export default AdminDashboardPage;
