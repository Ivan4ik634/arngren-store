'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PAGES } from '@/configs/PAGES';
import { statusConfig } from '@/configs/STATUS';
import { OrderWithUserT } from '@/types/OrderT';
import dayjs from 'dayjs';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  orders: OrderWithUserT[] | undefined | null;
}
const AdminOrderList: FC<Props> = ({ orders }) => {
  return (
    <Card className="border-slate-200/80 shadow-none">
      <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-5 py-4">
        <CardTitle className="text-sm font-semibold">Recent Orders</CardTitle>
        <Link
          href={PAGES.ADMIN_ORDERS}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600">
          View all <ArrowRight className="size-3" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <Table className="min-w-170 text-xs">
          <TableHeader className="border-b border-slate-100 text-[10px] uppercase tracking-wide text-slate-400">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-5 py-3">ID</TableHead>
              <TableHead className="py-3">User</TableHead>
              <TableHead className="py-3">Status</TableHead>
              <TableHead className="py-3">Date</TableHead>
              <TableHead className="py-3">Total items</TableHead>
              <TableHead className="py-3">Total</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70">
                <TableCell className="px-5 py-3 font-medium text-slate-500">
                  {order.order_id}
                </TableCell>
                <TableCell className="py-3 text-slate-500">{order.user_id.name}</TableCell>
                <TableCell className="py-3">
                  <Badge variant="outline" className={statusConfig[order.status].className}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 text-slate-500">
                  {dayjs(order.created_at).format('MMM DD, YYYY')}
                  <span className="block text-[10px] text-slate-400">
                    {dayjs(order.created_at).format('hh:mm A')}
                  </span>
                </TableCell>
                <TableCell className="py-3 font-medium text-slate-600">
                  {order.items_length}
                </TableCell>
                <TableCell className="py-3 font-medium text-slate-600">{order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrderList;
