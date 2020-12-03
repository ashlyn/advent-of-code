import { flatten, p2015day12_part1, p2015day12_part2, sumNumbers } from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2015 Day 12', () => {
  describe('flatten', () => {
    it('Flattens empty array to empty array', () => {
      const input: string[] = [];
      expect(flatten(input)).toEqual([]);
    });

    it('Flattens empty object to empty array', () => {
      const input: unknown = {};
      expect(flatten(input)).toEqual([]);
    });

    it('Flattens simple array to itself', () => {
      const input = [1, 2, 3];
      expect(flatten(input)).toEqual(input);
    });

    it('Flattens simple object to array of values', () => {
      const input = { a: 2, b: 4 };
      expect(flatten(input)).toEqual(Object.values(input));
    });

    it('Flattens nested array correctly', () => {
      const input = [[[3]]];
      expect(flatten(input)).toEqual([3]);
    });

    it('Flattens object containing array correctly', () => {
      const input = { a: [-1, 1] };
      expect(flatten(input)).toEqual([-1, 1]);
    });

    it('Flattens array containing object correctly', () => {
      const input = [-1, { a: 1 }];
      expect(flatten(input)).toEqual([-1, 1]);
    });
  });

  describe('flatten (ignoring values)', () => {
    it('Flattens empty array to empty array', () => {
      const input: string[] = [];
      expect(flatten(input, ['red'])).toEqual([]);
    });

    it('Flattens empty object to empty array', () => {
      const input: unknown = {};
      expect(flatten(input, ['red'])).toEqual([]);
    });

    it('Flattens simple array to itself', () => {
      const input = [1, 2, 3];
      expect(flatten(input, ['red'])).toEqual(input);
    });

    it('Ignores entire object with red value', () => {
      const input = [1, { c: 'red', b: 2 }, 3];
      expect(flatten(input, ['red'])).toEqual([1, 3]);
    });

    it('Ignores entire object if top-level contains red', () => {
      const input = { d: 'red', e: [1, 2, 3, 4], f: 5 };
      expect(flatten(input, ['red'])).toEqual([]);
    });

    it('Does not ignore red in arrays', () => {
      const input = [1, 'red', 5];
      expect(flatten(input, ['red'])).toEqual([1, 'red', 5]);
    });

    it('Ignores numerical values', () => {
      const input = [1, { c: 'red', b: 2 }, 3];
      expect(flatten(input, [2])).toEqual([1, 3]);
    });

    it('Ignores multiple values correctly', () => {
      const input = [1, { c: 'red', b: 2 }, 3, { d: 4, e: 'blue' }];
      expect(flatten(input, ['red', 4])).toEqual([1, 3]);
    });
  });

  describe('sumNumbers', () => {
    it('Returns 0 for empty array', () => {
      expect(sumNumbers([])).toEqual(0);
    });

    it('Ignores strings in the input', () => {
      const input = [1, 'abc'];
      expect(sumNumbers(input)).toEqual(1);
    });

    it('Ignores NaN in the input', () => {
      const input = [1, NaN, 2];
      expect(sumNumbers(input)).toEqual(3);
    });

    it('Returns 0 for only strings', () => {
      const input = ['abc', 'efg'];
      expect(sumNumbers(input)).toEqual(0);
    });
  });

  describe('Part 1 Solution', () => {
    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2015day12_part1(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });

  describe('Part 2 Solution', () => {
    part2Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2015day12_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
