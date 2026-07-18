export class FloatingButton {
  private buttonEl: HTMLButtonElement | null = null;

  constructor() {}

  /**
   * Mounts the floating save button into the webpage body DOM.
   * Leverages inline CSS styling to keep design isolated from host page styles.
   */
  public mount(): void {
    if (this.buttonEl) return;

    const button = document.createElement('button');
    button.id = 'lative-floating-save-btn';

    // Premium styling matching desktop glass controls
    Object.assign(button.style, {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '42px',
      height: '42px',
      borderRadius: '12px',
      backgroundColor: 'rgba(10, 10, 12, 0.85)',
      backdropFilter: 'blur(12px) saturate(190%)',
      webkitBackdropFilter: 'blur(12px) saturate(190%)', // Safari support
      color: 'rgba(255, 255, 255, 0.85)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 8px 24px rgba(0, 0, 0, 0.35), 0 2px 4px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '2147483647', // Max z-index to appear over absolute page layers
      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease',
      outline: 'none'
    });

    // Inline SVG ShoppingCart icon
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: block;">
        <circle cx="8" cy="21" r="1"></circle>
        <circle cx="19" cy="21" r="1"></circle>
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
      </svg>
    `;

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px) scale(1.02)';
      button.style.backgroundColor = 'rgba(20, 20, 25, 0.9)';
      button.style.borderColor = 'rgba(94, 106, 210, 0.4)';
      button.style.color = '#ffffff';
      button.style.boxShadow = '0 0 0 1px rgba(94, 106, 210, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 12px 32px rgba(94, 106, 210, 0.2), 0 4px 12px rgba(0, 0, 0, 0.3)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0) scale(1)';
      button.style.backgroundColor = 'rgba(10, 10, 12, 0.85)';
      button.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      button.style.color = 'rgba(255, 255, 255, 0.85)';
      button.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 8px 24px rgba(0, 0, 0, 0.35), 0 2px 4px rgba(0, 0, 0, 0.2)';
    });

    button.addEventListener('mousedown', () => {
      button.style.transform = 'translateY(0) scale(0.95)';
      button.style.backgroundColor = 'rgba(8, 8, 10, 0.95)';
      button.style.borderColor = 'rgba(94, 106, 210, 0.2)';
      button.style.boxShadow = 'inset 0 1px 0 rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.4)';
    });

    button.addEventListener('mouseup', () => {
      button.style.transform = 'translateY(-2px) scale(1.02)';
      button.style.backgroundColor = 'rgba(20, 20, 25, 0.9)';
      button.style.borderColor = 'rgba(94, 106, 210, 0.4)';
      button.style.boxShadow = '0 0 0 1px rgba(94, 106, 210, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 12px 32px rgba(94, 106, 210, 0.2), 0 4px 12px rgba(0, 0, 0, 0.3)';
    });

    button.addEventListener('click', async () => {
      const pageTitle = document.title || window.location.hostname;
      const pageUrl = window.location.href;

      button.disabled = true;
      button.style.opacity = '0.7';

      chrome.runtime.sendMessage(
        {
          type: 'CART_ADD_CURRENT_PAGE',
          payload: { title: pageTitle, url: pageUrl }
        },
        (response) => {
          button.disabled = false;
          button.style.opacity = '1';
          
          // Toast notifications logic is handled in P7-T6.
          // Broadcast a custom event locally to communicate with any injected toast listeners.
          if (response) {
            const event = new CustomEvent('lative-cart-save-response', { detail: response });
            window.dispatchEvent(event);
          }
        }
      );
    });

    document.body.appendChild(button);
    this.buttonEl = button;
  }

  /**
   * Unmounts and cleans up the floating button DOM element.
   */
  public unmount(): void {
    if (this.buttonEl && this.buttonEl.parentNode) {
      this.buttonEl.parentNode.removeChild(this.buttonEl);
    }
    this.buttonEl = null;
  }
}
