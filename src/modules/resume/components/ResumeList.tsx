import React from 'react';
import { useResume } from '../hooks/useResume';
import { ResumeCard } from './ResumeCard';
import { UploadButton } from './UploadButton';
import { Skeleton } from '@/shared/components/Skeleton';

export interface ResumeListProps {
  onDelete: (id: string) => void;
  onReplace: (id: string, file: File) => Promise<void>;
}

export const ResumeList: React.FC<ResumeListProps> = ({
  onDelete,
  onReplace
}) => {
  const { resumes, isLoading } = useResume();

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

  return (
    <div className="flex flex-col h-full overflow-hidden font-sans select-none">
      {/* Upload area at the top */}
      <div className="px-4 py-3 shrink-0">
        <UploadButton />
      </div>

      <div className="h-[1px] bg-border/40 shrink-0 mx-4 my-1" />

      {/* Toolbar header */}
      <div className="px-4 py-2 shrink-0">
        <span className="text-xs font-semibold text-text-secondary select-none">
          Uploaded Resumes ({resumes.length})
        </span>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-3 min-h-0">
        {resumes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center select-none">
            <span className="text-[11px] text-text-secondary">
              No resumes uploaded yet. Upload a resume above to start.
            </span>
          </div>
        ) : (
          resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onDelete={onDelete}
              onReplace={onReplace}
            />
          ))
        )}
      </div>
    </div>
  );
};
