'use client';

import { getApplicationsStats } from '@/data/AdminStats';
import { ApplicationWithProductT } from '@/types/ApplicationT';
import { FC } from 'react';
import CardStats from '../../ui/CardStats';

interface Props {
  applications: ApplicationWithProductT[];
}

const ApplicationsStats: FC<Props> = (props) => {
  return <CardStats data={getApplicationsStats(props.applications)} />;
};

export default ApplicationsStats;
