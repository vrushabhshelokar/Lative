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
      backgroundColor: 'rgba(15, 15, 20, 0.95)',
      backdropFilter: 'blur(12px)',
      webkitBackdropFilter: 'blur(12px)',
      color: '#ffffff',
      fontSize: '12px',
      fontWeight: '500',
      boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.35), 0 8px 32px rgba(0, 0, 0, 0.4)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      cursor: 'pointer',
      opacity: '0',
      transform: 'translateY(12px)',
      transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
    });

    const svgNS = 'http://www.w3.org/2000/svg';
    const isSuccess = type === 'success';
    const iconColor = isSuccess ? '#10b981' : '#ef4444';

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', iconColor);
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.style.display = 'block';
    svg.style.flexShrink = '0';

    if (isSuccess) {
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', 'M22 11.08V12a10 10 0 1 1-5.93-9.14');
      const polyline = document.createElementNS(svgNS, 'polyline');
      polyline.setAttribute('points', '22 4 12 14.01 9 11.01');
      svg.appendChild(path);
      svg.appendChild(polyline);
    } else {
      const circle = document.createElementNS(svgNS, 'circle');
      circle.setAttribute('cx', '12');
      circle.setAttribute('cy', '12');
      circle.setAttribute('r', '10');
      const line1 = document.createElementNS(svgNS, 'line');
      line1.setAttribute('x1', '15');
      line1.setAttribute('y1', '9');
      line1.setAttribute('x2', '9');
      line1.setAttribute('y2', '15');
      const line2 = document.createElementNS(svgNS, 'line');
      line2.setAttribute('x1', '9');
      line2.setAttribute('y1', '9');
      line2.setAttribute('x2', '15');
      line2.setAttribute('y2', '15');
      svg.appendChild(circle);
      svg.appendChild(line1);
      svg.appendChild(line2);
    }

    const textSpan = document.createElement('span');
    textSpan.style.lineHeight = '1.4';
    textSpan.style.letterSpacing = '-0.01em';
    textSpan.textContent = message;

    toastEl.appendChild(svg);
    toastEl.appendChild(textSpan);

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
