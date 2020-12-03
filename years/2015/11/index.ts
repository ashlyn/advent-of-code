import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';
import { p2015day1_part1 } from '../01';

const { log, logSolution } = LOGUTIL;

const YEAR = 2015;
const DAY = 11;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/11/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/11/data.txt
// problem url : https://adventofcode.com/2015/day/11

const disallowedCharacters = /[iol]/g;
const pairPattern = /(.)\1.*?((?!\1).)\2/g;

const minCharCode = 'a'.charCodeAt(0);
const maxCharCode = 'z'.charCodeAt(0) + 1;
export const incrementPassword = (password: string): string => {
  let carry = 1;
  const charCodes = [...password]
    .reverse()
    .map(letter => {
      if (!carry) return letter.charCodeAt(0);

      let newDigit = (letter.charCodeAt(0) + carry) % maxCharCode;
      if (newDigit < minCharCode) {
        newDigit += minCharCode;
        carry = 1;
      } else {
        carry = 0;
      }
      return newDigit;
    })
    .reverse();
  const newPassword = charCodes.map(c => String.fromCharCode(c)).join('');
  if (carry) return `a${newPassword}`;
  return newPassword;
};

export const hasStraight = (password: string): boolean => {
  const diffs = [...password].reduce((accumulator, currentLetter, index, pw) => {
    return `${accumulator} ${currentLetter.charCodeAt(0) - pw[index === 0 ? 0 : index - 1].charCodeAt(0)}`;
  }, '');
  return diffs.includes(' 1 1 ');
};

export const isValidPassword = (password: string): boolean => {
  const hasDisallowedCharacters = !disallowedCharacters.test(password);
  const hasStraightOfCharacters = hasStraight(password);
  const hasAtLeastTwoDistinctPairs = pairPattern.test(password);
  return hasDisallowedCharacters && hasStraightOfCharacters && hasAtLeastTwoDistinctPairs;
};

const getValidPassword = (input: string): string => {
  let password = input;
  while (!isValidPassword(password)) {
    password = incrementPassword(password);
  }
  return password;
};

let firstValidPassword: string;
export async function p2015day11_part1(input: string): Promise<string> {
  firstValidPassword = getValidPassword(input);
  return firstValidPassword;
}

export async function p2015day11_part2(input: string): Promise<string> {
  if (!firstValidPassword) await p2015day1_part1(input);
  return getValidPassword(firstValidPassword);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2015day11_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2015day11_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2015day11_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2015day11_part2(input));
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
