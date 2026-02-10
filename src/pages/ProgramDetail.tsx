import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AsistsLayout } from '@/components/layout/AsistsLayout';
import { getProgramDetail } from '@/data/mockData';
import { BenchmarkBadge } from '@/components/dashboard/BenchmarkBadge';
import { MetricSelector, MetricType } from '@/components/detail/MetricSelector';
import { PerformanceChart } from '@/components/detail/PerformanceChart';
import { BreakdownTable } from '@/components/detail/BreakdownTable';
import { DataQualityPanel } from '@/components/detail/DataQualityPanel';
import { BENCHMARKS, FUNDING_STREAM_BENCHMARKS } from '@/types/dashboard';

const ProgramDetail = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('msg');

  const detail = useMemo(() => {
    if (!programId) return null;
    return getProgramDetail(programId);
  }, [programId]);

  const availableMetrics: MetricType[] = useMemo(() => {
    if (!detail) return ['msg', 'posttest'];
    const allBenchmarks = new Set<string>();
    detail.program.fundingStreams.forEach((stream) => {
      FUNDING_STREAM_BENCHMARKS[stream].forEach((b) => allBenchmarks.add(b));
    });
    const mapping: Record<string, MetricType> = {
      msg: 'msg',
      postTestRate: 'posttest',
      enrollmentPercentage: 'enrollment',
      employment2ndQuarter: 'empQ2',
      employment4thQuarter: 'empQ4',
    };
    return Object.entries(mapping)
      .filter(([key]) => allBenchmarks.has(key))
      .map(([, value]) => value);
  }, [detail]);

  const chartData = useMemo(() => {
    if (!detail) return [];
    const { eflPerformance, sitePerformance } = detail;
    if (selectedMetric === 'msg' || selectedMetric === 'posttest') {
      return eflPerformance.map((efl) => ({
        name: efl.eflName.replace('ABE ', '').replace('ESL ', ''),
        value: efl.percentage,
        count: efl.count,
        total: efl.total,
      }));
    }
    return sitePerformance.map((site) => ({
      name: site.siteName,
      value: site.percentage,
      count: site.count,
      total: site.total,
    }));
  }, [selectedMetric, detail]);

  if (!detail) {
    return (
      <AsistsLayout>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <h2 className="text-xl font-semibold" style={{ color: '#1a1a2e' }}>Program not found</h2>
            <Button onClick={() => navigate('/')} className="mt-4">
              Return to Dashboard
            </Button>
          </div>
        </div>
      </AsistsLayout>
    );
  }

  const { program, sitePerformance, teacherPerformance, dataQuality } = detail;

  const getBenchmarkValue = (benchmarkKey: string): number | null => {
    const mapping: Record<string, keyof typeof program.performance> = {
      msg: 'msg',
      postTestRate: 'postTestRate',
      enrollmentPercentage: 'enrollmentPercentage',
      employment2ndQuarter: 'employment2ndQuarter',
      employment4thQuarter: 'employment4thQuarter',
    };
    return program.performance[mapping[benchmarkKey]] ?? null;
  };

  return (
    <AsistsLayout>
      <div className="space-y-5">
        {/* Back button and title */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="mb-3 -ml-2 text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-lg font-bold" style={{ color: '#1a1a2e' }}>{program.name}</h2>
              <div className="flex items-center gap-4 mt-1 text-sm" style={{ color: '#666' }}>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  Region {program.region}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  {program.fundingStreams.join(', ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance summary cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {Object.entries(BENCHMARKS).map(([key, benchmark]) => (
            <Card key={key} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">
                  {benchmark.shortName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between">
                  <BenchmarkBadge benchmarkId={key} value={getBenchmarkValue(key)} size="lg" />
                  <span className="text-xs text-muted-foreground">Target: {benchmark.target}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main content area */}
        <div className="grid gap-5 lg:grid-cols-[200px_1fr]">
          <MetricSelector
            selected={selectedMetric}
            onChange={setSelectedMetric}
            availableMetrics={availableMetrics}
          />
          <div className="space-y-5">
            <PerformanceChart
              data={chartData}
              metric={selectedMetric}
              title={
                selectedMetric === 'msg' || selectedMetric === 'posttest'
                  ? 'Performance by Educational Functioning Level'
                  : 'Performance by Site'
              }
            />
            <div className="grid gap-5 lg:grid-cols-2">
              <BreakdownTable
                data={sitePerformance.map((s) => ({
                  name: s.siteName, id: s.siteId, percentage: s.percentage, count: s.count, total: s.total,
                }))}
                title="Performance by Site"
                metric={selectedMetric}
              />
              <BreakdownTable
                data={teacherPerformance.map((t) => ({
                  name: t.teacherName, id: t.teacherId, percentage: t.percentage, count: t.count, total: t.total,
                }))}
                title="Performance by Teacher"
                metric={selectedMetric}
              />
            </div>
          </div>
        </div>

        <DataQualityPanel metrics={dataQuality} />
      </div>
    </AsistsLayout>
  );
};

export default ProgramDetail;
