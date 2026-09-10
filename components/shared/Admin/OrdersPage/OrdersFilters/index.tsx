'use client';

import { Button } from '@/components/ui/button';
import SearchInput from '@/components/ui/SearchInput';
import SelectFilter from '@/components/ui/SelectFilter';
import { statusFilters } from '@/data/Status';
import { orderService } from '@/services/Order.service';
import { FilterOrdersT } from '@/types/FiltersT';
import { Download, Trash2 } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  filters: FilterOrdersT;
  setFilters: Dispatch<SetStateAction<FilterOrdersT>>;
  idsChecked: string[];
  refetch: () => void;
}

//Сделать через рефетч квери!!!!!!
//Дальше сделать надо все Actions Потом сделать гугл авторизацию
//Ипроверить весь функционал опять чтобы удостовериться что правильно все работает или нет

const OrdersFilters: FC<Props> = ({ filters, refetch, idsChecked, setFilters }) => {
  const handleDeleteRows = async () => {
    await orderService.deleteOrders(idsChecked);
    refetch();
  };

  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Search"
        />
        <SelectFilter
          value={filters.status}
          onChange={(value) => setFilters({ ...filters, status: value! })}
          label="Status"
          options={statusFilters}
        />
      </div>
      <div className="flex gax-5">
        {idsChecked.length > 0 && (
          <Button onClick={handleDeleteRows} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete {idsChecked.length} rows
          </Button>
        )}

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
    </div>
  );
};

export default OrdersFilters;
