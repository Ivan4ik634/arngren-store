import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, Clock3 } from 'lucide-react';

const statusOverview: { label: string; count: string; color: string }[] = [
  { label: 'Pending', count: '7', color: 'bg-amber-400' },
  { label: 'Approved', count: '24', color: 'bg-emerald-400' },
  { label: 'In shipping', count: '12', color: 'bg-blue-400' },
  { label: 'Rejected', count: '5', color: 'bg-rose-400' },
];

const SafetyCard = () => (
  <Card className="border-blue-100 bg-linear-to-br from-blue-50 via-white to-indigo-50 shadow-none">
    <CardContent className="p-5">
      <div className="mb-4 flex size-9 items-center justify-center rounded-full bg-white text-blue-500 shadow-sm">
        <CheckCircle2 className="size-5" />
      </div>
      <p className="text-sm font-semibold text-slate-700">Keep your platform safe</p>
      <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
        Monitor orders, users and withdrawals in real time.
      </p>
      <div className="mt-3 flex justify-end">
        <span className="flex size-7 items-center justify-center rounded-full bg-white text-blue-500 shadow-sm">
          <ArrowRight className="size-3" />
        </span>
      </div>
    </CardContent>
  </Card>
);

const StatusOverview = () => (
  <Card className="border-slate-200/80 shadow-none">
    <CardHeader className="px-5 py-4">
      <CardTitle className="flex items-center gap-2 text-sm">
        <Clock3 className="size-4" /> Status Overview
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3 px-5 pb-5 text-xs">
      {statusOverview.map(({ label, count, color }) => (
        <div key={label} className="flex items-center gap-2">
          <span className={`size-2 rounded-full ${color}`} />
          <span className="flex-1 text-slate-500">{label}</span>
          <span className="font-medium text-slate-600">{count}</span>
        </div>
      ))}
    </CardContent>
  </Card>
);

const DashboardSidebar = () => (
  <div className="space-y-4">
    <SafetyCard />
  </div>
);

export default DashboardSidebar;
