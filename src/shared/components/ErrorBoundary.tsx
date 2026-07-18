import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Lative React boundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    // Reload popup frame to clear corrupted in-memory application state
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-[380px] h-[600px] flex flex-col items-center justify-center p-6 bg-background text-text-primary overflow-hidden font-sans select-none border border-border/60 dark:border-white/[0.08] relative">
          {/* Ambient visual light pools */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
            <div className="absolute -top-[80px] -left-[40px] w-[200px] h-[200px] rounded-full bg-accent/10 dark:bg-accent/[0.06] blur-[60px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center max-w-[320px] bg-card dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.01] border border-border dark:border-white/[0.06] p-5 rounded-large shadow-card dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
            {/* Warning Icon Container */}
            <div className="w-10 h-10 rounded-xl bg-danger/10 border border-danger/20 flex items-center justify-center text-danger mb-4 shrink-0 shadow-[0_0_12px_rgba(239,68,68,0.1)]">
              <AlertTriangle className="w-5 h-5 stroke-[2]" />
            </div>

            {/* Error Title */}
            <h3 className="text-sm font-semibold text-text-primary leading-tight tracking-tight select-none">
              Something went wrong
            </h3>
            
            {/* Error Description */}
            <p className="text-[11px] text-text-secondary mt-2 leading-relaxed select-none">
              Lative encountered an unexpected rendering error. Re-opening or reloading the extension usually resolves this issue.
            </p>

            {/* Collapsible Error details */}
            {this.state.error && (
              <details className="w-full mt-3 group text-left">
                <summary className="text-[10px] text-text-secondary cursor-pointer hover:text-text-primary focus:outline-none select-none font-semibold uppercase tracking-wider flex items-center justify-center gap-1">
                  View Error details
                </summary>
                <div className="mt-2 p-2 bg-background-secondary border border-border/60 dark:border-white/[0.06] rounded-medium max-h-[80px] overflow-y-auto text-[10px] text-text-secondary font-mono break-all leading-normal select-text">
                  {this.state.error.name}: {this.state.error.message}
                </div>
              </details>
            )}

            {/* Retry CTA Button */}
            <Button
              variant="primary"
              onClick={this.handleRetry}
              className="mt-5 !h-8 !px-4 !text-xs !font-semibold !gap-1.5 !rounded-md"
              leftIcon={<RefreshCw className="w-3.5 h-3.5 stroke-[2.5]" />}
            >
              Reload App
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
