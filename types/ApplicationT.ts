import { LucideIcon } from 'lucide-react';

export interface ApplicationT {
  id: string;
  product_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface ApplicationCreateT {
  product_id: string;
}
export interface ApplicationDeleteT {
  id: string;
}
export interface CardStatsT {
  icon: LucideIcon;
  title: string;
  info: string;
  iconWrapperClassName?: string;
  iconClassName?: string;
}
