import { getMaskedIndexes, p2020day14_part1, p2020day14_part2 } from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2020 Day 14', () => {
  describe('getMaskedIndexes', () => {
    it('Generates mask with two floats correctly', () => {
      const mask = '000000000000000000000000000000X1001X';
      const index = 42;
      const expected = [26, 27, 58, 59];
      const result = getMaskedIndexes(index, mask);
      expect(result).toEqual(expect.arrayContaining(expected));
    });

    it('Generates mask with three floats correctly', () => {
      const mask = '00000000000000000000000000000000X0XX';
      const index = 26;
      const expected = [16, 17, 18, 19, 24, 25, 26, 27];
      const result = getMaskedIndexes(index, mask);
      expect(result).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('Part 1 Solution', () => {
    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day14_part1(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });

  describe('Part 2 Solution', () => {
    part2Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day14_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
