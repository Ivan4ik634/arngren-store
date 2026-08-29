'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Check, Clock, DollarSign, ShoppingBag, XCircleIcon } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const OrdersStats: FC<Props> = (props) => {
  return (
    <div className="grid mt-10 grid-cols-5 gap-x-5">
      <Card>
        <CardContent className="flex items-center">
          <div className="p-3 rounded-full bg-primary/10">
            <ShoppingBag className="size-5 text-primary" />
          </div>
          <div className="ml-4">
            <p className="opacity-50">Total orders</p>
            <p className="font-bold text-xl">1,248</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-500/10">
            <Clock className="size-5 text-yellow-500" />
          </div>
          <div className="ml-4">
            <p className="opacity-50">Pending orders</p>
            <p className="font-bold text-xl">32</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center">
          <div className="p-3 rounded-full bg-green-500/10">
            <Check className="size-5 text-green-500" />
          </div>
          <div className="ml-4">
            <p className="opacity-50">Success orders</p>
            <p className="font-bold text-xl">200</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center">
          <div className="p-3 rounded-full bg-red-500/10">
            <XCircleIcon className="size-5 text-red-500" />
          </div>
          <div className="ml-4">
            <p className="opacity-50">Cancelled orders</p>
            <p className="font-bold text-xl">64</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center">
          <div className="p-3 rounded-full bg-primary/10">
            <DollarSign className="size-5 text-primary" />
          </div>
          <div className="ml-4">
            <p className="opacity-50">Total money</p>
            <p className="font-bold text-xl">$12010</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersStats;
