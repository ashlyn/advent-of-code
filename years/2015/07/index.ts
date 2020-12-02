import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

/* May refactor to use maps and appropriate typing later */
/* eslint-disable @typescript-eslint/no-explicit-any */

const { log, logSolution } = LOGUTIL;

const YEAR = 2015;
const DAY = 7;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/07/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2015/07/data.txt
// problem url : https://adventofcode.com/2015/day/7

const maxSignal = 65535;

const opPattern = /([a-z]*?|[0-9]*?)\s*(AND|OR|RSHIFT|LSHIFT|NOT)?\s*([a-z]+|[0-9]+)\s*->\s*([a-z]+|[0-9]+)\s*\n?/g;

type Node = string | number;
type Instruction = {
  wire1: Node;
  wire2: Node;
  op: (a: number, b: number) => number;
  destination: string;
};

enum Operation {
  And = 'AND',
  Or = 'OR',
  Rshift = 'RSHIFT',
  Lshift = 'LSHIFT',
  Not = 'NOT',
}

const ops = {
  [Operation.And]: (a: number, b: number) => a & b,
  [Operation.Or]: (a: number, b: number) => a | b,
  [Operation.Rshift]: (a: number, b: number) => a >>> b,
  [Operation.Lshift]: (a: number, b: number) => a << b,
  [Operation.Not]: (_a: number, b: number) => ~b,
};

const conditionalParseInt = (value: string): number | string => {
  const parsed = parseInt(value);
  return isNaN(parsed) ? value : parsed;
};

const parseInstruction = ([, wire1, op, wire2, destination]: string[]): Instruction => {
  return {
    wire1: conditionalParseInt(wire1),
    wire2: conditionalParseInt(wire2),
    op: ops[op as Operation],
    destination: destination,
  };
};

const isNumber = (value: string | number | undefined) => typeof value === 'number';

const dependenciesMet = ({ wire1, wire2, op }: Instruction, values: any) => {
  if (!op && !isNaN(wire2 as any)) return true;
  if (!op && values[wire2] !== undefined) return true;

  if ((!isNaN(wire1 as any) || values[wire1] !== undefined) && (!isNaN(wire2 as any) || values[wire2] !== undefined))
    return true;

  return false;
};

const calculateValues = (allInstructions: Instruction[], initialValues: any = {}) => {
  const values = { ...initialValues };
  const instructions = [...allInstructions];
  let index = -1;
  do {
    index = instructions.findIndex(i => dependenciesMet(i, values));
    const { wire1, wire2, op, destination } = instructions[index];
    const operand1 = values[wire1] !== undefined ? values[wire1] : wire1;
    const operand2 = values[wire2] !== undefined ? values[wire2] : wire2;
    const value = !op ? operand2 : op(operand1, operand2);
    values[destination] = value & maxSignal;
    instructions.splice(index, 1);
  } while (instructions.length && index > -1);
  if (instructions.length) {
    log(chalk.redBright(`Failed to process ${instructions.length} instructions.`));
  }
  return values;
};

const finalWire = 'a';
const instructionToOverwrite = 'b';

let lastSolution: any;
let lastInput: string;

export async function p2015day7_part1(input: string): Promise<string | undefined> {
  if (!lastSolution || lastInput !== input) {
    const instructions = [...input.trim().matchAll(opPattern)].map(parseInstruction);
    lastSolution = calculateValues(instructions);
    lastInput = input;
  }
  return lastSolution[finalWire];
}

export async function p2015day7_part2(input: string): Promise<string | undefined> {
  const instructions = [...input.trim().matchAll(opPattern)].map(parseInstruction);
  if (!lastSolution || lastInput !== input) {
    lastSolution = calculateValues(instructions);
    lastInput = input;
  }
  const newInstructions = instructions.filter(
    ({ wire1, wire2, op, destination }: Instruction) =>
      !(!wire1 && !op && isNumber(wire2) && destination === instructionToOverwrite)
  );
  const values = calculateValues(newInstructions, { b: lastSolution[finalWire] });
  return values[finalWire];
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2015day7_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2015day7_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2015day7_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2015day7_part2(input));
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
