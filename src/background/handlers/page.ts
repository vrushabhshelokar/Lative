/**
 * Retrieves the text content of the active webpage by messaging the tab's content script.
 */
export async function handleGetActivePageText(): Promise<{ success: boolean; text?: string; error?: string }> {
  return new Promise((resolve) => {
    try {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
          resolve({ success: false, error: chrome.runtime.lastError.message });
          return;
        }
        const activeTab = tabs[0];
        if (!activeTab || !activeTab.id) {
          resolve({ success: false, error: 'No active tab found.' });
          return;
        }

        // Send message to content script in the active tab
        chrome.tabs.sendMessage(
          activeTab.id,
          { type: 'EXTRACT_PAGE_TEXT' },
          (response) => {
            if (chrome.runtime.lastError) {
              resolve({
                success: false,
                error: 'Failed to extract page context. Please reload the page.'
              });
              return;
            }
            if (response && response.success) {
              resolve({ success: true, text: response.text });
            } else {
              resolve({
                success: false,
                error: response?.error || 'Page extraction failed.'
              });
            }
          }
        );
      });
    } catch (err) {
      const error = err as Error;
      resolve({ success: false, error: error.message || 'Unexpected page query error.' });
    }
  });
}
