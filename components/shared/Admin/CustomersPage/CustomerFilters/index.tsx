'use client';

import { Button } from '@/components/ui/button';
import SearchInput from '@/components/ui/SearchInput';
import { userService } from '@/services/User.service';
import { UserT } from '@/types/UserT';
import { Download, Trash2 } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  filters: { search: string };
  setFilters: Dispatch<
    SetStateAction<{
      search: string;
    }>
  >;
  setUsers: Dispatch<SetStateAction<UserT[] | undefined | null>>;
  idsChecked: string[];
  setIdsChecked: Dispatch<SetStateAction<string[]>>;
}
const CustomerFilters: FC<Props> = ({
  filters,
  setIdsChecked,
  setUsers,
  idsChecked,
  setFilters,
}) => {
  const handleDelete = async () => {
    await userService.deleteUsers(idsChecked);
    setUsers((prev) => prev?.filter((user) => !idsChecked.includes(user.id)));
    setIdsChecked([]);
  };
  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>
      <div className="flex gax-5">
        {idsChecked.length > 0 && (
          <Button onClick={handleDelete} variant="destructive">
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

export default CustomerFilters;
