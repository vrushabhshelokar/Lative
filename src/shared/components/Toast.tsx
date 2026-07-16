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
  success: 'bg-card border-border text-text-primary',
  info: 'bg-card border-border text-text-primary',
  error: 'bg-card border-danger/25 text-text-primary',
  warning: 'bg-card border-border text-text-primary'
};

const iconColors: Record<ToastType, string> = {
  success: 'text-green-500',
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
      className={`flex items-center gap-2.5 px-3 py-2 rounded-medium border shadow-dialog max-w-[320px] w-max select-none animate-slide-up ${toastColors[type]}`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${iconColors[type]}`} />
      <span className="text-xs font-medium leading-normal tracking-tight">{message}</span>
      <button
        type="button"
        onClick={() => onClose(id)}
        className="text-text-secondary hover:text-text-primary p-0.5 rounded-small hover:bg-background-secondary/80 transition-colors focus:outline-none focus:ring-1 focus:ring-accent ml-1"
        aria-label="Close notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
