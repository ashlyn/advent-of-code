export const part1Tests: TestCase[] = [
  {
    input: '(())',
    expected: '0',
  },
  {
    input: '()()',
    expected: '0',
  },
  {
    input: '(((',
    expected: '3',
  },
  {
    input: '(()(()(',
    expected: '3',
  },
  {
    input: '))(((((',
    expected: '3',
  },
  {
    input: '())',
    expected: '-1',
  },
  {
    input: '))(',
    expected: '-1',
  },
  {
    input: ')))',
    expected: '-3',
  },
  {
    input: ')())())',
    expected: '-3',
  },
];
export const part2Tests: TestCase[] = [
  {
    input: ')',
    expected: '1',
  },
  {
    input: '()())',
    expected: '5',
  },
];
