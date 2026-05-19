// Message type for chat messages
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

// Chat history item
export interface ChatHistory {
  id: string
  title: string
  timestamp: Date
  isActive?: boolean
}
