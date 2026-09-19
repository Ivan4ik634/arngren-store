'use client';

import { useCheckboxes } from '@/hooks/useCheckboxes';
import { useSyncQueryData } from '@/hooks/useSyncQueryData';
import { withdravalService } from '@/services/Withdrawal.service';
import { FiltersT } from '@/types/FiltersT';
import { WithdrawalWithUserT } from '@/types/WithdrawalT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import WithdrawalFilters from './WithdrawalFilters';
import WithdrawalStats from './WithdrawalStats';
import WithdrawalTable from './WithdrawalTable';

interface Props {}

const WithdrawalPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FiltersT>({ search: '', category: 'all', status: 'all' });
  const { data } = useQuery({
    queryKey: ['withdrawals', filters],
    queryFn: () => withdravalService.get(filters),
  });
  const [withdrawals, setWithdrawals] = useSyncQueryData<WithdrawalWithUserT>(data);

  const checkboxes = useCheckboxes(withdrawals || [], (withdrawal) => withdrawal.id);

  return (
    <div className="mt-8 w-full">
      <h1 className="font-bold text-2xl">Withdrawal Requests</h1>
      <WithdrawalStats withdrawals={withdrawals} />
      <WithdrawalFilters
        {...checkboxes}
        setWithdrawals={setWithdrawals}
        filters={filters}
        setFilters={setFilters}
      />
      <WithdrawalTable {...checkboxes} setWithdrawals={setWithdrawals} withdrawals={withdrawals} />
    </div>
  );
};

export default WithdrawalPage;
