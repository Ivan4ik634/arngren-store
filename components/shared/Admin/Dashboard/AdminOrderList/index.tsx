'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { statusConfig } from '@/configs/STATUS';
import { OrderWithUserT } from '@/types/OrderT';
import dayjs from 'dayjs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

type OrderStatus = 'Pending' | 'Approved' | 'In shipping' | 'Rejected';
const statusStyles: Record<OrderStatus, string> = {
  Pending: 'bg-amber-50 text-amber-600 border-amber-100',
  Approved: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'In shipping': 'bg-blue-50 text-blue-600 border-blue-100',
  Rejected: 'bg-rose-50 text-rose-600 border-rose-100',
};
interface Props {
  orders: OrderWithUserT[] | undefined | null;
}
const AdminOrderList: FC<Props> = ({ orders }) => {
  return (
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
                <th className="py-3">User</th>
                <th className="py-3">Status</th>
                <th className="py-3">Date</th>
                <th className="py-3">Total items</th>
                <th className="py-3">Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70">
                  <td className="px-5 py-3 font-medium text-slate-500">{order.id}</td>

                  <td className="py-3 text-slate-500">{order.user_id.name}</td>
                  <td className="py-3">
                    <Badge variant="outline" className={statusConfig[order.status].className}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-slate-500">
                    {dayjs(order.created_at).format('')}
                    <span className="block text-[10px] text-slate-400">
                      {dayjs(order.created_at).format('')}
                    </span>
                  </td>
                  <td className="py-3 font-medium text-slate-600">{order.items_length}</td>
                  <td className="py-3 font-medium text-slate-600">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminOrderList;
