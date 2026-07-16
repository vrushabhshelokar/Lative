import React, { useRef } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { useUpload } from '../hooks/useUpload';

export interface UploadButtonProps {
  onSuccess?: () => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ onSuccess }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDragging, isUploading, error, dragHandlers, handleFileSelect } = useUpload(onSuccess);

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col gap-1.5 font-sans select-none w-full">
      <div
        onClick={handleClick}
        {...dragHandlers}
        className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-medium cursor-pointer transition-all duration-200 select-none
          ${
            isDragging
              ? 'border-accent bg-accent/5 scale-[0.99] shadow-inner'
              : 'border-border hover:border-border/80 hover:bg-background-secondary/40'
          }
          ${isUploading ? 'pointer-events-none opacity-80 bg-background-secondary/20' : ''}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".pdf"
          className="hidden"
          disabled={isUploading}
        />

        <div className="flex flex-col items-center text-center gap-2">
          {isUploading ? (
            <div className="w-10 h-10 rounded-full bg-background-secondary border border-border flex items-center justify-center text-accent">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-background-secondary border border-border flex items-center justify-center text-text-secondary">
              <Upload className="w-5 h-5" />
            </div>
          )}

          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-text-primary leading-normal">
              {isUploading ? 'Parsing Resume Document...' : 'Upload Resume PDF'}
            </span>
            <span className="text-[10px] text-text-secondary leading-normal">
              {isUploading
                ? 'Extracting raw text structures'
                : 'Drag & drop here or click to browse files'}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <span className="text-[10px] text-danger font-medium text-center mt-0.5 select-none">
          {error}
        </span>
      )}
    </div>
  );
};
