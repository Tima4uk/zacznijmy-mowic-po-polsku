import { describe, it, expect } from 'vitest';
import { validatePolishAnswer, extractSpellingTargets } from '../validator';

describe('validatePolishAnswer', () => {
  it('extracts clean spelling targets from dictionary headwords with parens or slashes', () => {
    const verbTargets = extractSpellingTargets('pracować (pracuję, pracuje)');
    expect(verbTargets).toContain('pracować');
    expect(validatePolishAnswer('pracować', verbTargets).isCorrect).toBe(true);

    const slashTargets = extractSpellingTargets('Białorusin / Białorusinka');
    expect(slashTargets).toContain('Białorusin');
    expect(slashTargets).toContain('Białorusinka');
    expect(validatePolishAnswer('Białorusin', slashTargets).isCorrect).toBe(true);
  });
  it('accepts exact match ignoring case and punctuation', () => {
    const res = validatePolishAnswer('gdzie pani mieszka, mieszkam w warszawie!', [
      'Gdzie Pani mieszka? Mieszkam w Warszawie.',
    ]);
    expect(res.isCorrect).toBe(true);
    expect(res.isDiacriticWarning).toBe(false);
  });

  it('accepts answer with missing Polish diacritics on A0/A1 but sets isDiacriticWarning', () => {
    const res = validatePolishAnswer('Nazywam sie Pawel, jestem z Bialorusi', [
      'Nazywam się Paweł, jestem z Białorusi.',
    ]);
    expect(res.isCorrect).toBe(true);
    expect(res.isDiacriticWarning).toBe(true);
    expect(res.diacriticFeedbackRu).toContain('Nazywam się Paweł');
  });

  it('rejects missing diacritics when strictDiacritics (B1/B2 Exam mode) is enabled', () => {
    const res = validatePolishAnswer(
      'Nazywam sie Pawel',
      ['Nazywam się Paweł'],
      undefined,
      true
    );
    expect(res.isCorrect).toBe(false);
    expect(res.isDiacriticWarning).toBe(true);
  });

  it('detects Belarusian/Russian polite plural interference ("wy mieszkacie")', () => {
    const res = validatePolishAnswer(
      'Gdzie wy mieszkacie?',
      ['Gdzie Pani mieszka?'],
      [
        {
          patternRegex: 'wy mieszkacie|mieszkacie',
          tag: 'ERR_POLITE_PLURAL',
          feedbackRu: 'К одной женщине обращаемся через Pani + 3-е лицо!',
        },
      ]
    );
    expect(res.isCorrect).toBe(false);
    expect(res.interferenceTriggered?.tag).toBe('ERR_POLITE_PLURAL');
  });
});
