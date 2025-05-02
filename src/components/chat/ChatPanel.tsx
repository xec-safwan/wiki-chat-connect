
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { generateAIResponse } from '@/utils/chatUtils';
import { ChatProps, Message } from '@/types/chat';

// Initial mock data for messages
const defaultInitialMessages: Message[] = [
  { id: 1, text: "Welcome to the NLP-based Wiki Assistant! Ask me anything about our company terminology and acronyms.", sender: 'ai', timestamp: new Date().toISOString() },
];

const ChatPanel: React.FC<ChatProps> = ({ isOpen, onClose, currentPage, className }) => {
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
      const userMessage: Message = {
        id: Date.now(),
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: generateAIResponse(newMessage.trim(), currentPage),
          sender: 'ai',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };
  
  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all chat history?')) {
      setMessages(defaultInitialMessages);
    }
  };

  // Use the className prop with the cn utility to combine classes
  const panelClasses = cn(
    `${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`,
    className ? className : 'fixed top-0 right-0 h-full w-80 bg-white border-l border-wiki-border shadow-lg transition-transform duration-300 z-20'
  );

  return (
    <div className={panelClasses}>
      <ChatHeader 
        currentPage={currentPage} 
        onClose={onClose} 
        onClearHistory={clearHistory} 
      />
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map(message => (
          <ChatMessage 
            key={message.id} 
            message={message} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSubmit={handleSendMessage}
      />
    </div>
  );
};

export default ChatPanel;
