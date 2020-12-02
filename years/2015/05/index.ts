import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2015;
const DAY = 5;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/05/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/05/data.txt
// problem url : https://adventofcode.com/2015/day/5

const hasAtLeastThreeVowelsPattern = /[a-z]*[aeiou]{1}[a-z]*[aeiou]{1}[a-z]*[aeiou]{1}[a-z]*/;
const repeatedLetterPattern = /[a-z]*([a-z])\1[a-z]*/;
const containsInvalidSubstringPattern = /[a-z]*(ab|cd|pq|xy)[a-z]*/;

const repeatedPairPattern = /[a-z]*([a-z][a-z])[a-z]*\1[a-z]*/;
const repeatWithOneBetweenPattern = /[a-z]*([a-z])[a-z]\1[a-z]*/;

const isNiceForPart1 = (word: string): boolean => {
  return (
    hasAtLeastThreeVowelsPattern.test(word) &&
    repeatedLetterPattern.test(word) &&
    !containsInvalidSubstringPattern.test(word)
  );
};

const isNiceForPart2 = (word: string): boolean => {
  return repeatedPairPattern.test(word) && repeatWithOneBetweenPattern.test(word);
};

export async function p2015day5_part1(input: string): Promise<number> {
  return input.trim().split('\n').filter(isNiceForPart1).length;
}

export async function p2015day5_part2(input: string): Promise<number> {
  return input.trim().split('\n').filter(isNiceForPart2).length;
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2015day5_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2015day5_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2015day5_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2015day5_part2(input));
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
