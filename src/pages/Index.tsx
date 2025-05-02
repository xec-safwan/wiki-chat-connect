
import React, { useState, useEffect } from 'react';
import WikiSidebar from '@/components/layout/WikiSidebar';
import AcronymsPage from '@/components/wiki/AcronymsPage';
import ChatPanel from '@/components/chat/ChatPanel';
import ChatBubble from '@/components/chat/ChatBubble';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [showWikiContent, setShowWikiContent] = useState(false);
  const [currentPage, setCurrentPage] = useState('Acronyms');
  const [hasUnread, setHasUnread] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleOpenChat = () => {
    setIsChatOpen(true);
    setShowWikiContent(false);
    setHasUnread(false);
    setUnreadCount(0);
  };

  const handleSelectWikiItem = (item: any) => {
    if (item.title) {
      setCurrentPage(item.title);
      setShowWikiContent(true);
      setIsChatOpen(false);
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setHasUnread(false);
      setUnreadCount(0);
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
        {showWikiContent ? (
          <div>
            <h1 className="text-2xl font-bold mb-6">{currentPage}</h1>
            <AcronymsPage />
            
            {/* Chat bubble button when chat is minimized */}
            {!isChatOpen && (
              <ChatBubble 
                onClick={handleOpenChat}
                hasUnread={hasUnread}
                unreadCount={unreadCount}
              />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <ChatPanel 
              isOpen={true}
              onClose={toggleChat}
              currentPage={currentPage}
              className="relative w-full max-w-3xl mx-auto h-[80vh] shadow-xl rounded-lg border border-gray-200"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
