import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useDemo } from '../context/DemoContext';

export const Toast: React.FC = () => {
  const { toast, hideToast } = useDemo();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-xl shadow-xl border border-[#D7F3E5] p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
      {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#13B968] shrink-0 mt-0.5" />}
      {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />}
      {toast.type === 'info' && <Info className="w-5 h-5 text-[#006B3C] shrink-0 mt-0.5" />}
      
      <div className="flex-1 text-sm font-medium text-[#132238]">
        {toast.message}
      </div>

      <button
        onClick={hideToast}
        className="text-[#64748B] hover:text-[#132238] transition-colors p-1 rounded-lg"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
