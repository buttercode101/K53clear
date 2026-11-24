# K53 Clear

Diagnostic learner’s licence preparation.  
Speed is diagnostic, never predictive. No score until the data can support it.

## Locked v2 rules (do not change without version bump)

1. **Rule families** — one rule, multiple variants. At least one variant per family must change scenario, trap distractor, or question direction.
2. **Readiness thresholds** — count unique families. Under threshold: no score, only specific misses. With range when modelled. Ready signal only after sufficient unique families + fresh mocks.
3. **Wilson interval** — 95% CI shown on every modelled score. If the interval straddles the pass line, UI says “not enough data to call this.”
4. **Reviewer disagreement log** — public, versioned. Payment for problems found, not approvals. Audit trigger on 100% approval.
5. **“I sat” kill switch** — after 500 reported outcomes, if “ready” users do not pass at a meaningfully higher rate than “not enough data” users, remove readiness labels and publish the result.

## Current status

This repository contains the technical system that enforces the locked rules:

- Readiness engine with Wilson intervals and threshold states
- Unique-family counting via IndexedDB
- Mock engine that draws from families and scores by section minima
- Swappable scheduler interface (SM-2 default)
- Controls coverage checker
- Seed content and seed disagreement log
- UI that refuses to show a predictive score when data is insufficient

**Content is seed only.** Independently reviewed rule families, fluent language review, and a real reviewer panel are not included. Those are the product; this is the enforcement layer.

## Run locally

```bash
python3 -m http.server 3000
```

Open http://localhost:3000

## Next

Author verified rule families under the schema in `data/families/`.  
Wire the disagreement log.  
Add the 64Q mock that draws from families with freshness constraints.
