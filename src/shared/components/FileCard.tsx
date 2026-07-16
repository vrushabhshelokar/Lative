import React from 'react';
import { FileText, Image, File } from 'lucide-react';
import { Card } from './Card';
import { Button } from './Button';

export interface FileCardProps {
  fileName: string;
  fileSize: number;
  uploadedAt: number;
  mimeType?: string;
  onOpen?: () => void;
  onReplace?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
  isLoading?: boolean;
}

const formatBytes = (bytes: number, decimals = 1): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const formatDateTime = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const FileCard: React.FC<FileCardProps> = ({
  fileName,
  fileSize,
  uploadedAt,
  mimeType = '',
  onOpen,
  onReplace,
  onCopy,
  onDelete,
  isLoading = false
}) => {
  const isImage = mimeType.startsWith('image/');
  const isPdf = mimeType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');

  const Icon = isPdf ? FileText : isImage ? Image : File;
  const iconColor = isPdf 
    ? 'text-danger bg-danger/10' 
    : isImage 
      ? 'text-accent bg-accent/10' 
      : 'text-text-secondary bg-background-secondary';

  return (
    <Card className="flex flex-col gap-3.5 select-none w-full">
      {/* File Header */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-medium flex items-center justify-center shrink-0 ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-text-primary truncate" title={fileName}>
            {fileName}
          </h4>
          <p className="text-[11px] text-text-secondary/80 mt-0.5">
            {formatBytes(fileSize)} • Uploaded {formatDateTime(uploadedAt)}
          </p>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex flex-wrap gap-1 mt-1 border-t border-border/40 pt-2.5">
        {onOpen && (
          <Button variant="ghost" size="sm" onClick={onOpen} isLoading={isLoading}>
            Open
          </Button>
        )}
        {onReplace && (
          <Button variant="ghost" size="sm" onClick={onReplace} isLoading={isLoading}>
            Replace
          </Button>
        )}
        {onCopy && (
          <Button variant="ghost" size="sm" onClick={onCopy} isLoading={isLoading}>
            Copy
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            isLoading={isLoading}
            className="text-danger hover:bg-danger/10 focus-visible:ring-danger"
          >
            Delete
          </Button>
        )}
      </div>
    </Card>
  );
};
