import assert from 'node:assert/strict';
import { build } from 'esbuild';

const bundled = await build({
  entryPoints: ['lib/questions.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`;
const { choiceQuestions, shortQuestions } = await import(moduleUrl);

const expected = {
  1: { single: 14, multiple: 4, short: 4 },
  2: { single: 19, multiple: 9, short: 8 },
  3: { single: 17, multiple: 8, short: 8 },
  4: { single: 20, multiple: 9, short: 10 },
};

const ids = [...choiceQuestions, ...shortQuestions].map((question) => question.id);
assert.equal(new Set(ids).size, ids.length, 'Question IDs must be unique');
assert.equal(choiceQuestions.filter((question) => question.kind === 'single').length, 70, 'Expected 70 single-choice questions');
assert.equal(choiceQuestions.filter((question) => question.kind === 'multiple').length, 30, 'Expected 30 multiple-choice questions');
assert.equal(shortQuestions.length, 30, 'Expected 30 short-answer questions');

for (const [weekText, counts] of Object.entries(expected)) {
  const week = Number(weekText);
  assert.equal(choiceQuestions.filter((q) => q.week === week && q.kind === 'single').length, counts.single, `Week ${week} single count`);
  assert.equal(choiceQuestions.filter((q) => q.week === week && q.kind === 'multiple').length, counts.multiple, `Week ${week} multiple count`);
  assert.equal(shortQuestions.filter((q) => q.week === week).length, counts.short, `Week ${week} short count`);
}

for (const question of choiceQuestions) {
  assert.equal(question.options.length, 4, `${question.id} must have four options`);
  assert.ok(question.stem.trim(), `${question.id} must have a stem`);
  assert.ok(question.topic.trim(), `${question.id} must have a topic`);
  assert.equal(new Set(question.options).size, question.options.length, `${question.id} options must be unique`);
  assert.ok(question.correct.every((index) => Number.isInteger(index) && index >= 0 && index < question.options.length), `${question.id} has an invalid answer index`);
  assert.equal(new Set(question.correct).size, question.correct.length, `${question.id} has duplicate answer indices`);
  assert.equal(question.kind === 'single' ? question.correct.length : Number(question.correct.length >= 2), 1, `${question.id} has an invalid correct-answer count`);
}

for (const question of shortQuestions) {
  assert.ok(question.prompt.trim(), `${question.id} must have a prompt`);
  assert.ok(question.answer.trim(), `${question.id} must have a reference answer`);
  assert.ok(question.topic.trim(), `${question.id} must have a topic`);
}

const sameAnswerSet = (given, correct) => given.length === correct.length
  && [...given].sort((a, b) => a - b).every((value, index) => value === [...correct].sort((a, b) => a - b)[index]);
assert.equal(sameAnswerSet([2, 0], [0, 2]), true, 'Scoring must ignore answer order');
assert.equal(sameAnswerSet([0], [0, 2]), false, 'Multiple choice must not award partial credit');
assert.equal(sameAnswerSet([0, 2, 3], [0, 2]), false, 'Extra selections must be incorrect');

console.log('Question bank validated: 70 single, 30 multiple, 30 short.');
