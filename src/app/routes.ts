export type TabId = 'links' | 'mail' | 'resume' | 'certificate' | 'ai' | 'cart' | 'settings';

export interface Route {
  id: TabId;
  label: string;
}

export const routes: Route[] = [
  { id: 'links', label: 'Links' },
  { id: 'mail', label: 'Mail' },
  { id: 'resume', label: 'Resume' },
  { id: 'certificate', label: 'Certificates' },
  { id: 'ai', label: 'AI' },
  { id: 'cart', label: 'Cart' },
  { id: 'settings', label: 'Settings' }
];
