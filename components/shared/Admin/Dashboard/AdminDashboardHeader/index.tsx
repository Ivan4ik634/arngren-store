'use client';

import dayjs from 'dayjs';
import { CalendarDays } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const AdminDashboardHeader: FC<Props> = (props) => {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div>
        <p className="text-sm text-slate-500">Good evening,</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Here’s what’s happening on your platform today.
        </p>
      </div>
      <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 shadow-sm">
        <CalendarDays className="size-4" /> {dayjs().format('MMMM DD, YYYY')}
      </button>
    </div>
  );
};

export default AdminDashboardHeader;
