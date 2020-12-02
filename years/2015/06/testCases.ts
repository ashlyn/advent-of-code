export const part1Tests: TestCase[] = [
  {
    description: 'All lights',
    input: 'turn on 0,0 through 999,999',
    expected: '1000000',
  },
  {
    description: 'Single row',
    input: 'toggle 0,0 through 999,0',
    expected: '1000',
  },
  {
    description: 'No-op',
    input: 'turn off 499,499 through 500,500',
    expected: '0',
  },
  {
    description: 'Multiple instructions',
    input: 'turn on 0,0 through 999,999\ntoggle 0,0 through 999,0\nturn off 499,499 through 500,500',
    expected: '998996',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'Single light',
    input: 'turn on 0,0 through 0,0',
    expected: '1',
  },
  {
    description: 'All lights',
    input: 'toggle 0,0 through 999,999',
    expected: '2000000',
  },
];
