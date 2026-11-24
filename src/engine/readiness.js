/**
 * K53 Clear — Readiness engine
 * Implements locked v2 thresholds and Wilson interval display rules.
 * Speed is diagnostic, never predictive.
 */

export function wilsonInterval(successes, n, z = 1.96) {
  if (n === 0) return { low: 0, high: 1, center: 0 };
  const p = successes / n;
  const denom = 1 + (z * z) / n;
  const center = (p + (z * z) / (2 * n)) / denom;
  const margin = (z * Math.sqrt((p * (1 - p) + (z * z) / (4 * n)) / n)) / denom;
  return {
    low: Math.max(0, center - margin),
    high: Math.min(1, center + margin),
    center
  };
}

export function getReadinessState(section, uniqueFamiliesAttempted, mocksCompleted) {
  const thresholds = {
    signs: { none: 40, modelled: 100, readyMocks: 2 },
    rules: { none: 30, modelled: 80, readyMocks: 2 },
    controls: { none: 12, modelled: 20, readyMocks: 2 }
  };
  const t = thresholds[section] || thresholds.signs;

  if (uniqueFamiliesAttempted < t.none) {
    return { state: "not-enough-data", label: "Not enough data" };
  }
  if (uniqueFamiliesAttempted < t.modelled || mocksCompleted < 1) {
    return { state: "modelled", label: "Modelled from your last mocks" };
  }
  if (uniqueFamiliesAttempted >= t.modelled && mocksCompleted >= t.readyMocks) {
    return { state: "ready-signal", label: "Modelled from your last N mocks" };
  }
  return { state: "modelled", label: "Modelled from your last mocks" };
}

export function shouldShowRange(interval, passLine) {
  return interval.low < passLine && interval.high > passLine;
}

export const PASS_LINES = {
  rules: 22 / 28,
  signs: 23 / 28,
  controls: 6 / 8
};
