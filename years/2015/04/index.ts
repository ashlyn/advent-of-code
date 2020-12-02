import md5 from 'md5';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2015;
const DAY = 4;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/04/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/04/data.txt
// problem url : https://adventofcode.com/2015/day/4

const part1Pattern = '00000';
const part2Pattern = '000000';

type Solution = {
  part1: number;
  part2: number;
};

const solve = (input: string): Solution | undefined => {
  let part1 = 0;
  let part2 = 0;
  let i = 1;
  {
    while (i > 0) {
      const hash = md5(`${input}${i}`);
      if (hash.startsWith(part1Pattern) && !part1) part1 = i;
      if (hash.startsWith(part2Pattern) && !part2) part2 = i;
      if (part1 && part2)
        return {
          part1,
          part2,
        };
      i++;
    }
  }
};

let lastInput: string;
let lastSolution: Solution | undefined;

export async function p2015day4_part1(input: string): Promise<number | undefined> {
  if (!lastSolution || input !== lastInput) {
    lastSolution = solve(input);
    lastInput = input;
  }
  return lastSolution?.part1;
}

export async function p2015day4_part2(input: string): Promise<number | undefined> {
  if (!lastSolution || input !== lastInput) {
    lastSolution = solve(input);
    lastInput = input;
  }
  return lastSolution?.part2;
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2015day4_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2015day4_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2015day4_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2015day4_part2(input));
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
