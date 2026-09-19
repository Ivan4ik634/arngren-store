import { SafetyCard } from './SafetyCard';
import StatusOverwiew from './StatusOverwiew';

const DashboardSidebar = () => (
  <div className="space-y-4">
    <StatusOverwiew />
    <SafetyCard />
  </div>
);

export default DashboardSidebar;
