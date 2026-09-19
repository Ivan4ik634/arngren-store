'use client';
import { getDashboardStats } from '@/data/AdminStats';
import { applicationService } from '@/services/Application.service';
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
  const [date, setDate] = useState(new Date());

  const { data: stats } = useQuery({
    queryKey: ['stats', date],
    queryFn: async () => {
      const [orderStats, productsStats, usersStats, withdrawalStats, applicationStats] =
        await Promise.all([
          orderService.getOrdersStats(date),
          productService.getProductsStats(),
          userService.getUsersStats(),
          withdravalService.getWithdrawalStats(date),
          applicationService.getApplicationsStats(date),
        ]);

      return { orderStats, productsStats, usersStats, withdrawalStats, applicationStats };
    },
  });

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

  const getStatusCount = (data: any[] | undefined, status: string) =>
    data?.filter((item) => item.status === status).length ?? 0;

  const data = {
    pending:
      getStatusCount(stats?.withdrawalStats?.data, 'pending') +
      getStatusCount(stats?.orderStats?.data, 'pending') +
      getStatusCount(stats?.applicationStats?.data, 'pending'),

    approved:
      getStatusCount(stats?.withdrawalStats?.data, 'failed') +
      getStatusCount(stats?.orderStats?.data, 'cancelled') +
      getStatusCount(stats?.applicationStats?.data, 'approved'),

    rejected:
      getStatusCount(stats?.withdrawalStats?.data, 'failed') +
      getStatusCount(stats?.orderStats?.data, 'rejected') +
      getStatusCount(stats?.applicationStats?.data, 'rejected'),

    in_shipping: getStatusCount(stats?.orderStats?.data, 'in_shipping'),
  };

  return (
    <main className="min-w-0 bg-[#fbfcfe] py-8 text-slate-700 lg:py-10">
      <AdminDashboardHeader setDate={setDate} date={date} />

      <CardStats
        className="mt-4 grid grid-cols-5   gap-x-5"
        data={getDashboardStats({
          productsLength: stats?.productsStats?.length || 0,
          orderLength: stats?.orderStats?.length || 0,
          usersLength: stats?.usersStats?.length || 0,
          applicationsLength: stats?.applicationStats?.length || 0,
          withdrawalPendingLength: stats?.withdrawalStats?.length || 0,
        })}
      />

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_228px] ">
        <AdminOrderList orders={dashboardData?.orders} />
        <DashboardSidebar data={data} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_228px]">
        <AdminLatestProducts products={dashboardData?.products} />
        <AdminRecentUsers users={dashboardData?.users} />
      </div>
    </main>
  );
};

export default AdminDashboardPage;
