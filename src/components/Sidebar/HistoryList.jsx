import React from 'react';
import HistoryItem from './HistoryItem';

export default function HistoryList({ history, activeId, onSelectHistory }) {
  if (history.length === 0) {
    return (
      <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        No generations yet.
      </div>
    );
  }

  return (
    <div className="history-list">
      {history.map((item) => (
        <HistoryItem 
          key={item.id} 
          item={item} 
          isActive={activeId === item.id}
          onClick={() => onSelectHistory(item.id)} 
        />
      ))}
    </div>
  );
}
