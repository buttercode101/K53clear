# K53 Clear

Diagnostic learner’s licence preparation.  
Speed is diagnostic, never predictive. No score until the data can support it.

## Locked v2 rules (do not change without version bump)

1. **Rule families** — one rule, multiple variants. At least one variant per family must change scenario, trap distractor, or question direction.
2. **Readiness thresholds** — count unique families. Under threshold: no score, only specific misses. With range when modelled. Ready signal only after sufficient unique families + fresh mocks.
3. **Wilson interval** — 95% CI shown on every modelled score. If the interval straddles the pass line, UI says “not enough data to call this.”
4. **Reviewer disagreement log** — public, versioned. Payment for problems found, not approvals. Audit trigger on 100% approval.
5. **“I sat” kill switch** — after 500 reported outcomes, if “ready” users do not pass at a meaningfully higher rate than “not enough data” users, remove readiness labels and publish the result.

## Current status — end-to-end working

- Real quiz sessions loaded from seed rule families
- Unique-family tracking in IndexedDB (repeats do not inflate sample)
- Readiness display that updates after sessions and refuses predictive scores when data is insufficient
- Wilson interval logic with pass-line straddling check
- Mock engine and section scoring against published minima
- Swappable scheduler
- Controls coverage checker
- Service worker for offline after first load
- Share delta card
- Seed disagreement log

**Content is seed only (5 families).** Independently reviewed rule families, fluent language review, and a real reviewer panel are not included. The technical flow is complete and enforces the locked rules.

## Run locally

```bash
git clone https://github.com/buttercode101/K53clear.git
cd K53clear
python3 -m http.server 3000
```

Open http://localhost:3000

Answer questions. Unique family counts update. Readiness stays in “not enough data” until thresholds are met.
