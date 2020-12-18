import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 16;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/16/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/16/data.txt
// problem url : https://adventofcode.com/2020/day/16

type Range = {
  minimum: number;
  maximum: number;
};

type Field = {
  validValues: Set<number>;
  label: string;
  index?: number;
};

type Ticket = number[];

interface Input {
  fields: Field[];
  nearbyTickets: Ticket[];
  yourTicket: Ticket;
  allTickets: Ticket[];
  allValidTickets: Ticket[];
  rawInput: string;
}

const rangePattern = /(\d+)-(\d+)/g;

const parseFields = (input: string): Field[] => {
  const fieldDefinitions = input.split('\n\n')[0].split('\n');
  return fieldDefinitions.map(fd => {
    const parts = fd.split(':');
    const ranges = parseRanges(parts[1]);
    return {
      label: parts[0],
      validValues: buildValidSet(ranges),
    };
  });
};

const parseRanges = (input: string): Range[] => {
  return [...input.matchAll(rangePattern)].map(([, minimum, maximum]) => {
    return {
      minimum: parseInt(minimum),
      maximum: parseInt(maximum),
    };
  });
};

const parseYourTicket = (input: string): Ticket => {
  return input
    .split('\n\n')[1]
    .split('\n')[1]
    .split(',')
    .map(i => parseInt(i));
};

const parseNearbyTickets = (input: string): Ticket[] => {
  const [, ...tickets] = input.split('\n\n')[2].split('\n');
  return tickets.map(t => t.split(',').map(value => parseInt(value)));
};

const parseInput = (input: string): Input => {
  const yourTicket = parseYourTicket(input);
  const nearbyTickets = parseNearbyTickets(input);
  const validTickets = getValidNearbyTickets(nearbyTickets, input);
  return {
    fields: parseFields(input),
    yourTicket: yourTicket,
    nearbyTickets: nearbyTickets,
    allTickets: [yourTicket, ...nearbyTickets],
    allValidTickets: [yourTicket, ...validTickets],
    rawInput: input,
  };
};

const getInvalidValuesNearby = (input: Input): Ticket => {
  const ranges = parseRanges(input.rawInput);
  const validSet = buildValidSet(ranges);

  return input.nearbyTickets.flat().filter(value => !validSet.has(value));
};

const getValidNearbyTickets = (nearbyTickets: Ticket[], input: string): Ticket[] => {
  const ranges = parseRanges(input);
  const validSet = buildValidSet(ranges);
  return nearbyTickets.filter(t => t.every(value => validSet.has(value)));
};

const isSubset = (a: Set<number>, b: Set<number>): boolean => {
  for (const value of a) {
    if (!b.has(value)) return false;
  }
  return true;
};

const difference = (a: Set<number>, b: Set<number>): Set<number> => {
  const diff = new Set(a);
  b.forEach(value => {
    if (diff.has(value)) diff.delete(value);
  });
  return diff;
};

const orderFields = (input: Input): Field[] => {
  const { fields, allValidTickets: validTickets } = input;
  const fieldValues = [...validTickets.keys()].map(i => validTickets.reduce((a, t) => a.add(t[i]), new Set<number>()));
  const orderedFields = fields.map(f => {
    const possibleIndexes = fieldValues
      .map((values, i) => ({ values: values, i: i }))
      .filter(({ values }) => isSubset(values, f.validValues))
      .sort((a, b) => difference(f.validValues, a.values).size - difference(f.validValues, b.values).size)
      .map(f => f.i);
    return {
      ...f,
      possibleIndexes: new Set(possibleIndexes),
    };
  });

  while (orderedFields.some(({ possibleIndexes }) => possibleIndexes.size > 1)) {
    const single = orderedFields.find(({ possibleIndexes }) => possibleIndexes.size === 1);
    const index = [...(single?.possibleIndexes.values() || [])][0];
    orderedFields.forEach(f => {
      f.possibleIndexes.delete(index);
      if (f.label === single?.label) f.index = index;
    });
  }
  return orderedFields;
};

const getDepartureValues = (ticket: Ticket, orderedFields: Field[]): Ticket => {
  const departureFields = orderedFields.filter(f => f.label.startsWith('departure'));
  return departureFields.map(({ index }) => ticket[index as number]);
};

const buildValidSet = (ranges: Range[]): Set<number> => {
  const validSet: Set<number> = new Set();
  ranges.forEach(({ minimum, maximum }) => {
    for (let i = minimum; i <= maximum; i++) {
      validSet.add(i);
    }
  });
  return validSet;
};

export async function p2020day16_part1(input: string): Promise<number> {
  const parsedInput = parseInput(input);
  const invalidValues = getInvalidValuesNearby(parsedInput);
  return invalidValues.reduce((a, b) => a + b, 0);
}

export async function p2020day16_part2(input: string): Promise<number> {
  const parsedInput = parseInput(input);
  const orderedFields = orderFields(parsedInput);
  const departureValues = getDepartureValues(parsedInput.yourTicket, orderedFields);
  return departureValues.reduce((a, b) => a * b, 1);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day16_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day16_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day16_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day16_part2(input));
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
