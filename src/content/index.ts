import { FloatingButton } from './components/FloatingButton';
import { Toast } from './components/Toast';

console.info('[Lative Content Script] Initialized successfully');

const floatingButton = new FloatingButton();

const initFloatingButton = () => {
  try {
    chrome.storage.local.get(['floatingButtonEnabled'], (result) => {
      if (chrome.runtime.lastError) {
        return;
      }
      if (result.floatingButtonEnabled) {
        floatingButton.mount();
      } else {
        floatingButton.unmount();
      }
    });
  } catch (err) {
    console.warn('[Lative Content Script] Failed to initialize floating button:', err);
  }
};

// Initial run
initFloatingButton();

// Listen to storage changes reactively
try {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.floatingButtonEnabled) {
      if (changes.floatingButtonEnabled.newValue) {
        floatingButton.mount();
      } else {
        floatingButton.unmount();
      }
    }
  });
} catch (err) {
  console.warn('[Lative Content Script] Failed to attach storage change listener:', err);
}

// Local event listener matching response feedback from floating button clicks
window.addEventListener('lative-cart-save-response', (e: Event) => {
  const customEvent = e as CustomEvent;
  const response = customEvent.detail;
  if (response) {
    if (response.success) {
      Toast.show('Saved to Cart!', 'success');
    } else {
      Toast.show(response.error || 'Failed to save page.', 'error');
    }
  }
});

interface ChromeMessage {
  type: string;
  payload?: unknown;
}

chrome.runtime.onMessage.addListener((message: unknown, _sender, sendResponse) => {
  const msg = message as ChromeMessage;
  if (!msg || typeof msg !== 'object' || !msg.type) {
    sendResponse({ success: false, error: 'Invalid message structure.' });
    return;
  }

  switch (msg.type) {
    case 'PING':
      sendResponse({ success: true, data: 'PONG' });
      break;
    case 'FLOATING_SHOW':
      floatingButton.mount();
      sendResponse({ success: true });
      break;
    case 'FLOATING_HIDE':
      floatingButton.unmount();
      sendResponse({ success: true });
      break;
    case 'TOAST_SHOW': {
      const payload = msg.payload as { message?: string; type?: 'success' | 'error' };
      if (payload && payload.message) {
        Toast.show(payload.message, payload.type || 'success');
      }
      sendResponse({ success: true });
      break;
    }
    default:
      sendResponse({ success: true });
      break;
  }
});


