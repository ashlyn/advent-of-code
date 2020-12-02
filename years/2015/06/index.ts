import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2015;
const DAY = 6;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/06/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/06/data.txt
// problem url : https://adventofcode.com/2015/day/6

type Instruction = {
  action: Action;
  startX: number;
  startY: number;
  stopX: number;
  stopY: number;
};

enum Action {
  TurnOn = 'turn on',
  TurnOff = 'turn off',
  Toggle = 'toggle',
}

const instructionPattern = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/;

const part1NewLightStatus = {
  [Action.TurnOn]: () => true,
  [Action.TurnOff]: () => false,
  [Action.Toggle]: (light: boolean) => !light,
};

const part2NewLightStatus = {
  [Action.TurnOn]: (brightness: number) => brightness + 1,
  [Action.TurnOff]: (brightness: number) => Math.max(0, brightness - 1),
  [Action.Toggle]: (brightness: number) => brightness + 2,
};

const parseInstruction = (line: string): Instruction | undefined => {
  const match = instructionPattern.exec(line);
  if (!match) return;
  return {
    action: match[1] as Action,
    startX: parseInt(match[2]),
    startY: parseInt(match[3]),
    stopX: parseInt(match[4]),
    stopY: parseInt(match[5]),
  };
};

export async function p2015day6_part1(input: string): Promise<number> {
  const lights = [...Array(1000)].map(() => Array(1000).fill(false));
  input
    .trim()
    .split('\n')
    .map(parseInstruction)
    .forEach(instruction => {
      if (!instruction) return;
      for (let x = instruction.startX; x <= instruction.stopX; x++) {
        for (let y = instruction.startY; y <= instruction.stopY; y++) {
          lights[x][y] = part1NewLightStatus[instruction.action](lights[x][y]);
        }
      }
    });
  return lights.reduce((sum, row) => {
    return (
      sum +
      row.reduce((rowSum, light) => {
        return rowSum + light;
      }, 0)
    );
  }, 0);
}

export async function p2015day6_part2(input: string): Promise<number> {
  const lights = [...Array(1000)].map(() => Array(1000).fill(0));
  input
    .trim()
    .split('\n')
    .map(parseInstruction)
    .forEach(instruction => {
      if (!instruction) return;
      for (let x = instruction.startX; x <= instruction.stopX; x++) {
        for (let y = instruction.startY; y <= instruction.stopY; y++) {
          lights[x][y] = part2NewLightStatus[instruction.action](lights[x][y]);
        }
      }
    });
  return lights.reduce((sum, row) => {
    return (
      sum +
      row.reduce((rowSum, light) => {
        return rowSum + light;
      }, 0)
    );
  }, 0);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2015day6_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2015day6_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2015day6_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2015day6_part2(input));
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
