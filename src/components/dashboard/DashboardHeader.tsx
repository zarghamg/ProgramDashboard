import { motion } from 'framer-motion';
import { BarChart3, Building2 } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  programCount?: number;
}

export function DashboardHeader({ title, subtitle, programCount }: DashboardHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start justify-between"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BarChart3 className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        </div>
        {subtitle && (
          <p className="text-muted-foreground pl-[52px]">{subtitle}</p>
        )}
      </div>
      {programCount !== undefined && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2"
        >
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-foreground">{programCount}</span>
          <span className="text-sm text-muted-foreground">Programs</span>
        </motion.div>
      )}
    </motion.div>
  );
}
