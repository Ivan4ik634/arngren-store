'use client';

import { useProfile } from '@/hooks/useProfile';
import { transactionService } from '@/services/Transaction.service';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import BalanceOverwiew from './BalanceOverwiew';
import BalanceTopUpWithdraw from './BalanceTopUpWithdraw';
import BalanceTransactionHistory from './BalanceTransactionHistory';

interface Props {}

const BalancePage: FC<Props> = (props) => {
  const { profile } = useProfile();
  const { data: transactions } = useQuery({
    queryKey: ['balance', profile?.id],
    queryFn: () => transactionService.getByUserId(profile?.id || ''),
    enabled: !!profile,
  });
  return (
    <div>
      <h1 className="font-bold text-2xl">Balance</h1>
      <p className="opacity-50">Manage your wallet, top up and track your transactions</p>
      <BalanceOverwiew profile={profile} transactions={transactions} />
      <BalanceTopUpWithdraw />
      <BalanceTransactionHistory transactions={transactions} />
    </div>
  );
};

export default BalancePage;
