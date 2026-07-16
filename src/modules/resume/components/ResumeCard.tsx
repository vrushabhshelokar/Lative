import React, { useRef } from 'react';
import { FileText, Eye, Copy, RefreshCw, Trash2 } from 'lucide-react';
import { Resume } from '../types';
import { useToast } from '@/shared/hooks/useToast';

export interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
  onReplace: (id: string, file: File) => Promise<void>;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  onDelete,
  onReplace
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

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

  return (
    <div className="flex items-center justify-between p-3.5 bg-card border border-border rounded-medium shadow-card hover:border-border/80 transition-all select-none font-sans group">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        className="hidden"
      />

      <div className="flex items-center gap-3 min-w-0 flex-1">
        {/* Rounded Icon Circle */}
        <div className="w-8 h-8 rounded-full bg-background-secondary border border-border flex items-center justify-center text-text-secondary group-hover:text-accent transition-colors shrink-0">
          <FileText className="w-4 h-4" />
        </div>

        {/* Filename, size, date */}
        <div className="min-w-0 flex-1 flex flex-col gap-0.5">
          <h4 className="text-xs font-semibold text-text-primary truncate select-none leading-none" title={resume.fileName}>
            {resume.fileName}
          </h4>
          <div className="flex items-center gap-1.5 text-[10px] text-text-secondary select-none leading-normal mt-0.5">
            <span>{formatBytes(resume.fileSize)}</span>
            <span className="w-1 h-1 rounded-full bg-border/80" />
            <span>Uploaded {formatDate(resume.uploadedAt)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 shrink-0 ml-3">
        <button
          type="button"
          onClick={handleOpenPdf}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Open PDF file"
          aria-label={`Open PDF file of ${resume.fileName}`}
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={handleCopyFilename}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
          title="Copy original filename"
          aria-label={`Copy filename of ${resume.fileName}`}
        >
          <Copy className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-text-secondary hover:text-text-primary p-1.5 rounded-small hover:bg-background-secondary transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
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
  );
};
