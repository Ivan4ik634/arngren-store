import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const SafetyCard = () => (
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
