import DepositForm from '@/components/deposit/DepositForm';

export default function DepositPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Nouveau dépôt</h1>
      <DepositForm />
    </div>
  );
}
