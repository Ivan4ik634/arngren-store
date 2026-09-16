'use client';

import { getWithdrawalsStats } from '@/data/AdminStats';
import { WithdrawalWithUserT } from '@/types/WithdrawalT';
import { FC } from 'react';
import CardStats from '../../ui/CardStats';

interface Props {
  withdrawals: WithdrawalWithUserT[] | undefined;
}

const WithdrawalStats: FC<Props> = (props) => {
  return <CardStats data={getWithdrawalsStats(props.withdrawals ?? [])} />;
};

export default WithdrawalStats;
