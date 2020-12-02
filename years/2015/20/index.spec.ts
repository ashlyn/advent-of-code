import { p2015day20_part1, p2015day20_part2 } from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2015 Day 20', () => {
  describe('Part 1 Solution', () => {
    it('has a test case so Jest works as expected', () => {
      expect(true).toEqual(true);
    });

    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2015day20_part1(testCase.input));
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
        const actual = String(await p2015day20_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
