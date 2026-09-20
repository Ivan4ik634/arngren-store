'use client';
import Loading from '@/components/shared/Loading';
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
import { SafetyCard } from './AdminDashboardSidebar/SafetyCard';
import StatusOverwiew from './AdminDashboardSidebar/StatusOverwiew';
import AdminLatestProducts from './AdminLatestProducts';
import AdminOrderList from './AdminOrderList';
import AdminRecentUsers from './AdminRecentUsers';

const AdminDashboardPage: FC = () => {
  const [date, setDate] = useState(new Date());

  const { data: stats, isPending: isPendingStats } = useQuery({
    queryKey: ['stats'],
    queryFn: async () => {
      const [orderStats, productsStats, usersStats, withdrawalStats, applicationStats] =
        await Promise.all([
          orderService.getOrdersStats(),
          productService.getProductsStats(),
          userService.getUsersStats(),
          withdravalService.getWithdrawalStats(),
          applicationService.getApplicationsStats(),
        ]);

      return { orderStats, productsStats, usersStats, withdrawalStats, applicationStats };
    },
  });

  const { data: dashboardData, isPending: isPendingDashboard } = useQuery({
    queryKey: ['dashboard', date],
    queryFn: async () => {
      const [orders, users, products, applications, withdrawals] = await Promise.all([
        orderService.getOrdersDashboard(date),
        userService.getUsersDashboard(date),
        productService.getProductsDashboard(date),
        applicationService.getApplicationsDashboard(date),
        withdravalService.getWithdrawalDashboard(date),
      ]);

      return {
        orders: orders,
        users: users.data,
        products: products.data,
        applications,
        withdrawals,
      };
    },
  });

  const getStatusCount = (data: { status: string }[] | null | undefined, status: string) =>
    data?.filter((item) => item.status === status).length ?? 0;

  const data = {
    pending:
      getStatusCount(dashboardData?.withdrawals?.data, 'pending') +
      getStatusCount(dashboardData?.orders?.statuses, 'pending') +
      getStatusCount(dashboardData?.applications?.data, 'pending'),

    approved:
      getStatusCount(dashboardData?.withdrawals?.data, 'completed') +
      getStatusCount(dashboardData?.orders?.statuses, 'approved') +
      getStatusCount(dashboardData?.applications?.data, 'approved'),

    rejected:
      getStatusCount(dashboardData?.withdrawals?.data, 'failed') +
      getStatusCount(dashboardData?.orders?.statuses, 'rejected') +
      getStatusCount(dashboardData?.applications?.data, 'rejected'),

    in_shipping: getStatusCount(dashboardData?.orders?.statuses, 'in_shipping'),
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

      {isPendingStats || isPendingDashboard ? (
        <Loading className="py-24" />
      ) : (
        <>
          <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_228px] ">
            <AdminOrderList orders={dashboardData?.orders.res} />
            <StatusOverwiew data={data} />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_228px]">
            <AdminLatestProducts products={dashboardData?.products} />
            <AdminRecentUsers users={dashboardData?.users} />
            <SafetyCard />
          </div>
        </>
      )}
    </main>
  );
};

export default AdminDashboardPage;
