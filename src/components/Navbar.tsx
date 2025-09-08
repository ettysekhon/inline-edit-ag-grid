import { ThemeToggle } from './ThemeToggle'

type Props = {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
  onFetch: () => void
  onAddRow: () => void
}

export function Navbar({ theme, onToggleTheme, onFetch, onAddRow }: Props) {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-brand/10 px-3 py-1 text-sm font-semibold text-brand dark:bg-brand/20">Pricing</span>
          <nav className="flex items-center gap-2">
            <button
              onClick={onFetch}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              data-testid="btn-fetch"
            >
              Fetch Prices
            </button>
            <button
              onClick={onAddRow}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              data-testid="btn-add"
            >
              Add Row
            </button>
          </nav>
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  )
}
