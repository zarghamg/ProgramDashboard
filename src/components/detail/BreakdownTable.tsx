import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BenchmarkBadge } from '@/components/dashboard/BenchmarkBadge';
import { motion } from 'framer-motion';
import { MetricType } from './MetricSelector';

interface BreakdownItem {
  name: string;
  id: string;
  percentage: number;
  count: number;
  total: number;
}

interface BreakdownTableProps {
  data: BreakdownItem[];
  title: string;
  metric: MetricType;
}

const metricToBenchmarkId: Record<MetricType, string> = {
  msg: 'msg',
  posttest: 'postTestRate',
  enrollment: 'enrollmentPercentage',
  empQ2: 'employment2ndQuarter',
  empQ4: 'employment4thQuarter',
};

export function BreakdownTable({ data, title, metric }: BreakdownTableProps) {
  const benchmarkId = metricToBenchmarkId[metric];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-lg border bg-card shadow-sm overflow-hidden"
    >
      <div className="border-b bg-muted/30 px-4 py-3">
        <h4 className="font-semibold text-foreground">{title}</h4>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium">Name</TableHead>
            <TableHead className="text-center font-medium w-[100px]">Rate</TableHead>
            <TableHead className="text-right font-medium w-[120px]">Students</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={item.id || index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="text-center">
                <BenchmarkBadge
                  benchmarkId={benchmarkId}
                  value={item.percentage}
                  size="sm"
                />
              </TableCell>
              <TableCell className="text-right tabular-nums text-muted-foreground">
                {item.count} / {item.total}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
