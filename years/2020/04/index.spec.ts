import {
  isValidBirthYear,
  isValidExpirationYear,
  isValidEyeColor,
  isValidHairColor,
  isValidHeight,
  isValidIssueYear,
  isValidPassportId,
  p2020day4_part1,
  p2020day4_part2,
} from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2020 Day 4', () => {
  describe('isValidBirthYear', () => {
    it('Returns false for empty string', () => {
      expect(isValidBirthYear('')).toEqual(false);
    });

    it('Returns false for non-numerical input', () => {
      expect(isValidBirthYear('abc')).toEqual(false);
    });

    it('Returns false for negative number', () => {
      expect(isValidBirthYear('-1920')).toEqual(false);
    });

    it('Returns false for year before 1920', () => {
      expect(isValidBirthYear('1919')).toEqual(false);
    });

    it('Returns false for year after 2002', () => {
      expect(isValidBirthYear('2003')).toEqual(false);
    });

    it('Returns true for exactly 1920', () => {
      expect(isValidBirthYear('1920')).toEqual(true);
    });

    it('Returns true for exactly 2002', () => {
      expect(isValidBirthYear('2002')).toEqual(true);
    });

    it('Returns true for year between 1920 and 2002', () => {
      expect(isValidBirthYear('1950')).toEqual(true);
    });
  });

  describe('isValidIssueYear', () => {
    it('Returns false for empty string', () => {
      expect(isValidIssueYear('')).toEqual(false);
    });

    it('Returns false for non-numerical input', () => {
      expect(isValidIssueYear('abc')).toEqual(false);
    });

    it('Returns false for negative number', () => {
      expect(isValidIssueYear('-2010')).toEqual(false);
    });

    it('Returns false for year before 2010', () => {
      expect(isValidIssueYear('2009')).toEqual(false);
    });

    it('Returns false for year after 2020', () => {
      expect(isValidIssueYear('2021')).toEqual(false);
    });

    it('Returns true for exactly 2010', () => {
      expect(isValidIssueYear('2010')).toEqual(true);
    });

    it('Returns true for exactly 2020', () => {
      expect(isValidIssueYear('2020')).toEqual(true);
    });

    it('Returns true for year between 2010 and 2020', () => {
      expect(isValidIssueYear('2015')).toEqual(true);
    });
  });

  describe('isValidExpirationYear', () => {
    it('Returns false for empty string', () => {
      expect(isValidExpirationYear('')).toEqual(false);
    });

    it('Returns false for non-numerical input', () => {
      expect(isValidExpirationYear('abc')).toEqual(false);
    });

    it('Returns false for negative number', () => {
      expect(isValidExpirationYear('-2020')).toEqual(false);
    });

    it('Returns false for year before 2020', () => {
      expect(isValidExpirationYear('2019')).toEqual(false);
    });

    it('Returns false for year after 2030', () => {
      expect(isValidExpirationYear('2031')).toEqual(false);
    });

    it('Returns true for exactly 2020', () => {
      expect(isValidExpirationYear('2020')).toEqual(true);
    });

    it('Returns true for exactly 2030', () => {
      expect(isValidExpirationYear('2030')).toEqual(true);
    });

    it('Returns true for year between 2020 and 2030', () => {
      expect(isValidExpirationYear('2025')).toEqual(true);
    });
  });

  describe('isValidHeight', () => {
    it('Returns false for anything that does not end in cm or in', () => {
      expect(isValidHeight('150')).toEqual(false);
    });

    it('Returns false for non-numerical cm input', () => {
      expect(isValidHeight('abccm')).toEqual(false);
    });

    it('Returns false for negative cm input', () => {
      expect(isValidHeight('-150cm')).toEqual(false);
    });

    it('Returns false for cm input less than 150', () => {
      expect(isValidHeight('149cm')).toEqual(false);
    });

    it('Returns false for cm input greater than 194', () => {
      expect(isValidHeight('194cm')).toEqual(false);
    });

    it('Returns true for cm input exactly 150', () => {
      expect(isValidHeight('150cm')).toEqual(true);
    });

    it('Returns true for cm input exactly 193', () => {
      expect(isValidHeight('193cm')).toEqual(true);
    });

    it('Returns true for cm input between 150 and 193', () => {
      expect(isValidHeight('175cm')).toEqual(true);
    });

    it('Returns false for non-numerical in input', () => {
      expect(isValidHeight('abcin')).toEqual(false);
    });

    it('Returns false for negative in input', () => {
      expect(isValidHeight('-59in')).toEqual(false);
    });

    it('Returns false for in input less than 59', () => {
      expect(isValidHeight('58in')).toEqual(false);
    });

    it('Returns false for in input greater than 76', () => {
      expect(isValidHeight('77in')).toEqual(false);
    });

    it('Returns true for in input exactly 59', () => {
      expect(isValidHeight('59in')).toEqual(true);
    });

    it('Returns true for in input exactly 76', () => {
      expect(isValidHeight('76in')).toEqual(true);
    });

    it('Returns true for in input between 59 and 76', () => {
      expect(isValidHeight('65in')).toEqual(true);
    });
  });

  describe('isValidHairColor', () => {
    it('Returns false for empty string', () => {
      expect(isValidHairColor('')).toEqual(false);
    });

    it('Returns false for anything that does not start with #', () => {
      expect(isValidHairColor('abc123')).toEqual(false);
    });

    it('Returns false for non-hex inputs', () => {
      expect(isValidHairColor('#ghijkl')).toEqual(false);
    });

    it('Returns false for hex inputs with fewer than 6 digits', () => {
      expect(isValidHairColor('#abc12')).toEqual(false);
    });

    it('Returns false for hex inputs with more than 6 digits', () => {
      expect(isValidHairColor('#abc1234')).toEqual(false);
    });

    it('Returns true for hex inputs with 6 digits', () => {
      expect(isValidHairColor('#abc123')).toEqual(true);
    });
  });

  describe('isValidEyeColor', () => {
    it('Returns false for empty string', () => {
      expect(isValidEyeColor('')).toEqual(false);
    });

    it('Returns false for invalid eye color', () => {
      expect(isValidEyeColor('ylw')).toEqual(false);
    });

    it('Returns true for amb', () => {
      expect(isValidEyeColor('amb')).toEqual(true);
    });

    it('Returns true for blu', () => {
      expect(isValidEyeColor('blu')).toEqual(true);
    });

    it('Returns true for brn', () => {
      expect(isValidEyeColor('brn')).toEqual(true);
    });

    it('Returns true for gry', () => {
      expect(isValidEyeColor('gry')).toEqual(true);
    });

    it('Returns true for grn', () => {
      expect(isValidEyeColor('grn')).toEqual(true);
    });

    it('Returns true for hzl', () => {
      expect(isValidEyeColor('hzl')).toEqual(true);
    });

    it('Returns true for oth', () => {
      expect(isValidEyeColor('oth')).toEqual(true);
    });
  });

  describe('isValidPassportId', () => {
    it('Returns false for empty string', () => {
      expect(isValidPassportId('')).toEqual(false);
    });

    it('Returns false for non-numerical input', () => {
      expect(isValidPassportId('abcdefghi')).toEqual(false);
    });

    it('Returns false for strings starting with non-numbers', () => {
      expect(isValidPassportId('abc123456')).toEqual(false);
    });

    it('Returns false for strings ending with non-digits', () => {
      expect(isValidPassportId('123456abc')).toEqual(false);
    });

    it('Returns false for strings with non-digits in the middle', () => {
      expect(isValidPassportId('123abc456')).toEqual(false);
    });

    it('Returns false for strings with fewer than 9 digits', () => {
      expect(isValidPassportId('12345678')).toEqual(false);
    });

    it('Returns false for strings with more than 9 digits', () => {
      expect(isValidPassportId('1234567890')).toEqual(false);
    });

    it('Returns true for strings with exactly 9 digits', () => {
      expect(isValidPassportId('123456789')).toEqual(true);
    });
  });

  describe('Part 1 Solution', () => {
    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day4_part1(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });

  describe('Part 2 Solution', () => {
    part2Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day4_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
