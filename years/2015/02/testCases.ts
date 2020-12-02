export const part1Tests: TestCase[] = [
  {
    description: 'Distinct dimensions',
    input: '2x3x4',
    expected: '58',
  },
  {
    description: 'Similar dimensions',
    input: '1x1x10',
    expected: '43',
  },
  {
    description: 'Multiple presents',
    input: '2x3x4\n1x1x10',
    expected: '101',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'Distinct dimensions',
    input: '2x3x4',
    expected: '34',
  },
  {
    description: 'Similar dimensions',
    input: '1x1x10',
    expected: '14',
  },
  {
    description: 'Multiple presents',
    input: '2x3x4\n1x1x10',
    expected: '48',
  },
];
