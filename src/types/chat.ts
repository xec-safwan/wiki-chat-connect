
export interface Message {
  id: number;
  text: string;
  sender: 'ai' | 'user';
  timestamp: string;
}

export interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  className?: string;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
}
