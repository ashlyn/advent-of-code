import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 13;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/13/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/13/data.txt
// problem url : https://adventofcode.com/2020/day/13

type BusOffset = {
  id: number;
  waitTime: number;
};

const findFirstBus = (earliest: number, busses: number[]): BusOffset => {
  const mapped = busses.map(b => b * (Math.floor(earliest / b) + 1));
  const index = mapped.indexOf(Math.min(...mapped));
  return { id: busses[index], waitTime: mapped[index] - earliest };
};

const moduloInverse = (value: bigint, mod: bigint): bigint => {
  const remainder = value % mod;
  for (let i = 1n; i < mod; i++) {
    if ((remainder * i) % mod === 1n) return i;
  }
  return 1n;
};

const crt = (busses: BusOffset[]): bigint => {
  const product = busses.reduce((a, { id }) => a * BigInt(id), 1n);
  const sum = busses.reduce((a, { id, waitTime }) => {
    const p = product / BigInt(id);
    return a + BigInt(waitTime) * moduloInverse(p, BigInt(id)) * p;
  }, 0n);
  return sum % product;
};

const findMinimumTimestamp = (busses: BusOffset[]): bigint => {
  const product = busses.reduce((a, { id }) => a * BigInt(id), 1n);
  return product - crt(busses);
};

export async function p2020day13_part1(input: string): Promise<number> {
  const split = input.split('\n');
  const busses = split[1]
    .split(',')
    .filter(i => i !== 'x')
    .map(i => parseInt(i));
  const { id, waitTime } = findFirstBus(parseInt(split[0]), busses);
  return id * waitTime;
}

export async function p2020day13_part2(input: string): Promise<bigint> {
  const split = input.split('\n');
  const busses = split[1].split(',').map((id, i) => {
    if (id === 'x') return null;
    return {
      id: parseInt(id),
      waitTime: i,
    };
  });
  const bussesFiltered: BusOffset[] = busses.filter((b): b is BusOffset => b !== null);
  return findMinimumTimestamp(bussesFiltered);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day13_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day13_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day13_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day13_part2(input));
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
