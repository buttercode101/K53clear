/**
 * Controls coverage check.
 * Must be satisfied before Controls can leave "not enough data" in a real release.
 */
export const REQUIRED_CONTROLS = [
  "clutch", "footbrake", "handbrake", "accelerator", "gear-lever",
  "steering", "indicators", "mirrors", "lights", "wipers",
  "horn", "ignition", "gauges", "seatbelt", "demister"
];

export function checkControlsCoverage(families) {
  const covered = new Set();
  families.filter(f => f.section === 'controls').forEach(f => {
    REQUIRED_CONTROLS.forEach(c => {
      if (f.rule.toLowerCase().includes(c) || f.familyId.includes(c)) covered.add(c);
    });
  });
  const missing = REQUIRED_CONTROLS.filter(c => !covered.has(c));
  return { covered: [...covered], missing, complete: missing.length === 0 };
}
