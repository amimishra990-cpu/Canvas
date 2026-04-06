import React from 'react';
import { Download, Copy, Trash2, Image as ImageIcon, AlertCircle } from 'lucide-react';

export default function PreviewPanel({ 
  imageUrl, 
  isLoading, 
  loadingMessage, 
  error, 
  onDownload, 
  onCopyPrompt, 
  onDelete 
}) {
  return (
    <section className="preview-container">
      <div className="preview-card">
        {isLoading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>{loadingMessage || 'Crafting your image...'}</p>
          </div>
        )}
        
        {!isLoading && error && (
          <div className="error-state">
            <div className="error-bg">
              <AlertCircle size={32} />
            </div>
            <p className="error-text">{error}</p>
          </div>
        )}

        {!isLoading && !error && imageUrl && (
          <img src={imageUrl} alt="Generated result" className="preview-image" />
        )}

        {!isLoading && !error && !imageUrl && (
          <div className="empty-state">
            <ImageIcon className="empty-graphic" strokeWidth={1} />
            <h3 className="empty-title">Your canvas is blank</h3>
            <p>Describe your vision on the left to generate an image.</p>
          </div>
        )}
      </div>

      {!isLoading && !error && imageUrl && (
        <div className="action-bar">
          <button className="action-btn" onClick={onCopyPrompt} title="Copy Prompt">
            <Copy size={16} /> Copy Prompt
          </button>
          <button className="action-btn" onClick={onDownload} title="Download Image">
            <Download size={16} /> Download
          </button>
          <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-color)', margin: '0 0.5rem' }}></div>
          <button className="action-btn danger" onClick={onDelete} title="Delete Image">
            <Trash2 size={16} /> Delete
          </button>
        </div>
      )}
    </section>
  );
}
