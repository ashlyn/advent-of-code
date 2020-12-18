import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 15;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/15/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/15/data.txt
// problem url : https://adventofcode.com/2020/day/15

const playGame = (startingNumbers: number[], max: number): number => {
  const lastSaid: Map<number, number> = new Map();
  let last = 0;
  for (let i = 1; i <= max; i++) {
    if (i - 1 < startingNumbers.length) {
      if (i > 1) lastSaid.set(last, i - 1);
      last = startingNumbers[i - 1];
    } else if (lastSaid.has(last)) {
      const lastRound = lastSaid.get(last);
      lastSaid.set(last, i - 1);
      last = i - 1 - (lastRound as number);
    } else {
      lastSaid.set(last, i - 1);
      last = 0;
    }
  }
  return last;
};

export async function p2020day15_part1(input: string): Promise<number> {
  const startingNumbers = input.split(',').map(i => parseInt(i));
  return playGame(startingNumbers, 2020);
}

export async function p2020day15_part2(input: string): Promise<number> {
  const startingNumbers = input.split(',').map(i => parseInt(i));
  return playGame(startingNumbers, 30000000);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day15_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day15_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day15_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day15_part2(input));
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
