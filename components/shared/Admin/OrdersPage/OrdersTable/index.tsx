'use client';

import OrderItem from '@/components/orders/OrderItem';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { orderService } from '@/services/Order.service';
import { OrderWithUserT } from '@/types/OrderT';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  data: OrderWithUserT[] | null | undefined;
  idsChecked: string[];
  allChecked: boolean;
  handleCheckAll: () => void;
  handleCheck: (id: string) => void;
  setOrders: Dispatch<SetStateAction<OrderWithUserT[] | undefined>>;
}

const OrdersTable: FC<Props> = ({
  data,
  setOrders,
  idsChecked,
  allChecked,
  handleCheckAll,
  handleCheck,
}) => {
  const handleDelete = async (id: string) => {
    await orderService.delete(id);
    setOrders((prev) => prev?.filter((user) => user.id !== id));
  };
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] ">
            <Checkbox checked={allChecked} onCheckedChange={handleCheckAll} />
          </TableHead>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((order) => (
          <OrderItem
            key={order.id}
            order={order}
            handleCheck={handleCheck}
            idsChecked={idsChecked}
            handleDelete={handleDelete}
            type="admin"
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
