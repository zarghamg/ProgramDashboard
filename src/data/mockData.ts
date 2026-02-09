import {
  Program,
  ProgramDetail,
  Region,
  FundingStream,
  EFL_NAMES,
} from '@/types/dashboard';

// Real program data from ASISTS
export const mockPrograms: Program[] = [
  // WIOA Prog Area 1 (ABE, ASE & ESL)
  { id: 'BTEB-WIOA', name: 'Broome-Tioga BOCES', region: 3 as Region, fundingStreams: ['WIOA'], performance: { msg: 66.7, postTestRate: 83.3, enrollmentPercentage: 120.0, employment2ndQuarter: 0.0, employment4thQuarter: 0.0 } },
  { id: 'COCB-WIOA', name: 'Cayuga-Onondaga BOCES', region: 3 as Region, fundingStreams: ['WIOA'], performance: { msg: 27.8, postTestRate: 38.9, enrollmentPercentage: 90.0, employment2ndQuarter: 14.3, employment4thQuarter: 30.8 } },
  { id: 'GSTB-WIOA', name: 'Greater Southern Tier BOCES', region: 3 as Region, fundingStreams: ['WIOA'], performance: { msg: 29.2, postTestRate: 35.4, enrollmentPercentage: 86.7, employment2ndQuarter: 36.8, employment4thQuarter: 48.1 } },
  { id: 'HCCB-WIOA', name: 'Herkimer-Fulton-Hamilton-Otsego BOCES', region: 3 as Region, fundingStreams: ['WIOA'], performance: { msg: 23.8, postTestRate: 33.3, enrollmentPercentage: 42.0, employment2ndQuarter: null, employment4thQuarter: 11.8 } },
  { id: 'MOCB-WIOA', name: 'Madison-Oneida BOCES', region: 3 as Region, fundingStreams: ['WIOA'], performance: { msg: 39.7, postTestRate: 53.9, enrollmentPercentage: 80.6, employment2ndQuarter: 8.7, employment4thQuarter: 12.8 } },
  { id: 'OCCB-WIOA', name: 'Oswego County BOCES', region: 3 as Region, fundingStreams: ['WIOA'], performance: { msg: 44.8, postTestRate: 41.4, enrollmentPercentage: 58.0, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'ONMB-WIOA', name: 'Onondaga Cortland Madison BOCES', region: 3 as Region, fundingStreams: ['WIOA'], performance: { msg: 26.7, postTestRate: 27.6, enrollmentPercentage: 525.0, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'SESD-WIOA', name: 'Syracuse City School District', region: 3 as Region, fundingStreams: ['WIOA'], performance: { msg: 72.6, postTestRate: 95.2, enrollmentPercentage: 62.0, employment2ndQuarter: 7.5, employment4thQuarter: 58.3 } },
  { id: 'TSTB-WIOA', name: 'Tompkins-Seneca-Tioga BOCES', region: 3 as Region, fundingStreams: ['WIOA'], performance: { msg: 55.0, postTestRate: 58.3, enrollmentPercentage: 120.0, employment2ndQuarter: 58.8, employment4thQuarter: 43.8 } },

  // WIOA Prog Area 2 (IELCE/ESL)
  { id: 'SESD-IELCE', name: 'Syracuse City School District', region: 3 as Region, fundingStreams: ['IELCE'], performance: { msg: 33.0, postTestRate: 36.1, enrollmentPercentage: 97.0, employment2ndQuarter: 3.1, employment4thQuarter: 43.5 } },
  { id: 'TSTB-IELCE', name: 'Tompkins-Seneca-Tioga BOCES', region: 3 as Region, fundingStreams: ['IELCE'], performance: { msg: 100.0, postTestRate: 100.0, enrollmentPercentage: 20.0, employment2ndQuarter: 20.0, employment4thQuarter: 48.3 } },

  // WIOA Corrections
  { id: 'GSTB-Corrections', name: 'Greater Southern Tier BOCES', region: 3 as Region, fundingStreams: ['Corrections'], performance: { msg: 31.4, postTestRate: 40.0, enrollmentPercentage: 70.0, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'MOCB-Corrections', name: 'Madison-Oneida BOCES', region: 3 as Region, fundingStreams: ['Corrections'], performance: { msg: 57.1, postTestRate: 57.1, enrollmentPercentage: 28.0, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'ONMB-Corrections', name: 'Onondaga Cortland Madison BOCES', region: 3 as Region, fundingStreams: ['Corrections'], performance: { msg: 0.0, postTestRate: 0.0, enrollmentPercentage: 20.0, employment2ndQuarter: null, employment4thQuarter: null } },

  // ALE Programs
  { id: 'ACSD-ALE', name: 'Afton Consortium of Schools', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'BNSD-ALE', name: 'Binghamton City School District', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'BRTL-ALE', name: 'LVA Broome/Tioga Cos. Inc.', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 43.8, postTestRate: 62.5, enrollmentPercentage: 64.0, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'BTEB-ALE', name: 'Broome-Tioga BOCES', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'CAYL-ALE', name: 'LVA Cayuga County, Inc.', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'CCC-ALE', name: 'Cayuga Community College', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'CCJB-ALE', name: 'Norwich Central Schools', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'CHEL-ALE', name: 'LVA Chenango County', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'CHESL-ALE', name: 'LVA Chemung/Schuyler', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'COCB-ALE', name: 'Cayuga-Onondaga BOCES', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'DCMO-ALE', name: 'Delaware-Chenango-Madison-Otsego BOCES', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'FCSD-ALE', name: 'Fulton City School District', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'GSTB-ALE', name: 'Greater Southern Tier BOCES', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'GSYL-ALE', name: 'LVA Greater Syracuse', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'HCCB-ALE', name: 'Herkimer-Fulton-Hamilton-Otsego BOCES', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'MDYL-ALE', name: 'LVA Mid York', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'MOCB-ALE', name: 'Madison-Oneida BOCES', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'MUCC-ALE', name: 'Midtown Utica Community Center', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 68.8, postTestRate: 85.9, enrollmentPercentage: 61.0, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'MVCC-ALE', name: 'Mohawk Valley Community College', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'OCCB-ALE', name: 'Oswego County BOCES', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'ONAE-ALE', name: 'Oneonta Adult Education', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'ONMB-ALE', name: 'Onondaga Cortland Madison BOCES', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'OSDL-ALE', name: 'LVA Otsego - Delaware Cos', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'OSWL-ALE', name: 'Oswego County Opportunities, Inc.', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'OTCB-ALE', name: 'Otsego Northern Catskill BOCES', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'RNMDS-ALE', name: 'Central Southern Tier RAEN', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'SESD-ALE', name: 'Syracuse City School District', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'STBL-ALE', name: 'LVA Steuben Co. Inc.', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'TOML-ALE', name: 'LVA Tompkins County', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 11.8, postTestRate: 15.7, enrollmentPercentage: 78.5, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'TSTB-ALE', name: 'Tompkins-Seneca-Tioga BOCES', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
  { id: 'UCSD-ALE', name: 'Utica City School District', region: 3 as Region, fundingStreams: ['ALE'], performance: { msg: 0.0, postTestRate: null, enrollmentPercentage: null, employment2ndQuarter: null, employment4thQuarter: null } },
];

// State-level benchmarks for reference
export const statePerformance = {
  WIOA: { enrollment: 16121, msg: 47.0, postTestRate: 69.0, employment2ndQuarter: 15.0, employment4thQuarter: 28.0 },
  IELCE: { enrollment: 2703, msg: 65.0, postTestRate: 73.0, employment2ndQuarter: 19.0, employment4thQuarter: 33.0 },
  Corrections: { enrollment: 741, msg: 47.0, postTestRate: 57.0, employment2ndQuarter: 0.0, employment4thQuarter: 0.0 },
  ALE: { enrollment: 741, msg: 47.0, postTestRate: 57.0, employment2ndQuarter: 0.0, employment4thQuarter: null },
};

// Region-level benchmarks
export const regionPerformance = {
  CST: {
    WIOA: { enrollment: 546, msg: 41.2, postTestRate: 50.4, employment2ndQuarter: 22.0, employment4thQuarter: 31.0 },
    IELCE: { enrollment: 100, msg: 35.0, postTestRate: 38.0, employment2ndQuarter: 15.0, employment4thQuarter: 45.0 },
    Corrections: { enrollment: 57, msg: 26.3, postTestRate: 31.6, employment2ndQuarter: 0.0, employment4thQuarter: 0.0 },
    ALE: { enrollment: 57, msg: 26.3, postTestRate: 31.6, employment2ndQuarter: 0.0, employment4thQuarter: null },
  },
};

export const getFilteredPrograms = (
  fundingStream: FundingStream,
  region?: Region
): Program[] => {
  return mockPrograms.filter((program) => {
    const hasFunding = program.fundingStreams.includes(fundingStream);
    const inRegion = region ? program.region === region : true;
    return hasFunding && inRegion;
  });
};

export const getProgramDetail = (programId: string): ProgramDetail | null => {
  const program = mockPrograms.find((p) => p.id === programId);
  if (!program) return null;

  return {
    program,
    eflPerformance: EFL_NAMES.map((name, index) => {
      const total = Math.floor(Math.random() * 50) + 10;
      const count = Math.floor(Math.random() * total);
      return {
        eflName: name,
        eflLevel: index + 1,
        percentage: total > 0 ? (count / total) * 100 : 0,
        count,
        total,
      };
    }),
    sitePerformance: [
      'Main Campus',
      'Downtown Center',
      'Community Branch',
    ].map((siteName, index) => {
      const total = Math.floor(Math.random() * 100) + 20;
      const count = Math.floor(Math.random() * total * 0.8);
      return {
        siteName,
        siteId: `site-${index + 1}`,
        percentage: total > 0 ? (count / total) * 100 : 0,
        count,
        total,
      };
    }),
    teacherPerformance: [
      'Maria Garcia',
      'John Smith',
      'Emily Johnson',
      'Michael Brown',
    ].map((teacherName, index) => {
      const total = Math.floor(Math.random() * 40) + 10;
      const count = Math.floor(Math.random() * total * 0.75);
      return {
        teacherName,
        teacherId: `teacher-${index + 1}`,
        percentage: total > 0 ? (count / total) * 100 : 0,
        count,
        total,
      };
    }),
    dataQuality: {
      studentsWithoutPretest: Math.floor(Math.random() * 30),
      studentsWithoutPosttest: Math.floor(Math.random() * 50),
      eligibleStudentsWithoutPosttest: Math.floor(Math.random() * 25),
      studentsEnrolledNotCounted: Math.floor(Math.random() * 20),
      percentEnrolledNotCounted: Math.random() * 15,
      studentsSurveyed2ndQuarter: Math.floor(Math.random() * 100) + 50,
      studentsSurveyed4thQuarter: Math.floor(Math.random() * 80) + 40,
    },
  };
};
