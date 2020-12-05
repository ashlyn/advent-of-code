import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 5;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/05/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/05/data.txt
// problem url : https://adventofcode.com/2020/day/5

type Seat = {
  row: number;
  column: number;
};

enum Directions {
  Front = 'F',
  Back = 'B',
  Right = 'R',
  Left = 'L',
}

const codeRowCount = 7;

const getSeatId = ({ row, column }: Seat): number => row * 8 + column;

const getSeat = (input: string): Seat => {
  const binaryInput = input
    .replace(new RegExp(`(${Directions.Front}|${Directions.Left})`, 'g'), '0')
    .replace(new RegExp(`(${Directions.Back}|${Directions.Right})`, 'g'), '1');

  return {
    row: parseInt(binaryInput.substring(0, codeRowCount), 2),
    column: parseInt(binaryInput.substring(codeRowCount), 2),
  };
};

export async function p2020day5_part1(input: string): Promise<number> {
  const ids = input.split('\n').map(getSeat).map(getSeatId);
  return Math.max(...ids);
}

export async function p2020day5_part2(input: string): Promise<number> {
  const ids = input
    .split('\n')
    .map(getSeat)
    .map(getSeatId)
    .sort((a, b) => a - b);
  return (ids.find((id, index) => ids[index + 1] !== id + 1) || 0) + 1;
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day5_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day5_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day5_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day5_part2(input));
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
