import { useContext } from 'react';
import { ToastContext } from '@/providers/ToastProvider';
import { ToastType } from '@/shared/components/Toast';

export interface UseToastResult {
  show: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
}

export const useToast = (): UseToastResult => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const show = context.show;

  const success = (message: string, duration?: number) => show(message, 'success', duration);
  const error = (message: string, duration?: number) => show(message, 'error', duration);
  const info = (message: string, duration?: number) => show(message, 'info', duration);
  const warning = (message: string, duration?: number) => show(message, 'warning', duration);

  return {
    show,
    success,
    error,
    info,
    warning
  };
};
export type { ToastType };
