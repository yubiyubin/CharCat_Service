import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ModeSwitch() {
  const { setTheme, theme } = useTheme();
  const onClick = () => {
    return theme === "dark" ? setTheme("light") : setTheme("dark");
  };
  return (
    <button
      onClick={onClick}
      className="md:ml-2 px-3 py-1 rounded-full bg-surface-muted border border-border-input text-text-secondary text-xs font-bold hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-1"
    >
      <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
