import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 3;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/03/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/03/data.txt
// problem url : https://adventofcode.com/2020/day/3

type Slope = {
  x: number;
  y: number;
};

const TreeSymbol = '#';

const parseInput = (input: string): string[][] => input.split('\n').map(row => row.split(''));

const traverseGrid = (grid: string[][], slope: Slope): number => {
  let rowIndex = 0;
  let colIndex = 0;
  let treesEncountered = 0;
  while (rowIndex < grid.length) {
    const currentLocation = grid[rowIndex][colIndex];
    if (currentLocation === TreeSymbol) ++treesEncountered;
    rowIndex = rowIndex + slope.y;
    colIndex = (colIndex + slope.x) % grid[0].length;
  }
  return treesEncountered;
};

export async function p2020day3_part1(input: string): Promise<number> {
  const grid = parseInput(input);
  return traverseGrid(grid, { x: 3, y: 1 });
}

export async function p2020day3_part2(input: string): Promise<number> {
  const slopes: Slope[] = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ];

  const grid = parseInput(input);
  return slopes.map(s => traverseGrid(grid, s)).reduce((a, b) => a * b, 1);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day3_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day3_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day3_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day3_part2(input));
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
