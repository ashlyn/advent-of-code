import { lookAndSay, lookAndSayNTimes, p2015day10_part1, p2015day10_part2 } from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2015 Day 10', () => {
  describe('lookAndSay', () => {
    it('Correctly handles single character', () => {
      const input = '1';
      const expected = '11';
      expect(lookAndSay(input)).toEqual(expected);
    });

    it('Correctly handles multiples of one character', () => {
      const input = '11';
      const expected = '21';
      expect(lookAndSay(input)).toEqual(expected);
    });

    it('Correctly handles different characters', () => {
      const input = '21';
      const expected = '1211';
      expect(lookAndSay(input)).toEqual(expected);
    });

    it('Correctly handles multiple multiples', () => {
      const input = '1211';
      const expected = '111221';
      expect(lookAndSay(input)).toEqual(expected);
    });

    it('Correctly handles longer inputs', () => {
      const input = '111221';
      const expected = '312211';
      expect(lookAndSay(input)).toEqual(expected);
    });
  });

  describe('lookAndSayNTimes', () => {
    it('loops once', () => {
      const input = '1';
      const expected = '11';
      expect(lookAndSayNTimes(input, 1)).toEqual(expected);
    });

    it('loops twice', () => {
      const input = '1';
      const expected = '21';
      expect(lookAndSayNTimes(input, 2)).toEqual(expected);
    });

    it('loops three times', () => {
      const input = '1';
      const expected = '1211';
      expect(lookAndSayNTimes(input, 3)).toEqual(expected);
    });

    it('loops four times', () => {
      const input = '1';
      const expected = '111221';
      expect(lookAndSayNTimes(input, 4)).toEqual(expected);
    });

    it('loops five times', () => {
      const input = '1';
      const expected = '312211';
      expect(lookAndSayNTimes(input, 5)).toEqual(expected);
    });
  });

  describe('Part 1 Solution', () => {
    it('has a test case so Jest works as expected', () => {
      expect(true).toEqual(true);
    });

    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2015day10_part1(testCase.input));
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
        const actual = String(await p2015day10_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
