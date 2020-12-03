import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

const YEAR = 2015;
const DAY = 12;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/12/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/12/data.txt
// problem url : https://adventofcode.com/2015/day/12

export const flatten = (input: any, valuesToIgnore: Array<string | number> = []): Array<string | number> => {
  if (typeof input === 'string' || typeof input === 'number') return [input];
  if (!Array.isArray(input) && Object.values(input).some(v => valuesToIgnore.includes(v as any))) return [];
  return Object.keys(input).reduce((a, b) => a.concat(flatten(input[b], valuesToIgnore)), [] as Array<string | number>);
};

export const sumNumbers = (input: Array<string | number>): number => {
  return input.reduce((a: number, b) => (typeof b === 'number' && !Number.isNaN(b) ? a + b : a), 0);
};

export async function p2015day12_part1(input: string): Promise<number> {
  const json = JSON.parse(input);
  const flattened = flatten(json);
  return sumNumbers(flattened);
}

export async function p2015day12_part2(input: string): Promise<number> {
  const json = JSON.parse(input);
  const flattened = flatten(json, ['red']);
  return sumNumbers(flattened);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2015day12_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2015day12_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2015day12_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2015day12_part2(input));
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
