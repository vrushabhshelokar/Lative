import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', hoverable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-card dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.01] text-text-primary rounded-large border border-border dark:border-white/[0.06] shadow-card dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] overflow-hidden p-4 transition-all duration-standard
          ${hoverable ? 'hover:shadow-md hover:border-border/80 dark:hover:border-white/[0.12] cursor-pointer' : ''} 
          ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`flex flex-col gap-1 mb-3 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <h3
    className={`text-base font-semibold leading-tight text-text-primary tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <p
    className={`text-xs text-text-secondary leading-normal ${className}`}
    {...props}
  >
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`text-sm text-text-secondary leading-relaxed ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`flex items-center gap-2 mt-4 pt-3 border-t border-border/60 ${className}`} {...props}>
    {children}
  </div>
);
