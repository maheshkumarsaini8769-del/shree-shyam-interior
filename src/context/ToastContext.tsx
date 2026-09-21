import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'success' | 'info' | 'error';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-elevated border backdrop-blur-md text-sm font-medium ${
                toast.type === 'success'
                  ? 'bg-forest-900/95 text-cream-100 border-copper-500/40'
                  : toast.type === 'error'
                  ? 'bg-red-950/95 text-red-100 border-red-500/40'
                  : 'bg-forest-800/95 text-cream-100 border-cream-200/20'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-copper-400 shrink-0" />}
                {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
                {toast.type === 'info' && <Info className="w-5 h-5 text-copper-300 shrink-0" />}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors text-cream-300"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
