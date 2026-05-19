import { Sparkles } from 'lucide-react'

function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-slide-up">
      {/* Avatar */}
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl 
                      bg-gradient-to-br from-primary to-accent shadow-[0_0_15px_rgba(139,92,246,0.3)]">
        <Sparkles className="h-4 w-4 text-white" />
        <div className="absolute inset-0 -z-10 rounded-xl bg-primary/30 blur-md" />
      </div>

      {/* Typing animation */}
      <div className="flex flex-col gap-1.5">
        <span className="px-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
          Orbit AI
        </span>
        <div className="message-glass flex items-center gap-1.5 rounded-2xl px-4 py-3">
          <div className="flex items-center gap-1">
            <span className="typing-dot h-2 w-2 rounded-full bg-primary/60" />
            <span className="typing-dot h-2 w-2 rounded-full bg-primary/60" />
            <span className="typing-dot h-2 w-2 rounded-full bg-primary/60" />
          </div>
          <span className="ml-1 text-xs text-muted-foreground">Thinking...</span>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
