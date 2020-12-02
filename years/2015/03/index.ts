import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2015;
const DAY = 3;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/03/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/03/data.txt
// problem url : https://adventofcode.com/2015/day/3

type Solution = {
  part1: number;
  part2: number;
};

type Coordinates = {
  x: number;
  y: number;
};

enum Instruction {
  North = '^',
  South = 'v',
  East = '>',
  West = '<',
}

const moveSet = {
  [Instruction.North]: (current: Coordinates) => ({ ...current, y: current.y - 1 }),
  [Instruction.South]: (current: Coordinates) => ({ ...current, y: current.y + 1 }),
  [Instruction.East]: (current: Coordinates) => ({ ...current, x: current.x + 1 }),
  [Instruction.West]: (current: Coordinates) => ({ ...current, x: current.x - 1 }),
};

const getNewPosition = (current: Coordinates, instruction: string) => {
  const move = moveSet[instruction as Instruction];
  if (move) return move(current);
  return current;
};

const keyForHouse = (house: Coordinates): string => `${house.x}-${house.y}`;

const solve = (input: string): Solution => {
  const part1Houses = new Set();
  const part2Houses = new Set();

  let currentSoloSanta: Coordinates = {
    x: 0,
    y: 0,
  };
  let currentRealSanta: Coordinates = {
    x: 0,
    y: 0,
  };
  let currentRoboSanta: Coordinates = {
    x: 0,
    y: 0,
  };

  part1Houses.add(keyForHouse(currentSoloSanta));
  part2Houses.add(keyForHouse(currentRealSanta));
  [...input].forEach((currentInstruction, i) => {
    let part2HouseKey = '';
    if (i % 2) {
      currentRealSanta = getNewPosition(currentRealSanta, currentInstruction);
      part2HouseKey = keyForHouse(currentRealSanta);
    } else {
      currentRoboSanta = getNewPosition(currentRoboSanta, currentInstruction);
      part2HouseKey = keyForHouse(currentRoboSanta);
    }
    currentSoloSanta = getNewPosition(currentSoloSanta, currentInstruction);
    part1Houses.add(keyForHouse(currentSoloSanta));
    part2Houses.add(part2HouseKey);
  });

  return {
    part1: part1Houses.size,
    part2: part2Houses.size,
  };
};

let lastInput: string;
let lastSolution: Solution;

export async function p2015day3_part1(input: string): Promise<number> {
  if (!lastSolution || lastInput !== input) {
    lastSolution = solve(input);
    lastInput = input;
  }
  return lastSolution.part1;
}

export async function p2015day3_part2(input: string): Promise<number> {
  if (!lastSolution || lastInput !== input) {
    lastSolution = solve(input);
    lastInput = input;
  }
  return lastSolution.part2;
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2015day3_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2015day3_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2015day3_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2015day3_part2(input));
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
