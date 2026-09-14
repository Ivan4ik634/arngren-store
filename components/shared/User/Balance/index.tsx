'use client';

import { FC } from 'react';
import BalanceOverwiew from './BalanceOverwiew';
import BalanceTopUpWithdraw from './BalanceTopUpWithdraw';
import BalanceTransactionHistory from './BalanceTransactionHistory';

interface Props {}

const BalancePage: FC<Props> = (props) => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Balance</h1>
      <p className="opacity-50">Manage your wallet, top up and track your transactions</p>
      <BalanceOverwiew />
      <BalanceTopUpWithdraw />
      <BalanceTransactionHistory />
    </div>
  );
};

export default BalancePage;
