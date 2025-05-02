
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, FileText, Folder, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

// Mock data for wiki sidebar items
const wikiData = [
  {
    id: 'acronyms',
    title: 'Acronyms',
    type: 'folder',
    isOpen: true,
    isActive: true,
    children: [
      { id: 'deployment-check', title: '2024-26 Deployment Checklist', type: 'file' }
    ]
  },
  {
    id: 'junkware-team',
    title: 'Junkware Team',
    type: 'folder',
    children: []
  },
  {
    id: 'customer-engagement',
    title: 'Customer Engagement Platform',
    type: 'folder',
    children: [
      { id: 'payloads', title: 'Payloads for Data Parity', type: 'file' },
      { id: 'testing-wiki', title: 'Testing Wiki EV', type: 'file' }
    ]
  },
  {
    id: 'explorers',
    title: 'Explorers - Projects',
    type: 'folder',
    children: []
  },
  {
    id: 'codekreig-team',
    title: 'CodeKreig Team',
    type: 'folder',
    children: [
      { id: 'fa-release', title: 'FA Release Tag 3.1.0.0', type: 'file' }
    ]
  },
  { id: 'dbat', title: 'DBAT', type: 'folder', children: [] },
  { id: 'unified-customer', title: 'Unified Customer', type: 'folder', children: [] },
  { id: 'quality-analyst', title: 'Quality Analyst Process', type: 'folder', children: [] },
  {
    id: 'deployment-postmortems',
    title: 'Deployment Postmortems',
    type: 'folder',
    children: [
      { id: 'crashlytics', title: 'Crashlytics - mobile-fsm-service', type: 'file' }
    ]
  },
  { id: 'rpm-appfolio', title: 'RPM Appfolio Enhancements', type: 'folder', children: [] },
  { id: 'franchise-portal', title: 'Franchise Portal', type: 'folder', children: [] },
  { id: 'pegasus-team', title: 'Pegasus Team', type: 'folder', children: [] },
  { id: 'knowledge-base', title: 'Knowledge Base', type: 'folder', children: [] }
];

interface WikiItemProps {
  item: any;
  level?: number;
  onSelectItem: (item: any) => void;
}

const WikiItem: React.FC<WikiItemProps> = ({ item, level = 0, onSelectItem }) => {
  const [isOpen, setIsOpen] = useState(item.isOpen || false);

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClick = () => {
    onSelectItem(item);
  };

  return (
    <div className="wiki-item">
      <div 
        className={`wiki-sidebar-item ${item.isActive ? 'active' : ''}`}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        onClick={handleClick}
      >
        {item.type === 'folder' && (
          <span onClick={toggleOpen} className="mr-1">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        
        {item.type === 'folder' ? <Folder size={16} /> : <FileText size={16} />}
        <span className="truncate">{item.title}</span>
      </div>
      
      {isOpen && item.children && (
        <div className="wiki-item-children">
          {item.children.map((child: any) => (
            <WikiItem 
              key={child.id} 
              item={child} 
              level={level + 1} 
              onSelectItem={onSelectItem} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface WikiSidebarProps {
  onSelectItem?: (item: any) => void;
}

const WikiSidebar: React.FC<WikiSidebarProps> = ({ onSelectItem = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <div className="wiki-sidebar h-full flex flex-col border-r border-wiki-border bg-wiki-sidebar">
      <div className="wiki-sidebar-header p-2 border-b border-wiki-border">
        <div className="flex items-center justify-between px-2 py-1">
          <h2 className="text-sm font-medium">Main.wiki</h2>
          <button className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 4a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="relative mt-2">
          {isSearchActive ? (
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Enter page title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm py-1 bg-transparent"
                autoFocus
              />
              <button 
                className="absolute right-2 text-gray-400" 
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchActive(false);
                }}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              className="w-full flex items-center gap-2 px-2 py-1 text-sm text-gray-500 border border-wiki-border rounded"
              onClick={() => setIsSearchActive(true)}
            >
              <Search size={14} />
              <span>Enter page title</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="wiki-sidebar-content flex-1 overflow-y-auto pt-1 pb-2">
        {wikiData.map(item => (
          <WikiItem key={item.id} item={item} onSelectItem={onSelectItem} />
        ))}
      </div>
    </div>
  );
};

export default WikiSidebar;
