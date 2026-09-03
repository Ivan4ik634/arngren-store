'use client';

import { getOrdersStats } from '@/data/AdminStats';
import { FC } from 'react';
import CardStats from '../../ui/CardStats';

interface Props {
  orders?: Parameters<typeof getOrdersStats>[0];
}

const OrdersStats: FC<Props> = (props) => {
  return <CardStats data={getOrdersStats(props.orders ?? [])} />;
};

export default OrdersStats;
