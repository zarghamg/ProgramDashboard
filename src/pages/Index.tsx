import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { FundingStreamTabs } from '@/components/dashboard/FundingStreamTabs';
import { ProgramTable } from '@/components/dashboard/ProgramTable';
import { BenchmarkLegend } from '@/components/dashboard/BenchmarkLegend';
import { getFilteredPrograms } from '@/data/mockData';
import { FundingStream, FUNDING_STREAM_BENCHMARKS, BENCHMARKS } from '@/types/dashboard';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

const Index = () => {
  const [fundingStream, setFundingStream] = useState<FundingStream>('WIOA');

  const programs = useMemo(() => {
    return getFilteredPrograms(fundingStream);
  }, [fundingStream]);

  const applicableBenchmarks = FUNDING_STREAM_BENCHMARKS[fundingStream];

  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <header className="border-b bg-card shadow-sm">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">A</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">ASISTS</h1>
              <p className="text-xs text-muted-foreground">Adult Student Information System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="space-y-6">
          {/* Page header */}
          <DashboardHeader
            title="Program Performance Dashboard"
            subtitle="Monitor program benchmarks across funding streams"
            programCount={programs.length}
          />

          {/* Funding stream tabs */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <FundingStreamTabs value={fundingStream} onChange={setFundingStream} />
            <BenchmarkLegend />
          </div>

          {/* Benchmarks info card */}
          <motion.div
            key={fundingStream}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-accent/30 border-accent">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">
                      {fundingStream} Benchmarks
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Programs in this funding stream are evaluated on:{' '}
                      {applicableBenchmarks
                        .map((id) => `${BENCHMARKS[id].name} (${BENCHMARKS[id].target}%)`)
                        .join(', ')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Programs table */}
          <ProgramTable programs={programs} fundingStream={fundingStream} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-4 mt-auto">
        <div className="container">
          <p className="text-sm text-muted-foreground text-center">
            New York State Education Department • Adult Career and Continuing Education Services
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
