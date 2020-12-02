export const part1Tests: TestCase[] = [
  {
    description: 'All criteria',
    input: 'ugknbfddgicrmopn',
    expected: '1',
  },
  {
    description: 'Three vowels',
    input: 'aaa',
    expected: '1',
  },
  {
    description: 'No double letters',
    input: 'jchzalrnumimnmhp',
    expected: '0',
  },
  {
    description: 'Disallowed',
    input: 'haegwjzuvuyypxyu',
    expected: '0',
  },
  {
    description: 'Single vowel',
    input: 'dvszwmarrgswjxmb',
    expected: '0',
  },
  {
    description: 'All test cases',
    input: 'jchzalrnumimnmhp\naaa\ndvszwmarrgswjxmb\nhaegwjzuvuyypxyu\nugknbfddgicrmopn',
    expected: '2',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'Three vowels',
    input: 'qjhvhtzxzqqjkmpb',
    expected: '1',
  },
  {
    description: 'With overlap',
    input: 'xxyxx',
    expected: '1',
  },
  {
    description: 'No repeat with one between',
    input: 'uurcxstgmygtbstg',
    expected: '0',
  },
  {
    description: 'No double pair',
    input: 'ieodomkazucvgmuy',
    expected: '0',
  },
  {
    description: 'All test cases',
    input: 'uurcxstgmygtbstg\nqjhvhtzxzqqjkmpb\nxxyxx\nieodomkazucvgmuy',
    expected: '2',
  },
];
