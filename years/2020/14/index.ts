import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 14;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/14/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/14/data.txt
// problem url : https://adventofcode.com/2020/day/14

enum InstructionType {
  UpdateMask,
  SaveToMemory,
}

type Instruction = {
  instruction: InstructionType;
  value: number | string;
  index?: number;
};

const parseInstructions = (input: string): Instruction[] => {
  return input.split('\n').map(line => {
    const parts = line.split(' = ');
    if (parts[0].startsWith('mask')) {
      return {
        instruction: InstructionType.UpdateMask,
        value: parts[1],
      };
    }

    return {
      instruction: InstructionType.SaveToMemory,
      value: parseInt(parts[1]),
      index: parseInt(parts[0].substring(4, parts[0].length - 1)),
    };
  });
};

const BITS = 36;

const permutationMap: Map<number, string[]> = new Map();
const generatePermutationsForLength = (length: number): string[] => {
  if (permutationMap.has(length)) return permutationMap.get(length) || [];

  const permutations = [...Array(Math.pow(2, length)).keys()].map(i => i.toString(2).padStart(length, '0'));
  permutationMap.set(length, permutations);
  return permutations;
};

const getMaskedValue = (value: number, mask: string): number => {
  const valAsBinary = value.toString(2).padStart(BITS, '0');
  const masked = [...mask]
    .map((m, i) => {
      if (m === 'X') return valAsBinary.charAt(i);
      return m;
    })
    .join('');
  return parseInt(masked, 2);
};

export const getMaskedIndexes = (index: number, mask: string): number[] => {
  const permutations = generatePermutationsForLength([...mask].filter(m => m === 'X').length);

  const indexAsBinary = index.toString(2).padStart(BITS, '0');

  return permutations.map(permutation => {
    let xCount = 0;
    const addressAsBinary = [...mask]
      .map((m, i) => {
        if (m === '0') return indexAsBinary.charAt(i);
        if (m === '1') return '1';

        const currentCharacter = permutation.charAt(xCount);
        ++xCount;
        return currentCharacter;
      })
      .join('');
    return parseInt(addressAsBinary, 2);
  });
};

const singleIndex = (index: number): number[] => [index];

const unmaskedValue = (value: number): number => value;

const executeInstructions = (
  instructions: Instruction[],
  indexGenerator: (index: number, mask: string) => number[],
  valueGenerator: (value: number, mask: string) => number
): Map<number, number> => {
  let mask = '';
  const mem: Map<number, number> = new Map();
  instructions.forEach(instruction => {
    if (instruction.instruction === InstructionType.UpdateMask) {
      mask = instruction.value as string;
      return;
    }

    if (instruction.instruction === InstructionType.SaveToMemory) {
      const value = valueGenerator(instruction.value as number, mask);
      if (instruction.index === undefined) return;
      const indexes = indexGenerator(instruction.index, mask);
      indexes.forEach(i => mem.set(i, value));
      return;
    }
  });
  return mem;
};

export async function p2020day14_part1(input: string): Promise<number> {
  const instructions = parseInstructions(input);
  const mem = executeInstructions(instructions, singleIndex, getMaskedValue);
  return [...mem.values()].reduce((a, b) => a + b, 0);
}

export async function p2020day14_part2(input: string): Promise<number> {
  const instructions = parseInstructions(input);
  const mem = executeInstructions(instructions, getMaskedIndexes, unmaskedValue);
  return [...mem.values()].reduce((a, b) => a + b, 0);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day14_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day14_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day14_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day14_part2(input));
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
