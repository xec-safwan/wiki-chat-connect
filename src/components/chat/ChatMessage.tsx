
import React from 'react';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';

interface ChatMessageProps {
  message: Message;
}

export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div 
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className="flex items-start gap-2 max-w-[90%]">
        {message.sender !== 'user' && (
          <Avatar className="h-6 w-6 text-xs mt-1 bg-blue-100">
            A
          </Avatar>
        )}
        
        <div 
          className={cn(
            "px-3 py-2 rounded-lg text-sm",
            message.sender === 'user' 
              ? 'bg-blue-500 text-white rounded-br-none' 
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          )}
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
  );
};

export default ChatMessage;
