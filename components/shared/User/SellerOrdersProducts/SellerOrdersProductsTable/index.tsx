'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { statusConfig } from '@/configs/STATUS';
import { CartItemWithOrderT } from '@/types/CartItemT';
import dayjs from 'dayjs';
import { FC } from 'react';
import DrawerSellerOrderProductDetails from './DrawerSellerOrderProductDetails';

interface Props {
  data: CartItemWithOrderT[] | null | undefined;
}

const SellerOrdersProductsTable: FC<Props> = ({ data }) => {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((data) => {
          const status = statusConfig[data.order_id.status];
          return (
            <TableRow key={data.id}>
              <TableCell className="font-medium">{data.order_id.order_id}</TableCell>
              <TableCell>
                <div>
                  <p>{dayjs(data.created_at).format('MMM DD YYYY')}</p>
                  <p className="opacity-50">{dayjs(data.created_at).format('hh:mm A')}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className={`px-4 py-2  w-min rounded-full ${status.className}`}>
                  <p>{data.order_id.status}</p>
                </div>
              </TableCell>
              <TableCell className="font-bold">${data.order_id.total}</TableCell>
              <TableCell className="text-right">
                <DrawerSellerOrderProductDetails order={data.order_id} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default SellerOrdersProductsTable;
