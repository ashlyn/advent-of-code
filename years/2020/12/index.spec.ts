import { p2020day12_part1, p2020day12_part2 } from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2020 Day 12', () => {
  describe('Part 1 Solution', () => {
    it('has a test case so Jest works as expected', () => {
      expect(true).toEqual(true);
    });

    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day12_part1(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });

  describe('Part 2 Solution', () => {
    it('has a test case so Jest works as expected', () => {
      expect(true).toEqual(true);
    });

    part2Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day12_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
