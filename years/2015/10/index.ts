import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2015;
const DAY = 10;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/10/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/10/data.txt
// problem url : https://adventofcode.com/2015/day/10

export const lookAndSay = (input: string): string => {
  let counter = 0;
  let currentCharacter = input.charAt(0);
  const reduced = [...input].reduce((accumulator, current) => {
    if (current !== currentCharacter) {
      const newPhrase = `${accumulator}${counter++}${currentCharacter}`;
      counter = 1;
      currentCharacter = current;
      return newPhrase;
    }

    counter++;
    return accumulator;
  }, '');
  return `${reduced}${counter++}${currentCharacter}`;
};

export const lookAndSayNTimes = (input: string, n: number): string => {
  let expandedInput = input;
  [...Array(n)].forEach(() => (expandedInput = lookAndSay(expandedInput)));
  return expandedInput;
};

export async function p2015day10_part1(input: string): Promise<number> {
  return lookAndSayNTimes(input, 40).length;
}

export async function p2015day10_part2(input: string): Promise<number> {
  return lookAndSayNTimes(input, 50).length;
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2015day10_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2015day10_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2015day10_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2015day10_part2(input));
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
