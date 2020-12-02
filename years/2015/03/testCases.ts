export const part1Tests: TestCase[] = [
  {
    description: 'Single instruction',
    input: '>',
    expected: '2',
  },
  {
    description: 'Multiple instructions',
    input: '^>v<',
    expected: '4',
  },
  {
    description: 'Back and forth',
    input: '^v^v^v^v^v',
    expected: '2',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'Single instruction per Santa',
    input: '^v',
    expected: '3',
  },
  {
    description: 'Multiple instructions per Santa',
    input: '^>v<',
    expected: '3',
  },
  {
    description: 'Unidirectional Santas',
    input: '^v^v^v^v^v',
    expected: '11',
  },
];
