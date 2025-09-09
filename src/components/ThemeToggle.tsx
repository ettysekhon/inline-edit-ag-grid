import { Button } from "@/components/ui/button";
import { Theme, ThemeType } from "@/types";
import { Moon, Sun } from "lucide-react";

type Props = {
  theme: ThemeType;
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <Button variant="outline" onClick={onToggle} className="gap-2">
      {theme === Theme.DARK ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">
        {theme === Theme.DARK ? "Dark" : "Light"}
      </span>
    </Button>
  );
}
