
import React, { useState } from 'react';
import WikiSidebar from '@/components/layout/WikiSidebar';
import AcronymsPage from '@/components/wiki/AcronymsPage';
import ChatPanel from '@/components/chat/ChatPanel';
import ChatBubble from '@/components/chat/ChatBubble';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Acronyms');
  const [hasUnread, setHasUnread] = useState(true);
  const [unreadCount, setUnreadCount] = useState(2);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    setHasUnread(false);
    setUnreadCount(0);
  };

  const handleSelectWikiItem = (item: any) => {
    if (item.title) {
      setCurrentPage(item.title);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 h-full">
        <WikiSidebar onSelectItem={handleSelectWikiItem} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6 relative">
        <AcronymsPage />
        
        {/* Chat bubble button */}
        {!isChatOpen && (
          <ChatBubble 
            onClick={handleOpenChat}
            hasUnread={hasUnread}
            unreadCount={unreadCount}
          />
        )}
        
        {/* Chat panel */}
        <ChatPanel 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Index;
