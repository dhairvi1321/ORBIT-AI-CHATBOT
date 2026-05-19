import { Menu, Settings, Sparkles, Zap } from 'lucide-react'

interface NavbarProps {
  onMenuClick: () => void
  sidebarOpen: boolean
}

function Navbar({ onMenuClick, sidebarOpen }: NavbarProps) {
  return (
    <header className="glass relative z-10 flex h-14 shrink-0 items-center justify-between border-b border-border/50 px-4">
      {/* Subtle gradient glow at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Left side */}
      <div className="flex items-center gap-3">
        {/* Menu toggle */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted-foreground transition-smooth 
                     hover:bg-secondary hover:text-foreground"
          aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Logo and title */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl 
                          bg-gradient-to-br from-primary via-primary to-accent
                          shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <Sparkles className="h-4 w-4 text-white" />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-accent opacity-50 blur-md" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-tight text-foreground">
              Orbit <span className="text-glow text-primary">AI</span>
            </h1>
            <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Zap className="h-2.5 w-2.5 text-accent" />
              GPT-4 Turbo
            </span>
          </div>
        </div>
      </div>

      {/* Center - Model Badge */}
      <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <div className="flex items-center gap-2 rounded-full border border-border/50 bg-secondary/50 px-3 py-1">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[11px] font-medium text-muted-foreground">Connected</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <button
          className="rounded-lg p-2 text-muted-foreground transition-smooth 
                     hover:bg-secondary hover:text-foreground"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}

export default Navbar
