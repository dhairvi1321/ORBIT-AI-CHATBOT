import { useState, useRef, useEffect, FormEvent, KeyboardEvent } from 'react'
import { Send, Paperclip, Mic, Sparkles } from 'lucide-react'

interface InputBoxProps {
  onSendMessage: (content: string) => void
  isLoading: boolean
}

function InputBox({ onSendMessage, isLoading }: InputBoxProps) {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`
    }
  }, [message])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="relative z-10 shrink-0 px-4 pb-4">
      <div className="mx-auto max-w-3xl">
        <form onSubmit={handleSubmit}>
          {/* Floating Input Container with Glassmorphism */}
          <div 
            className={`gradient-border relative overflow-hidden rounded-2xl transition-all duration-300
              ${isFocused ? 'shadow-[0_0_30px_rgba(139,92,246,0.2)]' : ''}`}
          >
            {/* Glass background */}
            <div className="glass-strong rounded-2xl">
              <div className="flex items-end gap-2 p-2">
                {/* Attachment button */}
                <button
                  type="button"
                  className="rounded-xl p-2.5 text-muted-foreground transition-smooth 
                             hover:bg-secondary hover:text-foreground"
                  title="Attach file"
                >
                  <Paperclip className="h-4 w-4" />
                </button>

                {/* Textarea */}
                <div className="relative flex-1">
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Message Orbit AI..."
                    rows={1}
                    className="max-h-[150px] min-h-[44px] w-full resize-none bg-transparent px-2 py-2.5 
                               text-sm text-foreground placeholder:text-muted-foreground/50 
                               focus:outline-none"
                    disabled={isLoading}
                  />
                </div>

                {/* Voice button */}
                <button
                  type="button"
                  className="rounded-xl p-2.5 text-muted-foreground transition-smooth 
                             hover:bg-secondary hover:text-foreground"
                  title="Voice input"
                >
                  <Mic className="h-4 w-4" />
                </button>

                {/* Send button */}
                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className={`group relative rounded-xl p-2.5 transition-all duration-300
                    ${message.trim() && !isLoading
                      ? 'bg-gradient-to-r from-primary to-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]'
                      : 'bg-secondary text-muted-foreground'
                    } disabled:cursor-not-allowed active:scale-95`}
                  title="Send message"
                >
                  {isLoading ? (
                    <Sparkles className="h-4 w-4 animate-pulse" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Helper text */}
          <p className="mt-2.5 text-center text-[10px] text-muted-foreground/50">
            Orbit AI may produce inaccurate information. Consider verifying important facts.
          </p>
        </form>
      </div>
    </div>
  )
}

export default InputBox
