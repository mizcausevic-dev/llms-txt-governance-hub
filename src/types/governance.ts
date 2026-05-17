export type ManifestStatus = "release-ready" | "watch" | "blocked";

export interface ManifestRecord {
  id: string;
  surface: string;
  owner: string;
  status: ManifestStatus;
  lastUpdatedDays: number;
  freshnessWindowDays: number;
  exposedSections: string[];
  blockedSections: string[];
  policyMode: "open" | "review" | "restricted";
  leadRisk: string;
  nextAction: string;
}

export interface ExclusionRecord {
  route: string;
  reason: string;
  owner: string;
  reviewWindowDays: number;
  status: "active" | "expiring" | "remove";
}

export interface ReleaseRecord {
  lane: string;
  surface: string;
  evidenceCoverage: string;
  freshnessState: string;
  approvalState: string;
  nextStep: string;
}

export interface Summary {
  manifestCount: number;
  blockedCount: number;
  expiringCount: number;
  releaseReadyCount: number;
  averageFreshnessDays: number;
  leadRecommendation: string;
}
