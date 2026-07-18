import React from 'react';
import { Bookmark, ExternalLink, Copy, Pencil, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { useToast } from '@/shared/hooks/useToast';

export interface CartCardProps {
  cartItem: CartItem;
  onEdit: (item: CartItem) => void;
  onDelete: (id: string) => void;
}

export const CartCard: React.FC<CartCardProps> = ({ cartItem, onEdit, onDelete }) => {
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cartItem.url);
      toast.success('Copied URL!');
    } catch {
      toast.error('Failed to copy URL.');
    }
  };

  const handleOpen = () => {
    window.open(cartItem.url, '_blank');
  };

  return (
    <div className="flex items-center justify-between p-3.5 bg-card dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.01] border border-border dark:border-white/[0.06] rounded-large shadow-card dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] hover:border-border/80 dark:hover:border-white/[0.12] transition-all select-none font-sans group">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Rounded Icon Box */}
        <div className="w-8 h-8 rounded-xl bg-background-secondary/60 border border-border dark:bg-white/[0.04] dark:border-white/[0.08] flex items-center justify-center text-text-secondary group-hover:text-accent transition-colors shrink-0">
          <Bookmark className="w-4 h-4" />
        </div>

        {/* Title and URL */}
        <div className="min-w-0 flex-1 flex flex-col gap-0.5">
          <h4 className="text-xs font-semibold text-text-primary truncate select-none leading-none" title={cartItem.title}>
            {cartItem.title}
          </h4>
          <a
            href={cartItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-text-secondary hover:text-accent hover:underline truncate select-none leading-normal mt-0.5"
          >
            {cartItem.url}
          </a>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0 ml-3">
        <button
          type="button"
          onClick={handleOpen}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Open page"
          aria-label={`Open ${cartItem.title} page`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Copy URL"
          aria-label={`Copy ${cartItem.title} URL`}
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onEdit(cartItem)}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Edit item"
          aria-label={`Edit ${cartItem.title}`}
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(cartItem.id)}
          className="text-text-secondary hover:text-danger p-1.5 rounded-small hover:bg-danger/10 transition-colors focus:outline-none focus:ring-1 focus:ring-danger"
          title="Delete item"
          aria-label={`Delete ${cartItem.title}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
