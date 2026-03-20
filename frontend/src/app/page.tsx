import TotalSavings from '@/components/dashboard/TotalSavings';
import EvolutionChart from '@/components/dashboard/EvolutionChart';
import AllocationPieChart from '@/components/dashboard/AllocationPieChart';
import TransactionHistory from '@/components/dashboard/TransactionHistory';

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <TotalSavings />
      <EvolutionChart />
      <AllocationPieChart />
      <TransactionHistory />
    </div>
  );
}
