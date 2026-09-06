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
const { choiceQuestions, shortQuestions, coverageAudit } = await import(moduleUrl);

const ids = [...choiceQuestions, ...shortQuestions].map((question) => question.id);
assert.equal(new Set(ids).size, ids.length, 'Question IDs must be unique');
assert.ok(choiceQuestions.length >= 100, 'Expected at least 100 choice questions');
assert.ok(shortQuestions.length >= 30, 'Expected at least 30 short-answer questions');
for (const week of [1, 2, 3, 4]) {
  assert.ok(choiceQuestions.some((q) => q.week === week && q.kind === 'single'), `Week ${week} needs single-choice questions`);
  assert.ok(choiceQuestions.some((q) => q.week === week && q.kind === 'multiple'), `Week ${week} needs multiple-choice questions`);
  assert.ok(shortQuestions.some((q) => q.week === week), `Week ${week} needs short-answer questions`);
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

const questionById = new Map([...choiceQuestions, ...shortQuestions].map((question) => [question.id, question]));
assert.ok(coverageAudit.length >= 30, 'Coverage audit must include every major slide-based outcome group');
for (const item of coverageAudit) {
  assert.ok(item.deck.trim() && item.slides.trim() && item.outcome.trim(), 'Coverage items need deck, slides and outcome');
  assert.ok(item.questionIds.length, `${item.deck} slides ${item.slides} has no mapped questions`);
  for (const id of item.questionIds) {
    const question = questionById.get(id);
    assert.ok(question, `Coverage item references missing question ${id}`);
    assert.equal(question.week, item.week, `${id} is mapped to the wrong week`);
  }
}

const sameAnswerSet = (given, correct) => given.length === correct.length
  && [...given].sort((a, b) => a - b).every((value, index) => value === [...correct].sort((a, b) => a - b)[index]);
assert.equal(sameAnswerSet([2, 0], [0, 2]), true, 'Scoring must ignore answer order');
assert.equal(sameAnswerSet([0], [0, 2]), false, 'Multiple choice must not award partial credit');
assert.equal(sameAnswerSet([0, 2, 3], [0, 2]), false, 'Extra selections must be incorrect');

const singleCount = choiceQuestions.filter((question) => question.kind === 'single').length;
const multipleCount = choiceQuestions.filter((question) => question.kind === 'multiple').length;
console.log(`Question bank validated: ${singleCount} single, ${multipleCount} multiple, ${shortQuestions.length} short; ${coverageAudit.length} slide-based outcome groups covered.`);
