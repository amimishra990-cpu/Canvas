import React from 'react';
import { Sparkles, Plus, Trash2 } from 'lucide-react';
import ThemeToggle from '../UI/ThemeToggle';
import HistoryList from './HistoryList';

export default function Sidebar({ history, activeId, onSelectHistory, onNewGenerate, onClearHistory, isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="brand-title">
          <Sparkles className="icon" size={22} color="var(--accent)" />
          <span>Canvas</span>
        </div>
        <ThemeToggle />
      </div>

      <div className="new-chat-btn-container">
        <button className="primary-btn" onClick={onNewGenerate}>
          <Plus size={18} />
          <span>New Generation</span>
        </button>
      </div>

      <div className="sidebar-content">
        <HistoryList 
          history={history} 
          activeId={activeId} 
          onSelectHistory={onSelectHistory} 
        />
      </div>

      {history.length > 0 && (
        <div style={{ padding: '1rem' }}>
          <button 
            className="action-btn danger" 
            style={{ width: '100%', justifyContent: 'center' }} 
            onClick={onClearHistory}
          >
            <Trash2 size={16} />
            <span>Clear History</span>
          </button>
        </div>
      )}
    </aside>
  );
}
