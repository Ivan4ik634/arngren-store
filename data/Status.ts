import { SelectFilterOptionT } from '@/components/ui/SelectFilter';

export const statusFilters: SelectFilterOptionT[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'In Shipping', value: 'in_shipping' },
  { label: 'Cancelled', value: 'cancelled' },
];

export const withdrawalStatusFilters: SelectFilterOptionT[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Failed', value: 'failed' },
];
