import React from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
type Size = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant; size?: Size; loading?: boolean; iconRight?: React.ReactNode; iconLeft?: React.ReactNode; fullWidth?: boolean;
}

export default function Button({ variant = 'primary', size = 'md', loading = false, iconRight, iconLeft, fullWidth, children, disabled, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`pure-btn-base pure-btn-${variant} pure-btn-sz-${size} ${className}`}
      style={{ width: fullWidth ? '100%' : 'auto' }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
}