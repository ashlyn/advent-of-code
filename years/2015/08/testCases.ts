export const part1Tests: TestCase[] = [
  {
    description: 'Quotes',
    input: '""',
    expected: '2',
  },
  {
    description: 'Standard input',
    input: '"abc"',
    expected: '2',
  },
  {
    description: 'Escaped quote',
    input: '"aaa\\"aaa"',
    expected: '3',
  },
  {
    description: 'Hex character',
    input: '"\\x27"',
    expected: '5',
  },
  {
    description: 'Combined input',
    input: '""\n"abc"\n"aaa\\"aaa"\n"\\x27"',
    expected: '12',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'Quotes',
    input: '""',
    expected: '4',
  },
  {
    description: 'Standard input',
    input: '"abc"',
    expected: '4',
  },
  {
    description: 'Escaped quote',
    input: '"aaa\\"aaa"',
    expected: '6',
  },
  {
    description: 'Hex character',
    input: '"\\x27"',
    expected: '5',
  },
  {
    description: 'Combined input',
    input: '""\n"abc"\n"aaa\\"aaa"\n"\\x27"',
    expected: '19',
  },
];
