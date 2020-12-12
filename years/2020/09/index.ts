import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 9;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/09/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/09/data.txt
// problem url : https://adventofcode.com/2020/day/9

const containsSum = (input: number[], sum: number): boolean => {
  return input.some(num1 => input.find(num2 => num2 === sum - num1));
};

const findRangeWithSum = (input: number[], sum: number): number[] => {
  let start = 0;
  let end = 0;

  while (start < input.length) {
    while (end !== input.length && input[start] < sum && input[end] < sum) {
      const range = input.slice(start, end + 1);
      const rangeSum = range.reduce((a, b) => a + b, 0);
      if (rangeSum === sum) return range;
      if (rangeSum > sum) break;
      ++end;
    }
    ++start;
    end = start;
  }
  return [];
};

const findRangeWithSumRecursive = (input: number[], sum: number, range: number[] = []): number[] => {
  const rangeSum = range.reduce((a, b) => a + b, 0);
  if (rangeSum === sum) return range;
  if (rangeSum > sum || range.length === input.length || !input.length || input[0] > sum) return [];

  const sumWithCurrentStart = findRangeWithSumRecursive(input, sum, [...range, input[range.length]]);
  if (sumWithCurrentStart.length) return sumWithCurrentStart;

  const sumWithNextStart = findRangeWithSumRecursive(input.slice(1), sum, []);
  if (sumWithNextStart.length) return sumWithNextStart;
  return [];
};

const findFirstInvalidNumber = (input: number[], preambleLength: number): number | undefined => {
  const sums = input.slice(preambleLength);
  return sums.find((value, index) => !containsSum(input.slice(index, index + preambleLength), value));
};

export async function p2020day9_part1(input: string, preambleLength = 25): Promise<number | undefined> {
  const numbers = input.split('\n').map(i => parseInt(i));
  return findFirstInvalidNumber(numbers, preambleLength);
}

export async function p2020day9_part2(input: string, preambleLength = 25): Promise<number | undefined> {
  const numbers = input.split('\n').map(i => parseInt(i));
  const target = findFirstInvalidNumber(numbers, preambleLength);
  if (!target) return;
  const rangeWithSum = findRangeWithSum(numbers, target);
  return Math.max(...rangeWithSum) + Math.min(...rangeWithSum);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day9_part1(testCase.input, 5)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day9_part2(testCase.input, 5)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day9_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day9_part2(input));
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
