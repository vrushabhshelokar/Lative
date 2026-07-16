import React from 'react';
import { Plus, Link2 } from 'lucide-react';
import { useLinks } from '../hooks/useLinks';
import { LinkCard } from './LinkCard';
import { Link } from '../types';
import { Button } from '@/shared/components/Button';
import { Skeleton } from '@/shared/components/Skeleton';
import { EmptyState } from '@/shared/components/EmptyState';

export interface LinksListProps {
  onAdd: () => void;
  onEdit: (link: Link) => void;
  onDelete: (link: Link) => void;
}

export const LinksList: React.FC<LinksListProps> = ({ onAdd, onEdit, onDelete }) => {
  const { links, isLoading } = useLinks();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3.5 p-4 font-sans select-none">
        <div className="flex justify-between items-center mb-1">
          <Skeleton variant="text" width={100} height={14} className="mb-0" />
          <Skeleton variant="rect" width={82} height={28} />
        </div>
        <Skeleton variant="rect" height={60} />
        <Skeleton variant="rect" height={60} />
        <Skeleton variant="rect" height={60} />
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <EmptyState
        title="No profile links saved"
        description="Save frequently used professional links (e.g., LinkedIn, GitHub, Portfolio) to copy them with a single click during job applications."
        icon={Link2}
        actionText="Add Link"
        onAction={onAdd}
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden font-sans select-none">
      {/* Toolbar header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 shrink-0">
        <span className="text-xs font-semibold text-text-secondary select-none">
          Saved Profiles ({links.length})
        </span>
        <Button
          variant="secondary"
          size="sm"
          onClick={onAdd}
          className="flex items-center gap-1 py-1 px-2.5 text-xs font-medium"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Link</span>
        </Button>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 py-3.5 flex flex-col gap-3 min-h-0">
        {links.map((link) => (
          <LinkCard
            key={link.id}
            link={link}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};
