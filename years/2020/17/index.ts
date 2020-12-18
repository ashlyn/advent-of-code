import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 17;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/17/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/17/data.txt
// problem url : https://adventofcode.com/2020/day/17

const INACTIVE = '.';

type Grid = {
  minCoords: Coords;
  maxCoords: Coords;
  activeCubeHashes: Set<string>;
};

type Coords = {
  x: number;
  y: number;
  z: number;
  w: number;
};

const coordHash = ({ x, y, z, w }: Coords): string => `${x},${y},${z},${w}`;
const hashToCoords = (hash: string): Coords => {
  const split = hash.split(',').map(h => parseInt(h));
  return {
    x: split[0],
    y: split[1],
    z: split[2],
    w: split[3],
  };
};

const buildGrid = (input: string): Grid => {
  const active: Coords[] = [];
  const splitInput = input.split('\n').map(i => i.split(''));
  splitInput.forEach((row, y) =>
    row.forEach((cube, x) => {
      if (cube === INACTIVE) return;
      active.push({
        x: x,
        y: y,
        z: 0,
        w: 0,
      });
    })
  );
  return {
    minCoords: { x: 0, y: 0, z: 0, w: 0 },
    maxCoords: { x: splitInput[0].length, y: splitInput.length, z: 1, w: 1 },
    activeCubeHashes: new Set(active.map(coordHash)),
  };
};

// long-running function
const bootUp = (input: string, cycles: number, includeFourthDimension = false): number => {
  const grid = buildGrid(input);
  for (let cycle = 0; cycle < cycles; cycle++) {
    grid.minCoords.x--;
    grid.minCoords.y--;
    grid.minCoords.z--;
    grid.maxCoords.x++;
    grid.maxCoords.y++;
    grid.maxCoords.z++;
    if (includeFourthDimension) {
      grid.minCoords.z--;
      grid.maxCoords.z++;
    }
    const hashesToAdd: Set<string> = new Set();
    const hashesToRemove: Set<string> = new Set();
    const wMin = includeFourthDimension ? grid.minCoords.z : 0;
    const wMax = includeFourthDimension ? grid.maxCoords.z : 1;
    for (let w = wMin; w < wMax; w++) {
      for (let z = grid.minCoords.z; z < grid.maxCoords.z; z++) {
        for (let y = grid.minCoords.y; y < grid.maxCoords.y; y++) {
          for (let x = grid.minCoords.x; x < grid.maxCoords.x; x++) {
            const currentHash = coordHash({ x: x, y: y, z: z, w: w });
            const currentIsActive = grid.activeCubeHashes.has(currentHash);
            const activeNeighbors = [...grid.activeCubeHashes.values()].filter(cubeHash => {
              const coords = hashToCoords(cubeHash);
              const isNeighbor =
                !(currentHash === cubeHash) &&
                coords.x >= x - 1 &&
                coords.x <= x + 1 &&
                coords.y >= y - 1 &&
                coords.y <= y + 1 &&
                coords.z >= z - 1 &&
                coords.z <= z + 1 &&
                coords.w >= w - 1 &&
                coords.w <= w + 1;
              return isNeighbor;
            }).length;
            if (currentIsActive && activeNeighbors !== 2 && activeNeighbors !== 3) {
              hashesToRemove.add(currentHash);
            }
            if (!currentIsActive && activeNeighbors === 3) {
              hashesToAdd.add(currentHash);
            }
          }
        }
      }
    }
    hashesToRemove.forEach(h => grid.activeCubeHashes.delete(h));
    hashesToAdd.forEach(h => grid.activeCubeHashes.add(h));
  }
  return grid.activeCubeHashes.size;
};

export async function p2020day17_part1(input: string): Promise<number> {
  return bootUp(input, 6, false);
}

export async function p2020day17_part2(input: string): Promise<number> {
  return bootUp(input, 6, true);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day17_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day17_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day17_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day17_part2(input));
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
