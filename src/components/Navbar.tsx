import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { ThemeType } from "@/types";

type Props = {
  theme: ThemeType;
  onToggleTheme: () => void;
  onFetch: () => void;
  onAddRow: () => void;
};

export function Navbar({ theme, onToggleTheme, onFetch, onAddRow }: Props) {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Pricing
          </h1>
          <nav className="flex items-center gap-2">
            <Button variant="outline" onClick={onFetch} data-testid="btn-fetch">
              Fetch Data
            </Button>
            <Button variant="outline" onClick={onAddRow} data-testid="btn-add">
              Add Row
            </Button>
          </nav>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
