
import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MinusCircle, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Sample mock data for messages
const initialMessages = [
  { id: 1, text: "Hi there! I have a question about the Acronyms page.", sender: 'other', user: { name: "Alex Johnson", avatar: "A" } },
  { id: 2, text: "Sure, what would you like to know?", sender: 'self', user: { name: "You", avatar: "Y" } },
  { id: 3, text: "I'm confused about the difference between NCS and NSS? They both mention 'Neighborly'.", sender: 'other', user: { name: "Alex Johnson", avatar: "A" } },
  { id: 4, text: "Good question! NCS is Neighborly Customer Solutions, which focuses on customer-facing services. NSS is Neighborly Service Solutions, which manages our internal service operations.", sender: 'self', user: { name: "You", avatar: "Y" } },
  { id: 5, text: "That makes sense, thanks for the clarification!", sender: 'other', user: { name: "Alex Johnson", avatar: "A" } },
];

// Mock data for online users
const onlineUsers = [
  { id: 1, name: "Alex Johnson", avatar: "A", status: "online" },
  { id: 2, name: "Taylor Smith", avatar: "T", status: "online" },
  { id: 3, name: "Jordan Lee", avatar: "J", status: "away" },
  { id: 4, name: "Morgan Taylor", avatar: "M", status: "online" },
];

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose, currentPage }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showUserList, setShowUserList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: newMessage.trim(),
          sender: 'self',
          user: { name: "You", avatar: "Y" }
        }
      ]);
      setNewMessage('');
    }
  };

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-80 bg-white border-l border-wiki-border shadow-lg transition-transform duration-300 z-20 
                ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-wiki-border">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-blue-500" />
          <h3 className="font-medium text-sm">Chat - {currentPage}</h3>
        </div>
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => setShowUserList(!showUserList)}
                >
                  <Users size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Show active users</p>
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
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={onClose}
                >
                  <X size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close chat</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      {showUserList && (
        <div className="p-3 border-b border-wiki-border">
          <h4 className="text-xs font-medium text-gray-500 mb-2">ACTIVE USERS</h4>
          <div className="space-y-2">
            {onlineUsers.map(user => (
              <div key={user.id} className="flex items-center gap-2">
                <Avatar className="h-6 w-6 text-xs">
                  <div className="relative">
                    {user.avatar}
                    <span 
                      className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full
                        ${user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`}
                    />
                  </div>
                </Avatar>
                <span className="text-sm">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'self' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="flex items-start gap-2 max-w-[90%]">
              {message.sender !== 'self' && (
                <Avatar className="h-6 w-6 text-xs mt-1">
                  {message.user.avatar}
                </Avatar>
              )}
              
              <div 
                className={`px-3 py-2 rounded-lg text-sm
                  ${message.sender === 'self' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
              >
                {message.text}
              </div>
              
              {message.sender === 'self' && (
                <Avatar className="h-6 w-6 text-xs mt-1">
                  {message.user.avatar}
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
            placeholder="Type your message..."
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
