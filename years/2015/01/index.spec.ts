import { p2015day1_part1, p2015day1_part2 } from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2015 Day 1', () => {
  describe('Part 1 Solution', () => {
    part1Tests.forEach((testCase, i) => {
      it(`${testCase.description || 'Test case ' + i}`, async () => {
        const actual = String(await p2015day1_part1(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });

  describe('Part 2 Solution', () => {
    part2Tests.forEach((testCase, i) => {
      it(`${testCase.description || 'Test case ' + i}`, async () => {
        const actual = String(await p2015day1_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
