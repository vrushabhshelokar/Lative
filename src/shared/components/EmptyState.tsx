import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionText?: string;
  onAction?: () => void;
  isLoading?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon: Icon,
  actionText,
  onAction,
  isLoading = false
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 min-h-[220px] select-none font-sans">
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-background-secondary border border-border flex items-center justify-center text-text-secondary/75 mb-4 shrink-0">
          <Icon className="w-5 h-5" />
        </div>
      )}

      <h3 className="text-sm font-semibold text-text-primary leading-tight tracking-tight select-none">
        {title}
      </h3>
      <p className="text-xs text-text-secondary mt-1.5 max-w-[260px] leading-normal select-none">
        {description}
      </p>

      {actionText && onAction && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onAction}
          isLoading={isLoading}
          className="mt-5 px-4 shadow-sm"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
};
