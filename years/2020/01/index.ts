import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 1;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

const TARGET = 2020;

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/01/index.ts
// data path    : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/01/data.txt
// problem url  : https://adventofcode.com/2020/day/1

export const parseInput = (input: string): Array<number> => {
  return input
    .split('\n')
    .map(i => parseInt(i))
    .filter(i => !isNaN(i));
};

export const findComplement = (input: Array<number>, target: number): number | undefined => {
  return input.find((element, index, array) => {
    const complementIndex = array.indexOf(target - element);
    return complementIndex > -1 && complementIndex != index;
  });
};

export async function p2020day1_part1(input: Array<number>): Promise<number | undefined> {
  const value1 = findComplement(input, TARGET);
  if (value1) return value1 * (TARGET - value1);
}

export async function p2020day1_part2(input: Array<number>): Promise<number | undefined> {
  return input
    .map((firstValue, i) => {
      const complementTarget = TARGET - firstValue;
      const secondValue = findComplement(input, complementTarget);
      if (secondValue && input.includes(complementTarget - secondValue)) {
        const thirdValue = complementTarget - secondValue;
        const j = input.indexOf(secondValue);
        const k = input.indexOf(thirdValue);
        if (i !== j && i !== k && j !== k) {
          return firstValue * secondValue * thirdValue;
        }
      }
    })
    .find(p => p);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    const testInput = parseInput(testCase.input);
    test.logTestResult(testCase, String(await p2020day1_part1(testInput)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    const testInput = parseInput(testCase.input);
    test.logTestResult(testCase, String(await p2020day1_part2(testInput)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const parsedInput = parseInput(input);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day1_part1(parsedInput));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day1_part2(parsedInput));
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
