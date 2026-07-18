import React, { useState } from 'react';
import { Modal } from '@/shared/components/Modal';
import { Button } from '@/shared/components/Button';

interface JdComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jdText: string) => void;
  title?: string;
}

export const JdComparisonModal: React.FC<JdComparisonModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title
}) => {
  const [jdText, setJdText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jdText.trim()) return;
    onSubmit(jdText.trim());
    setJdText('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || "Compare Job Description"}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="jd-textarea" className="text-xs font-semibold text-text-primary">
            Job Description Text
          </label>
          <textarea
            id="jd-textarea"
            placeholder="Paste the target job description details here..."
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            className="w-full min-h-[140px] max-h-[220px] p-2.5 bg-card dark:bg-background-deep border border-border dark:border-white/[0.08] rounded-medium text-xs text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/40 focus:ring-offset-1 focus:ring-offset-background dark:focus:ring-offset-background-deep resize-y font-sans leading-normal"
            required
          />
        </div>
        <div className="flex justify-end gap-2 shrink-0">
          <Button variant="secondary" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={!jdText.trim()}>
            Analyze
          </Button>
        </div>
      </form>
    </Modal>
  );
};
export default JdComparisonModal;
