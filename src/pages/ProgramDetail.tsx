import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProgramDetail } from '@/data/mockData';
import { BenchmarkBadge } from '@/components/dashboard/BenchmarkBadge';
import { MetricSelector, MetricType } from '@/components/detail/MetricSelector';
import { PerformanceChart } from '@/components/detail/PerformanceChart';
import { BreakdownTable } from '@/components/detail/BreakdownTable';
import { DataQualityPanel } from '@/components/detail/DataQualityPanel';
import { BENCHMARKS, FUNDING_STREAM_BENCHMARKS } from '@/types/dashboard';

const metricToPerformanceKey: Record<MetricType, keyof typeof BENCHMARKS> = {
  msg: 'msg',
  posttest: 'postTestRate',
  enrollment: 'enrollmentPercentage',
  empQ2: 'employment2ndQuarter',
  empQ4: 'employment4thQuarter',
};

const ProgramDetail = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('msg');

  const detail = useMemo(() => {
    if (!programId) return null;
    return getProgramDetail(programId);
  }, [programId]);

  // Determine available metrics based on funding streams
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Program not found</h2>
          <Button onClick={() => navigate('/')} className="mt-4">
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const { program, eflPerformance, sitePerformance, teacherPerformance, dataQuality } = detail;

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
    <div className="min-h-screen bg-background">
      {/* Header */}
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
          {/* Back button and title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="mb-4 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{program.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground">
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
          </motion.div>

          {/* Performance summary cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {Object.entries(BENCHMARKS).map(([key, benchmark]) => (
              <Card key={key} className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {benchmark.shortName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <BenchmarkBadge
                      benchmarkId={key}
                      value={getBenchmarkValue(key)}
                      size="lg"
                    />
                    <span className="text-xs text-muted-foreground">
                      Target: {benchmark.target}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Main content area */}
          <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
            {/* Metric selector */}
            <MetricSelector
              selected={selectedMetric}
              onChange={setSelectedMetric}
              availableMetrics={availableMetrics}
            />

            {/* Charts and tables */}
            <div className="space-y-6">
              {/* Performance chart */}
              <PerformanceChart
                data={chartData}
                metric={selectedMetric}
                title={
                  selectedMetric === 'msg' || selectedMetric === 'posttest'
                    ? 'Performance by Educational Functioning Level'
                    : 'Performance by Site'
                }
              />

              {/* Breakdown tables */}
              <div className="grid gap-6 lg:grid-cols-2">
                <BreakdownTable
                  data={sitePerformance.map((s) => ({
                    name: s.siteName,
                    id: s.siteId,
                    percentage: s.percentage,
                    count: s.count,
                    total: s.total,
                  }))}
                  title="Performance by Site"
                  metric={selectedMetric}
                />
                <BreakdownTable
                  data={teacherPerformance.map((t) => ({
                    name: t.teacherName,
                    id: t.teacherId,
                    percentage: t.percentage,
                    count: t.count,
                    total: t.total,
                  }))}
                  title="Performance by Teacher"
                  metric={selectedMetric}
                />
              </div>
            </div>
          </div>

          {/* Data quality metrics */}
          <DataQualityPanel metrics={dataQuality} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-4 mt-8">
        <div className="container">
          <p className="text-sm text-muted-foreground text-center">
            New York State Education Department • Adult Career and Continuing Education Services
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProgramDetail;
