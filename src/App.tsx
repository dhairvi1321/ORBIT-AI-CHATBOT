import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import ChatWindow from './components/ChatWindow'
import InputBox from './components/InputBox'
import { Message, ChatHistory } from './types'

// Sample chat history
const initialChatHistory: ChatHistory[] = [
  {
    id: '1',
    title: 'New Chat',
    timestamp: new Date(),
    isActive: true,
  },
]

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hello! I'm Orbit AI. How can I help you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ])

  const [chatHistory, setChatHistory] =
    useState<ChatHistory[]>(initialChatHistory)

  const [activeChatId, setActiveChatId] =
    useState<string>('1')

  const [sidebarOpen, setSidebarOpen] =
    useState(true)

  const [isLoading, setIsLoading] =
    useState(false)

  // SEND MESSAGE FUNCTION
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    // User message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content,
      role: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    setIsLoading(true)

    try {
      const response = await fetch(
        'http://localhost:5000/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: content,
          }),
        }
      )

      const data = await response.json()

      console.log(data)

      // Gemini reply
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          data.reply ||
          'No response received from AI.',
        role: 'assistant',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error(error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          'Failed to connect with Orbit AI.',
        role: 'assistant',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // NEW CHAT
  const handleNewChat = () => {
    const newChat: ChatHistory = {
      id: Date.now().toString(),
      title: 'New Chat',
      timestamp: new Date(),
      isActive: true,
    }

    setChatHistory((prev) => [
      newChat,
      ...prev.map((chat) => ({
        ...chat,
        isActive: false,
      })),
    ])

    setActiveChatId(newChat.id)

    setMessages([
      {
        id: '1',
        content:
          "Hello! I'm Orbit AI. How can I help you today?",
        role: 'assistant',
        timestamp: new Date(),
      },
    ])
  }

  // SELECT CHAT
  const handleSelectChat = (chatId: string) => {
    setChatHistory((prev) =>
      prev.map((chat) => ({
        ...chat,
        isActive: chat.id === chatId,
      }))
    )

    setActiveChatId(chatId)
  }

  // DELETE CHAT
  const handleDeleteChat = (chatId: string) => {
    setChatHistory((prev) =>
      prev.filter((chat) => chat.id !== chatId)
    )
  }

  // TOGGLE SIDEBAR
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
        <Navbar
          onMenuClick={toggleSidebar}
          sidebarOpen={sidebarOpen}
        />

        {/* Chat Window */}
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
        />

        {/* Input */}
        <InputBox
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default App