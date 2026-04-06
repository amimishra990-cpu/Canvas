import React from 'react';

export default function HistoryItem({ item, isActive, onClick }) {
  // Format date minimally
  const dateStr = new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' });

  return (
    <button 
      className={`history-item ${isActive ? 'active' : ''}`} 
      onClick={onClick}
    >
      <div className="history-prompt">{item.prompt}</div>
      <div className="history-meta">{dateStr}</div>
    </button>
  );
}
