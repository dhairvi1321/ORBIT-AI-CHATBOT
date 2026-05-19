import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import ChatWindow from './components/ChatWindow'
import InputBox from './components/InputBox'
import { Message, ChatHistory } from './types'

// Sample chat history data
const initialChatHistory: ChatHistory[] = [
  { id: '1', title: 'Getting started with React', timestamp: new Date(), isActive: true },
  { id: '2', title: 'Tailwind CSS best practices', timestamp: new Date(Date.now() - 86400000), isActive: false },
  { id: '3', title: 'Building modern UIs', timestamp: new Date(Date.now() - 172800000), isActive: false },
  { id: '4', title: 'AI integration patterns', timestamp: new Date(Date.now() - 259200000), isActive: false },
]

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Orbit AI, your intelligent assistant powered by advanced language models. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ])
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>(initialChatHistory)
  const [activeChatId, setActiveChatId] = useState<string>('1')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(content),
        role: 'assistant',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1200)
  }

  const handleNewChat = () => {
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      title: 'New conversation',
      timestamp: new Date(),
      isActive: true,
    }
    setChatHistory((prev) => 
      [newChat, ...prev.map(chat => ({ ...chat, isActive: false }))]
    )
    setActiveChatId(newChat.id)
    setMessages([
      {
        id: '1',
        content: "Hello! I'm Orbit AI, your intelligent assistant powered by advanced language models. How can I help you today?",
        role: 'assistant',
        timestamp: new Date(),
      },
    ])
  }

  const handleSelectChat = (chatId: string) => {
    setChatHistory((prev) =>
      prev.map(chat => ({ ...chat, isActive: chat.id === chatId }))
    )
    setActiveChatId(chatId)
  }

  const handleDeleteChat = (chatId: string) => {
    setChatHistory((prev) => prev.filter(chat => chat.id !== chatId))
  }

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev)
  }

  return (
    <div className="orbit-space-bg flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onToggle={toggleSidebar}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />

        {/* Chat Window */}
        <ChatWindow messages={messages} isLoading={isLoading} />

        {/* Input Box */}
        <InputBox onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}

// AI response generator for demo
function getAIResponse(userMessage: string): string {
  const responses = [
    "That's an excellent question! Based on my analysis, I'd recommend starting with a clear understanding of the core concepts before diving into implementation. This approach helps build a solid foundation for more advanced topics.",
    "I understand what you're looking for. The key insight here is to break down the problem into smaller, manageable components. Each piece can then be tackled systematically, leading to a more elegant solution.",
    "Great point! There are several approaches we could take here. Let me outline the most effective strategy I've found: first, identify the core requirements, then design the architecture, and finally implement with iterative improvements.",
    "I'd be happy to elaborate on that! The modern approach involves leveraging existing patterns while adapting them to your specific needs. This balance between convention and customization is crucial for maintainable code.",
    "Interesting perspective! From a technical standpoint, the solution involves careful consideration of performance, scalability, and user experience. Would you like me to dive deeper into any of these aspects?",
  ]
  return responses[Math.floor(Math.random() * responses.length)]
}

export default App
