import Link from "next/link";
type ToolCardProps = {
  href: string;
  title: string;
  description: string;
  ready: boolean;
};

export default function ToolCard({
  href,
  title,
  description,
  ready,
}: ToolCardProps) {
  if (!ready) {
    return (
      <div className="cursor-not-allowed block p-6 bg-surface-muted/50 rounded-lg">
        <div className="flex items-center justify-between ">
          <h2 className="text-lg font-semibold text-text-primary/80">
            {title}
          </h2>
          <span className="text-sm text-text-secondary px-2 py-1 rounded-full bg-surface-muted-dark/10">
            준비 중
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1">{description}</p>
      </div>
    );
  }
  return (
    <Link
      key={href}
      href={href}
      className="block p-6 bg-surface-muted rounded-lg hover:bg-primary/15 transition-colors"
    >
      <h2 className="text-lg font-semibold text-text-primary/80">{title}</h2>
      <p className="text-sm text-text-secondary mt-1">{description}</p>
    </Link>
  );
}
