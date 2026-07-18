import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { useToast } from '@/shared/hooks/useToast';
import { useSettings } from '../hooks/useSettings';
import { db } from '@/database/db';

export const ClearDataButton: React.FC = () => {
  const { clearSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleClearAll = async () => {
    try {
      setIsLoading(true);
      // Delete all records in all IndexedDB tables
      await db.transaction('rw', [
        db.resumes,
        db.parsedResumes,
        db.certificates,
        db.links,
        db.mails,
        db.cart,
        db.settings
      ], async () => {
        await Promise.all([
          db.resumes.clear(),
          db.parsedResumes.clear(),
          db.certificates.clear(),
          db.links.clear(),
          db.mails.clear(),
          db.cart.clear(),
          db.settings.clear()
        ]);
      });

      // Reset settings preferences
      await clearSettings();
      
      toast.success('All settings and database records wiped.');
      setIsOpen(false);
      
      // Perform redirect back to home page view by reloading extension frame
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error('Failed to clear database data.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-3.5 bg-card border border-border rounded-medium shadow-card flex flex-col gap-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
        <Trash2 className="w-4 h-4 text-text-secondary shrink-0" />
        <span>Data Operations</span>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between gap-3 text-xs leading-normal">
          <span className="text-text-secondary">Backup/Restore is handled in recovery configurations.</span>
        </div>

        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={() => setIsOpen(true)}
          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
          className="w-full"
        >
          Clear All Data
        </Button>
      </div>

      <ConfirmDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleClearAll}
        title="Clear All Data"
        description="Are you sure you want to wipe all stored career assets and local settings? This action is permanent."
        confirmText="Clear Everything"
        isDestructive
        isLoading={isLoading}
      />
    </div>
  );
};
