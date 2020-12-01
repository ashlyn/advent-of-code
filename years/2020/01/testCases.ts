export const part1Tests: TestCase[] = [
  {
    description: 'Standard',
    input: '1023\n948\n539\n1072',
    expected: '1016256',
  },
  {
    description: 'Does not use same input twice',
    input: '1010\n1023\n948\n539\n1072',
    expected: '1016256',
  },
  {
    description: 'Handles duplicates',
    input: '1010\n1023\n1010',
    expected: '1020100',
  },
  {
    description: 'No solution found',
    input: '1\n2',
    expected: 'undefined',
  },
  {
    description: 'Input includes non-numbers',
    input: '1\na\n948\n1072',
    expected: '1016256',
  },
];

export const part2Tests: TestCase[] = [
  {
    description: 'Standard',
    input: '1023\n948\n539\n375\n321\n697',
    expected: '247783500',
  },
  {
    description: 'Does not use same input twice',
    input: '753\n1010\n505',
    expected: 'undefined',
  },
  {
    description: 'Handles duplicates',
    input: '505\n1010\n505',
    expected: '257575250',
  },
  {
    description: 'No solution found',
    input: '1\n2',
    expected: 'undefined',
  },
  {
    description: 'Input includes non-numbers',
    input: '1023\n948\n539\nabc\n375\n321\n697',
    expected: '247783500',
  },
];
