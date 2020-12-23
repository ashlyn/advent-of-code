import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 23;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/23/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/23/data.txt
// problem url : https://adventofcode.com/2020/day/23

const playGame = (cups: number[], moves: number): number[] => {
  const minValue = Math.min(...cups);
  let index = 0;
  for (let i = 0; i < moves; i++) {
    // console.log(`-- move ${i + 1} --`);
    // console.log(`cups: ${cups.map((c, i) => (i === index ? '(' + c + ')' : c)).join(' ')}`);
    const currentCup = cups[index];
    const threeCups = [1, 2, 3].map(j => cups[(index + j) % cups.length]);
    // console.log(`pick up: ${threeCups.join(', ')}`);
    cups = cups.filter(c => !threeCups.includes(c));
    let destination = -1;
    let target = currentCup - 1;
    while (destination < 0) {
      if (target < minValue) target = Math.max(...cups);
      destination = cups.indexOf(target);
      if (destination < 0) target--;
    }
    // console.log(`destination: ${cups[destination]} \n`);
    cups.splice(destination + 1, 0, ...threeCups);
    index = (cups.indexOf(currentCup) + 1) % cups.length;
  }
  const oneIndex = cups.indexOf(1);
  return cups.map((c, i) => cups[(oneIndex + i + 1) % cups.length]);
};

const generateMoreCups = (cups: number[], n: number): number[] => {
  const max = Math.max(...cups);
  for (let i = max + 1; i <= n; i++) {
    cups.push(i);
  }
  return cups;
};

export async function p2020day23_part1(input: string): Promise<string> {
  const cups = input.split('').map(i => parseInt(i));
  const ordered = playGame(cups, 100);
  return ordered.slice(0, ordered.length - 1).join('');
}

export async function p2020day23_part2(input: string): Promise<number> {
  const cups = generateMoreCups(
    input.split('').map(i => parseInt(i)),
    1000000
  );
  const ordered = playGame(cups, 10000000);
  return ordered[0] * ordered[1];
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day23_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day23_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day23_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day23_part2(input));
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
