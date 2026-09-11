'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { orderService } from '@/services/Order.service';
import { OrderWithUserT } from '@/types/OrderT';
import dayjs from 'dayjs';
import { Eye, Trash2 } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  data: OrderWithUserT[] | null | undefined;
  idsChecked: string[];
  allChecked: boolean;
  handleCheckAll: () => void;
  handleCheck: (id: string) => void;
  setOrders: Dispatch<SetStateAction<OrderWithUserT[] | null | undefined>>;
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
    await orderService.deleteOrder(id);
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
        {data?.map((data) => (
          <TableRow key={data.id}>
            <TableHead className="w-[50px] ">
              <Checkbox
                checked={idsChecked.includes(data.id)}
                onCheckedChange={() => handleCheck(data.id)}
              />
            </TableHead>
            <TableCell className="font-medium">{data.order_id}</TableCell>
            <TableCell>
              <div className="flex items-center">
                <Avatar size="lg">
                  <AvatarImage src={data.user_id.avatar} />
                  <AvatarFallback>{data.user_id.name[0]}</AvatarFallback>
                </Avatar>
                <div className="ml-5">
                  <h1>
                    <span className="font-bold">{data.user_id.name}</span>
                  </h1>
                  <p className="opacity-50">{data.user_id.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div>
                <p>{dayjs(data.created_at).format('MMM DD YYYY')} </p>
                <p className="opacity-50">{dayjs(data.created_at).format('hh:mm A')}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="px-4 py-2 bg-green-500/20 w-min rounded-full ">
                <p className="text-green-500">{data.status}</p>
              </div>
            </TableCell>
            <TableCell className="font-bold">${data.total}</TableCell>
            <TableCell className="">{data.items_length}</TableCell>
            <TableCell className="text-right">
              <Trash2 onClick={() => handleDelete(data.id)} className="mr-2 text-red-500" />
              <Eye />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
