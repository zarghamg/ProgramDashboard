import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import { BENCHMARKS } from '@/types/dashboard';
import { MetricType } from './MetricSelector';

interface ChartDataItem {
  name: string;
  value: number;
  count: number;
  total: number;
}

interface PerformanceChartProps {
  data: ChartDataItem[];
  metric: MetricType;
  title: string;
}

const metricToBenchmark: Record<MetricType, string> = {
  msg: 'msg',
  posttest: 'postTestRate',
  enrollment: 'enrollmentPercentage',
  empQ2: 'employment2ndQuarter',
  empQ4: 'employment4thQuarter',
};

export function PerformanceChart({ data, metric, title }: PerformanceChartProps) {
  const benchmarkId = metricToBenchmark[metric];
  const benchmark = BENCHMARKS[benchmarkId];
  const target = benchmark?.target ?? 0;

  const getBarColor = (value: number) => {
    if (value >= target) return 'hsl(152, 60%, 42%)'; // success
    if (value >= target * 0.85) return 'hsl(38, 92%, 50%)'; // warning
    return 'hsl(0, 72%, 51%)'; // danger
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-lg border bg-card p-6 shadow-sm"
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <span className="text-sm text-muted-foreground">
          Target: {target}%
        </span>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 88%)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: 'hsl(215, 15%, 45%)' }}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis
              tick={{ fontSize: 12, fill: 'hsl(215, 15%, 45%)' }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(214, 20%, 88%)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: number, name: string, props: any) => [
                `${value.toFixed(1)}% (${props.payload.count}/${props.payload.total})`,
                'Performance',
              ]}
            />
            <ReferenceLine
              y={target}
              stroke="hsl(217, 71%, 35%)"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{
                value: `Target: ${target}%`,
                position: 'right',
                fill: 'hsl(217, 71%, 35%)',
                fontSize: 11,
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
