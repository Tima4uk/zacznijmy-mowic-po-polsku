import { describe, it, expect } from 'vitest';
import { createInitialSrsCard, scheduleNextReview, isActiveLexiconMastered } from '../srs';

describe('SRS Scheduler', () => {
  it('promotes card from recognition to production on first good review', () => {
    const initial = createInitialSrsCard('voc-a0-01', 'mod-a0-01', 1000);
    expect(initial.stage).toBe('recognition');

    const afterFirst = scheduleNextReview(initial, 'good', 2000);
    expect(afterFirst.stage).toBe('production');
    expect(afterFirst.intervalDays).toBe(1);
  });

  it('grows intervals in production stage and marks active lexicon mastery at >= 14 days', () => {
    let card = createInitialSrsCard('voc-a0-04', 'mod-a0-01', 0);
    card = scheduleNextReview(card, 'good', 1000); // -> production, 1d
    card = scheduleNextReview(card, 'good', 2000); // rep 2 -> 4d
    card = scheduleNextReview(card, 'good', 3000); // rep 3 -> 10d
    expect(isActiveLexiconMastered(card)).toBe(false);

    card = scheduleNextReview(card, 'good', 4000); // rep 4 -> 25d
    expect(card.intervalDays).toBeGreaterThanOrEqual(14);
    expect(isActiveLexiconMastered(card)).toBe(true);
  });
});
