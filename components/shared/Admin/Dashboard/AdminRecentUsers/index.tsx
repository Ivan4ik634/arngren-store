import { PAGES } from '@/configs/PAGES';
import { UserT } from '@/types/UserT';
import { UsersRound } from 'lucide-react';
import { FC } from 'react';
import { DashboardList } from '../AdminDashboardList';

interface Props {
  users: UserT[] | undefined | null;
}
const AdminRecentUsers: FC<Props> = ({ users }) => {
  return (
    <DashboardList title="Recent Users" icon={UsersRound} action={PAGES.CUSTOMERS}>
      <div className="space-y-1">
        {users?.map((user, index) => (
          <div
            key={user.email}
            className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50">
            <div className="flex size-8 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-500">
              {user.email[0].toUpperCase()}
            </div>
            <div>
              <span className="flex-1 truncate text-[10px] text-slate-600">{user.name}</span>
              <span className="flex-1 truncate text-[10px] text-slate-600">{user.email}</span>
              <span className="hidden text-[10px] text-slate-400 sm:block">
                Sep {16 - index}, 2026
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardList>
  );
};

export default AdminRecentUsers;
