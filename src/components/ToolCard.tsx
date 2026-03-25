import Link from "next/link";
type ToolCardProps = {
  href: string;
  title: string;
  description: string;
  ready: boolean;
  /** 도구를 대표하는 이모지 또는 짧은 텍스트 아이콘 */
  icon?: string;
};

export default function ToolCard({
  href,
  title,
  description,
  ready,
  icon,
}: ToolCardProps) {
  if (!ready) {
    return (
      <div className="cursor-not-allowed block p-6 bg-surface-muted/50 dark:glass-card rounded-xl dark:neon-border opacity-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="text-xl leading-none flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-primary dark:text-primary-light font-bold">
                {icon}
              </span>
            )}
            <h2 className="text-lg font-semibold text-text-primary/80">
              {title}
            </h2>
          </div>
          <span className="text-xs text-text-secondary px-3 py-1 rounded-full bg-surface-muted-dark/10 dark:bg-primary/10 dark:text-primary-light font-medium">
            준비 중
          </span>
        </div>
        <p className="text-sm text-text-secondary mt-1.5">{description}</p>
      </div>
    );
  }

  // TODO(human): Implement getNeonHoverStyle() - return a className string
  // that creates the perfect neon hover effect for dark mode cards.
  // Consider: box-shadow layers, border-color transitions, and subtle scale.

  return (
    <Link
      key={href}
      href={href}
      className="group block p-6 bg-surface-muted rounded-xl dark:glass-card dark:neon-border dark:neon-border-hover hover:bg-primary/10 hover:-translate-y-0.5 transition-premium"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <span className="text-xl leading-none flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 text-primary dark:text-primary-light font-bold">
              {icon}
            </span>
          )}
          <h2 className="text-lg font-semibold text-text-primary/80 group-hover:text-primary dark:group-hover:neon-text transition-premium">
            {title}
          </h2>
        </div>
        <span className="text-xs opacity-0 group-hover:opacity-100 text-primary dark:text-primary-light transition-premium font-medium">
          &rarr;
        </span>
      </div>
      <p className="text-sm text-text-secondary mt-1.5 group-hover:text-text-secondary/90 transition-premium">
        {description}
      </p>
    </Link>
  );
}
