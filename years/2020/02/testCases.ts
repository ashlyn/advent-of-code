export const part1Tests: TestCase[] = [
  {
    description: 'Valid no repeats',
    input: '1-3 a: abcde',
    expected: '1',
  },
  {
    description: 'Invalid no repeats',
    input: '1-3 b: cdefg',
    expected: '0',
  },
  {
    description: 'Valid with repeats',
    input: '2-9 c: ccccccccc',
    expected: '1',
  },
  {
    description: 'All inputs',
    input: '1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc',
    expected: '2',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'Valid no repeats',
    input: '1-3 a: abcde',
    expected: '1',
  },
  {
    description: 'Invalid no repeats',
    input: '1-3 b: cdefg',
    expected: '0',
  },
  {
    description: 'Valid with repeats',
    input: '2-9 c: ccccccccc',
    expected: '0',
  },
  {
    description: 'All inputs',
    input: '1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc',
    expected: '1',
  },
];
