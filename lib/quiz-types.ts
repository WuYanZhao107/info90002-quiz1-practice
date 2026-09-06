export type WeekNumber = 1 | 2 | 3 | 4;

export type ChoiceQuestion = {
  id: string;
  week: WeekNumber;
  topic: string;
  kind: 'single' | 'multiple';
  stem: string;
  options: readonly string[];
  correct: readonly number[];
};

export type ShortQuestion = {
  id: string;
  week: WeekNumber;
  topic: string;
  prompt: string;
  answer: string;
};

export const single = (
  id: string,
  week: WeekNumber,
  topic: string,
  stem: string,
  correct: number,
  options: readonly string[],
): ChoiceQuestion => ({ id, week, topic, kind: 'single', stem, options, correct: [correct] });

export const multiple = (
  id: string,
  week: WeekNumber,
  topic: string,
  stem: string,
  correct: readonly number[],
  options: readonly string[],
): ChoiceQuestion => ({ id, week, topic, kind: 'multiple', stem, options, correct });

export const short = (
  id: string,
  week: WeekNumber,
  topic: string,
  prompt: string,
  answer: string,
): ShortQuestion => ({ id, week, topic, prompt, answer });
