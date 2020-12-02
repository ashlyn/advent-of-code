import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2015;
const DAY = 8;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/08/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/08/data.txt
// problem url : https://adventofcode.com/2015/day/8

const slashEscape = /\\\\/g;
const quoteEscape = /\\"/g;
const hexEscape = /\\x([a-fA-F0-9]{2})/g;

const fwdSlashEScape = /\//g;
const semiEscape = /;/g;

const quoteExpression = /"/g;

const singleSlashEscape = /\\/g;

const replaceChars = (_match: string, p1: string) => String.fromCharCode(parseInt(p1, 16));

const decodeString = (str: string): string => {
  const withoutQuotes = str.substring(1, str.length - 1);
  const withReplacements = withoutQuotes
    .replace(slashEscape, '/')
    .replace(quoteEscape, ';')
    .replace(hexEscape, replaceChars)
    .replace(fwdSlashEScape, '\\')
    .replace(semiEscape, '"');
  return withReplacements;
};

const encodeString = (str: string): string => {
  const withReplacements = str
    .replace(singleSlashEscape, '/')
    .replace(quoteExpression, ';')
    .replace(semiEscape, '\\"')
    .replace(fwdSlashEScape, '\\\\');
  const quoted = `"${withReplacements}"`;
  return quoted;
};

export async function p2015day8_part1(input: string): Promise<number> {
  return input
    .trim()
    .split('\n')
    .map(i => i.length - decodeString(i).length)
    .reduce((a, b) => a + b, 0);
}

export async function p2015day8_part2(input: string): Promise<number> {
  return input
    .trim()
    .split('\n')
    .map(i => encodeString(i).length - i.length)
    .reduce((a, b) => a + b, 0);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2015day8_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2015day8_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2015day8_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2015day8_part2(input));
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
