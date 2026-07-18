import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from './Button';

export interface AddButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  isLoading?: boolean;
}

export const AddButton: React.FC<AddButtonProps> = ({
  label,
  isLoading = false,
  className = '',
  ...props
}) => {
  return (
    <Button
      variant="secondary"
      isLoading={isLoading}
      leftIcon={<Plus className="w-3.5 h-3.5 stroke-[2.5]" />}
      className={`!h-8 !py-0 !px-2.5 !text-xs !font-semibold !gap-1 !rounded-md ${className}`}
      {...props}
    >
      {label}
    </Button>
  );
};

export default AddButton;
