'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { withdravalService } from '@/services/Withdrawal.service';
import { UserT } from '@/types/UserT';
import { Banknote, CreditCard, Landmark, Plus } from 'lucide-react';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  profile: UserT | null;
}

const BalanceTopUpWithdraw: FC<Props> = ({ profile }) => {
  const [amount, setAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [iban, setIban] = useState('');
  const handleTopUp = async () => {
    if (!profile?.id) return toast.error('User not found');
    if (!amount) return toast.error('Please fill all the fields');

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        user_id: profile.id,
      }),
    });

    const { url } = await res.json();

    if (url) {
      window.location.href = url;
    }
  };
  const handleWithdraw = async () => {
    if (!profile) return toast.error('User not found');
    if (!iban || !withdrawAmount) return toast.error('Please fill all the fields');
    if (withdrawAmount > profile.balance)
      return toast.error('Insufficient balance for this withdrawal');

    const { error } = await withdravalService.add({
      amount: withdrawAmount,
      iban,
      user_id: profile?.id,
    });

    if (error) return toast.error(error.message || 'Withdrawal failed');

    toast.success('Withdrawal successfully');
    setIban('');
    setWithdrawAmount(0);
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
            <Button onClick={() => setAmount(10)} variant="outline" size="sm">
              $10
            </Button>
            <Button onClick={() => setAmount(25)} variant="outline" size="sm">
              $25
            </Button>
            <Button onClick={() => setAmount(50)} variant="outline" size="sm">
              $50
            </Button>
            <Button onClick={() => setAmount(100)} variant="outline" size="sm">
              $100
            </Button>
            <Button onClick={() => setAmount(250)} variant="outline" size="sm">
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
                onChange={(e) => setAmount(Number(e.target.value))}
                value={amount}
                className="pl-7"
                placeholder="Custom amount"
              />
            </div>
            <Button onClick={handleTopUp}>
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
                <Input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="pl-7"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Bank account</label>
              <Input
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className="mt-1"
                placeholder="IBAN / card number"
              />
            </div>
            <Button onClick={handleWithdraw} variant="secondary" className="w-full">
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
