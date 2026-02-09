import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export type MetricType = 'msg' | 'posttest' | 'enrollment' | 'empQ2' | 'empQ4';

interface MetricSelectorProps {
  selected: MetricType;
  onChange: (metric: MetricType) => void;
  availableMetrics: MetricType[];
}

const metricLabels: Record<MetricType, { label: string; shortLabel: string }> = {
  msg: { label: 'Measurable Skills Gain', shortLabel: 'MSG' },
  posttest: { label: 'Post-test Rate', shortLabel: 'Post-test' },
  enrollment: { label: 'Enrollment', shortLabel: 'Enrollment' },
  empQ2: { label: 'Employment Q2', shortLabel: 'Emp Q2' },
  empQ4: { label: 'Employment Q4', shortLabel: 'Emp Q4' },
};

export function MetricSelector({ selected, onChange, availableMetrics }: MetricSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2"
    >
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Select Metric
      </span>
      <div className="flex flex-col gap-1.5">
        {availableMetrics.map((metric) => (
          <Button
            key={metric}
            variant={selected === metric ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onChange(metric)}
            className={cn(
              "justify-start h-9 px-3 text-sm font-medium transition-all",
              selected === metric && "shadow-sm"
            )}
          >
            {metricLabels[metric].label}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
