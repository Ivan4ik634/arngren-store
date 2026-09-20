'use client';

import OrderItem from '@/components/orders/OrderItem';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useProfile } from '@/hooks/useProfile';
import { orderService } from '@/services/Order.service';
import { transactionService } from '@/services/Transaction.service';
import { CartItemWithOrderT } from '@/types/CartItemT';
import { OrderWithUserT } from '@/types/OrderT';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  data: CartItemWithOrderT[] | null | undefined;
  setCartItems: Dispatch<SetStateAction<CartItemWithOrderT[] | undefined>>;
}

const SellerOrdersProductsTable: FC<Props> = ({ data, setCartItems }) => {
  const { profile } = useProfile();

  const handleAccept = async (order: OrderWithUserT, cartItem: CartItemWithOrderT) => {
    if (order.status !== 'pending') return;

    await orderService.update(order.id, { status: 'in_shipping' });
    setCartItems((prev) =>
      prev?.map((ci) => (ci.id === cartItem.id ? { ...ci, status: 'in_shipping' } : ci)),
    );

    await transactionService.create({
      user_id: order.user_id.id,
      amount: order.total,
      status: 'completed',
      type: 'purchase',
      transaction: order.order_id,
    });
    if (profile?.id) {
      await transactionService.create({
        user_id: profile.id,
        amount: order.total,
        status: 'completed',
        type: 'income',
        transaction: order.order_id,
      });
    }
  };

  const handleReject = async (order: OrderWithUserT, cartItem: CartItemWithOrderT) => {
    await orderService.update(order.id, { status: 'cancelled' });
    setCartItems((prev) =>
      prev?.map((ci) => (ci.id === cartItem.id ? { ...ci, status: 'cancelled' } : ci)),
    );

    const existingTransaction = await transactionService.getByOrderIdAndUserId(
      order.user_id.id,
      order.order_id,
    );

    if (existingTransaction) {
      await transactionService.update(existingTransaction[0].id, {
        status: existingTransaction[0].status === 'completed' ? 'completed' : 'cancelled',
      });
    } else {
      await transactionService.create({
        user_id: order.user_id.id,
        amount: order.total,
        status: 'cancelled',
        type: 'purchase',
        transaction: order.order_id,
      });
    }
  };

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((data) => (
          <OrderItem
            handleAccept={(order) => handleAccept(order, data)}
            handleReject={(order) => handleReject(order, data)}
            key={data.id}
            type="seller"
            order={data.order_id}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default SellerOrdersProductsTable;
