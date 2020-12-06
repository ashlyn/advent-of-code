export const part1Tests: TestCase[] = [
  {
    description: 'Single group',
    input: 'abcx\nabcy\nabcz',
    expected: '6',
  },
  {
    description: 'Multiple groups',
    input: 'abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb',
    expected: '11',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'Single group',
    input: 'abcx\nabcy\nabcz',
    expected: '3',
  },
  {
    description: 'Multiple groups',
    input: 'abc\n\na\nb\nc\n\nab\nac\n\na\na\na\na\n\nb',
    expected: '6',
  },
];
