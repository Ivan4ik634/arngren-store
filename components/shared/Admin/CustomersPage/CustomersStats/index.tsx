'use client';

import { getCustomersStats } from '@/data/AdminStats';
import { FC } from 'react';
import CardStats from '../../ui/CardStats';

interface Props {
  customers?: Parameters<typeof getCustomersStats>[0];
}

const CustomersStats: FC<Props> = (props) => {
  return <CardStats data={getCustomersStats(props.customers ?? [])} />;
};

export default CustomersStats;
