import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { ConfirmDialog } from '@/shared/components/ConfirmDialog';
import { useToast } from '@/shared/hooks/useToast';
import { backupService } from '../services/backupService';
import { validateBackupData } from '../validators/validateBackup';

export const ImportSection: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [backupPayload, setBackupPayload] = useState<unknown>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const toast = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const parsed = JSON.parse(content);

          // Validate before showing overwrite confirmation dialog
          const validation = validateBackupData(parsed);
          if (!validation.isValid) {
            toast.error(validation.error || 'Invalid backup file schema.');
            return;
          }

          setBackupPayload(parsed);
          setIsConfirmOpen(true);
        } catch {
          toast.error('Failed to parse backup. Ensure it is a valid Lative backup file.');
        }
      };

      reader.readAsText(file);
      e.target.value = ''; // Reset file input
    }
  };

  const handleConfirmRestore = async () => {
    if (!backupPayload) return;
    try {
      setIsRestoring(true);
      await backupService.restoreBackup(backupPayload);
      toast.success('Backup restored successfully! Reloading...');
      setIsConfirmOpen(false);

      // Reload popups window to update IndexedDB and storage cache state
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || 'Failed to restore backup.');
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <div className="p-3.5 bg-card border border-border rounded-medium shadow-card flex flex-col gap-3 select-none font-sans">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".lative"
        className="hidden"
      />

      <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
        <Upload className="w-4 h-4 text-text-secondary shrink-0" />
        <span>Restore Career Assets</span>
      </div>

      <div className="flex flex-col gap-2.5 pt-1">
        <p className="text-[11px] text-text-secondary leading-relaxed">
          Restore data from a `.lative` file. <strong>Warning:</strong> This will completely overwrite all your current resumes, certificates, emails, links, and preferences.
        </p>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-1.5 font-medium text-xs py-2"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Backup File</span>
        </Button>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmRestore}
        title="Restore Data Backup"
        description="Are you sure you want to restore this backup? All existing local career data and settings will be permanently overwritten."
        confirmText="Yes, Overwrite & Restore"
        isDestructive
        isLoading={isRestoring}
      />
    </div>
  );
};
export default ImportSection;
