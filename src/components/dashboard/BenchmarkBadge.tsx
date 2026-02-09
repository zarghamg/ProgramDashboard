import { cn } from '@/lib/utils';
import { BENCHMARKS } from '@/types/dashboard';

interface BenchmarkBadgeProps {
  benchmarkId: string;
  value: number | null;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function BenchmarkBadge({
  benchmarkId,
  value,
  showValue = true,
  size = 'md',
}: BenchmarkBadgeProps) {
  const benchmark = BENCHMARKS[benchmarkId];
  
  if (!benchmark || value === null) {
    return (
      <span className={cn(
        "inline-flex items-center justify-center rounded-md font-medium bg-muted text-muted-foreground",
        size === 'sm' && "px-2 py-0.5 text-xs min-w-[48px]",
        size === 'md' && "px-2.5 py-1 text-sm min-w-[56px]",
        size === 'lg' && "px-3 py-1.5 text-base min-w-[64px]"
      )}>
        N/A
      </span>
    );
  }

  const isMeeting = value >= benchmark.target;
  const isClose = value >= benchmark.target * 0.85 && value < benchmark.target;

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md font-semibold tabular-nums transition-colors",
        size === 'sm' && "px-2 py-0.5 text-xs min-w-[48px]",
        size === 'md' && "px-2.5 py-1 text-sm min-w-[56px]",
        size === 'lg' && "px-3 py-1.5 text-base min-w-[64px]",
        isMeeting && "bg-success-muted text-success",
        isClose && "bg-warning-muted text-warning-foreground",
        !isMeeting && !isClose && "bg-danger-muted text-danger"
      )}
      title={`${benchmark.name}: ${value.toFixed(1)}% (Target: ${benchmark.target}%)`}
    >
      {showValue ? `${value.toFixed(1)}%` : isMeeting ? '✓' : '✗'}
    </span>
  );
}
