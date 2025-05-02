
import React from 'react';
import { Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSubmit }) => {
  return (
    <form 
      className="p-3 border-t border-wiki-border flex flex-col"
      onSubmit={onSubmit}
    >
      <div className="relative">
        <Textarea
          value={value}
          onChange={onChange}
          placeholder="Ask the Wiki Assistant anything..."
          className="resize-none min-h-[80px] pr-10 text-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSubmit(e);
            }
          }}
        />
        <Button 
          size="sm" 
          className="absolute bottom-2 right-2 h-8 w-8 p-0" 
          disabled={!value.trim()}
          type="submit"
        >
          <Send size={16} />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;
