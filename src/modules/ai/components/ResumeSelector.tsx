import React from 'react';
import { FileText } from 'lucide-react';
import { useAiContext } from '../hooks/useAiContext';
import { useResume } from '@/modules/resume';
import { Skeleton } from '@/shared/components/Skeleton';

export const ResumeSelector: React.FC = () => {
  const { selectedResumeId, setSelectedResumeId, isLoading: isContextLoading } = useAiContext();
  const { resumes, isLoading: isResumesLoading } = useResume();

  const isLoading = isContextLoading || isResumesLoading;

  if (isLoading) {
    return <Skeleton className="h-10 w-full rounded-medium" />;
  }

  if (resumes.length === 0) {
    return (
      <div className="flex items-center gap-2 p-3 bg-background-secondary border border-dashed border-border rounded-medium text-xs text-text-secondary select-none font-sans">
        <FileText className="w-4 h-4 shrink-0 text-text-secondary/60" />
        <span>No resumes found. Please upload a resume first.</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 w-full font-sans select-none">
      <label className="text-xs font-semibold text-text-secondary select-none tracking-wide">
        Selected Resume
      </label>
      <div className="relative flex items-center">
        <FileText className="absolute left-3 text-text-secondary w-4 h-4 pointer-events-none" />
        <select
          value={selectedResumeId || ''}
          onChange={(e) => setSelectedResumeId(e.target.value || null)}
          className="w-full h-10 pl-9 pr-8 text-xs rounded-medium bg-card dark:bg-background-deep border border-border dark:border-white/[0.08] text-text-primary placeholder:text-text-secondary/40 transition-all duration-standard focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/40 focus:ring-offset-1 focus:ring-offset-background dark:focus:ring-offset-background-deep cursor-pointer appearance-none"
        >
          {resumes.map((resume) => (
            <option key={resume.id} value={resume.id}>
              {resume.title || resume.fileName}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-text-secondary" />
      </div>
    </div>
  );
};
