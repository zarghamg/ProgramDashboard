import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export function BenchmarkLegend() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="flex items-center gap-6 text-sm"
    >
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-success" />
        <span className="text-muted-foreground">Meeting benchmark</span>
      </div>
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-warning" />
        <span className="text-muted-foreground">Within 15% of target</span>
      </div>
      <div className="flex items-center gap-2">
        <XCircle className="h-4 w-4 text-danger" />
        <span className="text-muted-foreground">Below benchmark</span>
      </div>
    </motion.div>
  );
}
