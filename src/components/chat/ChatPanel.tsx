
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { generateAIResponse } from '@/utils/chatUtils';
import { ChatProps, Message, ChatState } from '@/types/chat';

// Initial mock data for messages
const defaultInitialMessages: Message[] = [
  { id: 1, text: "Welcome to the NLP-based Wiki Assistant! Ask me anything about our company terminology and acronyms.", sender: 'ai', timestamp: new Date().toISOString() },
];

const initialChatState: ChatState = {
  messages: defaultInitialMessages,
  isTyping: false
};

const ChatPanel: React.FC<ChatProps> = ({ isOpen, onClose, currentPage, className }) => {
  // Load messages from localStorage on initial render
  const [chatState, setChatState] = useState<ChatState>(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    return {
      messages: savedMessages ? JSON.parse(savedMessages) : defaultInitialMessages,
      isTyping: false
    };
  });
  
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatState.messages));
  }, [chatState.messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatState.messages, chatState.isTyping, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: newMessage.trim(),
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isTyping: true
      }));
      setNewMessage('');
      
      // Get AI response text
      const responseText = generateAIResponse(newMessage.trim(), currentPage);
      
      // Simulate typing delay (adjust timing for natural feel)
      const typingDelay = Math.max(1000, responseText.length * 20);
      
      // Show typing indicator for a duration based on message length
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: responseText,
          sender: 'ai',
          timestamp: new Date().toISOString()
        };
        
        setChatState(prev => ({
          ...prev,
          messages: [...prev.messages, aiResponse],
          isTyping: false
        }));
      }, typingDelay);
    }
  };
  
  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all chat history?')) {
      setChatState({
        messages: defaultInitialMessages,
        isTyping: false
      });
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
        {chatState.messages.map(message => (
          <ChatMessage 
            key={message.id} 
            message={message} 
          />
        ))}
        
        {/* Typing indicator */}
        {chatState.isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2 max-w-[90%]">
              <div className="h-6 w-6 text-xs mt-1 bg-blue-100 rounded-full flex items-center justify-center">
                A
              </div>
              <div className="px-3 py-2 rounded-lg text-sm bg-gray-100 text-gray-800 rounded-bl-none">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
