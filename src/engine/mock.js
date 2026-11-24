/**
 * Mock engine — draws from families, respects freshness, reports section results.
 * Does not claim readiness from a single mock.
 */
import { PASS_LINES } from './readiness.js';

export function buildMock(families, sectionCounts = { rules: 28, signs: 28, controls: 8 }) {
  const bySection = { rules: [], signs: [], controls: [] };
  families.forEach(f => {
    if (bySection[f.section]) bySection[f.section].push(f);
  });

  const selected = [];
  for (const [section, count] of Object.entries(sectionCounts)) {
    const pool = bySection[section] || [];
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, Math.min(count, shuffled.length)).map(f => ({
      familyId: f.familyId,
      section: f.section,
      variant: f.variants[Math.floor(Math.random() * f.variants.length)]
    })));
  }
  return selected;
}

export function scoreMock(answers) {
  const sections = { rules: { correct: 0, total: 0 }, signs: { correct: 0, total: 0 }, controls: { correct: 0, total: 0 } };
  answers.forEach(a => {
    if (sections[a.section]) {
      sections[a.section].total += 1;
      if (a.correct) sections[a.section].correct += 1;
    }
  });

  const results = {};
  for (const [sec, data] of Object.entries(sections)) {
    const passLine = PASS_LINES[sec];
    const ratio = data.total ? data.correct / data.total : 0;
    results[sec] = {
      ...data,
      passed: ratio >= passLine,
      ratio
    };
  }
  results.allPassed = Object.values(results).every(r => r.passed);
  return results;
}
