export type ToastType = 'success' | 'error';

export class Toast {
  /**
   * Displays a floating toast notification overlay on the webpage.
   * Self-dismisses after 3 seconds, or dismisses instantly when clicked.
   */
  public static show(message: string, type: ToastType = 'success'): void {
    let container = document.getElementById('lative-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'lative-toast-container';
      Object.assign(container.style, {
        position: 'fixed',
        bottom: '84px', // Renders above the 48px floating button with buffer space
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: '2147483647', // Max z-index to overlap all website elements
        pointerEvents: 'none',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      });
      document.body.appendChild(container);
    }

    const toastEl = document.createElement('div');
    Object.assign(toastEl.style, {
      pointerEvents: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 14px',
      borderRadius: '8px',
      backgroundColor: '#1f2937', // Premium slate-dark background for readability
      color: '#ffffff',
      fontSize: '12px',
      fontWeight: '500',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.15)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      cursor: 'pointer',
      opacity: '0',
      transform: 'translateY(12px)',
      transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    });

    const isSuccess = type === 'success';
    const iconColor = isSuccess ? '#10b981' : '#ef4444';
    const iconSvg = isSuccess 
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block; flex-shrink: 0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block; flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

    toastEl.innerHTML = `
      ${iconSvg}
      <span style="line-height: 1.4; letter-spacing: -0.01em;">${message}</span>
    `;

    container.appendChild(toastEl);

    // Animate-in transition
    requestAnimationFrame(() => {
      toastEl.style.opacity = '1';
      toastEl.style.transform = 'translateY(0)';
    });

    const removeToast = () => {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translateY(-8px)';
      toastEl.addEventListener('transitionend', () => {
        if (toastEl.parentNode) {
          toastEl.parentNode.removeChild(toastEl);
        }
        // If container is empty, clean it up
        if (container && container.childNodes.length === 0 && container.parentNode) {
          container.parentNode.removeChild(container);
        }
      });
    };

    const dismissTimer = setTimeout(removeToast, 3000);

    toastEl.addEventListener('click', () => {
      clearTimeout(dismissTimer);
      removeToast();
    });
  }
}
