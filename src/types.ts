export interface MasterPIC {
  id: string;
  fullName: string;
  position: string;
}

export interface AuditGate {
  id: string;
  gateNumber: number;
  title: string;
  category: 'Governance' | 'Process' | 'Data' | 'Technology' | 'Operations';
  description: string;
  completed: boolean;
  notes?: string;
  evidenceRef?: string;
  mandatoryForCutover: boolean;
  riskLevel: 'High' | 'Medium' | 'Low';
}

export interface PortfolioCategory {
  id: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
  bgClass: string;
  borderClass: string;
  badgeClass: string;
  description: string;
  details: string[];
}

export interface RoadmapPhase {
  id: string;
  phaseNumber: string;
  dateRange: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  statusText: string;
  keyDeliverables: string[];
  accentColor: string;
}

export interface PillarFocusArea {
  id: string;
  title: string;
  completed: boolean;
  remarks?: string;
}

export interface AssessmentPillar {
  number: string;
  name: string;
  description: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  icon: string;
  keyFocusAreas: string[];
  items?: PillarFocusArea[];
}

export interface RiskPoint {
  id: string;
  name: string;
  volume: number; // X axis: Active Leases / Workloads
  complexity: number; // Y axis: 0 - 100
  size: number; // Bubble diameter indicator
  color: string;
  category: string;
  description: string;
  impactMitigation: string;
}

export interface GanttTaskItem {
  id: string;
  phaseId: string;
  dateStr: string;
  title: string;
  description?: string;
  stakeholders?: string[];
  subDetails?: string[];
  completed: boolean;
  category?: string;
  isMilestone?: boolean;
  remarks?: string;
}

export interface GanttPhase {
  id: string;
  phaseNumber: string;
  title: string;
  dateRange: string;
  status: 'completed' | 'in-progress' | 'pending';
  statusText: string;
  accentColor: string;
  barColor: string;
  ganttStartPct: number;
  ganttWidthPct: number;
  tasks: GanttTaskItem[];
}

export interface StrategicQuestion {
  id: string;
  number: number;
  code?: string; // e.g. 'A.1', 'B.2', 'F.3'
  domain?: 'OPERATIONS' | 'INTEGRITY';
  categoryLetter?: string; // 'A', 'B', 'C', 'D', 'E', 'F'
  category: string;
  title: string;
  summary: string;
  details: string;
  resolved: boolean;
  impactLevel: 'Critical' | 'High' | 'Medium';
}

export interface DataRequestItem {
  id: string; // e.g., DRM-01
  riskDimension: string;
  itemRequested: string;
  targetScope: string;
  description: string;
  preferredFormat: string;
  assignedOwner: string;
  priority: string;
  targetDateStr: string;
  submittedOffice: 'Yes' | 'No' | '';
  dateSubmittedOffice: string;
  auditStatusOffice: 'Not Yet Started' | 'In-Progress' | 'Completed' | 'Deferred' | '';
  submittedRetail: 'Yes' | 'No' | '';
  dateSubmittedRetail: string;
  auditStatusRetail: 'Not Yet Started' | 'In-Progress' | 'Completed' | 'Deferred' | '';
  auditorRemarks: string;
}
