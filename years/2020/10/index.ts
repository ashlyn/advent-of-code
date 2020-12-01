import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution, trace } = LOGUTIL;

const YEAR = 2020;
const DAY = 10;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/10/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/10/data.txt
// problem url : https://adventofcode.com/2020/day/10

export async function p2020day10_part1(input: string): Promise<string | undefined> {
  return 'Not implemented';
}

export async function p2020day10_part2(input: string): Promise<string | undefined> {
  return 'Not implemented';
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day10_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day10_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day10_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day10_part2(input));
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
