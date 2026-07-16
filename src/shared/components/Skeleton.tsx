import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rect',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const baseClass = 'animate-pulse bg-border/60';
  
  const variantClasses = {
    text: 'h-3.5 w-4/5 rounded-small mb-2',
    rect: 'rounded-medium w-full',
    circle: 'rounded-full shrink-0'
  };

  const customStyle = {
    width,
    height,
    ...style
  };

  return (
    <div
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      style={customStyle}
      {...props}
    />
  );
};
