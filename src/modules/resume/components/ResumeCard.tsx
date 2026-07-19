import React, { useRef, useState } from 'react';
import { FileText, Eye, Copy, RefreshCw, Trash2, Tag } from 'lucide-react';
import { Resume } from '../types';
import { useToast } from '@/shared/hooks/useToast';
import { ResumeTitleModal } from './ResumeTitleModal';

export interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
  onReplace: (id: string, file: File) => Promise<void>;
  onUpdateTitle: (id: string, title?: string) => Promise<void>;
  isSelected?: boolean;
  onSelectToggle?: () => void;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  onDelete,
  onReplace,
  onUpdateTitle,
  isSelected = false,
  onSelectToggle
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenPdf = () => {
    try {
      const fileUrl = URL.createObjectURL(resume.file);
      window.open(fileUrl, '_blank');
      // Revoke the temporary Object URL after 1 minute to release memory resources
      setTimeout(() => URL.revokeObjectURL(fileUrl), 60000);
    } catch {
      toast.error('Failed to open PDF document.');
    }
  };

  const handleCopyFilename = async () => {
    try {
      await navigator.clipboard.writeText(resume.fileName);
      toast.success('Copied filename!');
    } catch {
      toast.error('Failed to copy filename.');
    }
  };

  const formatBytes = (bytes: number, decimals = 1) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      try {
        await onReplace(resume.id, files[0]);
        toast.success('Resume replaced successfully.');
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Replacement failed.';
        toast.error(msg);
      }
      e.target.value = '';
    }
  };

  const handleTitleSubmit = async (newTitle?: string) => {
    try {
      await onUpdateTitle(resume.id, newTitle);
      toast.success('Resume title updated.');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to update title.';
      toast.error(msg);
      throw err;
    }
  };

  const hasTitle = !!resume.title;

  return (
    <div 
      className={`flex items-center gap-3 p-3.5 border rounded-large shadow-card dark:shadow-[0_2px_12px_rgba(0,0,0,0.3)] transition-all select-none font-sans group ${
        isSelected
          ? 'bg-accent/[0.04] border-accent/40 dark:bg-accent/[0.08] dark:border-accent/40 shadow-[0_0_8px_rgba(94,106,210,0.05)]'
          : 'bg-card dark:bg-gradient-to-b dark:from-white/[0.06] dark:to-white/[0.01] border-border dark:border-white/[0.06] hover:border-border/80 dark:hover:border-white/[0.12]'
      }`}
    >
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

      <div className="flex-1 min-w-0 flex flex-col gap-2.5">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf"
          className="hidden"
        />

        {/* Rows Container */}
        <div className="flex flex-col gap-1.5">
        {/* Row 1: File icon + Title */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-background-secondary/60 border border-border dark:bg-white/[0.04] dark:border-white/[0.08] flex items-center justify-center text-text-secondary group-hover:text-accent transition-colors shrink-0">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <h4
              className="text-xs font-semibold text-text-primary truncate select-none leading-tight"
              title={hasTitle ? resume.title : resume.fileName}
            >
              {hasTitle ? resume.title : resume.fileName}
            </h4>
          </div>
        </div>

        {/* Row 2: Metadata (Size, Date, Original filename if applicable) */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-text-secondary select-none leading-none pl-[38px] -mt-0.5">
          <span>{formatBytes(resume.fileSize)}</span>
          <span className="w-1 h-1 rounded-full bg-border/40" />
          <span>Uploaded {formatDate(resume.uploadedAt)}</span>
          {hasTitle && (
            <>
              <span className="w-1 h-1 rounded-full bg-border/40" />
              <span className="truncate max-w-[120px] italic" title={resume.fileName}>
                {resume.fileName}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Row 3: Action buttons */}
      <div className="flex items-center justify-end gap-1.5 border-t border-border/40 dark:border-white/[0.04] pt-2.5 mt-0.5">
        <button
          type="button"
          onClick={handleOpenPdf}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Open PDF file"
          aria-label={`Open PDF file of ${resume.fileName}`}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleCopyFilename}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Copy original filename"
          aria-label={`Copy filename of ${resume.fileName}`}
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={`p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent
            ${hasTitle ? 'text-accent dark:bg-accent/10 dark:text-accent' : 'text-text-secondary hover:text-text-primary'}`}
          title="Edit resume title"
          aria-label={`Edit title of ${resume.fileName}`}
        >
          <Tag className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary dark:hover:bg-white/[0.05] transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Replace resume file"
          aria-label={`Replace ${resume.fileName}`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(resume.id)}
          className="text-text-secondary hover:text-danger p-1.5 rounded-small hover:bg-danger/10 transition-colors focus:outline-none focus:ring-1 focus:ring-danger"
          title="Delete resume"
          aria-label={`Delete ${resume.fileName}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      </div>

      <ResumeTitleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTitleSubmit}
        currentTitle={resume.title}
        defaultTitle={resume.fileName.substring(0, resume.fileName.lastIndexOf('.')) || resume.fileName}
      />
    </div>
  );
};
export default ResumeCard;
