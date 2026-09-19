import { LucideIcon } from 'lucide-react';
import { ProductT } from './ProductT';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';
export interface ApplicationT {
  id: string;
  product_id: string;
  status: ApplicationStatus;
  created_at: string;
}
export interface ApplicationWithProductT extends Omit<ApplicationT, 'product_id'> {
  product_id: ProductT;
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
