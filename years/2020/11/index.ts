import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 11;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/11/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/11/data.txt
// problem url : https://adventofcode.com/2020/day/11

type Coords = {
  x: number;
  y: number;
  value?: string;
};

const FLOOR = '.';
const EMPTY = 'L';
const OCCUPIED = '#';

export const getCountOfOccupiedSeatsInSight = (seat: Coords, seats: string[][]): number => {
  // brain not working, brute forced instead
  let inSight = 0;
  for (let i = seat.x - 1; i >= 0; i--) {
    const current = seats[i][seat.y];
    if (current === EMPTY) break;
    if (current === OCCUPIED) {
      ++inSight;
      break;
    }
  }

  for (let i = seat.x + 1; i < seats.length; i++) {
    const current = seats[i][seat.y];
    if (current === EMPTY) break;
    if (current === OCCUPIED) {
      ++inSight;
      break;
    }
  }

  for (let i = seat.y - 1; i >= 0; i--) {
    const current = seats[seat.x][i];
    if (current === EMPTY) break;
    if (current === OCCUPIED) {
      ++inSight;
      break;
    }
  }

  for (let i = seat.y + 1; i < seats[0].length; i++) {
    const current = seats[seat.x][i];
    if (current === EMPTY) break;
    if (current === OCCUPIED) {
      ++inSight;
      break;
    }
  }

  let i = seat.x - 1;
  let j = seat.y + 1;
  while (i >= 0 && j < seats[0].length) {
    const current = seats[i][j];
    if (current === EMPTY) break;
    if (current === OCCUPIED) {
      ++inSight;
      break;
    }
    i--;
    j++;
  }

  i = seat.x + 1;
  j = seat.y + 1;
  while (i < seats.length && j < seats[0].length) {
    const current = seats[i][j];
    if (current === EMPTY) break;
    if (current === OCCUPIED) {
      ++inSight;
      break;
    }
    i++;
    j++;
  }

  i = seat.x + 1;
  j = seat.y - 1;
  while (i < seats.length && j >= 0) {
    const current = seats[i][j];
    if (current === EMPTY) break;
    if (current === OCCUPIED) {
      ++inSight;
      break;
    }
    i++;
    j--;
  }

  i = seat.x - 1;
  j = seat.y - 1;
  while (i >= 0 && j >= 0) {
    const current = seats[i][j];
    if (current === EMPTY) break;
    if (current === OCCUPIED) {
      ++inSight;
      break;
    }
    i--;
    j--;
  }

  return inSight;
};

const getAdjacent = (seats: string[][], { x, y }: Coords): string[] => {
  return seats
    .slice(x > 0 ? x - 1 : x, x < seats.length ? x + 2 : seats.length)
    .map((row, i) => row.filter((seat, j) => j <= y + 1 && j >= y - 1 && !(i === Math.min(x, 1) && j === y)))
    .flat();
};

const simulate = (seats: string[][], mutate: (seats: string[][]) => string[][] = simulateRound): number => {
  let last: string[][] = [];
  let current = seats;
  while (JSON.stringify(last) !== JSON.stringify(current)) {
    last = current;
    current = mutate(last);
  }
  return current.flat().filter(seat => seat === OCCUPIED).length;
};

const simulateRound = (seats: string[][]): string[][] => {
  return seats.map((row, i) =>
    row.map((seat, j) => {
      if (seat === FLOOR) return seat;
      const adjacentOccupied = getAdjacent(seats, { x: i, y: j }).filter(a => a === OCCUPIED).length;
      if (seat === EMPTY && adjacentOccupied === 0) return OCCUPIED;
      if (seat === OCCUPIED && adjacentOccupied >= 4) return EMPTY;
      return seat;
    })
  );
};

const simulateRoundPart2 = (seats: string[][]): string[][] => {
  return seats.map((row, i) =>
    row.map((seat, j) => {
      if (seat === FLOOR) return seat;
      const adjacentOccupied = getCountOfOccupiedSeatsInSight({ x: i, y: j }, seats);
      if (seat === EMPTY && adjacentOccupied === 0) return OCCUPIED;
      if (seat === OCCUPIED && adjacentOccupied >= 5) return EMPTY;
      return seat;
    })
  );
};

export async function p2020day11_part1(input: string): Promise<number> {
  const seats = input.split('\n').map(row => row.split(''));
  return simulate(seats);
}

export async function p2020day11_part2(input: string): Promise<number> {
  const seats = input.split('\n').map(row => row.split(''));
  const round1 = simulate(seats, simulateRoundPart2);
  return round1;
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day11_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day11_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day11_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day11_part2(input));
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
