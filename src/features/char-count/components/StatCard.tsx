export default function StatCard({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="bg-surface-muted/90 dark:glass-card dark:neon-border rounded-xl p-4 text-center hover:-translate-y-0.5 transition-premium">
      <p className="text-2xl font-bold text-primary-dark/80 dark:text-primary-light dark:neon-text">
        {value}
      </p>
      <p className="text-sm text-text-secondary mt-1">{label}</p>
    </div>
  );
}
