'use client';

import { Button } from '@/components/ui/button';
import SearchInput from '@/components/ui/SearchInput';
import SelectFilter from '@/components/ui/SelectFilter';
import { withdrawalStatusFilters } from '@/data/Status';
import { withdravalService } from '@/services/Withdrawal.service';
import { FiltersT } from '@/types/FiltersT';
import { WithdrawalWithUserT } from '@/types/WithdrawalT';
import { Check, Download, X } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  filters: FiltersT;
  idsChecked: string[];
  setFilters: Dispatch<SetStateAction<FiltersT>>;
  setIdsChecked: Dispatch<SetStateAction<string[]>>;
  setWithdrawals: Dispatch<SetStateAction<WithdrawalWithUserT[] | undefined>>;
}
const WithdrawalFilters: FC<Props> = ({
  setWithdrawals,
  setIdsChecked,
  filters,
  idsChecked,
  setFilters,
}) => {
  const handleComplete = async () => {
    await withdravalService.updateManyStatus(idsChecked, 'completed');
    setWithdrawals((prev) =>
      prev?.map((withdrawal) =>
        idsChecked.includes(withdrawal.id) ? { ...withdrawal, status: 'completed' } : withdrawal,
      ),
    );
    setIdsChecked([]);
  };
  const handleFail = async () => {
    await withdravalService.updateManyStatus(idsChecked, 'failed');
    setWithdrawals((prev) =>
      prev?.map((withdrawal) =>
        idsChecked.includes(withdrawal.id) ? { ...withdrawal, status: 'failed' } : withdrawal,
      ),
    );
    setIdsChecked([]);
  };

  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <SelectFilter
          value={filters.status}
          onChange={(value) => setFilters({ ...filters, status: value! })}
          label="Status"
          options={withdrawalStatusFilters}
        />
      </div>
      <div className="flex gax-5">
        {idsChecked.length > 0 && (
          <>
            <Button onClick={handleComplete} variant="outline">
              <Check className="mr-2 h-4 w-4" /> Complete {idsChecked.length} rows
            </Button>
            <Button onClick={handleFail} variant="destructive">
              <X className="mr-2 h-4 w-4" /> Fail {idsChecked.length} rows
            </Button>
          </>
        )}

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
    </div>
  );
};

export default WithdrawalFilters;
