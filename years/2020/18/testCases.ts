export const part1Tests: TestCase[] = [
  {
    description: 'AoC Input 1',
    input: '1 + 2 * 3 + 4 * 5 + 6',
    expected: '71',
  },
  {
    description: 'AoC Input 2',
    input: '1 + (2 * 3) + (4 * (5 + 6))',
    expected: '51',
  },
  {
    description: 'AoC Input 3',
    input: '2 * 3 + (4 * 5)',
    expected: '26',
  },
  {
    description: 'AoC Input 4',
    input: '5 + (8 * 3 + 9 + 3 * 4 * 3)',
    expected: '437',
  },
  {
    description: 'AoC Input 5',
    input: '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
    expected: '12240',
  },
  {
    description: 'AoC Input 6',
    input: '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
    expected: '13632',
  },
  {
    description: 'AoC Input Combined',
    input:
      '1 + 2 * 3 + 4 * 5 + 6\n1 + (2 * 3) + (4 * (5 + 6))\n2 * 3 + (4 * 5)\n5 + (8 * 3 + 9 + 3 * 4 * 3)\n5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))\n((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
    expected: '26457',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'AoC Input 1',
    input: '1 + 2 * 3 + 4 * 5 + 6',
    expected: '231',
  },
  {
    description: 'AoC Input 2',
    input: '1 + (2 * 3) + (4 * (5 + 6))',
    expected: '51',
  },
  {
    description: 'AoC Input 3',
    input: '2 * 3 + (4 * 5)',
    expected: '46',
  },
  {
    description: 'AoC Input 4',
    input: '5 + (8 * 3 + 9 + 3 * 4 * 3)',
    expected: '1445',
  },
  {
    description: 'AoC Input 5',
    input: '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
    expected: '669060',
  },
  {
    description: 'AoC Input 6',
    input: '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
    expected: '23340',
  },
  {
    description: 'AoC Input Combined',
    input:
      '1 + 2 * 3 + 4 * 5 + 6\n1 + (2 * 3) + (4 * (5 + 6))\n2 * 3 + (4 * 5)\n5 + (8 * 3 + 9 + 3 * 4 * 3)\n5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))\n((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2',
    expected: '694173',
  },
];
