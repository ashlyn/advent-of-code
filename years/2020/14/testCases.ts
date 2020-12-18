export const part1Tests: TestCase[] = [
  {
    description: 'AoC Input',
    input: 'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X\nmem[8] = 11\nmem[7] = 101\nmem[8] = 0',
    expected: '165',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'AoC Input',
    input:
      'mask = 000000000000000000000000000000X1001X\nmem[42] = 100\nmask = 00000000000000000000000000000000X0XX\nmem[26] = 1',
    expected: '208',
  },
];
