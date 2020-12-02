import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2015;
const DAY = 2;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/02/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/02/data.txt
// problem url : https://adventofcode.com/2015/day/2

type Dimensions = {
  length: number;
  width: number;
  height: number;
};

type Solution = {
  wrappingPaper: number;
  ribbon: number;
};

const ribbonAmount = ({ length, width, height }: Dimensions): number => {
  const sides = [2 * (length + width), 2 * (length + height), 2 * (width + height)];
  const shortestPerimeter = sides.sort((a, b) => a - b)[0];
  const bowLength = length * width * height;
  return shortestPerimeter + bowLength;
};

const wrappingPaperAmount = ({ length, width, height }: Dimensions): number => {
  const sides = [length * width, length * height, width * height];
  const smallestSide = sides.sort((a, b) => a - b)[0];
  const surfaceArea = sides.reduce((total, side) => total + 2 * side, 0);
  return surfaceArea + smallestSide;
};

const dimensions = (present: string): Dimensions => {
  const values = present.split('x');
  return {
    length: parseInt(values[0], 10),
    width: parseInt(values[1], 10),
    height: parseInt(values[2], 10),
  };
};

const solve = (input: string): Solution => {
  const presents = input
    .trim()
    .split('\n')
    .map(p => dimensions(p));
  const materialAmounts = presents.map(p => {
    return {
      wrappingPaper: wrappingPaperAmount(p),
      ribbon: ribbonAmount(p),
    };
  });
  return materialAmounts.reduce(
    (total, current) => {
      return {
        wrappingPaper: total.wrappingPaper + current.wrappingPaper,
        ribbon: total.ribbon + current.ribbon,
      };
    },
    {
      wrappingPaper: 0,
      ribbon: 0,
    }
  );
};

let lastInput: string;
let lastSolution: Solution;
export async function p2015day2_part1(input: string): Promise<number> {
  if (!lastSolution || lastInput !== input) {
    lastSolution = solve(input);
    lastInput = input;
  }
  return lastSolution.wrappingPaper;
}

export async function p2015day2_part2(input: string): Promise<number> {
  if (!lastSolution || lastInput !== input) {
    lastSolution = solve(input);
    lastInput = input;
  }
  return lastSolution.ribbon;
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2015day2_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2015day2_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2015day2_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2015day2_part2(input));
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
