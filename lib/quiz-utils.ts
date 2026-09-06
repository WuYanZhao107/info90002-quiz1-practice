export const sameAnswerSet = (given: readonly number[] | undefined, correct: readonly number[]) => {
  if (!given || given.length !== correct.length) return false;
  const left = [...new Set(given)].sort((a, b) => a - b);
  const right = [...new Set(correct)].sort((a, b) => a - b);
  return left.length === right.length && left.every((value, index) => value === right[index]);
};

export const answeredChoice = (answer: readonly number[] | undefined) => Boolean(answer?.length);
export const answeredShort = (answer: string | undefined) => Boolean(answer?.trim());
