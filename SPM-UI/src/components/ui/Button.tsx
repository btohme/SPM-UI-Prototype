import React from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'accent';
type Size = 'xs' | 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  fullWidth?: boolean;
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary:   'bg-primary-700 hover:bg-primary-800 active:scale-95 text-white shadow-sm',
  secondary: 'bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700',
  outline:   'border border-gray-300 hover:bg-gray-50 active:scale-95 text-gray-700',
  ghost:     'hover:bg-gray-100 active:scale-95 text-gray-600',
  danger:    'bg-red-600 hover:bg-red-700 active:scale-95 text-white',
  accent:    'bg-accent-600 hover:bg-accent-700 active:scale-95 text-white shadow-sm',
};

const SIZE_STYLES: Record<Size, string> = {
  xs:  'text-xs px-2 py-1 rounded gap-1',
  sm:  'text-sm px-3 py-1.5 rounded-md gap-1.5',
  md:  'text-sm px-4 py-2 rounded-lg gap-2',
  lg:  'text-base px-5 py-2.5 rounded-lg gap-2',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconRight,
  iconLeft,
  fullWidth,
  children,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center font-medium
        transition-all duration-150 cursor-pointer select-none
        disabled:opacity-50 disabled:cursor-not-allowed
        ${VARIANT_STYLES[variant]}
        ${SIZE_STYLES[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={16} />
      ) : iconLeft ? (
        iconLeft
      ) : null}
      {children}
      {!loading && iconRight}
    </button>
  );
}
