import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 4;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/04/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/04/data.txt
// problem url : https://adventofcode.com/2020/day/4

export const isValidBirthYear = (str: string): boolean => {
  const year = parseInt(str);
  return year >= 1920 && year <= 2002;
};

export const isValidIssueYear = (str: string): boolean => {
  const year = parseInt(str);
  return year >= 2010 && year <= 2020;
};

export const isValidExpirationYear = (str: string): boolean => {
  const year = parseInt(str);
  return year >= 2020 && year <= 2030;
};

export const isValidHeight = (str: string): boolean => {
  const height = [...(/^([0-9]+)(cm|in)$/.exec(str) || [])];
  if (!height.length) return false;

  if (height[2] === 'cm') {
    const heightCm = parseInt(height[1]);
    return heightCm >= 150 && heightCm <= 193;
  }
  if (height[2] === 'in') {
    const heightIn = parseInt(height[1]);
    return heightIn >= 59 && heightIn <= 76;
  }
  return false;
};

export const isValidHairColor = (str: string): boolean => {
  if (!str.startsWith('#')) return false;
  const hexStr = str.substring(1);
  return hexStr.length === 6 && !Number.isNaN(parseInt(hexStr, 16));
};

export const isValidEyeColor = (str: string): boolean => {
  const allowedEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  return allowedEyeColors.includes(str);
};

export const isValidPassportId = (str: string): boolean => /^[0-9]{9}$/.test(str);

const passportRequiredFieldValidators = {
  byr: isValidBirthYear,
  iyr: isValidIssueYear,
  eyr: isValidExpirationYear,
  hgt: isValidHeight,
  hcl: isValidHairColor,
  ecl: isValidEyeColor,
  pid: isValidPassportId,
};

const isValidPassport = (passport: string[][], validateValues = true): boolean => {
  return Object.entries(passportRequiredFieldValidators).every(
    ([field, validator]) =>
      passport.findIndex(([key, value]) => key === field && (validateValues ? validator(value) : true)) > -1
  );
};

const parseIntoPassportPairs = (input: string): string[][][] => {
  return input.split('\n\n').map(str => str.split(/\s/g).map(kvp => kvp.split(':')));
};

export async function p2020day4_part1(input: string): Promise<number> {
  const passportPairs = parseIntoPassportPairs(input);
  return passportPairs.filter(p => isValidPassport(p, false)).length;
}

export async function p2020day4_part2(input: string): Promise<number> {
  const passportPairs = parseIntoPassportPairs(input);
  return passportPairs.filter(p => isValidPassport(p)).length;
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day4_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day4_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day4_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day4_part2(input));
  const part2After = performance.now();

  logSolution(DAY, YEAR, part1Solution, part2Solution);

  log(chalk.gray('--- Performance ---'));
  log(chalk.gray(`Part 1: ${util.msToString(part1After - part1Before)}`));
  log(chalk.gray(`Part 2: ${util.msToString(part2After - part2Before)}`));
  log();
}

export default (): void => {
  run()
    .then(() => {
      process.exit();
    })
    .catch(error => {
      throw error;
    });
};
