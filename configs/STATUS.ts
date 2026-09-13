import { CheckCircle2, Clock, Package, Truck, XCircle } from 'lucide-react';

export const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
    icon: Clock,
  },

  approved: {
    label: 'Approved',
    className: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
    icon: CheckCircle2,
  },

  processing: {
    label: 'Processing',
    className: 'bg-purple-100 text-purple-700 hover:bg-purple-100',
    icon: Package,
  },

  in_shipping: {
    label: 'In Shipping',
    className: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-100',
    icon: Truck,
  },

  rejected: {
    label: 'Rejected',
    className: 'bg-red-100 text-red-700 hover:bg-red-100',
    icon: XCircle,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-700 hover:bg-red-100',
    icon: XCircle,
  },
} as const;
