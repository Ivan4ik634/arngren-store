'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownToLine, ArrowUpFromLine, Wallet } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const BalanceOverwiew: FC<Props> = (props) => {
  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-3">
      <Card className="bg-linear-to-br from-primary/15 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="size-5" />
            Available balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-4xl">$1,250.00</p>
          <p className="opacity-50 mt-1">Ready to spend on your next order</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpFromLine className="size-5" />
            Total income
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-4xl">$8,430.50</p>
          <p className="opacity-50 mt-1">Earned from your sales</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowDownToLine className="size-5" />
            Total spent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-bold text-4xl">$7,180.50</p>
          <p className="opacity-50 mt-1">Spent on purchases</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceOverwiew;
