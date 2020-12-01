import { parseInput, findComplement, p2020day1_part1, p2020day1_part2 } from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2020 Day 1', () => {
  describe('Input parser', () => {
    it('Parses input into array of integers', () => {
      const input = '1\n02\n1234';
      expect(parseInput(input)).toStrictEqual([1, 2, 1234]);
    });

    it('Parses even if the input includes non-numbers', () => {
      const input = '1\na';
      expect(parseInput(input)).toStrictEqual([1]);
    });
  });

  describe('Find complement', () => {
    it('Finds the complement of numbers if it exists in input', () => {
      const input = [3, 2, 1];
      const result = findComplement(input, 3);
      expect(result).toEqual(2);
    });

    it('Finds complement for input including negative numbers', () => {
      const input = [8, -1, 3, 5];
      const result = findComplement(input, 4);
      expect(result).toEqual(-1);
    });

    it('Returns undefined if no complement pairs found', () => {
      const input = [3, 4, 2];
      const result = findComplement(input, 10);
      expect(result).toBeUndefined();
    });

    it('Does not find complement of itself', () => {
      const input = [1, 2];
      const result = findComplement(input, 4);
      expect(result).toBeUndefined();
    });
  });

  describe('Part 1 Solution', () => {
    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const input = parseInput(testCase.input);
        const actual = String(await p2020day1_part1(input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });

  describe('Part 2 Solution', () => {
    part2Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const input = parseInput(testCase.input);
        const actual = String(await p2020day1_part2(input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
