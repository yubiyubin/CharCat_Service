export default function ActionButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-3 bg-primary/15 text-text-primary/60 font-bold rounded-lg hover:bg-primary/30 dark:neon-border dark:neon-border-hover dark:hover:text-primary-light active:scale-[0.98] transition-premium"
    >
      {label}
    </button>
  );
}
