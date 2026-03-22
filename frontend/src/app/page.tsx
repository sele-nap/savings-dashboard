import TotalSavings from '@/components/dashboard/TotalSavings';
import EvolutionChart from '@/components/dashboard/EvolutionChart';
import AllocationPieChart from '@/components/dashboard/AllocationPieChart';
import TransactionHistory from '@/components/dashboard/TransactionHistory';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 space-y-4">
      <TotalSavings />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AllocationPieChart />
        <EvolutionChart />
      </div>
      <TransactionHistory />
    </div>
  );
}
