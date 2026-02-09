import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BenchmarkBadge } from './BenchmarkBadge';
import { Program, FundingStream, FUNDING_STREAM_BENCHMARKS, BENCHMARKS } from '@/types/dashboard';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface ProgramTableProps {
  programs: Program[];
  fundingStream: FundingStream;
}

export function ProgramTable({ programs, fundingStream }: ProgramTableProps) {
  const navigate = useNavigate();
  const applicableBenchmarks = FUNDING_STREAM_BENCHMARKS[fundingStream];

  const getBenchmarkValue = (program: Program, benchmarkId: string): number | null => {
    const mapping: Record<string, keyof Program['performance']> = {
      msg: 'msg',
      postTestRate: 'postTestRate',
      enrollmentPercentage: 'enrollmentPercentage',
      employment2ndQuarter: 'employment2ndQuarter',
      employment4thQuarter: 'employment4thQuarter',
    };
    return program.performance[mapping[benchmarkId]] ?? null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-lg border bg-card shadow-sm overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            <TableHead className="font-semibold text-foreground w-[300px]">
              Program Name
            </TableHead>
            <TableHead className="text-center font-semibold text-foreground w-[60px]">
              Region
            </TableHead>
            {applicableBenchmarks.map((benchmarkId) => (
              <TableHead
                key={benchmarkId}
                className="text-center font-semibold text-foreground min-w-[90px]"
                title={BENCHMARKS[benchmarkId].description}
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span>{BENCHMARKS[benchmarkId].shortName}</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    ({BENCHMARKS[benchmarkId].target}%)
                  </span>
                </div>
              </TableHead>
            ))}
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {programs.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={applicableBenchmarks.length + 3}
                className="h-24 text-center text-muted-foreground"
              >
                No programs found for this funding stream.
              </TableCell>
            </TableRow>
          ) : (
            programs.map((program, index) => (
              <TableRow
                key={program.id}
                onClick={() => navigate(`/program/${program.id}`)}
                className="cursor-pointer transition-colors hover:bg-accent/50"
              >
                <TableCell className="font-medium text-primary hover:underline">
                  {program.name}
                </TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                    {program.region}
                  </span>
                </TableCell>
                {applicableBenchmarks.map((benchmarkId) => (
                  <TableCell key={benchmarkId} className="text-center">
                    <BenchmarkBadge
                      benchmarkId={benchmarkId}
                      value={getBenchmarkValue(program, benchmarkId)}
                      size="sm"
                    />
                  </TableCell>
                ))}
                <TableCell>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
}
