import { AuditGate, PortfolioCategory, RoadmapPhase, AssessmentPillar, RiskPoint, StrategicQuestion, GanttPhase } from '../types';

export const initialGates: AuditGate[] = [
  {
    id: 'gate-1',
    gateNumber: 1,
    title: 'RACI Sign-Off',
    category: 'Governance',
    description: 'Formal boundary matrix signed between FBSC Ops and BU Leadership.',
    completed: false,
    mandatoryForCutover: true,
    riskLevel: 'High',
    notes: 'Formal boundary matrix signed between FBSC Ops and BU Leadership.',
    evidenceRef: 'DOC-RACI-2026-V1'
  },
  {
    id: 'gate-2',
    gateNumber: 2,
    title: 'Cleansed Master File',
    category: 'Data',
    description: '100% of the ~ 50 office accounts audited with zero critical data errors in IFCA.',
    completed: false,
    mandatoryForCutover: true,
    riskLevel: 'High',
    notes: '100% of the ~ 50 office accounts audited with zero critical data errors in IFCA.',
    evidenceRef: 'AUDIT-OFFICE-IFCA-01'
  },
  {
    id: 'gate-3',
    gateNumber: 3,
    title: 'System Access Continuity',
    category: 'Technology',
    description: 'Verified active FiLLS/eLMS/IFCA system access for all transferring team members.',
    completed: false,
    mandatoryForCutover: true,
    riskLevel: 'High',
    notes: 'Verified active FiLLS/eLMS/IFCA system access for all transferring team members.',
    evidenceRef: 'SYS-ACCESS-LOG-2026'
  },
  {
    id: 'gate-4',
    gateNumber: 4,
    title: 'Document Repository Ready',
    category: 'Technology',
    description: 'Centralized digital archive structured with complete tenant folders.',
    completed: false,
    mandatoryForCutover: true,
    riskLevel: 'Medium',
    notes: 'Centralized digital archive structured with complete tenant folders.',
    evidenceRef: 'REPO-TENANT-ARCHIVE-01'
  },
  {
    id: 'gate-5',
    gateNumber: 5,
    title: 'SOP & SLA Formally Approved',
    category: 'Process',
    description: 'Standard operating procedure and turnaround times formally documented and signed off.',
    completed: false,
    mandatoryForCutover: true,
    riskLevel: 'High',
    notes: 'Standard operating procedure and turnaround times formally documented and signed off.',
    evidenceRef: 'SOP-SLA-SIGN-OFF-2026'
  },
  {
    id: 'gate-6',
    gateNumber: 6,
    title: 'Staff Transfer Confirmed',
    category: 'Operations',
    description: 'HR and operational transfer of BU Office Leasing staff into FBSC completed.',
    completed: false,
    mandatoryForCutover: true,
    riskLevel: 'High',
    notes: 'HR and operational transfer of BU Office Leasing staff into FBSC completed.',
    evidenceRef: 'HR-STAFF-XFER-2026'
  },
  {
    id: 'gate-7',
    gateNumber: 7,
    title: 'Revenue Assurance Validation',
    category: 'Governance',
    description: 'Certification that all historical and current billing records, deposit balances and escalations are 100% reconciled and without variance.',
    completed: false,
    mandatoryForCutover: true,
    riskLevel: 'High',
    notes: 'Certification that all historical and current billing records, deposit balances and escalations are 100% reconciled and without variance.',
    evidenceRef: 'REV-ASSURE-CERT-2026'
  },
  {
    id: 'gate-8',
    gateNumber: 8,
    title: 'Capacity Sustainability Check',
    category: 'Operations',
    description: 'Formal validation that existing headcount is quantitatively sufficient to absorb steady-state volumes and renewal surges without persistent overtime.',
    completed: false,
    mandatoryForCutover: true,
    riskLevel: 'Medium',
    notes: 'Formal validation that existing headcount is quantitatively sufficient to absorb steady-state volumes and renewal surges without persistent overtime.',
    evidenceRef: 'CAP-MODEL-FBSC-2026'
  }
];

export const initialMasterPics = [
  { id: 'pic-1', fullName: 'Cely B. Atas', position: 'Migration Lead / Lease Admin' },
  { id: 'pic-2', fullName: 'Erickson T. Serrano', position: 'IT & Infrastructure Director' },
  { id: 'pic-3', fullName: 'Perds Mesina', position: 'Operations Manager' },
  { id: 'pic-4', fullName: 'Mitch Dumlao', position: 'Data Quality Lead' },
  { id: 'pic-5', fullName: 'Venus Mejia', position: 'Audit & Compliance Officer' },
  { id: 'pic-6', fullName: 'Nhelly Carnetes', position: 'Systems Architect' },
  { id: 'pic-7', fullName: 'Patrick Jay Tanap', position: 'Senior ERP Consultant' },
  { id: 'pic-8', fullName: 'Naconiel C. Dela Torre', position: 'Business Unit Manager' },
  { id: 'pic-9', fullName: 'FBSC Enterprise Capability Hub', position: 'Shared Services Squad' },
  { id: 'pic-10', fullName: 'IT Leads', position: 'Technical Operations' },
  { id: 'pic-11', fullName: 'ERI Audit Team', position: 'Internal Governance' },
  { id: 'pic-12', fullName: 'Retail BU', position: 'Business Unit' },
  { id: 'pic-13', fullName: 'Office BU', position: 'Business Unit' },
  { id: 'pic-14', fullName: 'Hypercare Squad', position: 'Post Go-Live Support' },
  { id: 'pic-15', fullName: 'Data Audit Squad', position: 'Data Integrity' },
  { id: 'pic-16', fullName: 'Capacity Squad', position: 'Resource Planning' },
];

export const STANDARD_PIC_OPTIONS = [
  'Cely B. Atas',
  'Erickson T. Serrano',
  'Perds Mesina',
  'Mitch Dumlao',
  'Venus Mejia',
  'Nhelly Carnetes',
  'Patrick Jay Tanap',
  'Naconiel C. Dela Torre',
  'FBSC Enterprise Capability Hub',
  'IT Leads',
  'ERI Audit Team',
  'Retail BU',
  'Office BU',
  'Hypercare Squad',
  'Data Audit Squad',
  'Capacity Squad',
];

export const portfolioCategories: PortfolioCategory[] = [
  {
    id: 'fli',
    label: 'Retail Leasing — FLI',
    count: 945,
    percentage: 82.2,
    color: '#007BFF',
    bgClass: 'bg-blue-50/70 hover:bg-blue-50',
    borderClass: 'border-[#007BFF]',
    badgeClass: 'bg-blue-100 text-[#007BFF]',
    description: 'High volume, complex documentation, turnover rent calculation requirements.',
    details: [
      'Over 80% of total portfolio volume',
      'Requires monthly turnover rent calculations & seasonal indexation',
      'High renewal cycle density during Q3/Q4 peak periods',
      'Primary focus of 30-day data audit and process standardization'
    ]
  },
  {
    id: 'fai',
    label: 'Retail Leasing — FAI',
    count: 155,
    percentage: 13.5,
    color: '#38bdf8',
    bgClass: 'bg-sky-50/70 hover:bg-sky-50',
    borderClass: 'border-sky-400',
    badgeClass: 'bg-sky-100 text-sky-700',
    description: 'Anchor tenant & special retail lease management workflows.',
    details: [
      'Anchor store & major flagships with long-term lease structures',
      'Custom covenants and complex CAM (Common Area Maintenance) formulas',
      'Special tenant improvement tracking & security deposit administration',
      'Requires dedicated senior specialist review before cutover'
    ]
  },
  {
    id: 'office',
    label: 'Office Leasing',
    count: 50,
    percentage: 4.3,
    color: '#003366',
    bgClass: 'bg-slate-50/80 hover:bg-slate-100',
    borderClass: 'border-[#003366]',
    badgeClass: 'bg-slate-200 text-slate-800',
    description: 'Stable, highly standardized process. Fast-track migration candidate.',
    details: [
      'Corporate & regional office lease agreements',
      'Standardized payment schedules and fixed indexation formulas',
      'Decoupled from complex retail cycle for fast-track go-live',
      'Serves as pilot baseline for FBSC operational handoff'
    ]
  }
];

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 'phase-0',
    phaseNumber: 'Phase 0',
    dateRange: 'JUL 20–22, 2026',
    title: 'Kickoff & Alignment',
    description: 'Operational discovery session with Office & Retail teams. Uncovered system gaps in FiLLS/eLMS/IFCA and manual workarounds.',
    status: 'completed',
    statusText: 'Strategy Mandate Established',
    keyDeliverables: [
      'Kickoff alignment with Business Unit heads',
      'Identification of system gaps (FiLLS/eLMS/IFCA)',
      'Establishment of "Improve-Then-Move" mandate',
      'Initial portfolio volume inventory mapping'
    ],
    accentColor: 'border-[#003366]'
  },
  {
    id: 'phase-1',
    phaseNumber: 'Phase 1',
    dateRange: 'JUL 23–29, 2026',
    title: 'Framework & Blueprint',
    description: 'Established 5 assessment pillars and 30-day timeline. Proposed Office Leasing decoupling and dispatched Data Request Matrix (DRM).',
    status: 'completed',
    statusText: 'DRM Dispatched & Decoupled',
    keyDeliverables: [
      '5 Core Assessment Pillars defined',
      'Office leasing fast-track proposal approved',
      'Data Request Matrix (DRM) sent to all BUs',
      '8 Mandatory Tollgate Rules formalized'
    ],
    accentColor: 'border-[#007BFF]'
  },
  {
    id: 'phase-2',
    phaseNumber: 'Phase 2',
    dateRange: 'AUG 03–28, 2026',
    title: '30-Day Assessment',
    description: 'Master data cleanup, exception tree mapping, capacity stress testing against peak cycles, and Tollgate 1 & 2 reviews.',
    status: 'in-progress',
    statusText: 'Active Audit & Tollgates',
    keyDeliverables: [
      'Contract data error audit (Target ≤ 5%)',
      'Exception decision trees & RACI sign-off',
      'FTE workload capacity stress testing',
      'Tollgate 1 & 2 formal review meetings'
    ],
    accentColor: 'border-amber-500'
  },
  {
    id: 'phase-3',
    phaseNumber: 'Phase 3',
    dateRange: 'SEPT 2026 ONWARD',
    title: 'Cutover & Hypercare',
    description: 'Orderly handoff of steady-state lease admin to FBSC followed by 60–90 days of mandatory hypercare support and SLA tracking.',
    status: 'pending',
    statusText: 'Pending Final Go/No-Go Decision',
    keyDeliverables: [
      'Final Tollgate 3 Go/No-Go decision',
      'Formal operational handoff to FBSC team',
      '60-90 Day Hypercare support execution',
      'Post-migration SLA performance dashboard'
    ],
    accentColor: 'border-emerald-500'
  }
];

export const assessmentPillars: AssessmentPillar[] = [
  {
    number: '01',
    name: 'Process Readiness',
    description: 'SOP documentation, turn-around SLAs, exception matrix, and workload decoupling.',
    borderColor: 'border-[#003366]',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-[#003366]',
    icon: 'fa-gears',
    keyFocusAreas: [
      'End-to-end SOP mapping for standard & custom contracts',
      'SLAs for lease creation, renewal processing, & indexation',
      'Decoupled Office vs Retail processing queues'
    ],
    items: [
      { id: 'p1-1', title: 'End-to-end SOP mapping for standard & custom contracts', completed: true, remarks: 'Office SOP signed off by Cely B. Atas; Retail SOP drafted for review.' },
      { id: 'p1-2', title: 'SLAs for lease creation, renewal processing, & indexation', completed: true, remarks: 'Target turn-around set to 2–3 days for Office, 5 days for Retail standard leases.' },
      { id: 'p1-3', title: 'Decoupled Office vs Retail processing queues', completed: true, remarks: 'Fast-track Office queue operational in FBSC.' }
    ]
  },
  {
    number: '02',
    name: 'People Readiness',
    description: 'FTE headcount modeling, capacity strain during peak renewals, and knowledge transfer.',
    borderColor: 'border-[#007BFF]',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-[#007BFF]',
    icon: 'fa-users-gear',
    keyFocusAreas: [
      'FTE workload modeling matched to 200-300 peak monthly renewals',
      'Cross-training FBSC specialists on retail lease nuances',
      'Dedicated hypercare escalation squad configuration'
    ],
    items: [
      { id: 'p2-1', title: 'FTE workload modeling matched to 200-300 peak monthly renewals', completed: false, remarks: 'Stress-testing headcount allocation during Assessment Week 3.' },
      { id: 'p2-2', title: 'Cross-training FBSC specialists on retail lease nuances', completed: false, remarks: 'Shadowing sessions ongoing with Erickson T. Serrano team.' },
      { id: 'p2-3', title: 'Dedicated hypercare escalation squad configuration', completed: true, remarks: 'Hypercare leads assigned (Office: Cely Atas, Retail: Hypercare Squad).' }
    ]
  },
  {
    number: '03',
    name: 'Tech & Data',
    description: 'Master data error rate (≤5%), system gaps across FiLLS/eLMS/IFCA, and reporting readiness.',
    borderColor: 'border-amber-500',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    icon: 'fa-database',
    keyFocusAreas: [
      'Data scrubbing & validation to ensure < 5% error rate',
      'Bridging legacy gaps between FiLLS, eLMS, and IFCA systems',
      'Centralized cloud repository indexing for ~1,150 contracts'
    ],
    items: [
      { id: 'p3-1', title: 'Data scrubbing & validation to ensure < 5% error rate', completed: true, remarks: 'Office master file 100% cleansed. Retail data scrubbing in progress (Week 1).' },
      { id: 'p3-2', title: 'Bridging legacy gaps between FiLLS, eLMS, and IFCA systems', completed: false, remarks: 'IT bug list dispatched in DRM; eLMS interface sync requested.' },
      { id: 'p3-3', title: 'Centralized cloud repository indexing for ~1,150 contracts', completed: false, remarks: 'Digital archive repository setup under BU data audit.' }
    ]
  },
  {
    number: '04',
    name: 'Governance',
    description: 'Approval matrix, renewal calendar tracking, and SOD (Segregation of Duties) controls.',
    borderColor: 'border-indigo-600',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-800',
    icon: 'fa-shield-halved',
    keyFocusAreas: [
      'RACI matrix defining FBSC admin vs BU commercial authority',
      'Segregation of duties between lease admin & billing dispatch',
      'Systemized renewal notice calendar tracking'
    ],
    items: [
      { id: 'p4-1', title: 'RACI matrix defining FBSC admin vs BU commercial authority', completed: true, remarks: 'RACI approved by Perds Mesina & Mitch Dumlao.' },
      { id: 'p4-2', title: 'Segregation of duties between lease admin & billing dispatch', completed: true, remarks: 'SOD validated by ERI Audit Squad.' },
      { id: 'p4-3', title: 'Systemized renewal notice calendar tracking', completed: false, remarks: 'Automated 90-60-30 day renewal alerts configured in eLMS.' }
    ]
  },
  {
    number: '05',
    name: 'Stakeholders',
    description: 'Escalation paths, service boundary SLAs, and BU commercial handoff alignment.',
    borderColor: 'border-emerald-500',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-800',
    icon: 'fa-handshake',
    keyFocusAreas: [
      'Defined BU escalation protocols for tenant disputes',
      'Bi-weekly operational sync meetings during hypercare',
      'Service level agreements on contract turnaround times'
    ],
    items: [
      { id: 'p5-1', title: 'Defined BU escalation protocols for tenant disputes', completed: true, remarks: 'Escalation path established with Venus Mejia & Mitch Dumlao.' },
      { id: 'p5-2', title: 'Bi-weekly operational sync meetings during hypercare', completed: true, remarks: 'Tollgate review cadence scheduled for bi-monthly sync.' },
      { id: 'p5-3', title: 'Service level agreements on contract turnaround times', completed: true, remarks: 'Formal SLAs drafted with 2-day turnaround target.' }
    ]
  }
];

export const riskDataPoints: RiskPoint[] = [
  {
    id: 'risk-office',
    name: 'Office Scope',
    volume: 50,
    complexity: 25,
    size: 25,
    color: '#003366',
    category: 'Low Risk',
    description: 'Low volume (~50 contracts) and low complexity. Ideal fast-track migration target.',
    impactMitigation: 'Decoupled for early go-live to validate baseline FBSC operating model.'
  },
  {
    id: 'risk-fli',
    name: 'Retail FLI Scope',
    volume: 945,
    complexity: 90,
    size: 75,
    color: '#007BFF',
    category: 'High Risk / Primary Scope',
    description: 'High volume (~945 contracts) with high complexity (turnover rent, variable covenants).',
    impactMitigation: 'Undergoing 30-day data audit and standardized exception tree mapping.'
  },
  {
    id: 'risk-fai',
    name: 'Retail FAI Scope',
    volume: 155,
    complexity: 85,
    size: 45,
    color: '#38bdf8',
    category: 'Medium-High Risk',
    description: 'Moderate volume (~155 contracts) with high custom anchor tenant terms.',
    impactMitigation: 'Dedicated senior specialist handling and tailored audit checklists.'
  },
  {
    id: 'risk-renewals',
    name: 'Peak Renewals Cycle',
    volume: 300,
    complexity: 75,
    size: 55,
    color: '#f59e0b',
    category: 'Operational Spike Risk',
    description: 'Concentrated renewal surges (200-300 contracts/month during peak periods).',
    impactMitigation: 'Dynamic FTE resource pooling and advance 90-day renewal notice calendar.'
  },
  {
    id: 'risk-tech-debt',
    name: 'System Tech Debt',
    volume: 200,
    complexity: 80,
    size: 40,
    color: '#ef4444',
    category: 'Technical Gap Risk',
    description: 'Legacy manual workarounds across FiLLS/eLMS/IFCA interface points.',
    impactMitigation: 'Strict input validation gates and direct cloud repository document indexing.'
  }
];

export const strategicQuestions: StrategicQuestion[] = [
  // --- OPERATIONS ---
  // A. Scope Boundaries
  {
    id: 'sq-a1',
    number: 1,
    code: 'A.1',
    domain: 'OPERATIONS',
    categoryLetter: 'A',
    category: 'A. Scope Boundaries',
    title: 'Day 1 FBSC vs BU Exclusions',
    summary: 'Defining exact boundaries between shared service administrative lease tasks and Business Unit commercial exclusions.',
    details: 'Established clear RACI boundaries ensuring FBSC manages standard lease administration, billing inputs, and document indexing, while BU retains commercial negotiations, landlord disputes, and custom lease drafting.',
    resolved: true,
    impactLevel: 'Critical'
  },
  {
    id: 'sq-a2',
    number: 2,
    code: 'A.2',
    domain: 'OPERATIONS',
    categoryLetter: 'A',
    category: 'A. Scope Boundaries',
    title: 'Steady-state vs Project Backlog',
    summary: 'Segregating recurring operational lease processing from historical BU project backlogs to safeguard SLAs.',
    details: 'One-time legacy document cleanups and old backlogged disputes are quarantined as special projects prior to cutover, preventing baseline FBSC operational turn-around times from being burdened.',
    resolved: true,
    impactLevel: 'Critical'
  },
  {
    id: 'sq-a3',
    number: 3,
    code: 'A.3',
    domain: 'OPERATIONS',
    categoryLetter: 'A',
    category: 'A. Scope Boundaries',
    title: 'Decision rights / approvals',
    summary: 'Formalizing sign-off authority levels for rent adjustments, lease waivers, and contract amendments.',
    details: 'Configured a 3-tier approval matrix where minor data maintenance is auto-approved by FBSC leads, while financial modifications and tenant concessions require BU Commercial Director sign-off.',
    resolved: true,
    impactLevel: 'High'
  },

  // B. Volume & Capacity
  {
    id: 'sq-b1',
    number: 4,
    code: 'B.1',
    domain: 'OPERATIONS',
    categoryLetter: 'B',
    category: 'B. Volume & Capacity',
    title: 'Monthly volume by activity type',
    summary: 'Categorizing lease processing volume across new contracts, renewals, escalations, and terminations.',
    details: 'Mapped monthly transaction distribution: ~82% FLI Retail, ~13.5% FAI Retail, and ~4.5% Office Leasing to optimize FTE team specialization and workload queue assignment.',
    resolved: true,
    impactLevel: 'High'
  },
  {
    id: 'sq-b2',
    number: 5,
    code: 'B.2',
    domain: 'OPERATIONS',
    categoryLetter: 'B',
    category: 'B. Volume & Capacity',
    title: 'Tenant folder completeness',
    summary: 'Auditing physical and digital tenant document packages for missing addendums, insurance, or floor plans.',
    details: 'Achieved 96.2% folder completeness across active leases in the cloud repository. Missing 3.8% missing attachments are actively flagged under the DRM audit checklist.',
    resolved: true,
    impactLevel: 'High'
  },
  {
    id: 'sq-b3',
    number: 6,
    code: 'B.3',
    domain: 'OPERATIONS',
    categoryLetter: 'B',
    category: 'B. Volume & Capacity',
    title: 'Renewal cycle workload peaks',
    summary: 'Managing FTE capacity during Q3/Q4 renewal surges (200-300 lease renewals per month).',
    details: 'Implemented a cross-trained flex-capacity squad and forward 90-day renewal notification alerts to smooth out processing spikes and eliminate option lapse risks.',
    resolved: true,
    impactLevel: 'Critical'
  },

  // C. Process Maturity
  {
    id: 'sq-c1',
    number: 7,
    code: 'C.1',
    domain: 'OPERATIONS',
    categoryLetter: 'C',
    category: 'C. Process Maturity',
    title: 'E2E SOP availability',
    summary: 'Documenting step-by-step Standard Operating Procedures for all core lease lifecycle events.',
    details: '14 E2E SOPs fully drafted and verified with Cely B. Atas and Perds Mesina, covering lease creation, billing setup, annual indexation, and contract termination.',
    resolved: true,
    impactLevel: 'High'
  },
  {
    id: 'sq-c2',
    number: 8,
    code: 'C.2',
    domain: 'OPERATIONS',
    categoryLetter: 'C',
    category: 'C. Process Maturity',
    title: '"Happy Path" vs Exception trees',
    summary: 'Creating branching decision trees for complex retail covenants, turnover clauses, and custom concessions.',
    details: 'Standardized 80% of contracts into standard "Happy Path" workflows while routing 20% complex retail leases (turnover rent, CAM caps) into mapped exception decision trees.',
    resolved: true,
    impactLevel: 'Critical'
  },
  {
    id: 'sq-c3',
    number: 9,
    code: 'C.3',
    domain: 'OPERATIONS',
    categoryLetter: 'C',
    category: 'C. Process Maturity',
    title: 'SLA vs Same-day expectations',
    summary: 'Aligning turnaround SLAs between FBSC processing queues and BU urgent request expectations.',
    details: 'Formalized SLA framework: 2-3 business days for Office Leasing, 5 business days for Retail standard, and dedicated expedited huddling for same-day urgent tenant notices.',
    resolved: true,
    impactLevel: 'Medium'
  },

  // --- INTEGRITY ---
  // D. Data Quality
  {
    id: 'sq-d1',
    number: 10,
    code: 'D.1',
    domain: 'INTEGRITY',
    categoryLetter: 'D',
    category: 'D. Data Quality',
    title: 'Reconciled Lease Inventory',
    summary: 'Reconciling physical lease agreements against active system records to eliminate ghost contracts.',
    details: '100% of Office leases and 88% of Retail leases reconciled against land administration records, reducing database error rate to below the mandatory 5% tollgate threshold.',
    resolved: true,
    impactLevel: 'Critical'
  },
  {
    id: 'sq-d2',
    number: 11,
    code: 'D.2',
    domain: 'INTEGRITY',
    categoryLetter: 'D',
    category: 'D. Data Quality',
    title: 'Single Source of Truth audit',
    summary: 'Elimination of offline Excel trackers in favor of centralized, audited master database fields.',
    details: 'Discontinued localized spreadsheet shadow records. All master lease terms, notice dates, and escalation clauses are centralized in the secure cloud repository.',
    resolved: true,
    impactLevel: 'Critical'
  },
  {
    id: 'sq-d3',
    number: 12,
    code: 'D.3',
    domain: 'INTEGRITY',
    categoryLetter: 'D',
    category: 'D. Data Quality',
    title: 'Contract Master File accuracy',
    summary: 'Verifying rate schedules, square meterages, security deposit amounts, and escalator percentages.',
    details: 'Field-by-field verification completed across key master fields with double-check validation scripts, preventing billing miscalculations at source.',
    resolved: true,
    impactLevel: 'High'
  },

  // E. System Readiness
  {
    id: 'sq-e1',
    number: 13,
    code: 'E.1',
    domain: 'INTEGRITY',
    categoryLetter: 'E',
    category: 'E. System Readiness',
    title: 'FiLLS/eLMS/IFCA workaround audit',
    summary: 'Auditing legacy manual workarounds and interfaces between FiLLS, eLMS, and IFCA platforms.',
    details: 'Identified 5 critical manual transfer workarounds across legacy tools and introduced automated data validation scripts with error logging before migration cutover.',
    resolved: true,
    impactLevel: 'Critical'
  },
  {
    id: 'sq-e2',
    number: 14,
    code: 'E.2',
    domain: 'INTEGRITY',
    categoryLetter: 'E',
    category: 'E. System Readiness',
    title: 'Automation & integration gaps',
    summary: 'Identifying automated data bridges vs manual keystroke tasks in lease registration.',
    details: 'Automated 60% of data entry tasks via direct API integrations and staging scripts between eLMS and IFCA billing modules.',
    resolved: true,
    impactLevel: 'High'
  },
  {
    id: 'sq-e3',
    number: 15,
    code: 'E.3',
    domain: 'INTEGRITY',
    categoryLetter: 'E',
    category: 'E. System Readiness',
    title: 'Oracle Migration dependency',
    summary: 'Aligning lease admin migration cutover dates with the broader Oracle ERP cloud upgrade schedule.',
    details: 'Aligned data structures with Oracle ERP financial schema standards to guarantee seamless future API synchronization without double-handling data.',
    resolved: true,
    impactLevel: 'High'
  },

  // F. Controls & Revenue
  {
    id: 'sq-f1',
    number: 16,
    code: 'F.1',
    domain: 'INTEGRITY',
    categoryLetter: 'F',
    category: 'F. Controls & Revenue',
    title: 'Billing reconciliation controls',
    summary: 'Implementing dual-check automated controls for monthly billing dispatch and tenant ledger adjustments.',
    details: 'Established automated billing pre-run reconciliation reports that highlight variance anomalies >2% before monthly invoices are generated.',
    resolved: true,
    impactLevel: 'Critical'
  },
  {
    id: 'sq-f2',
    number: 17,
    code: 'F.2',
    domain: 'INTEGRITY',
    categoryLetter: 'F',
    category: 'F. Controls & Revenue',
    title: 'Revenue leakage (CAM/Turnover)',
    summary: 'Preventing uncollected turnover rent and un-reconciled Common Area Maintenance (CAM) charges.',
    details: 'Standardized turnover rent calculation templates and automated annual CAM audit sweeps, eliminating unbilled variable revenue across retail properties.',
    resolved: true,
    impactLevel: 'Critical'
  },
  {
    id: 'sq-f3',
    number: 18,
    code: 'F.3',
    domain: 'INTEGRITY',
    categoryLetter: 'F',
    category: 'F. Controls & Revenue',
    title: 'Late indexation exposure',
    summary: 'Eliminating financial loss caused by delayed annual CPI or fixed lease rate escalation adjustments.',
    details: 'Configured automated 60-day ahead indexation triggers in eLMS that auto-calculate revised rental rates and notify lease managers before effective adjustment dates.',
    resolved: true,
    impactLevel: 'High'
  }
];

export const executiveDecouplingSummary = {
  title: 'Executive Summary & Decoupling Strategy',
  subtitle: 'Improve-Then-Move Governance Policy',
  description: 'To achieve early operational wins without exposing the enterprise capability hub to unresolved risks, the Lease Administration migration is decoupled into two parallel tracks based on portfolio stability, volume, and operational complexity.',
  tracks: [
    {
      id: 'track-a',
      title: 'Track A — Office Leasing Fast-Track (~50 Contracts)',
      badge: 'Fast-Track',
      color: 'bg-[#003366] text-white',
      borderColor: 'border-blue-200',
      description: 'Low transaction volume, highly standardized workflows, and strong internal controls. Fast-tracked for onboarding within 2–3 weeks.',
      goLive: 'Aug 17, 2026',
      lead: 'Cely B. Atas'
    },
    {
      id: 'track-b',
      title: 'Track B — Retail Leasing 30-Day Assessment Track (~1,100 Tenants)',
      badge: '30-Day Assessment',
      color: 'bg-amber-600 text-white',
      borderColor: 'border-amber-200',
      description: 'High transaction volume (~945 FLI + ~155 FAI), complex turnover/CAM calculations, 200–300 peak renewal cycles, and critical system dependencies (FiLLS/eLMS/IFCA). Governed by the full 30-day "Improve-Then-Move" readiness assessment and bi-monthly Tollgates.',
      goLive: 'Late Sept 2026+',
      lead: 'Erickson T. Serrano'
    }
  ]
};

export const officeGanttPhases: GanttPhase[] = [
  {
    id: 'off-phase-1',
    phaseNumber: 'Phase 1',
    title: 'Discovery & Fast-Track Alignment',
    dateRange: 'Jul 22 – 29, 2026',
    status: 'completed',
    statusText: 'Completed',
    accentColor: 'border-[#003886]',
    barColor: 'bg-[#003886]',
    ganttStartPct: 0,
    ganttWidthPct: 25,
    tasks: [
      {
        id: 'off-t1',
        phaseId: 'off-phase-1',
        dateStr: 'Jul 22, 2026',
        title: 'Initial Discovery Review',
        description: 'Verified ~50 active contract portfolio; confirmed strong control environment and stable manual workflow.',
        stakeholders: ['Cely B. Atas', 'FBSC Enterprise Capability Hub'],
        completed: true,
        category: 'Discovery'
      },
      {
        id: 'off-t2',
        phaseId: 'off-phase-1',
        dateStr: 'Jul 24, 2026',
        title: 'Decoupling Proposal Submitted',
        description: 'Formally submitted fast-track rationale to SVPH Perds Mesina proposing early onboarding of Office Leasing ahead of Retail.',
        stakeholders: ['Patrick Jay Tanap', 'Perds Mesina'],
        completed: true,
        category: 'Proposal'
      },
      {
        id: 'off-t3',
        phaseId: 'off-phase-1',
        dateStr: 'Jul 29, 2026',
        title: 'Data Request Matrix (DRM) Dispatched',
        description: 'Verified sample contracts, master lease inventory, and IFCA system access roles.',
        stakeholders: ['ERI Audit Team', 'Cely B. Atas'],
        completed: true,
        category: 'Data Audit',
        isMilestone: true
      }
    ]
  },
  {
    id: 'off-phase-2',
    phaseNumber: 'Phase 2',
    title: 'Fast-Track Implementation',
    dateRange: 'Aug 03 – 14, 2026',
    status: 'completed',
    statusText: 'Completed',
    accentColor: 'border-[#00C4E7]',
    barColor: 'bg-[#00C4E7]',
    ganttStartPct: 25,
    ganttWidthPct: 35,
    tasks: [
      {
        id: 'off-t4',
        phaseId: 'off-phase-2',
        dateStr: 'Aug 03, 2026',
        title: 'Kickoff & Sign-off',
        description: 'Executive approval of Fast-Track plan and confirmation of staff transfer to FBSC.',
        stakeholders: ['Perds Mesina', 'Cely B. Atas'],
        completed: true,
        category: 'Kickoff & Sign-off',
        isMilestone: true
      },
      {
        id: 'off-t5',
        phaseId: 'off-phase-2',
        dateStr: 'Aug 04–07, 2026',
        title: 'Data Audit & Inventory',
        description: 'Complete 100% audit of ~50 active contract files in IFCA; audit digital tenant folders. (System provisioning unneeded as team retains active roles).',
        stakeholders: ['ERI Audit Team', 'Cely B. Atas', 'FBSC Enterprise Capability Hub'],
        completed: true,
        category: 'Data Audit'
      },
      {
        id: 'off-t6',
        phaseId: 'off-phase-2',
        dateStr: 'Aug 10–14, 2026',
        title: 'SOP & Governance Finalization',
        description: 'Document and formalize standard Desk Procedure SOPs, COL drafting workflows, turnaround SLAs, and exception escalation trees.',
        stakeholders: ['Cely B. Atas', 'FBSC Enterprise Capability Hub'],
        completed: true,
        category: 'SOP & Governance'
      }
    ]
  },
  {
    id: 'off-phase-3',
    phaseNumber: 'Phase 3',
    title: 'Go-Live Cutover & Hypercare',
    dateRange: 'Aug 17 – Oct 31, 2026',
    status: 'in-progress',
    statusText: 'In Progress',
    accentColor: 'border-emerald-500',
    barColor: 'bg-emerald-500',
    ganttStartPct: 60,
    ganttWidthPct: 40,
    tasks: [
      {
        id: 'off-t7',
        phaseId: 'off-phase-3',
        dateStr: 'Aug 17, 2026',
        title: '🚀 Go-Live Cutover',
        description: 'Official administrative transfer of steady-state Office Lease Administration execution under FBSC organizational structure.',
        stakeholders: ['FBSC Enterprise Capability Hub'],
        completed: true,
        category: 'Go-Live',
        isMilestone: true
      },
      {
        id: 'off-t8',
        phaseId: 'off-phase-3',
        dateStr: 'Aug 18 – Oct 31, 2026',
        title: 'Hypercare & SLA Baselining',
        description: '60–90 day hypercare support window; bi-weekly SLA tracking and turnaround compliance reporting.',
        stakeholders: ['FBSC Enterprise Capability Hub', 'ERI Audit Team', 'Cely B. Atas'],
        completed: false,
        category: 'Hypercare'
      }
    ]
  }
];

export const retailGanttPhases: GanttPhase[] = [
  {
    id: 'ret-phase-0',
    phaseNumber: 'Phase 0',
    title: 'Process Discovery & Kickoff',
    dateRange: 'Jul 20 – 22, 2026',
    status: 'completed',
    statusText: 'Completed',
    accentColor: 'border-[#003366]',
    barColor: 'bg-[#003366]',
    ganttStartPct: 0,
    ganttWidthPct: 15,
    tasks: [
      {
        id: 'ret-t1',
        phaseId: 'ret-phase-0',
        dateStr: 'Jul 22, 2026',
        title: 'Retail Leasing Overview & Discovery',
        description: 'Reviewed ~945 FLI + ~155 FAI tenant portfolio with 200–300 renewals per cycle.',
        subDetails: [
          'Identified operational pain points: system gaps in FiLLS/eLMS/IFCA, unmanaged renewal peaks, heavy reliance on manual workarounds, and undefined SLAs.',
          'Established SVP Perds Mesina directive: "Improve-Then-Move" policy requiring 30-day assessment before transfer.'
        ],
        stakeholders: ['Erickson T. Serrano', 'Perds Mesina'],
        completed: true,
        category: 'Discovery',
        isMilestone: true
      }
    ]
  },
  {
    id: 'ret-phase-1',
    phaseNumber: 'Phase 1',
    title: 'Blueprint & Governance Setup',
    dateRange: 'Jul 23 – 29, 2026',
    status: 'completed',
    statusText: 'Completed',
    accentColor: 'border-[#007BFF]',
    barColor: 'bg-[#007BFF]',
    ganttStartPct: 15,
    ganttWidthPct: 20,
    tasks: [
      {
        id: 'ret-t2',
        phaseId: 'ret-phase-1',
        dateStr: 'Jul 23, 2026',
        title: '30-Day Assessment Timeline & RAG Rules Set',
        description: 'Calibrated assessment to 30 days with Mitch Dumlao and Venus Mejia. Set RAG decision rules (Green/Amber/Red).',
        stakeholders: ['Perds Mesina', 'Mitch Dumlao', 'Venus Mejia', 'Nhelly Carnetes', 'Patrick Jay Tanap'],
        completed: true,
        category: 'Governance'
      },
      {
        id: 'ret-t3',
        phaseId: 'ret-phase-1',
        dateStr: 'Jul 24, 2026',
        title: 'ERI Blueprint & Risk Framework Submission',
        description: 'Detailed 30-day risk evaluation framework submitted by Patrick Jay Tanap.',
        stakeholders: ['Patrick Jay Tanap'],
        completed: true,
        category: 'Blueprint'
      },
      {
        id: 'ret-t4',
        phaseId: 'ret-phase-1',
        dateStr: 'Jul 28, 2026',
        title: 'Framework Pitch Deck Finalized',
        description: 'Presentation deck completing 10 Priority Inquiry Questions and 8 Mandatory Prerequisites.',
        stakeholders: ['ERI Audit Team'],
        completed: true,
        category: 'Deliverable'
      },
      {
        id: 'ret-t5',
        phaseId: 'ret-phase-1',
        dateStr: 'Jul 29, 2026',
        title: 'DRM Issued for Retail Portfolio',
        description: 'Dispatched Data Request Matrix for Retail data, bug logs, and exception trees (2-day turnaround SLA).',
        stakeholders: ['Erickson Serrano', 'IT Leads'],
        completed: true,
        category: 'Data Request',
        isMilestone: true
      }
    ]
  },
  {
    id: 'ret-phase-2',
    phaseNumber: 'Phase 2',
    title: '30-Day Readiness Assessment & Tollgates',
    dateRange: 'Aug 03 – 28, 2026',
    status: 'in-progress',
    statusText: 'In Progress',
    accentColor: 'border-amber-500',
    barColor: 'bg-amber-500',
    ganttStartPct: 35,
    ganttWidthPct: 40,
    tasks: [
      {
        id: 'ret-t6',
        phaseId: 'ret-phase-2',
        dateStr: 'Aug 03–07, 2026 (Week 1)',
        title: 'WEEK 1: Master Data Cleanup & Task Filtering',
        description: 'Segregated temporary BU cleanup backlogs from true steady-state FBSC tasks. Audited master file accuracy against ≤5% error target.',
        stakeholders: ['Data Audit Squad', 'Retail Team'],
        completed: true,
        category: 'Audit'
      },
      {
        id: 'ret-t7',
        phaseId: 'ret-phase-2',
        dateStr: 'Aug 10–14, 2026 (Week 2)',
        title: 'WEEK 2: Exception Trees & 🚦 TOLLGATE 1 REVIEW',
        description: 'Mapped non-standard lease clauses, eliminated same-day request expectations, established formal SLAs.',
        subDetails: [
          'Tollgate 1 Checkpoint Review conducted with Mitch Dumlao, VAM, and FBSC leadership using quantitative RAG scorecard.'
        ],
        stakeholders: ['Mitch Dumlao', 'VAM', 'FBSC Leadership'],
        completed: true,
        category: 'Tollgate 1',
        isMilestone: true
      },
      {
        id: 'ret-t8',
        phaseId: 'ret-phase-2',
        dateStr: 'Aug 17–21, 2026 (Week 3)',
        title: 'WEEK 3: Capacity Stress-Testing & Financial Leakage Quantification',
        description: 'Stress-tested headcount against 200–300 peak renewal surges. Quantified financial exposure in CAM, turnover rent, and indexation gaps.',
        stakeholders: ['Dela Torre', 'Carnetes', 'Capacity Squad'],
        completed: false,
        category: 'Capacity'
      },
      {
        id: 'ret-t9',
        phaseId: 'ret-phase-2',
        dateStr: 'Aug 24–28, 2026 (Week 4)',
        title: 'WEEK 4: 8 Prerequisites Audit & 🚦 TOLLGATE 2 GO/NO-GO DECISION',
        description: 'Audited compliance against all 8 Mandatory Prerequisites (RACI, SOPs, Inventory, Repo, Calendar, Billing, Hypercare, Staffing).',
        subDetails: [
          'Final Go / No-Go Decision presented to Mitch Dumlao, VAM, and Perds Mesina.'
        ],
        stakeholders: ['Mitch Dumlao', 'VAM', 'Perds Mesina', 'ERI Audit Team'],
        completed: false,
        category: 'Tollgate 2',
        isMilestone: true
      }
    ]
  },
  {
    id: 'ret-phase-3',
    phaseNumber: 'Phase 3',
    title: 'Post-Assessment Cutover & Hypercare',
    dateRange: 'Sept 2026 Onward',
    status: 'pending',
    statusText: 'Pending Approval',
    accentColor: 'border-emerald-500',
    barColor: 'bg-emerald-500',
    ganttStartPct: 75,
    ganttWidthPct: 25,
    tasks: [
      {
        id: 'ret-t10',
        phaseId: 'ret-phase-3',
        dateStr: 'Sept 2026',
        title: 'Pre-Cutover BU Backlog Cleanup & Transfer',
        description: 'Business Units resolve all legacy backlogs prior to handoff. Orderly transfer of steady-state lease administration to FBSC.',
        stakeholders: ['Retail BU', 'FBSC Enterprise Capability Hub'],
        completed: false,
        category: 'Cutover'
      },
      {
        id: 'ret-t11',
        phaseId: 'ret-phase-3',
        dateStr: 'Sept – Nov 2026',
        title: '60–90 Day Mandatory Post-Transition Hypercare',
        description: '60–90 days of mandatory post-transition hypercare support with continuous SLA tracking and error rate monitoring.',
        stakeholders: ['Hypercare Squad', 'FBSC'],
        completed: false,
        category: 'Hypercare',
        isMilestone: true
      }
    ]
  }
];

export const combinedGanttPhases: GanttPhase[] = [
  {
    id: 'comb-phase-0',
    phaseNumber: 'Phase 0',
    title: 'Initial Alignment & Kickoff Session',
    dateRange: 'Jul 20 – 22, 2026',
    status: 'completed',
    statusText: 'Completed',
    accentColor: 'border-[#003366]',
    barColor: 'bg-[#003366]',
    ganttStartPct: 0,
    ganttWidthPct: 15,
    tasks: [
      {
        id: 'comb-t1',
        phaseId: 'comb-phase-0',
        dateStr: 'July 20, 2026',
        title: 'Initial Meeting Invite Issued',
        description: 'Naconiel C. Dela Torre schedules kickoff discussion for proposed migration of Lease Admin to FBSC.',
        stakeholders: ['Naconiel C. Dela Torre'],
        completed: true,
        category: 'Shared Alignment'
      },
      {
        id: 'comb-t2',
        phaseId: 'comb-phase-0',
        dateStr: 'July 22, 2026 (10:15 AM – 11:15 AM)',
        title: 'Process Overview & Discovery Session',
        description: 'Office Leasing (~50 contracts, stable) & Retail Leasing (~945 FLI + ~155 FAI, complex) discovery huddle.',
        subDetails: [
          'Office Leasing Review (Cely B. Atas): ~50 active contracts; stable process with strong internal controls.',
          'Retail Leasing Review (Erickson T. Serrano): ~945 active FLI/FAI tenant portfolio; 200–300 contract renewals per cycle.',
          'Operational Pain Points Identified: Unclear SLAs, undefined RACI, system gaps in FiLLS/eLMS/IFCA, and unmanaged peak volume spikes.',
          'Strategic Mandate: SVP Perds Mesina establishes the non-negotiable "Improve-Then-Move" policy requiring Readiness Assessment.'
        ],
        stakeholders: ['Cely B. Atas', 'Erickson T. Serrano', 'Perds Mesina'],
        completed: true,
        category: 'Shared Discovery',
        isMilestone: true
      }
    ]
  },
  {
    id: 'comb-phase-1',
    phaseNumber: 'Phase 1',
    title: 'Framework Proposal & Decoupling Blueprint',
    dateRange: 'Jul 23 – 29, 2026',
    status: 'completed',
    statusText: 'Completed',
    accentColor: 'border-[#007BFF]',
    barColor: 'bg-[#007BFF]',
    ganttStartPct: 15,
    ganttWidthPct: 20,
    tasks: [
      {
        id: 'comb-t3',
        phaseId: 'comb-phase-1',
        dateStr: 'July 23, 2026',
        title: 'Assessment Proposal & Governance Alignment',
        description: 'Perds Mesina, Mitch Dumlao, and Venus Mejia align on 30-day timeline and RAG Tollgate rules.',
        stakeholders: ['Perds Mesina', 'Venus Mejia', 'Mitch Dumlao', 'Nhelly Carnetes', 'Patrick Jay Tanap'],
        completed: true,
        category: 'Shared Calibration'
      },
      {
        id: 'comb-t4',
        phaseId: 'comb-phase-1',
        dateStr: 'July 24, 2026',
        title: 'Decoupling Strategy & ERI Blueprint',
        description: 'Patrick Jay Tanap submits decoupling strategy: Fast-track Office Leasing (~50 contracts) while Retail undergoes full 30-day assessment.',
        stakeholders: ['Patrick Jay Tanap'],
        completed: true,
        category: 'Decoupling Strategy',
        isMilestone: true
      },
      {
        id: 'comb-t5',
        phaseId: 'comb-phase-1',
        dateStr: 'July 28, 2026',
        title: 'Framework Pitch Deck Finalized',
        description: 'Presentation deck detailing 10 Priority Inquiry Questions and 8 Mandatory Prerequisites.',
        stakeholders: ['ERI Audit Team'],
        completed: true,
        category: 'Shared Deliverable'
      },
      {
        id: 'comb-t6',
        phaseId: 'comb-phase-1',
        dateStr: 'July 29, 2026',
        title: 'Data Request Matrix (DRM) Issued',
        description: 'DRM dispatched to Retail (Erickson Serrano), Office (Cely Atas), and IT leads.',
        stakeholders: ['Erickson Serrano', 'Cely Atas', 'IT Leads'],
        completed: true,
        category: 'Data Request'
      }
    ]
  },
  {
    id: 'comb-phase-2',
    phaseNumber: 'Phase 2',
    title: 'Parallel Fast-Track Execution & 30-Day Retail Assessment',
    dateRange: 'Aug 03 – 28, 2026',
    status: 'in-progress',
    statusText: 'In Progress',
    accentColor: 'border-amber-500',
    barColor: 'bg-amber-500',
    ganttStartPct: 35,
    ganttWidthPct: 40,
    tasks: [
      {
        id: 'comb-t7',
        phaseId: 'comb-phase-2',
        dateStr: 'Aug 03, 2026 [Track A]',
        title: 'Office Fast-Track Plan Approved',
        description: 'Formal executive sign-off to accelerate Office Leasing onboarding ahead of Retail.',
        stakeholders: ['Perds Mesina', 'Cely B. Atas'],
        completed: true,
        category: 'Track A: Office'
      },
      {
        id: 'comb-t8',
        phaseId: 'comb-phase-2',
        dateStr: 'Aug 03–07, 2026 [Track B]',
        title: 'Retail WEEK 1: Data Extraction & Workload Filtering',
        description: 'Audited master file accuracy (≤5% target) and separated transient BU cleanup from steady-state FBSC tasks.',
        stakeholders: ['Data Audit Squad', 'Retail Team'],
        completed: true,
        category: 'Track B: Retail'
      },
      {
        id: 'comb-t9',
        phaseId: 'comb-phase-2',
        dateStr: 'Aug 03–14, 2026 [Track A]',
        title: 'Office Kickoff, Data Audit & SOP Governance Finalization',
        description: 'Executive sign-off, 100% IFCA contract file audit, and formalized Desk Procedure SOPs.',
        stakeholders: ['Perds Mesina', 'Cely B. Atas', 'ERI Audit Team', 'FBSC Enterprise Capability Hub'],
        completed: true,
        category: 'Track A: Office'
      },
      {
        id: 'comb-t10',
        phaseId: 'comb-phase-2',
        dateStr: 'Aug 10–14, 2026 [Track B]',
        title: 'Retail WEEK 2: Exception Trees & 🚦 TOLLGATE 1 REVIEW',
        description: 'Mapped non-standard lease clauses & SLAs. Tollgate 1 checkpoint review with Mitch Dumlao, VAM, and FBSC.',
        stakeholders: ['Mitch Dumlao', 'VAM', 'FBSC Leadership'],
        completed: true,
        category: 'Track B: Retail',
        isMilestone: true
      },
      {
        id: 'comb-t11',
        phaseId: 'comb-phase-2',
        dateStr: 'Aug 17, 2026 [Track A]',
        title: '🚀 GO-LIVE: Office Lease Administration Transfer',
        description: 'Official administrative transfer of steady-state Office Lease Administration execution under FBSC organizational structure.',
        stakeholders: ['FBSC Enterprise Capability Hub'],
        completed: true,
        category: 'Track A: Office',
        isMilestone: true
      },
      {
        id: 'comb-t12',
        phaseId: 'comb-phase-2',
        dateStr: 'Aug 17–21, 2026 [Track B]',
        title: 'Retail WEEK 3: Capacity Stress-Testing & Financial Leakage',
        description: 'Stress-tested headcount against 200–300 peak renewal surges. Quantified CAM/turnover rent risks.',
        stakeholders: ['Dela Torre', 'Carnetes', 'Capacity Squad'],
        completed: false,
        category: 'Track B: Retail'
      },
      {
        id: 'comb-t13',
        phaseId: 'comb-phase-2',
        dateStr: 'Aug 24–28, 2026 [Track B]',
        title: 'Retail WEEK 4: 8 Prerequisites Audit & 🚦 TOLLGATE 2 DECISION',
        description: 'Audited compliance against 8 Mandatory Prerequisites. Final Go / No-Go Decision presentation.',
        stakeholders: ['Mitch Dumlao', 'VAM', 'Perds Mesina', 'ERI Audit Team'],
        completed: false,
        category: 'Track B: Retail',
        isMilestone: true
      }
    ]
  },
  {
    id: 'comb-phase-3',
    phaseNumber: 'Phase 3',
    title: 'Transition, Cutover & Hypercare Period',
    dateRange: 'Aug 18 – Nov 2026',
    status: 'pending',
    statusText: 'In Progress / Pending',
    accentColor: 'border-emerald-500',
    barColor: 'bg-emerald-500',
    ganttStartPct: 65,
    ganttWidthPct: 35,
    tasks: [
      {
        id: 'comb-t14',
        phaseId: 'comb-phase-3',
        dateStr: 'Aug 18 – Oct 31, 2026 [Track A]',
        title: 'Office Hypercare & SLA Baselining',
        description: '60–90 day hypercare support window; bi-weekly SLA tracking and turnaround compliance reporting.',
        stakeholders: ['FBSC Enterprise Capability Hub', 'ERI Audit Team', 'Cely B. Atas'],
        completed: false,
        category: 'Track A: Office'
      },
      {
        id: 'comb-t15',
        phaseId: 'comb-phase-3',
        dateStr: 'Sept 2026 [Track B]',
        title: 'Retail Pre-Cutover BU Backlog Cleanup & Orderly Transfer',
        description: 'Business Units resolve backlogs prior to handoff. Steady-state migration to FBSC.',
        stakeholders: ['Retail BU', 'FBSC Enterprise Capability Hub'],
        completed: false,
        category: 'Track B: Retail'
      },
      {
        id: 'comb-t16',
        phaseId: 'comb-phase-3',
        dateStr: 'Sept – Nov 2026 [Track B]',
        title: 'Retail 60–90 Day Mandatory Hypercare Support',
        description: 'Post-transition hypercare support and SLA tracking for Retail portfolio.',
        stakeholders: ['Hypercare Squad', 'FBSC'],
        completed: false,
        category: 'Track B: Retail',
        isMilestone: true
      }
    ]
  }
];

export const comparativeMatrix = [
  {
    feature: 'Portfolio Scale',
    trackA: '~50 Active Contracts',
    trackB: '~1,100 Active Tenants (~945 FLI + ~155 FAI)',
    icon: 'fa-cubes'
  },
  {
    feature: 'Complexity Level',
    trackA: 'Low (Standardized workflows, highly stable)',
    trackB: 'High (Turnover rent, CAM, non-standard terms)',
    icon: 'fa-layer-group'
  },
  {
    feature: 'Assessment Need',
    trackA: 'Streamlined 1-Week Audit',
    trackB: 'Full 30-Day Multi-Pillar Assessment',
    icon: 'fa-list-check'
  },
  {
    feature: 'Target Go-Live',
    trackA: 'Mid-August 2026 (Aug 17, 2026)',
    trackB: 'September 2026 (Pending Tollgate Approval)',
    icon: 'fa-calendar-check'
  },
  {
    feature: 'Primary Risk Area',
    trackA: 'Minimal; operational continuity',
    trackB: 'Revenue leakage, system workarounds, volume spikes',
    icon: 'fa-triangle-exclamation'
  },
  {
    feature: 'FTE Sizing Focus',
    trackA: 'Baseline steady-state admin',
    trackB: 'Peak renewal cycle coverage (200–300 renewals)',
    icon: 'fa-users'
  }
];

export const initialGanttPhases = combinedGanttPhases;


