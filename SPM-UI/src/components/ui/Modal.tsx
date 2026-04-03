import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ModalProps { open: boolean; onClose: () => void; titleAr: string; titleEn: string; children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'; footer?: React.ReactNode; }

export default function Modal({ open, onClose, titleAr, titleEn, children, size = 'md', footer }: ModalProps) {
  const { t } = useApp();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="pure-modal-overlay">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="pure-modal-backdrop" />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className={`pure-modal-dialog pure-modal-${size}`}>
            <div className="pure-modal-header">
              <h3 className="pure-modal-title">{t(titleAr, titleEn)}</h3>
              <button onClick={onClose} className="pure-modal-close"><X size={20} /></button>
            </div>
            <div className="pure-modal-body">{children}</div>
            {footer && <div className="pure-modal-footer">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}