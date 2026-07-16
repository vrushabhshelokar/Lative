import React from 'react';
import { Mail as MailIcon, Copy, Pencil, Trash2 } from 'lucide-react';
import { Mail } from '../types';
import { useToast } from '@/shared/hooks/useToast';

export interface MailCardProps {
  mail: Mail;
  onEdit: (mail: Mail) => void;
  onDelete: (mail: Mail) => void;
}

export const MailCard: React.FC<MailCardProps> = ({ mail, onEdit, onDelete }) => {
  const toast = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mail.email);
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
          <MailIcon className="w-4 h-4" />
        </div>

        {/* Title and Email address */}
        <div className="min-w-0 flex-1 flex flex-col gap-0.5">
          <h4 className="text-xs font-semibold text-text-primary truncate select-none leading-none">
            {mail.id}
          </h4>
          <span className="text-[10px] text-text-secondary truncate select-none leading-normal mt-0.5">
            {mail.email}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0 ml-3">
        <button
          type="button"
          onClick={handleCopy}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Copy Email"
          aria-label={`Copy ${mail.id} Email`}
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onEdit(mail)}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Edit email"
          aria-label={`Edit ${mail.id}`}
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(mail)}
          className="text-text-secondary hover:text-danger p-1.5 rounded-small hover:bg-danger/10 transition-colors focus:outline-none focus:ring-1 focus:ring-danger"
          title="Delete email"
          aria-label={`Delete ${mail.id}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
