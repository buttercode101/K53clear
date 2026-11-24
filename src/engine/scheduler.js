/**
 * Swappable scheduler interface.
 * Default implementation is a simplified SM-2.
 * Can be replaced with FSRS later without changing callers.
 */
export function createScheduler(impl = 'sm2') {
  if (impl === 'sm2') return sm2Scheduler;
  throw new Error('Unknown scheduler');
}

const sm2Scheduler = {
  record(card, correct) {
    const c = { ...card };
    if (correct) {
      c.repetitions = (c.repetitions || 0) + 1;
      c.interval = c.repetitions === 1 ? 1 : c.repetitions === 2 ? 6 : Math.round((c.interval || 1) * (c.easeFactor || 2.5));
      c.easeFactor = Math.max(1.3, (c.easeFactor || 2.5) + 0.1);
    } else {
      c.repetitions = 0;
      c.interval = 1;
      c.easeFactor = Math.max(1.3, (c.easeFactor || 2.5) - 0.2);
    }
    const next = new Date();
    next.setDate(next.getDate() + c.interval);
    c.nextReview = next.toISOString().slice(0, 10);
    return c;
  }
};
