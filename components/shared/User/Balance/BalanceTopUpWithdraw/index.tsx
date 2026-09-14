'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Banknote, CreditCard, Landmark, Plus } from 'lucide-react';
import { FC, useState } from 'react';

interface Props {}

const BalanceTopUpWithdraw: FC<Props> = (props) => {
  const [value, setValue] = useState(0);
  const handleTopUp = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: value,
      }),
    });

    const { url } = await res.json();

    if (url) {
      window.location.href = url;
    }
  };
  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="size-5" />
            Top up balance
          </CardTitle>
          <CardDescription>Add funds to your wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setValue(10)} variant="outline" size="sm">
              $10
            </Button>
            <Button onClick={() => setValue(25)} variant="outline" size="sm">
              $25
            </Button>
            <Button onClick={() => setValue(50)} variant="outline" size="sm">
              $50
            </Button>
            <Button onClick={() => setValue(100)} variant="outline" size="sm">
              $100
            </Button>
            <Button onClick={() => setValue(250)} variant="outline" size="sm">
              $250
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                type="number"
                onChange={(e) => setValue(Number(e.target.value))}
                value={value}
                className="pl-7"
                placeholder="Custom amount"
              />
            </div>
            <Button>
              <CreditCard className="size-4" />
              Top up
            </Button>
          </div>
          <p className="opacity-50 text-xs mt-3">
            Payments are processed securely. Funds appear in your balance instantly.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Banknote className="size-5" />
            Withdraw funds
          </CardTitle>
          <CardDescription>Transfer your balance to a bank account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Amount</label>
              <div className="relative mt-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input className="pl-7" placeholder="0.00" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Bank account</label>
              <Input className="mt-1" placeholder="IBAN / card number" />
            </div>
            <Button variant="secondary" className="w-full">
              <Landmark className="size-4" />
              Request withdrawal
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BalanceTopUpWithdraw;
