import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionText?: string;
  onAction?: () => void;
  isLoading?: boolean;
  actionVariant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  children?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon,
  actionText,
  onAction,
  isLoading = false,
  actionVariant = 'primary',
  children
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 min-h-[240px] select-none font-sans">
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-background-secondary/60 border border-border dark:bg-white/[0.04] dark:border-white/[0.08] flex items-center justify-center text-text-secondary/80 mb-4 shrink-0">
          <Icon className="w-4.5 h-4.5" />
        </div>
      )}

      <h3 className="text-sm font-semibold text-text-primary leading-tight tracking-tight select-none">
        {title}
      </h3>
      <p className="text-xs text-text-secondary mt-2 max-w-[260px] leading-normal select-none">
        {description}
      </p>

      {actionText && onAction && (
        <Button
          variant={actionVariant}
          size="sm"
          onClick={onAction}
          isLoading={isLoading}
          className="mt-5 px-4"
        >
          {actionText}
        </Button>
      )}

      {children}
    </div>
  );
};
