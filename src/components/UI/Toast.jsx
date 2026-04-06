import React, { useEffect } from 'react';
import { CheckCircle, Info } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast">
      {type === 'success' ? <CheckCircle size={18} color="var(--accent)" /> : <Info size={18} color="var(--accent)" />}
      <span>{message}</span>
    </div>
  );
}
