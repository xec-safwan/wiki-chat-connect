
import React from 'react';
import { X, MinusCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatHeaderProps {
  currentPage: string;
  onClose: () => void;
  onClearHistory: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ currentPage, onClose, onClearHistory }) => {
  return (
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
                onClick={onClearHistory}
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
  );
};

export default ChatHeader;
