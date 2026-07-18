import React, { useState } from 'react';
import { Download, Database } from 'lucide-react';
import { Button } from '@/shared/components/Button';
import { useToast } from '@/shared/hooks/useToast';
import { backupService } from '../services/backupService';

export const ExportSection: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const toast = useToast();

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const backup = await backupService.exportBackup();
      const jsonString = JSON.stringify(backup, null, 2);

      // Create downloadable blob
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const date = new Date().toISOString().slice(0, 10);
      const filename = `lative_backup_${date}.lative`;

      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Backup file exported successfully.');
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || 'Failed to export backup.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="p-3.5 bg-card border border-border rounded-medium shadow-card flex flex-col gap-3 select-none font-sans">
      <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
        <Database className="w-4 h-4 text-text-secondary shrink-0" />
        <span>Export Career Assets</span>
      </div>

      <div className="flex flex-col gap-2.5 pt-1">
        <p className="text-[11px] text-text-secondary leading-relaxed">
          Download a secure local backup containing all your uploaded resumes, certificates, missing skills analysis, job applications, and preferences. API Keys are excluded.
        </p>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleExport}
          isLoading={isExporting}
          className="w-full flex items-center justify-center gap-1.5 font-medium text-xs py-2"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Backup (.lative)</span>
        </Button>
      </div>
    </div>
  );
};
export default ExportSection;
