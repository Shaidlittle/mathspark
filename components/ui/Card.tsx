import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  lift?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  border?: boolean;
}

const paddings = { sm: 'p-4', md: 'p-5 sm:p-6', lg: 'p-6 sm:p-8' };

export function Card({ lift, padding = 'md', border = true, className, children, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-3xl',
        border && 'border border-gray-100',
        'shadow-sm',
        lift && 'card-lift',
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={clsx('text-xl font-bold text-gray-900 mb-1', className)}>
      {children}
    </h2>
  );
}

export function CardBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('text-gray-600 leading-relaxed', className)}>
      {children}
    </div>
  );
}
