'use client';

import { statusConfig } from '@/configs/STATUS';
import { OrderWithUserT } from '@/types/OrderT';
import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Checkbox } from '../ui/checkbox';
import { TableCell, TableHead, TableRow } from '../ui/table';
import DrawerDetailsOrder from './DrawerDetailsOrder';

interface Props {
  order: OrderWithUserT;
  type: 'admin' | 'user';
  handleCheck?: (id: string) => void;
  idsChecked?: string[];
  handleDelete?: (id: string) => void;
}

const OrderItem: FC<Props> = ({ order, handleCheck, handleDelete, idsChecked, type }) => {
  const statusConf = statusConfig[order.status];
  return (
    <TableRow key={order.id}>
      {type === 'admin' && (
        <TableHead className="w-[50px] ">
          <Checkbox
            checked={idsChecked!.includes(order.id)}
            onCheckedChange={() => handleCheck!(order.id)}
          />
        </TableHead>
      )}
      <TableCell className="font-medium">{order.order_id}</TableCell>
      {type === 'admin' && (
        <TableCell>
          <div className="flex items-center">
            <Avatar size="lg">
              <AvatarImage src={order.user_id.avatar} />
              <AvatarFallback>{order.user_id.name[0]}</AvatarFallback>
            </Avatar>
            <div className="ml-5">
              <h1>
                <span className="font-bold">{order.user_id.name}</span>
              </h1>
              <p className="opacity-50">{order.user_id.email}</p>
            </div>
          </div>
        </TableCell>
      )}
      <TableCell>
        <div>
          <p>{dayjs(order.created_at).format('MMM DD YYYY')} </p>
          <p className="opacity-50">{dayjs(order.created_at).format('hh:mm A')}</p>
        </div>
      </TableCell>
      <TableCell>
        <div className={`px-4 py-2  w-min rounded-full ${statusConf.className}`}>
          <p>{order.status}</p>
        </div>
      </TableCell>
      <TableCell className="font-bold">${order.total}</TableCell>
      <TableCell className="">{order.items_length}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-start items-start">
          {type === 'admin' && (
            <Trash2
              onClick={() => type === 'admin' && handleDelete!(order.id)}
              className="mr-2 text-red-500"
            />
          )}
          <DrawerDetailsOrder type={type} handleDelete={handleDelete} order={order} />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OrderItem;
