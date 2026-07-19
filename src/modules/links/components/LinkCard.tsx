import React from 'react';
import { 
  Link2, 
  Copy, 
  Pencil, 
  Trash2,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Code2,
  Terminal,
  HelpCircle,
  BookOpen,
  MessageSquare,
  Database,
  Mail,
  HardDrive,
  FileText,
  Globe
} from 'lucide-react';
import { Link } from '../types';
import { useToast } from '@/shared/hooks/useToast';

export interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (link: Link) => void;
  isSelected?: boolean;
  onSelectToggle?: () => void;
}

const getPlatformIcon = (url: string, title?: string) => {
  try {
    const urlLower = url.toLowerCase();
    const titleLower = (title || '').toLowerCase();
    const hostname = new URL(urlLower).hostname;

    // 1. Social/Professional Networks
    if (hostname.includes('linkedin.com') || hostname.includes('lnkd.in')) {
      return Linkedin;
    }
    if (hostname.includes('github.com') || hostname.includes('github.io')) {
      return Github;
    }
    if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
      return Twitter;
    }
    if (hostname.includes('instagram.com')) {
      return Instagram;
    }
    if (hostname.includes('facebook.com') || hostname.includes('fb.com')) {
      return Facebook;
    }
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      return Youtube;
    }
    if (hostname.includes('reddit.com')) {
      return MessageSquare;
    }

    // 2. Developer Platforms & Coding
    if (hostname.includes('leetcode.com') || hostname.includes('leetcode.cn')) {
      return Code2;
    }
    if (hostname.includes('hackerrank.com')) {
      return Terminal;
    }
    if (hostname.includes('codeforces.com')) {
      return Terminal;
    }
    if (hostname.includes('codechef.com')) {
      return Terminal;
    }
    if (hostname.includes('geeksforgeeks.org')) {
      return Terminal;
    }
    if (hostname.includes('stackoverflow.com') || hostname.includes('stackexchange.com')) {
      return HelpCircle;
    }

    // 3. Technical Blogs & Publishing
    if (hostname.includes('medium.com')) {
      return BookOpen;
    }
    if (hostname.includes('dev.to')) {
      return BookOpen;
    }
    if (hostname.includes('hashnode.dev') || hostname.includes('hashnode.com')) {
      return BookOpen;
    }

    // 4. Productivity & Chat
    if (hostname.includes('discord.gg') || hostname.includes('discord.com')) {
      return MessageSquare;
    }
    if (hostname.includes('t.me') || hostname.includes('telegram.org')) {
      return MessageSquare;
    }
    if (hostname.includes('notion.so') || hostname.includes('notion.site')) {
      return Database;
    }

    // 5. Google Workspace & Gmail
    if (hostname.includes('mail.google.com') || hostname.includes('gmail.com')) {
      return Mail;
    }
    if (hostname.includes('drive.google.com')) {
      return HardDrive;
    }
    if (hostname.includes('docs.google.com')) {
      return FileText;
    }

    // 6. Portfolio detection (explicit domain or title keyword match)
    if (
      hostname.includes('portfolio') || 
      titleLower.includes('portfolio') || 
      titleLower.includes('personal website') ||
      titleLower.includes('website')
    ) {
      return Globe;
    }
  } catch {
    // If URL parsing fails, default to generic Link icon
  }
  return Link2;
};

export const LinkCard: React.FC<LinkCardProps> = ({ 
  link, 
  onEdit, 
  onDelete,
  isSelected = false,
  onSelectToggle
}) => {
  const toast = useToast();
  const IconComponent = getPlatformIcon(link.url, link.id);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link.url);
      toast.success('Copied!');
    } catch {
      toast.error('Failed to copy.');
    }
  };

  return (
    <div 
      className={`flex items-center justify-between p-3.5 border rounded-large shadow-card dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all select-none font-sans group ${
        isSelected
          ? 'bg-accent/[0.04] border-accent/40 dark:bg-accent/[0.08] dark:border-accent/40 shadow-[0_0_8px_rgba(94,106,210,0.05)]'
          : 'bg-card dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.01] border-border dark:border-white/[0.06] hover:border-border/80 dark:hover:border-white/[0.12]'
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {onSelectToggle && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectToggle();
            }}
            className={`w-3.5 h-3.5 rounded border flex items-center justify-center cursor-pointer shrink-0 transition-all focus:outline-none focus:ring-1 focus:ring-accent ${
              isSelected
                ? 'bg-accent border-accent text-white'
                : 'bg-card border-border hover:border-border-hover dark:bg-white/[0.03] dark:border-white/[0.12] dark:hover:border-white/[0.20]'
            }`}
            aria-checked={isSelected}
            role="checkbox"
          >
            {isSelected && (
              <svg
                className="w-2.5 h-2.5 stroke-current text-white shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        )}
        {/* Rounded Icon Box */}
        <div className="w-8 h-8 rounded-xl bg-background-secondary/60 border border-border dark:bg-white/[0.04] dark:border-white/[0.08] flex items-center justify-center text-text-secondary group-hover:text-accent transition-colors shrink-0">
          <IconComponent className="w-4 h-4" />
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
            className="text-[11px] text-text-secondary hover:text-accent hover:underline truncate select-none leading-normal mt-0.5"
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
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Copy URL"
          aria-label={`Copy ${link.id} URL`}
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onEdit(link)}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
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
