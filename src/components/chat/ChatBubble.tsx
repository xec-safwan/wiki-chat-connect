
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatBubbleProps {
  onClick: () => void;
  hasUnread?: boolean;
  unreadCount?: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick, hasUnread = false, unreadCount = 0 }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            onClick={onClick} 
            className="chat-bubble-button group relative"
            aria-label="Open chat"
          >
            <MessageCircle />
            {hasUnread && (
              <Badge 
                className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs p-0"
              >
                {unreadCount}
              </Badge>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Open chat</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ChatBubble;
