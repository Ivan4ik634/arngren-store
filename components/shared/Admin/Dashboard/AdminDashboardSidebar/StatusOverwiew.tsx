'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock3 } from 'lucide-react';
import { FC } from 'react';

interface Props {
  data: {
    pending: number;
    approved: number;
    in_shipping: number;
    rejected: number;
  };
}

const statusOverview = (data: {
  pending: number;
  approved: number;
  in_shipping: number;
  rejected: number;
}): { label: string; count: number; color: string }[] => [
  { label: 'Pending', count: data.pending, color: 'bg-amber-400' },
  { label: 'Approved', count: data.approved, color: 'bg-emerald-400' },
  { label: 'In shipping', count: data.in_shipping, color: 'bg-blue-400' },
  { label: 'Rejected', count: data.rejected, color: 'bg-rose-400' },
];

const StatusOverwiew: FC<Props> = ({ data }) => {
  return (
    <Card className="border-slate-200/80 shadow-none">
      <CardHeader className="px-5 py-4">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Clock3 className="size-4" /> Status Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-5 pb-5 text-xs">
        {statusOverview(data).map(({ label, count, color }) => (
          <div key={label} className="flex items-center gap-2">
            <span className={`size-2 rounded-full ${color}`} />
            <span className="flex-1 text-slate-500">{label}</span>
            <span className="font-medium text-slate-600">{count}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default StatusOverwiew;
