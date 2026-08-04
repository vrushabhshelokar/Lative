import React, { useRef } from 'react';
import { FileText, Trash2 } from 'lucide-react';
import { useResume } from '../hooks/useResume';
import { useUpload } from '../hooks/useUpload';
import { ResumeCard } from './ResumeCard';
import { UploadButton } from './UploadButton';
import { Button } from '@/shared/components/Button';
import { Skeleton } from '@/shared/components/Skeleton';
import { EmptyState } from '@/shared/components/EmptyState';
import { Info } from 'lucide-react';

export interface ResumeListProps {
  onDelete: (id: string) => void;
  onReplace: (id: string, file: File) => Promise<void>;
  onUpdateTitle: (id: string, title?: string) => Promise<void>;
  selectedIds: Set<string>;
  onSelectToggle: (id: string) => void;
  onDeleteSelected: () => void;
}

export const ResumeList: React.FC<ResumeListProps> = ({
  onDelete,
  onReplace,
  onUpdateTitle,
  selectedIds,
  onSelectToggle,
  onDeleteSelected
}) => {
  const { resumes, isLoading } = useResume();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isUploading, handleFileSelect } = useUpload();

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3.5 p-4 font-sans select-none">
        <Skeleton variant="rect" height={80} />
        <div className="h-[1px] bg-border/40 my-1" />
        <Skeleton variant="text" width={120} height={14} className="mb-2" />
        <Skeleton variant="rect" height={60} />
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="h-full select-none font-sans">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf"
          className="hidden"
          disabled={isUploading}
        />
        <EmptyState
          title="No resumes saved"
          description="Upload your resume in PDF format to let Lative's resume-aware AI assistant summarize your profile, verify missing skills, and analyze job suitability."
          icon={FileText}
          actionText="Upload Resume"
          onAction={triggerUpload}
          isLoading={isUploading}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden font-sans select-none">
      {/* Upload area at the top */}
      <div className="px-4 py-3 shrink-0">
        <UploadButton />
      </div>

      <div className="h-[1px] bg-border/40 shrink-0 mx-4 my-1" />

      <div className="p-3 bg-card border border-border rounded-medium flex items-start gap-2.5">
          <Info className="w-3.5 h-3.5 text-text-secondary mt-0.5 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-text-primary leading-none">
              Resume Upload Tip
            </span>
            <span className="text-[11px] text-text-secondary leading-normal mt-1">
              Lative copies only the resume filename. When uploading, first open the folder containing your resume in the file picker, then paste or search the filename.
            </span>
          </div>
        </div>

      {/* Toolbar header */}
      <div className="px-4 py-2 shrink-0">
        <span className="text-xs font-semibold text-text-secondary select-none">
          Uploaded Resumes ({resumes.length})
        </span>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-3 min-h-0">
        {resumes.map((resume, index) => (
          <div key={resume.id} className={`animate-fade-in-up stagger-${Math.min(index + 1, 8)}`}>
            <ResumeCard
              resume={resume}
              onDelete={onDelete}
              onReplace={onReplace}
              onUpdateTitle={onUpdateTitle}
              isSelected={selectedIds.has(resume.id)}
              onSelectToggle={() => onSelectToggle(resume.id)}
            />
          </div>
        ))}
      </div>

      {/* Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="shrink-0 p-3 border-t border-border/40 dark:border-white/[0.08] bg-background/95 dark:bg-background-secondary/95 backdrop-blur-md flex items-center justify-between gap-3 animate-fade-in-up">
          <span className="text-[11px] font-medium text-text-primary">
            {selectedIds.size} {selectedIds.size === 1 ? 'item' : 'items'} selected
          </span>
          <Button
            variant="danger"
            size="sm"
            onClick={onDeleteSelected}
            leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          >
            Delete Selected
          </Button>
        </div>
      )}
    </div>
  );
};
