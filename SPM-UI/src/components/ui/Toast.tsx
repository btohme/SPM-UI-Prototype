import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

let toastCounter = 0;
type ToastMessage = { id: number; msgAr: string; msgEn: string };
let addToastExternal: (toast: ToastMessage) => void = () => {};

export const showToast = (msgAr: string, msgEn: string) => {
  addToastExternal({ id: toastCounter++, msgAr, msgEn });
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    addToastExternal = (toast) => {
      setToasts(prev => [...prev, toast]);
      // Auto remove after 3 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== toast.id));
      }, 3000);
    };
  }, []);

  return (
    <div className="pure-toast-container">
      {toasts.map(t => (
        <div key={t.id} className="pure-toast">
          <CheckCircle size={20} color="#147a6d" />
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>{t.msgAr}</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{t.msgEn}</p>
          </div>
        </div>
      ))}
    </div>
  );
}