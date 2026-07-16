import { handleCartAddCurrentPage, handleCartDelete } from './handlers/cartHandler';

console.info('Lative background service worker initialized');

interface ChromeMessage {
  type: string;
  payload?: unknown;
}

const handleMessage = async (message: ChromeMessage) => {
  switch (message.type) {
    case 'CART_ADD_CURRENT_PAGE':
      return handleCartAddCurrentPage(message.payload);
    case 'CART_DELETE':
      return handleCartDelete(message.payload);
    default:
      return { success: false, error: `Unhandled message type: ${message.type}` };
  }
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message && typeof message === 'object' && 'type' in message) {
    handleMessage(message as ChromeMessage)
      .then((response) => sendResponse(response))
      .catch((error) => sendResponse({ success: false, error: error.message }));
    return true; // Keep the message channel open for asynchronous response
  }
  return false;
});

// Reactively broadcast settings toggle changes to content scripts in active tabs
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.floatingButtonEnabled) {
    const isEnabled = changes.floatingButtonEnabled.newValue;
    try {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
          if (tab.id) {
            chrome.tabs.sendMessage(
              tab.id,
              { type: isEnabled ? 'FLOATING_SHOW' : 'FLOATING_HIDE' },
              () => {
                // Suppress context errors on restricted domains
                if (chrome.runtime.lastError) {
                  // Ignored
                }
              }
            );
          }
        });
      });
    } catch (err) {
      console.warn('Failed to broadcast settings toggle updates to active tabs:', err);
    }
  }
});


