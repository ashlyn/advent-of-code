export const part1Tests: TestCase[] = [
  {
    description: 'AoC Input',
    input: 'FBFBBFFRLR',
    expected: '357',
  },
  {
    description: 'AoC Input 2',
    input: 'BFFFBBFRRR',
    expected: '567',
  },
  {
    description: 'AoC Input 3',
    input: 'FFFBBBFRRR',
    expected: '119',
  },
  {
    description: 'AoC Input 4',
    input: 'BBFFBBFRLL',
    expected: '820',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'Partial case',
    input: 'FFFBBBFRRR\nFBFBBFFRLR',
    expected: '120',
  },
];
