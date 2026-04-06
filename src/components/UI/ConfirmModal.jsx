import React from 'react';

export default function ConfirmModal({ isOpen, title, description, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <p className="modal-desc">{description}</p>
        <div className="modal-actions">
          <button className="secondary-btn" onClick={onCancel}>Cancel</button>
          <button className="danger-btn" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
