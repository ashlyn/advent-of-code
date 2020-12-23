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

const buildLinkedList = (cups: number[]): Map<number, number> => {
  let previous: number;
  const linkedList: Map<number, number> = new Map();
  cups.forEach(c => {
    if (previous) {
      linkedList.set(previous, c);
    }
    previous = c;
  });
  linkedList.set(cups[cups.length - 1], cups[0]);
  return linkedList;
};

const playGame = (cups: number[], moves: number): Map<number, number> => {
  const linkedList = buildLinkedList(cups);
  let currentCup = cups[0];
  let destinationTarget: number;
  for (let i = 0; i < moves; i++) {
    // remove three cups and join the selected cup to the next one
    const cup1 = linkedList.get(currentCup) ?? 1;
    const cup2 = linkedList.get(cup1) ?? 1;
    const cup3 = linkedList.get(cup2) ?? 1;
    const nextCup = linkedList.get(cup3) ?? 1;
    linkedList.set(currentCup, nextCup);

    // find the destination (by value)
    destinationTarget = currentCup - 1;
    while (destinationTarget < 1 || [cup1, cup2, cup3].includes(destinationTarget)) {
      destinationTarget--;
      if (destinationTarget < 1) {
        destinationTarget = cups.length;
      }
    }

    // put the three cups back in the list
    linkedList.set(cup3, linkedList.get(destinationTarget) ?? 1);
    linkedList.set(destinationTarget, cup1);
    currentCup = nextCup;
  }
  return linkedList;
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
  const linkedList = playGame(cups, 100);
  const ordered: number[] = [];
  let current = linkedList.get(1) ?? 1;
  while (current !== 1) {
    ordered.push(current);
    current = linkedList.get(current) ?? 1;
  }
  return ordered.join('');
}

export async function p2020day23_part2(input: string): Promise<number> {
  const cups = generateMoreCups(
    input.split('').map(i => parseInt(i)),
    1000000
  );
  const linkedList = playGame(cups, 10000000);
  return (linkedList.get(1) ?? 0) * (linkedList.get(linkedList.get(1) ?? 0) ?? 0);
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
