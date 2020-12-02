import { p2015day4_part1 } from '.';
import { part1Tests } from './testCases';

describe('2015 Day 4', () => {
  describe('Part 1 Solution', () => {
    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2015day4_part1(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
