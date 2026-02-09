import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FundingStream, FUNDING_STREAM_LABELS } from '@/types/dashboard';
import { motion } from 'framer-motion';

interface FundingStreamTabsProps {
  value: FundingStream;
  onChange: (stream: FundingStream) => void;
}

const fundingStreams: FundingStream[] = ['WIOA', 'IELCE', 'Corrections', 'EPE', 'ALE'];

export function FundingStreamTabs({ value, onChange }: FundingStreamTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Tabs value={value} onValueChange={(v) => onChange(v as FundingStream)}>
        <TabsList className="h-11 bg-muted/50 p-1">
          {fundingStreams.map((stream) => (
            <TabsTrigger
              key={stream}
              value={stream}
              className="px-4 py-2 text-sm font-medium data-[state=active]:bg-card data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              {FUNDING_STREAM_LABELS[stream]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </motion.div>
  );
}
