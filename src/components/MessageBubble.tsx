import { User, Sparkles, Copy, ThumbsUp, ThumbsDown, Check, RotateCcw } from 'lucide-react'
import { Message } from '../types'
import { useState } from 'react'

interface MessageBubbleProps {
  message: Message
  isLatest?: boolean
}

function MessageBubble({ message, isLatest }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState<'up' | 'down' | null>(null)
  const isUser = message.role === 'user'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div 
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} ${isLatest ? 'animate-slide-up' : ''}`}
    >
      {/* Avatar */}
      <div
        className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl
          ${isUser 
            ? 'bg-secondary' 
            : 'bg-gradient-to-br from-primary to-accent shadow-[0_0_15px_rgba(139,92,246,0.3)]'}`}
      >
        {isUser ? (
          <User className="h-4 w-4 text-secondary-foreground" />
        ) : (
          <>
            <Sparkles className="h-4 w-4 text-white" />
            {/* Subtle glow behind AI avatar */}
            <div className="absolute inset-0 -z-10 rounded-xl bg-primary/30 blur-md" />
          </>
        )}
      </div>

      {/* Message content */}
      <div className={`flex max-w-[85%] flex-col gap-1.5 ${isUser ? 'items-end' : ''}`}>
        {/* Role label */}
        <span className="px-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
          {isUser ? 'You' : 'Orbit AI'}
        </span>

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-[0_4px_15px_rgba(139,92,246,0.25)]'
              : 'message-glass text-card-foreground'
          }`}
        >
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        </div>

        {/* Actions for AI messages */}
        {!isUser && (
          <div className="flex items-center gap-0.5 px-1">
            <ActionButton
              onClick={handleCopy}
              active={copied}
              title={copied ? 'Copied!' : 'Copy message'}
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </ActionButton>
            
            <ActionButton
              onClick={() => setLiked(liked === 'up' ? null : 'up')}
              active={liked === 'up'}
              title="Good response"
            >
              <ThumbsUp className="h-3 w-3" />
            </ActionButton>
            
            <ActionButton
              onClick={() => setLiked(liked === 'down' ? null : 'down')}
              active={liked === 'down'}
              title="Bad response"
            >
              <ThumbsDown className="h-3 w-3" />
            </ActionButton>

            <ActionButton
              onClick={() => {}}
              title="Regenerate"
            >
              <RotateCcw className="h-3 w-3" />
            </ActionButton>
          </div>
        )}
      </div>
    </div>
  )
}

// Action button component
function ActionButton({ 
  children, 
  onClick, 
  active, 
  title 
}: { 
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  title: string 
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-md p-1.5 transition-smooth
        ${active 
          ? 'bg-primary/20 text-primary' 
          : 'text-muted-foreground/50 hover:bg-secondary hover:text-muted-foreground'}`}
      title={title}
    >
      {children}
    </button>
  )
}

export default MessageBubble
