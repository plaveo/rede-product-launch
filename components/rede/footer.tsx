export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
        <div className="flex items-baseline gap-1.5">
          <span className="font-rede text-lg font-semibold tracking-tight text-foreground">
            REDE
          </span>
          <span className="font-rede text-[10px] font-medium text-primary">™</span>
          <span className="ml-3 text-sm text-muted-foreground">by PEPWORLD</span>
        </div>

        <p className="text-center text-xs text-muted-foreground md:text-right">
          From Data to Decisions.
          <br className="hidden md:block" /> © {new Date().getFullYear()} PEPWORLD.
          All rights reserved.
        </p>
      </div>
    </footer>
  )
}
