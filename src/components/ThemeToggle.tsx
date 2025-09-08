import { clsx } from "clsx";
import { Moon, Sun } from "lucide-react";

type Props = {
  theme: "light" | "dark";
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      aria-label="Toggle theme"
      onClick={onToggle}
      className={clsx(
        "inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm shadow-sm",
        "border-slate-300 bg-white hover:bg-slate-50",
        "dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
      )}
    >
      {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
      <span className="hidden sm:inline">
        {theme === "dark" ? "Dark" : "Light"}
      </span>
    </button>
  );
}
