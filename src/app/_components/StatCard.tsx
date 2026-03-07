export default function StatCard({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="bg-surface-muted/90 rounded-lg p-4 text-center">
      <p className="text-2xl font-bold text-primary-dark/80">{value}</p>
      <p className="text-sm text-text-secondary mt-1">{label}</p>
    </div>
  );
}
