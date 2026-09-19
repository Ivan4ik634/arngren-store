import { FC } from 'react';
import { SafetyCard } from './SafetyCard';
import StatusOverwiew from './StatusOverwiew';

interface Props {
  data: {
    pending: number;
    approved: number;
    in_shipping: number;
    rejected: number;
  };
}
const DashboardSidebar: FC<Props> = ({ data }) => (
  <div className="space-y-4">
    <StatusOverwiew data={data} />
    <SafetyCard />
  </div>
);

export default DashboardSidebar;
