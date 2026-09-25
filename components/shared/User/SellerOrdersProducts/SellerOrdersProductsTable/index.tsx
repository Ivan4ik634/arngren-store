'use client';

import OrderItem from '@/components/orders/OrderItem';
import DrawerDetailsOrder from '@/components/orders/DrawerDetailsOrder';
import NotFoundData from '@/components/shared/NotFoundData';
import { Badge } from '@/components/ui/badge';
import { statusConfig } from '@/configs/STATUS';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useProfile } from '@/hooks/useProfile';
import { orderService } from '@/services/Order.service';
import { transactionService } from '@/services/Transaction.service';
import { userService } from '@/services/User.service';
import { CartItemWithOrderT } from '@/types/CartItemT';
import { OrderWithUserT } from '@/types/OrderT';
import dayjs from 'dayjs';
import { Dispatch, FC, SetStateAction } from 'react';
import toast from 'react-hot-toast';

interface Props {
  data: CartItemWithOrderT[] | null | undefined;
  setCartItems: Dispatch<SetStateAction<CartItemWithOrderT[] | undefined>>;
}

const SellerOrdersProductsTable: FC<Props> = ({ data, setCartItems }) => {
  const { profile } = useProfile();

  const handleAccept = async (order: OrderWithUserT, cartItem: CartItemWithOrderT) => {
    if (!profile?.id) return toast.error('User not found');
    if (order.status !== 'pending') return toast.error('Order is not pending');

    await orderService.update(order.id, { status: 'in_shipping' });
    setCartItems((prev) =>
      prev?.map((ci) =>
        ci.id === cartItem.id ? { ...ci, order_id: { ...ci.order_id, status: 'in_shipping' } } : ci,
      ),
    );

    // Начисляем продавцу его долю заказа (цена его позиции)
    const { data: sellerProfile } = await userService.getById(profile.id);
    await userService.updateBalance(profile.id, (sellerProfile?.balance || 0) + cartItem.price);

    await transactionService.create({
      user_id: profile.id,
      amount: cartItem.price,
      status: 'completed',
      type: 'income',
      transaction: order.order_id,
    });

    toast.success('Order accepted');
  };

  const handleReject = async (order: OrderWithUserT, cartItem: CartItemWithOrderT) => {
    await orderService.update(order.id, { status: 'cancelled' });
    setCartItems((prev) =>
      prev?.map((ci) =>
        ci.id === cartItem.id ? { ...ci, order_id: { ...ci.order_id, status: 'cancelled' } } : ci,
      ),
    );

    // Возвращаем покупателю его долю заказа
    const { data: buyerProfile } = await userService.getById(order.user_id.id);
    await userService.updateBalance(
      order.user_id.id,
      (buyerProfile?.balance || 0) + cartItem.price,
    );

    await transactionService.create({
      user_id: order.user_id.id,
      amount: cartItem.price,
      status: 'cancelled',
      type: 'purchase',
      transaction: order.order_id,
    });

    // Если продавец уже получил деньги (заказ был принят), списываем обратно
    if (order.status === 'in_shipping' && profile?.id) {
      const { data: sellerProfile } = await userService.getById(profile.id);
      await userService.updateBalance(profile.id, (sellerProfile?.balance || 0) - cartItem.price);
    }

    toast.success('Order cancelled');
  };

  return (
    <>
    <div className="mt-5 space-y-3 lg:hidden">
      {data?.length ? data.map((item) => {
        const order = item.order_id;
        const status = statusConfig[order.status];
        return (
          <article key={item.id} className="min-w-0 rounded-lg border border-zinc-200 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="break-all font-semibold">{order.order_id}</p>
                <p className="mt-1 text-sm text-muted-foreground">{dayjs(order.created_at).format('MMM DD YYYY')}</p>
              </div>
              <Badge className={status.className}>{status.label}</Badge>
            </div>
            <div className="mt-4 flex items-end justify-between gap-3">
              <div className="flex gap-5 text-sm">
                <p><span className="text-muted-foreground">Order total</span><br /><strong>${order.total}</strong></p>
                <p><span className="text-muted-foreground">Your item</span><br /><strong>${item.price} × {item.count}</strong></p>
              </div>
              <DrawerDetailsOrder
                type="seller"
                order={order}
                handleAccept={(acceptedOrder) => handleAccept(acceptedOrder, item)}
                handleReject={(rejectedOrder) => handleReject(rejectedOrder, item)}
              />
            </div>
          </article>
        );
      }) : <NotFoundData type="seller-orders" />}
    </div>
    <div className="hidden lg:block">
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
        {data?.length ? (
          data?.map((data, i) => (
            <OrderItem
              handleAccept={(order) => handleAccept(order, data)}
              handleReject={(order) => handleReject(order, data)}
              key={data.id}
              type="seller"
              order={data.order_id}
            />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6}>
              <NotFoundData type="seller-orders" />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    </div>
    </>
  );
};

export default SellerOrdersProductsTable;
