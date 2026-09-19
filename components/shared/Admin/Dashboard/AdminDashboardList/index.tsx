import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';

export const DashboardList = ({
  title,
  icon: Icon,
  action,
  children,
}: {
  title: string;
  icon: typeof Package;
  action: string;
  children: React.ReactNode;
}) => (
  <Card className="border-slate-200/80 shadow-none">
    <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 px-5 py-4">
      <CardTitle className="flex items-center gap-2 text-sm">
        <Icon className="size-4 text-slate-500" />
        {title}
      </CardTitle>
      <Link
        href={action}
        className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-600">
        View all <ArrowRight className="size-3" />
      </Link>
    </CardHeader>
    <CardContent className="p-3">{children}</CardContent>
  </Card>
);
