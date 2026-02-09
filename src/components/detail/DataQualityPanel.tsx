import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataQualityMetrics } from '@/types/dashboard';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  FileQuestion,
  UserX,
  ClipboardList,
} from 'lucide-react';

interface DataQualityPanelProps {
  metrics: DataQualityMetrics;
}

interface QualityMetricProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  subtext?: string;
  isWarning?: boolean;
}

function QualityMetric({ icon, label, value, subtext, isWarning }: QualityMetricProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/30">
      <div className={`mt-0.5 ${isWarning ? 'text-warning' : 'text-muted-foreground'}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className={`text-2xl font-bold tabular-nums ${isWarning ? 'text-warning' : 'text-foreground'}`}>
          {typeof value === 'number' && !label.includes('%') ? value.toLocaleString() : value}
        </p>
        {subtext && (
          <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
        )}
      </div>
    </div>
  );
}

export function DataQualityPanel({ metrics }: DataQualityPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <ClipboardList className="h-5 w-5 text-primary" />
            Data Quality Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <QualityMetric
              icon={<FileQuestion className="h-5 w-5" />}
              label="Students without pretest"
              value={metrics.studentsWithoutPretest}
              isWarning={metrics.studentsWithoutPretest > 10}
            />
            <QualityMetric
              icon={<FileQuestion className="h-5 w-5" />}
              label="Students without post-test"
              value={metrics.studentsWithoutPosttest}
              isWarning={metrics.studentsWithoutPosttest > 20}
            />
            <QualityMetric
              icon={<AlertTriangle className="h-5 w-5" />}
              label="Eligible students without post-test"
              value={metrics.eligibleStudentsWithoutPosttest}
              subtext="Students with 40+ hours"
              isWarning={metrics.eligibleStudentsWithoutPosttest > 10}
            />
            <QualityMetric
              icon={<UserX className="h-5 w-5" />}
              label="Students enrolled not counted"
              value={metrics.studentsEnrolledNotCounted}
              subtext={`${metrics.percentEnrolledNotCounted.toFixed(1)}% of total`}
              isWarning={metrics.percentEnrolledNotCounted > 5}
            />
            <QualityMetric
              icon={<ClipboardList className="h-5 w-5" />}
              label="Surveyed for Employment Q2"
              value={metrics.studentsSurveyed2ndQuarter}
            />
            <QualityMetric
              icon={<ClipboardList className="h-5 w-5" />}
              label="Surveyed for Employment Q4"
              value={metrics.studentsSurveyed4thQuarter}
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
