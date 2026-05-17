import { exclusions, manifests, releaseLanes } from "../data/sampleGovernance";
import type { Summary } from "../types/governance";

const statusRank = {
  blocked: 0,
  watch: 1,
  "release-ready": 2,
} as const;

const exclusionRank = {
  active: 0,
  expiring: 1,
  remove: 2,
} as const;

export function manifestBoard() {
  return [...manifests].sort((left, right) => statusRank[left.status] - statusRank[right.status]);
}

export function exclusionBoard() {
  return [...exclusions].sort((left, right) => exclusionRank[left.status] - exclusionRank[right.status]);
}

export function releaseBoard() {
  return [...releaseLanes];
}

export function summary(): Summary {
  const manifestCount = manifests.length;
  const blockedCount = manifests.filter((item) => item.status === "blocked").length;
  const expiringCount = exclusions.filter((item) => item.status !== "remove").length;
  const releaseReadyCount = manifests.filter((item) => item.status === "release-ready").length;
  const averageFreshnessDays = Math.round(
    manifests.reduce((total, item) => total + item.lastUpdatedDays, 0) / manifestCount,
  );

  return {
    manifestCount,
    blockedCount,
    expiringCount,
    releaseReadyCount,
    averageFreshnessDays,
    leadRecommendation:
      "Keep campaign and pricing surfaces behind review until the manifest evidence windows catch up with the public claims.",
  };
}

export function payload() {
  return {
    summary: summary(),
    manifests: manifestBoard(),
    exclusions: exclusionBoard(),
    releases: releaseBoard(),
  };
}
