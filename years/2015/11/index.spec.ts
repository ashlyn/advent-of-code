import { hasStraight, incrementPassword, isValidPassword, p2015day11_part1, p2015day11_part2 } from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2015 Day 11', () => {
  describe('incrementPassword', () => {
    it('Can increment from zero (empty string)', () => {
      const input = '';
      const expected = 'a';
      expect(incrementPassword(input)).toEqual(expected);
    });

    it('Increments passwords without carry-over', () => {
      const input = 'xy';
      const expected = 'xz';
      expect(incrementPassword(input)).toEqual(expected);
    });

    it('Increments password with simple carry-over', () => {
      const input = 'xz';
      const expected = 'ya';
      expect(incrementPassword(input)).toEqual(expected);
    });

    it('Increments password with complex carry-over', () => {
      const input = 'zz';
      const expected = 'aaa';
      expect(incrementPassword(input)).toEqual(expected);
    });
  });

  describe('isValidPassword', () => {
    it('Empty string is invalid', () => {
      expect(isValidPassword('')).toEqual(false);
    });

    it('Passwords with i are invalid', () => {
      const input = 'isthmus';
      expect(isValidPassword(input)).toEqual(false);
    });

    it('Passwords with o are invalid', () => {
      const input = 'booth';
      expect(isValidPassword(input)).toEqual(false);
    });

    it('Passwords with l are invalid', () => {
      const input = 'peel';
      expect(isValidPassword(input)).toEqual(false);
    });

    it('Passwords without straight are invalid', () => {
      const input = 'aazz';
      expect(isValidPassword(input)).toEqual(false);
    });

    it('Passwords with only one pair are invalid', () => {
      const input = 'abcc';
      expect(isValidPassword(input)).toEqual(false);
    });

    it('Passwords with only same pair twice are invalid', () => {
      const input = 'abccabccab';
      expect(isValidPassword(input)).toEqual(false);
    });

    it('Passwords with all requirements are valid', () => {
      const input = 'aabcc';
      expect(isValidPassword(input)).toEqual(true);
    });

    it('Passwords with multiple requirement matches are valid', () => {
      const input = 'abccabddabefgg';
      expect(isValidPassword(input)).toEqual(true);
    });
  });

  describe('hasStraight', () => {
    it('Passwords with straight shorter than three are invalid', () => {
      const input = 'waste';
      expect(hasStraight(input)).toEqual(false);
    });

    it('Passwords with straight of length three are valid', () => {
      const input = 'studio';
      expect(hasStraight(input)).toEqual(true);
    });

    it('Passwords with straight longer than three are valid', () => {
      const input = 'zabcdy';
      expect(hasStraight(input)).toEqual(true);
    });

    it('Passwords with backwards straight are invalid', () => {
      const input = 'federate';
      expect(hasStraight(input)).toEqual(false);
    });
  });

  describe('Part 1 Solution', () => {
    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2015day11_part1(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });

  describe('Part 2 Solution', () => {
    part2Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2015day11_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
