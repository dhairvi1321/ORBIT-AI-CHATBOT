import { useEffect, useRef } from 'react'
import { Message } from '../types'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import { Sparkles, Zap, Code, MessageCircle } from 'lucide-react'

interface ChatWindowProps {
  messages: Message[]
  isLoading: boolean
}

function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const isNewChat = messages.length === 1

  return (
    <main className="relative flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 py-6">
        {/* Welcome Screen for new chats */}
        {isNewChat && (
          <div className="mb-8 animate-slide-up text-center">
            {/* Glowing Logo */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl 
                            bg-gradient-to-br from-primary via-primary to-accent
                            shadow-[0_0_40px_rgba(139,92,246,0.4)]">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="mb-2 text-2xl font-bold text-foreground">
              Welcome to <span className="text-glow text-primary">Orbit AI</span>
            </h2>
            <p className="mb-8 text-sm text-muted-foreground">
              Your intelligent assistant is ready to help. Ask me anything!
            </p>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <QuickActionCard
                icon={<Zap className="h-4 w-4" />}
                title="Quick Answer"
                description="Get instant responses"
              />
              <QuickActionCard
                icon={<Code className="h-4 w-4" />}
                title="Code Help"
                description="Debug and write code"
              />
              <QuickActionCard
                icon={<MessageCircle className="h-4 w-4" />}
                title="Brainstorm"
                description="Explore ideas together"
              />
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="space-y-6">
          {messages.map((message, index) => (
            <MessageBubble 
              key={message.id} 
              message={message} 
              isLatest={index === messages.length - 1}
            />
          ))}

          {/* Loading indicator */}
          {isLoading && <TypingIndicator />}
        </div>

        {/* Scroll anchor */}
        <div ref={messagesEndRef} className="h-4" />
      </div>
    </main>
  )
}

// Quick Action Card Component
function QuickActionCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode
  title: string
  description: string 
}) {
  return (
    <button className="gradient-border group flex flex-col items-center gap-2 rounded-xl 
                       bg-card/50 p-4 text-center transition-smooth
                       hover:bg-card hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg 
                      bg-primary/10 text-primary transition-smooth
                      group-hover:bg-primary/20 group-hover:text-primary">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-foreground">{title}</p>
        <p className="text-[10px] text-muted-foreground">{description}</p>
      </div>
    </button>
  )
}

export default ChatWindow
