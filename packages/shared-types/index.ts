export enum ComplianceStatus {
  COMPLIANT = "COMPLIANT",
  NON_COMPLIANT = "NON_COMPLIANT",
  EVALUATING = "EVALUATING",
  EXEMPT = "EXEMPT"
}

export enum NetworkZone {
  CDE = "CDE",           // Cardholder Data Environment
  SHARED = "SHARED",     // Connected to CDE
  OUT_OF_SCOPE = "OUT_OF_SCOPE"
}

export interface TokenizedData {
  tokenId: string;
  maskedPan: string; // e.g. 4111********1111
  bin: string;
  lastFour: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorId: string;
  action: string;
  resourceId: string;
  zone: NetworkZone;
  status: "SUCCESS" | "DENIED" | "FAILED";
  ipAddress: string;
}

export interface ComplianceControl {
  id: string;
  pciRequirement: string; // e.g. "Req 8.3.1"
  description: string;
  status: ComplianceStatus;
  lastEvaluatedAt: string;
  evidenceRef?: string;
}

export interface SecurityKPIs {
  cdeAccessAttempts: number;
  cdeAccessDenied: number;
  activeTokens: number;
  complianceScore: number; // 0-100%
  openVulnerabilitiesInCDE: number;
}
