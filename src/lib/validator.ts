import { InterferenceRule, InterferenceTag } from '@/types/curriculum';

export interface ValidationResult {
  isCorrect: boolean;
  isDiacriticWarning: boolean;
  matchedAnswer?: string;
  diacriticFeedbackRu?: string;
  interferenceTriggered?: {
    tag: InterferenceTag;
    feedbackRu: string;
  };
}

const POLISH_DIACRITIC_MAP: Record<string, string> = {
  ą: 'a',
  ć: 'c',
  ę: 'e',
  ł: 'l',
  ń: 'n',
  ó: 'o',
  ś: 's',
  ź: 'z',
  ż: 'z',
};

export function normalizeText(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:—\-()"«»]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stripPolishDiacritics(input: string): string {
  return input.replace(/[ąćęłńóśźż]/g, (ch) => POLISH_DIACRITIC_MAP[ch] ?? ch);
}

/**
 * Извлекает канонические варианты написания словарного слова для режима правописания и аудиодиктанта.
 * Например:
 * - "pracować (pracuję, pracuje)" -> ["pracować", "pracować (pracuję, pracuje)"]
 * - "Białorusin / Białorusinka" -> ["Białorusin", "Białorusinka", "Białorusin / Białorusinka"]
 */
export function extractSpellingTargets(plField: string): string[] {
  const targets = new Set<string>();
  const trimmed = plField.trim();
  if (!trimmed) return [];

  // Убираем грамматические пометки в скобках: "pracować (pracuję, pracuje)" -> "pracować"
  const withoutParens = trimmed.replace(/\s*\([^)]*\)/g, '').trim();
  if (withoutParens) {
    targets.add(withoutParens);
    // Если есть варианты через слэш: "Białorusin / Białorusinka" -> можно ввести любое из двух или оба
    if (withoutParens.includes('/')) {
      for (const part of withoutParens.split('/')) {
        const cleanPart = part.trim();
        if (cleanPart) targets.add(cleanPart);
      }
    }
  }
  targets.add(trimmed);
  return Array.from(targets);
}

/**
 * Проверяет ответ пользователя на польском языке:
 * 1. Exact Match (без учёта регистра и пунктуации) -> зачёт без предупреждений.
 * 2. Diacritic Mismatch (совпадает после замены ą->a, ł->l и т.д.) -> зачёт (на A0/A1) с мягким предупреждением.
 * 3. Interference Match -> если неверно, проверяет регулярные выражения типичных ошибок белоруса/русскоязычного.
 */
export function validatePolishAnswer(
  userInput: string,
  acceptedAnswers: string[],
  interferenceRules?: InterferenceRule[],
  strictDiacritics = false
): ValidationResult {
  const normUser = normalizeText(userInput);

  if (!normUser) {
    return { isCorrect: false, isDiacriticWarning: false };
  }

  // 1. Точное совпадение с учётом польской диакритики
  for (const ans of acceptedAnswers) {
    if (normalizeText(ans) === normUser) {
      return {
        isCorrect: true,
        isDiacriticWarning: false,
        matchedAnswer: ans,
      };
    }
  }

  // 2. Совпадение без диакритики (например, "Nazywam sie Pawel" вместо "Nazywam się Paweł")
  const strippedUser = stripPolishDiacritics(normUser);
  for (const ans of acceptedAnswers) {
    const normAns = normalizeText(ans);
    if (stripPolishDiacritics(normAns) === strippedUser) {
      if (strictDiacritics) {
        return {
          isCorrect: false,
          isDiacriticWarning: true,
          matchedAnswer: ans,
          diacriticFeedbackRu: `В режиме экзамена диакритика обязательна! Правильное написание: «${ans}».`,
        };
      }
      return {
        isCorrect: true,
        isDiacriticWarning: true,
        matchedAnswer: ans,
        diacriticFeedbackRu: `Ответ верный, но обратите внимание на польские буквы с диакритикой: «${ans}».`,
      };
    }
  }

  // 3. Проверка на типичные ошибки восточнославянской интерференции
  if (interferenceRules && interferenceRules.length > 0) {
    for (const rule of interferenceRules) {
      const regex = new RegExp(rule.patternRegex, 'i');
      if (regex.test(normUser)) {
        return {
          isCorrect: false,
          isDiacriticWarning: false,
          interferenceTriggered: {
            tag: rule.tag,
            feedbackRu: rule.feedbackRu,
          },
        };
      }
    }
  }

  return {
    isCorrect: false,
    isDiacriticWarning: false,
  };
}
