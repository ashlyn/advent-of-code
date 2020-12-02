import { p2020day2_part1, p2020day2_part2, isValidWithCount, isValidWithPosition, Password, parseInput } from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2020 Day 2', () => {
  describe('parseInput', () => {
    it('Does not parse instruction missing minimum', () => {
      const input = '-2 a: abcd';
      expect(parseInput(input)).toEqual([]);
    });

    it('Does not parse instruction with invalid minimum', () => {
      const input = 'a-2 a: abcd';
      expect(parseInput(input)).toEqual([]);
    });

    it('Does not parse instruction missing maximum', () => {
      const input = '1- a: abcd';
      expect(parseInput(input)).toEqual([]);
    });

    it('Does not parse instruction with invalid maximum', () => {
      const input = '1-x a: abcd';
      expect(parseInput(input)).toEqual([]);
    });

    it('Does not parse instruction with missing search character', () => {
      const input = '1-2 abcd';
      expect(parseInput(input)).toEqual([]);
    });

    it('Does not parse instruction with invalid search character', () => {
      const input = '1-2 abc: abcd';
      expect(parseInput(input)).toEqual([]);
    });

    it('Does not parse instruction with missing password', () => {
      const input = '1-2 a:';
      expect(parseInput(input)).toEqual([]);
    });

    it('Does not parse instruction with invalid password', () => {
      const input = '1-2 a: 12345';
      expect(parseInput(input)).toEqual([]);
    });

    it('Parses standard instruction', () => {
      const input = '1-2 a: abcd';
      expect(parseInput(input)).toEqual([
        {
          minimum: 1,
          maximum: 2,
          searchCharacter: 'a',
          password: 'abcd',
        },
      ]);
    });

    it('Parses instruction with two-digit numbers', () => {
      const input = '11-15 a: asdfjklqwertyuio';
      expect(parseInput(input)).toEqual([
        {
          minimum: 11,
          maximum: 15,
          searchCharacter: 'a',
          password: 'asdfjklqwertyuio',
        },
      ]);
    });

    it('Parses multiple instructions correctly', () => {
      const input = '1-2 a: abcd\n3-5 c: fdsaciw';
      expect(parseInput(input)).toEqual([
        {
          minimum: 1,
          maximum: 2,
          searchCharacter: 'a',
          password: 'abcd',
        },
        {
          minimum: 3,
          maximum: 5,
          searchCharacter: 'c',
          password: 'fdsaciw',
        },
      ]);
    });
  });

  describe('isValidWithCount', () => {
    it('Blank password is not valid', () => {
      const password: Password = {
        minimum: 1,
        maximum: 1,
        searchCharacter: 'a',
        password: '',
      };
      expect(isValidWithCount(password)).toEqual(false);
    });

    it('Exact count is valid', () => {
      const password: Password = {
        minimum: 1,
        maximum: 1,
        searchCharacter: 'a',
        password: 'bab',
      };
      expect(isValidWithCount(password)).toEqual(true);
    });

    it('Exact count with duplicate is not valid', () => {
      const password: Password = {
        minimum: 1,
        maximum: 1,
        searchCharacter: 'b',
        password: 'bab',
      };
      expect(isValidWithCount(password)).toEqual(false);
    });

    it('Minimum > Maximum is not valid', () => {
      const password: Password = {
        minimum: 2,
        maximum: 1,
        searchCharacter: 'a',
        password: 'bab',
      };
      expect(isValidWithCount(password)).toEqual(false);
    });

    it('No match found is not valid', () => {
      const password: Password = {
        minimum: 1,
        maximum: 2,
        searchCharacter: 'c',
        password: 'bab',
      };
      expect(isValidWithCount(password)).toEqual(false);
    });

    it('Exactly maximum is valid', () => {
      const password: Password = {
        minimum: 1,
        maximum: 4,
        searchCharacter: 'a',
        password: 'babababa',
      };
      expect(isValidWithCount(password)).toEqual(true);
    });
  });

  describe('isValidWithPosition', () => {
    it('Blank password is not valid', () => {
      const password: Password = {
        minimum: 1,
        maximum: 1,
        searchCharacter: 'a',
        password: '',
      };
      expect(isValidWithPosition(password)).toEqual(false);
    });

    it('No match found is not valid', () => {
      const password: Password = {
        minimum: 1,
        maximum: 1,
        searchCharacter: 'a',
        password: 'b',
      };
      expect(isValidWithPosition(password)).toEqual(false);
    });

    it('First match found is valid', () => {
      const password: Password = {
        minimum: 2,
        maximum: 4,
        searchCharacter: 'a',
        password: 'xaxxxx',
      };
      expect(isValidWithPosition(password)).toEqual(true);
    });

    it('Second match found is valid', () => {
      const password: Password = {
        minimum: 2,
        maximum: 4,
        searchCharacter: 'a',
        password: 'xxxaxx',
      };
      expect(isValidWithPosition(password)).toEqual(true);
    });

    it('Both matches found is not valid', () => {
      const password: Password = {
        minimum: 2,
        maximum: 4,
        searchCharacter: 'a',
        password: 'xaxaxx',
      };
      expect(isValidWithPosition(password)).toEqual(false);
    });

    it('Invalid max index is not valid', () => {
      const password: Password = {
        minimum: 2,
        maximum: 4,
        searchCharacter: 'a',
        password: 'xax',
      };
      expect(isValidWithPosition(password)).toEqual(false);
    });
  });

  describe('Part 1 Solution', () => {
    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day2_part1(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });

  describe('Part 2 Solution', () => {
    part2Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day2_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
