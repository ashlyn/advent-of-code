export const part1Tests: TestCase[] = [
  {
    description: 'AoC Input',
    input:
      'class: 1-3 or 5-7\nrow: 6-11 or 33-44\nseat: 13-40 or 45-50\n\nyour ticket:\n7,1,14\n\nnearby tickets:\n7,3,47\n40,4,50\n55,2,20\n38,6,12',
    expected: '71',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'AoC Input',
    input:
      'departure platform: 0-1 or 4-19\nrow: 0-5 or 8-19\ndeparture location: 0-13 or 16-19\n\nyour ticket:\n11,12,13\n\nnearby tickets:\n3,9,18\n15,1,5\n5,14,9',
    expected: '156',
  },
];
