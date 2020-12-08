import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution, trace } = LOGUTIL;

const YEAR = 2020;
const DAY = 8;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/08/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/08/data.txt
// problem url : https://adventofcode.com/2020/day/8

export enum Operation {
  Jump = 'jmp',
  Accumulate = 'acc',
  Nop = 'nop',
}

type Instruction = {
  operation: Operation;
  value: number;
  executed: boolean;
};

type Results = {
  accumulator: number;
  terminated: boolean;
};

const instructionPattern = /(jmp|acc|nop) ([+-]\d+)/;

const parseInstruction = (line: string): Instruction => {
  const [, operation, value] = [...(instructionPattern.exec(line) || [])];
  return {
    operation: operation as Operation,
    value: parseInt(value),
    executed: false,
  };
};

export const executeInstructions = (originalInstructions: Instruction[]): Results => {
  const instructions = originalInstructions.map(i => ({ ...i }));
  let accumulator = 0;
  let i = 0;
  let instruction = instructions[i];
  while (i < instructions.length && !instruction.executed) {
    const { operation, value } = instruction;
    instruction.executed = true;
    switch (operation) {
      case Operation.Jump:
        i += value;
        break;
      case Operation.Accumulate:
        accumulator += value;
        ++i;
        break;
      case Operation.Nop:
      default:
        ++i;
    }
    instruction = instructions[i];
  }
  return {
    accumulator: accumulator,
    terminated: i >= instructions.length,
  };
};

const findAndFixCorruptedInstruction = (instructions: Instruction[]): number => {
  let accumulator = -1;
  instructions.some(({ operation, value }, i) => {
    if (operation === Operation.Accumulate) return false;
    const newInstructions = [
      ...instructions.slice(0, i),
      { operation: operation === Operation.Jump ? Operation.Nop : Operation.Jump, value: value, executed: false },
      ...instructions.slice(i + 1),
    ];
    const { terminated, accumulator: resultAccumulator } = executeInstructions(newInstructions);
    if (terminated) accumulator = resultAccumulator;
    return terminated;
  });
  return accumulator;
};

export async function p2020day8_part1(input: string): Promise<number> {
  const instructions = input.split('\n').map(parseInstruction);
  return executeInstructions(instructions).accumulator;
}

export async function p2020day8_part2(input: string): Promise<number> {
  const instructions = input.split('\n').map(parseInstruction);
  return findAndFixCorruptedInstruction(instructions);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day8_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day8_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day8_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day8_part2(input));
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
