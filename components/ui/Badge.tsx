import { clsx } from 'clsx';

type BadgeColor = 'violet' | 'green' | 'blue' | 'orange' | 'rose' | 'amber' | 'gray';

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  size?: 'sm' | 'md';
  dot?: boolean;
}

const colors: Record<BadgeColor, string> = {
  violet: 'bg-violet-100 text-violet-700 border-violet-200',
  green:  'bg-green-100  text-green-700  border-green-200',
  blue:   'bg-blue-100   text-blue-700   border-blue-200',
  orange: 'bg-orange-100 text-orange-700 border-orange-200',
  rose:   'bg-rose-100   text-rose-700   border-rose-200',
  amber:  'bg-amber-100  text-amber-700  border-amber-200',
  gray:   'bg-gray-100   text-gray-600   border-gray-200',
};

const dotColors: Record<BadgeColor, string> = {
  violet: 'bg-violet-500',
  green:  'bg-green-500',
  blue:   'bg-blue-500',
  orange: 'bg-orange-500',
  rose:   'bg-rose-500',
  amber:  'bg-amber-500',
  gray:   'bg-gray-400',
};

export function Badge({ children, color = 'violet', size = 'md', dot }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-semibold border rounded-full',
        colors[color],
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1',
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full', dotColors[color])} />}
      {children}
    </span>
  );
}

export function XPBadge({ xp }: { xp: number }) {
  return (
    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-sm font-bold px-3 py-1 rounded-full border border-amber-200">
      ⭐ {xp.toLocaleString()} XP
    </span>
  );
}
