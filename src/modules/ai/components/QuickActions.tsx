import React, { useState } from 'react';
import { Sparkles, FileText, User, FileSearch, ListTodo, FileCheck, Globe } from 'lucide-react';
import { PROMPT_TEMPLATES } from '../prompts/templates';
import { JdComparisonModal } from './JdComparisonModal';
import { useToast } from '@/shared/hooks/useToast';
import { trimTextToLimit } from '../utils/tokenTrimmer';

interface QuickActionsProps {
  onActionClick: (
    text: string,
    override?: string,
    requiredSectionsOverride?: ('fullText' | 'skills' | 'projects' | 'education' | 'experience' | 'achievements')[],
    pageContent?: string
  ) => void;
  disabled?: boolean;
}

type ModalMode = 'compare' | 'missing' | 'advisor' | null;

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick, disabled }) => {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const toast = useToast();

  const handleModalSubmit = (jdText: string) => {
    if (modalMode === 'compare') {
      onActionClick('Compare Job Description', PROMPT_TEMPLATES.jdComparison(jdText), ['experience', 'skills', 'projects']);
    } else if (modalMode === 'missing') {
      onActionClick('Identify Missing Skills', PROMPT_TEMPLATES.missingSkills(jdText), ['experience', 'skills', 'projects']);
    } else if (modalMode === 'advisor') {
      onActionClick('Resume Advisor Analysis', PROMPT_TEMPLATES.resumeAdvisor(jdText), ['experience', 'skills', 'projects']);
    }
  };

  const handleAnalyzePage = async () => {
    if (typeof chrome === 'undefined' || !chrome.runtime || !chrome.runtime.sendMessage) {
      toast.error('Page analysis is only available when running as a browser extension.');
      return;
    }
    try {
      chrome.runtime.sendMessage({ type: 'GET_ACTIVE_PAGE_TEXT' }, (response) => {
        if (chrome.runtime.lastError) {
          toast.error('Failed to extract page context. Ensure you are on a standard webpage.');
          return;
        }
        if (response && response.success && response.text) {
          const trimmed = trimTextToLimit(response.text);
          onActionClick(
            'Analyze Current Page',
            PROMPT_TEMPLATES.analyzePage,
            ['experience', 'skills', 'projects'],
            trimmed
          );
        } else {
          toast.error(response?.error || 'Failed to extract active webpage text.');
        }
      });
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'Page analysis failed to initialize.');
    }
  };

  const getModalTitle = () => {
    if (modalMode === 'compare') return "Compare Job Description";
    if (modalMode === 'missing') return "Identify Missing Skills";
    if (modalMode === 'advisor') return "Resume Suitability Advisor";
    return "";
  };

  return (
    <div className="flex flex-col gap-2 w-full mt-4 font-sans select-none">
      <div className="text-[11px] text-text-secondary font-semibold uppercase tracking-wider flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-accent" />
        <span>Quick Actions</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onActionClick('Show Resume Summary', PROMPT_TEMPLATES.resumeSummary, ['skills', 'projects', 'education', 'experience', 'achievements'])}
          className="flex items-center justify-center gap-2 p-2.5 bg-background-secondary hover:bg-background-tertiary disabled:opacity-50 disabled:cursor-not-allowed border border-border rounded-medium text-[11px] text-text-primary font-medium hover:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent active:scale-95 transition-all text-center"
        >
          <FileText className="w-3.5 h-3.5 text-accent shrink-0" />
          <span>Resume Summary</span>
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onActionClick('Show Profile Summary', PROMPT_TEMPLATES.profileSummary, ['skills', 'projects', 'education', 'experience', 'achievements'])}
          className="flex items-center justify-center gap-2 p-2.5 bg-background-secondary hover:bg-background-tertiary disabled:opacity-50 disabled:cursor-not-allowed border border-border rounded-medium text-[11px] text-text-primary font-medium hover:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent active:scale-95 transition-all text-center"
        >
          <User className="w-3.5 h-3.5 text-accent shrink-0" />
          <span>Profile Summary</span>
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setModalMode('compare')}
          className="flex items-center justify-center gap-2 p-2.5 bg-background-secondary hover:bg-background-tertiary disabled:opacity-50 disabled:cursor-not-allowed border border-border rounded-medium text-[11px] text-text-primary font-medium hover:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent active:scale-95 transition-all text-center"
        >
          <FileSearch className="w-3.5 h-3.5 text-accent shrink-0" />
          <span>Compare JD</span>
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setModalMode('missing')}
          className="flex items-center justify-center gap-2 p-2.5 bg-background-secondary hover:bg-background-tertiary disabled:opacity-50 disabled:cursor-not-allowed border border-border rounded-medium text-[11px] text-text-primary font-medium hover:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent active:scale-95 transition-all text-center"
        >
          <ListTodo className="w-3.5 h-3.5 text-accent shrink-0" />
          <span>Missing Skills</span>
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setModalMode('advisor')}
          className="flex items-center justify-center gap-2 p-2.5 bg-background-secondary hover:bg-background-tertiary disabled:opacity-50 disabled:cursor-not-allowed border border-border rounded-medium text-[11px] text-text-primary font-medium hover:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent active:scale-95 transition-all text-center"
        >
          <FileCheck className="w-3.5 h-3.5 text-accent shrink-0" />
          <span>Resume Advisor</span>
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={handleAnalyzePage}
          className="flex items-center justify-center gap-2 p-2.5 bg-background-secondary hover:bg-background-tertiary disabled:opacity-50 disabled:cursor-not-allowed border border-border rounded-medium text-[11px] text-text-primary font-medium hover:border-accent/40 focus:outline-none focus:ring-1 focus:ring-accent active:scale-95 transition-all text-center"
        >
          <Globe className="w-3.5 h-3.5 text-accent shrink-0" />
          <span>Analyze Page</span>
        </button>
      </div>

      <JdComparisonModal
        isOpen={modalMode !== null}
        onClose={() => setModalMode(null)}
        title={getModalTitle()}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};
export default QuickActions;
