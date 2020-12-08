export const part1Tests: TestCase[] = [
  {
    description: 'AoC Input',
    input: 'nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6',
    expected: '5',
  },
  {
    description: 'AoC Input (de-corrupted)',
    input: 'nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\nnop -4\nacc +6',
    expected: '8',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'AoC Input',
    input: 'nop +0\nacc +1\njmp +4\nacc +3\njmp -3\nacc -99\nacc +1\njmp -4\nacc +6',
    expected: '8',
  },
];
