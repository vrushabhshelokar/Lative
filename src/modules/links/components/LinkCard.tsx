import React from 'react';
import { Link2, Copy, Pencil, Trash2 } from 'lucide-react';
import { Link } from '../types';
import { useToast } from '@/shared/hooks/useToast';

export interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (link: Link) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, onEdit, onDelete }) => {
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link.url);
      toast.success('Copied!');
    } catch {
      toast.error('Failed to copy.');
    }
  };

  return (
    <div className="flex items-center justify-between p-3.5 bg-card border border-border rounded-medium shadow-card hover:border-border/80 transition-all select-none font-sans group">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Rounded Icon Circle */}
        <div className="w-8 h-8 rounded-full bg-background-secondary border border-border flex items-center justify-center text-text-secondary group-hover:text-accent transition-colors shrink-0">
          <Link2 className="w-4 h-4" />
        </div>

        {/* Title and Subtitle */}
        <div className="min-w-0 flex-1 flex flex-col gap-0.5">
          <h4 className="text-xs font-semibold text-text-primary truncate select-none leading-none">
            {link.id}
          </h4>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-text-secondary hover:text-accent hover:underline truncate select-none leading-normal mt-0.5"
          >
            {link.url}
          </a>
        </div>
      </div>

      {/* Reusable Actions */}
      <div className="flex items-center gap-1.5 shrink-0 ml-3">
        <button
          type="button"
          onClick={handleCopy}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Copy URL"
          aria-label={`Copy ${link.id} URL`}
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onEdit(link)}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Edit link"
          aria-label={`Edit ${link.id}`}
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(link)}
          className="text-text-secondary hover:text-danger p-1.5 rounded-small hover:bg-danger/10 transition-colors focus:outline-none focus:ring-1 focus:ring-danger"
          title="Delete link"
          aria-label={`Delete ${link.id}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
