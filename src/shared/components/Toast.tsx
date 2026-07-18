import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'info' | 'error' | 'warning';

export interface ToastProps {
  id: string;
  message: string;
  type?: ToastType;
  onClose: (id: string) => void;
  duration?: number;
}

const icons: Record<ToastType, React.ComponentType<{ className?: string }>> = {
  success: CheckCircle,
  info: Info,
  error: XCircle,
  warning: AlertTriangle
};

const toastColors: Record<ToastType, string> = {
  success: 'border-border/60',
  info: 'border-border/60',
  error: 'border-danger/30',
  warning: 'border-amber-500/30'
};

const iconColors: Record<ToastType, string> = {
  success: 'text-success',
  info: 'text-accent',
  error: 'text-danger',
  warning: 'text-amber-500'
};

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = 'success',
  onClose,
  duration = 2000
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const Icon = icons[type];

  return (
    <div
      role="alert"
      className={`flex items-center gap-2.5 px-3.5 py-2 rounded-medium border shadow-dialog max-w-[320px] w-max select-none animate-slide-up backdrop-blur-md bg-card/95 dark:bg-[#0a0a0c]/90 text-text-primary ${toastColors[type]}`}
    >
      <Icon className={`w-3.5 h-3.5 shrink-0 ${iconColors[type]}`} />
      <span className="text-xs font-medium leading-normal tracking-tight select-none">{message}</span>
      <button
        type="button"
        onClick={() => onClose(id)}
        className="text-text-secondary hover:text-text-primary p-0.5 rounded-small hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent ml-1"
        aria-label="Close notification"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};
