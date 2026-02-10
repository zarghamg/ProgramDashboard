import { useState, useMemo } from 'react';
import { AsistsLayout } from '@/components/layout/AsistsLayout';
import { FundingStreamTabs } from '@/components/dashboard/FundingStreamTabs';
import { ProgramTable } from '@/components/dashboard/ProgramTable';
import { BenchmarkLegend } from '@/components/dashboard/BenchmarkLegend';
import { getFilteredPrograms } from '@/data/mockData';
import { FundingStream, FUNDING_STREAM_BENCHMARKS, BENCHMARKS } from '@/types/dashboard';
import { Info } from 'lucide-react';

const Index = () => {
  const [fundingStream, setFundingStream] = useState<FundingStream>('WIOA');

  const programs = useMemo(() => {
    return getFilteredPrograms(fundingStream);
  }, [fundingStream]);

  const applicableBenchmarks = FUNDING_STREAM_BENCHMARKS[fundingStream];

  return (
    <AsistsLayout>
      <div className="space-y-5">
        {/* Dashboard title */}
        <div>
          <h2 className="text-lg font-bold" style={{ color: '#1a1a2e' }}>
            Program Performance Dashboard
          </h2>
          <p className="text-sm" style={{ color: '#666' }}>
            Monitor program benchmarks across funding streams • {programs.length} Programs
          </p>
        </div>

        {/* Funding stream tabs + legend */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <FundingStreamTabs value={fundingStream} onChange={setFundingStream} />
          <BenchmarkLegend />
        </div>

        {/* Benchmarks info */}
        <div
          className="rounded-lg border p-4"
          style={{ backgroundColor: '#fff', borderColor: '#ddd' }}
        >
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 mt-0.5 shrink-0" style={{ color: '#2e7abb' }} />
            <div>
              <p className="font-medium text-sm" style={{ color: '#1a1a2e' }}>
                {fundingStream} Benchmarks
              </p>
              <p className="text-xs mt-1" style={{ color: '#666' }}>
                Programs in this funding stream are evaluated on:{' '}
                {applicableBenchmarks
                  .map((id) => `${BENCHMARKS[id].name} (${BENCHMARKS[id].target}%)`)
                  .join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Programs table */}
        <ProgramTable programs={programs} fundingStream={fundingStream} />
      </div>
    </AsistsLayout>
  );
};

export default Index;
