import { clsx } from 'clsx';

interface ProgressBarProps {
  value: number; // 0–100
  color?: string;
  height?: 'sm' | 'md' | 'lg';
  label?: string;
  showPercent?: boolean;
  animated?: boolean;
}

const heights = { sm: 'h-1.5', md: 'h-3', lg: 'h-4' };

export function ProgressBar({
  value,
  color = 'bg-brand-600',
  height = 'md',
  label,
  showPercent = false,
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm font-medium text-gray-600">{label}</span>}
          {showPercent && <span className="text-sm font-bold text-brand-700">{clamped}%</span>}
        </div>
      )}
      <div className={clsx('w-full bg-gray-100 rounded-full overflow-hidden', heights[height])}>
        <div
          className={clsx('h-full rounded-full', color, animated && 'progress-fill')}
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
