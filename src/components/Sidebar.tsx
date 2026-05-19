import { Plus, MessageSquare, ChevronLeft, Trash2, Sparkles } from 'lucide-react'
import { ChatHistory } from '../types'

interface SidebarProps {
  isOpen: boolean
  chatHistory: ChatHistory[]
  activeChatId: string
  onNewChat: () => void
  onSelectChat: (id: string) => void
  onDeleteChat: (id: string) => void
  onToggle: () => void
}

function Sidebar({ 
  isOpen, 
  chatHistory, 
  activeChatId, 
  onNewChat, 
  onSelectChat,
  onDeleteChat,
  onToggle 
}: SidebarProps) {
  // Format date for display
  const formatDate = (date: Date) => {
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar - Thin & Futuristic */}
      <aside
        className={`
          fixed left-0 top-0 z-30 h-full w-64 transform
          transition-all duration-300 ease-out
          md:relative md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:w-0 md:opacity-0'}
        `}
      >
        <div className="glass-strong flex h-full flex-col border-r border-sidebar-border/50">
          {/* Header with Logo */}
          <div className="flex items-center gap-3 border-b border-sidebar-border/30 px-4 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-sidebar-foreground">
              Orbit <span className="text-primary">AI</span>
            </span>
            <button
              onClick={onToggle}
              className="ml-auto rounded-lg p-1.5 text-sidebar-foreground/50 
                         transition-smooth hover:bg-sidebar-accent hover:text-sidebar-foreground md:hidden"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </div>

          {/* New Chat Button - Animated */}
          <div className="p-3">
            <button
              onClick={onNewChat}
              className="gradient-border group flex w-full items-center gap-2 rounded-xl 
                         bg-sidebar-accent/50 px-3 py-2.5 text-sm font-medium text-sidebar-foreground
                         transition-smooth hover:bg-sidebar-accent active:scale-[0.98]"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-lg 
                              bg-gradient-to-br from-primary to-accent transition-smooth
                              group-hover:shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                <Plus className="h-3.5 w-3.5 text-white" />
              </div>
              <span>New Chat</span>
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
              Recent
            </p>
            <div className="space-y-0.5">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onSelectChat(chat.id)}
                  className={`group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left
                             transition-smooth
                             ${chat.id === activeChatId 
                               ? 'chat-item-active' 
                               : 'hover:bg-sidebar-accent/50'}`}
                >
                  <MessageSquare className={`h-3.5 w-3.5 shrink-0 transition-smooth
                    ${chat.id === activeChatId 
                      ? 'text-primary' 
                      : 'text-sidebar-foreground/40 group-hover:text-sidebar-foreground/60'}`} 
                  />
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-xs transition-smooth
                      ${chat.id === activeChatId 
                        ? 'text-sidebar-foreground font-medium' 
                        : 'text-sidebar-foreground/70'}`}>
                      {chat.title}
                    </p>
                    <p className="text-[10px] text-sidebar-foreground/40">
                      {formatDate(chat.timestamp)}
                    </p>
                  </div>
                  <button
                    className="shrink-0 rounded p-1 opacity-0 transition-smooth 
                               hover:bg-destructive/20 hover:text-destructive group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteChat(chat.id)
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </button>
              ))}
            </div>
          </div>

          {/* Footer - User Profile */}
          <div className="border-t border-sidebar-border/30 p-3">
            <div className="flex items-center gap-2.5 rounded-lg bg-sidebar-accent/30 px-3 py-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full 
                              bg-gradient-to-br from-primary/80 to-accent/80">
                <span className="text-[10px] font-bold text-white">U</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-sidebar-foreground">User</p>
                <p className="text-[10px] text-sidebar-foreground/40">Pro Plan</p>
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
