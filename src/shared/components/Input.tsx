import React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = '',
      id,
      disabled,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const defaultId = React.useId();
    const inputId = id || defaultId;

    return (
      <div className="flex flex-col w-full gap-1.5 font-sans">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-text-secondary select-none tracking-wide"
          >
            {label}
          </label>
        )}
        
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 text-text-secondary pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            className={`w-full h-10 px-3.5 text-sm rounded-medium bg-card border text-text-primary placeholder:text-text-secondary/50 transition-all duration-standard focus:outline-none focus:ring-1
              ${leftIcon ? 'pl-10' : ''} 
              ${rightIcon ? 'pr-10' : ''}
              ${disabled ? 'opacity-50 cursor-not-allowed bg-background-secondary' : ''}
              ${
                error
                  ? 'border-danger focus:border-danger focus:ring-danger'
                  : 'border-border focus:border-accent focus:ring-accent'
              } 
              ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 text-text-secondary flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <span className="text-[11px] font-medium text-danger select-none">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span className="text-[11px] text-text-secondary/80 select-none">
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
