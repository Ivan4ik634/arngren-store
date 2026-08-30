'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Check, DollarSign, Handbag, UserPlus, Users } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const CustomersStats: FC<Props> = (props) => {
  return (
    <div className="grid mt-10 grid-cols-5 gap-x-5">
      <Card>
        <CardContent className="flex items-center">
          <div className="p-3 rounded-full bg-primary/10">
            <Users className="size-5 text-primary" />
          </div>
          <div className="ml-4">
            <p className="opacity-50">Total customers</p>
            <p className="font-bold text-xl">1,248</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center">
          <div className="p-3 rounded-full bg-green-500/10">
            <UserPlus className="size-5 text-green-500" />
          </div>
          <div className="ml-4">
            <p className="opacity-50">Pending review</p>
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
            <p className="opacity-50">Active Customers</p>
            <p className="font-bold text-xl">60</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center">
          <div className="p-3 rounded-full bg-red-500/10">
            <Handbag className="size-5 text-red-500" />
          </div>
          <div className="ml-4">
            <p className="opacity-50">Customer with orders</p>
            <p className="font-bold text-xl">20</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center">
          <div className="p-3 rounded-full bg-primary/10">
            <DollarSign className="size-5 text-primary" />
          </div>
          <div className="ml-4">
            <p className="opacity-50">Total spent</p>
            <p className="font-bold text-xl">$200,400</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersStats;
