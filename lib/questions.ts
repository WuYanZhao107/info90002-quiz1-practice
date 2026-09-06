import { week1Choice, week1Short } from './week1-questions';
import { week2Choice, week2Short } from './week2-questions';
import { week3Choice, week3Short } from './week3-questions';
import { week4Choice, week4Short } from './week4-questions';
import { coverageChoice, coverageShort } from './coverage-extension';
import type { WeekNumber } from './quiz-types';

export const choiceQuestions = [...week1Choice, ...week2Choice, ...week3Choice, ...week4Choice, ...coverageChoice];
export const shortQuestions = [...week1Short, ...week2Short, ...week3Short, ...week4Short, ...coverageShort];
export const LETTERS = ['A', 'B', 'C', 'D'] as const;

export const weekMeta: Record<WeekNumber, { title: string; topics: string }> = {
  1: { title: 'Database foundations', topics: 'DBMS · client-server · relations · lifecycle' },
  2: { title: 'Conceptual data modelling', topics: 'ER modelling · cardinality · weak entities · M:M' },
  3: { title: 'Keys and logical mapping', topics: 'keys · referential integrity · mapping · n-ary' },
  4: { title: 'Physical design and normalisation', topics: 'data types · FDs · anomalies · 1NF–3NF' },
};

export const weeks: WeekNumber[] = [1, 2, 3, 4];
export { coverageAudit } from './coverage-audit';
export { choiceAnalysis, findTopicGuidance, getTopicGuidance, shortAnalysis } from './question-guidance';
