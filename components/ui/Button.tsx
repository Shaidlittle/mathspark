'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

type Variant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'outline';
type Size    = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:   'bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-md shadow-brand-200',
  secondary: 'bg-white text-brand-700 border-2 border-brand-200 hover:bg-brand-50',
  success:   'bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-200',
  danger:    'bg-rose-600 text-white hover:bg-rose-700',
  ghost:     'bg-transparent text-brand-600 hover:bg-brand-50',
  outline:   'bg-white text-gray-700 border-2 border-gray-200 hover:border-brand-300 hover:bg-brand-50',
};

const sizeStyles: Record<Size, string> = {
  sm:  'px-3 py-1.5 text-sm rounded-xl',
  md:  'px-5 py-3 text-base rounded-2xl',
  lg:  'px-7 py-4 text-lg rounded-2xl',
  xl:  'px-8 py-5 text-xl rounded-3xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size    = 'md',
  fullWidth = false,
  loading = false,
  children,
  className,
  disabled,
  ...props
}, ref) => (
  <button
    ref={ref}
    disabled={disabled || loading}
    className={clsx(
      'font-semibold transition-all duration-150 focus-visible:ring-4 focus-visible:ring-brand-300 focus-visible:ring-offset-2',
      'select-none cursor-pointer',
      variantStyles[variant],
      sizeStyles[size],
      fullWidth && 'w-full',
      (disabled || loading) && 'opacity-50 cursor-not-allowed',
      className,
    )}
    {...props}
  >
    {loading ? (
      <span className="flex items-center justify-center gap-2">
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        Loading…
      </span>
    ) : children}
  </button>
));

Button.displayName = 'Button';
