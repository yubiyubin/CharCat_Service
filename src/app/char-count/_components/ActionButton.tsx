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
      className="px-4 py-3 bg-primary/15 text-text-primary/60 font-bold rounded-lg hover:bg-primary/30 transition-colors"
    >
      {label}
    </button>
  );
}

//  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
// >
