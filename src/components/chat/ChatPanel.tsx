
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MinusCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

// Initial mock data for messages
const defaultInitialMessages = [
  { id: 1, text: "Welcome to the NLP-based Wiki Assistant! Ask me anything about our company terminology and acronyms.", sender: 'ai', timestamp: new Date().toISOString() },
];

interface Message {
  id: number;
  text: string;
  sender: 'ai' | 'user';
  timestamp: string;
}

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  className?: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose, currentPage, className }) => {
  // Load messages from localStorage on initial render
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    return savedMessages ? JSON.parse(savedMessages) : defaultInitialMessages;
  });
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        text: newMessage.trim(),
        sender: 'user' as const,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: generateAIResponse(newMessage.trim(), currentPage),
          sender: 'ai' as const,
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const generateAIResponse = (query: string, context: string): string => {
    // Simple rule-based responses
    if (query.toLowerCase().includes('acronym') || query.toLowerCase().includes('abbreviation')) {
      return `I can help explain acronyms used in our company. For example, NCS stands for Neighborly Customer Solutions, and NSS means Neighborly Service Solutions.`;
    } else if (query.toLowerCase().includes('hello') || query.toLowerCase().includes('hi')) {
      return `Hello! I'm your Wiki Assistant. How can I help you with ${context} today?`;
    } else if (query.toLowerCase().includes('help')) {
      return `I can help you with information about company terminology, acronyms, and wiki content. Just ask me anything about ${context}!`;
    } else {
      return `Thanks for your question about ${context}. In a real implementation, I'd use a GenAI model to provide accurate information from your knowledge base. For now, I'm simulating responses.`;
    }
  };
  
  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all chat history?')) {
      setMessages(defaultInitialMessages);
    }
  };

  // Format timestamp for display
  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Use the className prop with the cn utility to combine classes
  const panelClasses = cn(
    `${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`,
    className ? className : 'fixed top-0 right-0 h-full w-80 bg-white border-l border-wiki-border shadow-lg transition-transform duration-300 z-20'
  );

  return (
    <div className={panelClasses}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-wiki-border">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-blue-500" />
          <h3 className="font-medium text-sm">Wiki Assistant - {currentPage}</h3>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={clearHistory}
                >
                  <X size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear chat history</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={onClose}
                >
                  <MinusCircle size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Minimize chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-start gap-2 max-w-[90%]">
              {message.sender !== 'user' && (
                <Avatar className="h-6 w-6 text-xs mt-1 bg-blue-100">
                  A
                </Avatar>
              )}
              
              <div 
                className={`px-3 py-2 rounded-lg text-sm
                  ${message.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
              >
                {message.text}
                <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
              
              {message.sender === 'user' && (
                <Avatar className="h-6 w-6 text-xs mt-1 bg-gray-200">
                  U
                </Avatar>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form 
        className="p-3 border-t border-wiki-border flex flex-col"
        onSubmit={handleSendMessage}
      >
        <div className="relative">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask the Wiki Assistant anything..."
            className="resize-none min-h-[80px] pr-10 text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <Button 
            size="sm" 
            className="absolute bottom-2 right-2 h-8 w-8 p-0" 
            disabled={!newMessage.trim()}
            type="submit"
          >
            <Send size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;
