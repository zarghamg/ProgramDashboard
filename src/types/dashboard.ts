// ASISTS Dashboard Types

export type FundingStream = 'WIOA' | 'IELCE' | 'Corrections' | 'EPE' | 'ALE';

export type UserRole = 'state_nysed' | 'regional_raen' | 'stac_ros' | 'stac_nyc';

export type Region = 1 | 2 | 3 | 4 | 5 | 6 | 7; // Region 6 is NYC

export interface Benchmark {
  id: string;
  name: string;
  shortName: string;
  target: number;
  description: string;
}

export interface ProgramPerformance {
  msg: number | null;
  postTestRate: number | null;
  enrollmentPercentage: number | null;
  employment2ndQuarter: number | null;
  employment4thQuarter: number | null;
}

export interface Program {
  id: string;
  name: string;
  region: Region;
  fundingStreams: FundingStream[];
  performance: ProgramPerformance;
}

export interface EFLPerformance {
  eflName: string;
  eflLevel: number;
  percentage: number;
  count: number;
  total: number;
}

export interface SitePerformance {
  siteName: string;
  siteId: string;
  percentage: number;
  count: number;
  total: number;
}

export interface TeacherPerformance {
  teacherName: string;
  teacherId: string;
  percentage: number;
  count: number;
  total: number;
}

export interface DataQualityMetrics {
  studentsWithoutPretest: number;
  studentsWithoutPosttest: number;
  eligibleStudentsWithoutPosttest: number;
  studentsEnrolledNotCounted: number;
  percentEnrolledNotCounted: number;
  studentsSurveyed2ndQuarter: number;
  studentsSurveyed4thQuarter: number;
}

export interface ProgramDetail {
  program: Program;
  eflPerformance: EFLPerformance[];
  sitePerformance: SitePerformance[];
  teacherPerformance: TeacherPerformance[];
  dataQuality: DataQualityMetrics;
}

// Benchmark configurations by funding stream
export const BENCHMARKS: Record<string, Benchmark> = {
  msg: {
    id: 'msg',
    name: 'Measurable Skills Gain',
    shortName: 'MSG',
    target: 53.5,
    description: 'Percentage of students achieving measurable skills gain',
  },
  postTestRate: {
    id: 'postTestRate',
    name: 'Post-test Rate',
    shortName: 'Post-test',
    target: 70,
    description: 'Percentage of eligible students who received a post-test',
  },
  enrollmentPercentage: {
    id: 'enrollmentPercentage',
    name: 'Enrollment Percentage',
    shortName: 'Enrollment',
    target: 100,
    description: 'Percentage of enrollment target achieved',
  },
  employment2ndQuarter: {
    id: 'employment2ndQuarter',
    name: 'Employment 2nd Quarter',
    shortName: 'Emp Q2',
    target: 36,
    description: 'Employment rate 2nd quarter after exit',
  },
  employment4thQuarter: {
    id: 'employment4thQuarter',
    name: 'Employment 4th Quarter',
    shortName: 'Emp Q4',
    target: 32,
    description: 'Employment rate 4th quarter after exit',
  },
};

// Which benchmarks apply to each funding stream
export const FUNDING_STREAM_BENCHMARKS: Record<FundingStream, string[]> = {
  WIOA: ['msg', 'postTestRate', 'enrollmentPercentage', 'employment2ndQuarter', 'employment4thQuarter'],
  IELCE: ['msg', 'postTestRate', 'enrollmentPercentage', 'employment2ndQuarter', 'employment4thQuarter'],
  Corrections: ['msg', 'postTestRate', 'enrollmentPercentage'],
  EPE: ['msg', 'postTestRate', 'employment2ndQuarter', 'employment4thQuarter'],
  ALE: ['msg', 'postTestRate', 'enrollmentPercentage', 'employment2ndQuarter'],
};

export const FUNDING_STREAM_LABELS: Record<FundingStream, string> = {
  WIOA: 'WIOA',
  IELCE: 'IELCE',
  Corrections: 'Corrections',
  EPE: 'EPE',
  ALE: 'ALE',
};

export const EFL_NAMES = [
  'ABE Beginning Literacy',
  'ABE Beginning Basic',
  'ABE Intermediate Low',
  'ABE Intermediate High',
  'ASE Low',
  'ASE High',
  'ESL Beginning Literacy',
  'ESL Low Beginning',
  'ESL High Beginning',
  'ESL Low Intermediate',
  'ESL High Intermediate',
  'ESL Advanced',
];
