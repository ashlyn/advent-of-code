import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 12;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/12/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/12/data.txt
// problem url : https://adventofcode.com/2020/day/12

export enum Direction {
  North = 'N',
  South = 'S',
  East = 'E',
  West = 'W',
  Right = 'R',
  Left = 'L',
  Forward = 'F',
}

type Instruction = {
  direction: Direction;
  value: number;
};

const directionVectors = [
  [0, 1], // North
  [1, 0], // East
  [0, -1], // South
  [-1, 0], // West
];

const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const rotateWaypointAroundShip = (
  degrees: number,
  waypointPosition: number[],
  shipPosition: number[]
): number[] => {
  const radians = degreesToRadians(degrees);
  const sin = Math.sin(radians);
  const cos = Math.cos(radians);

  const translated = [waypointPosition[0] - shipPosition[0], waypointPosition[1] - shipPosition[1]];

  const rotated = [
    Math.round(translated[0] * cos - translated[1] * sin),
    Math.round(translated[0] * sin + translated[1] * cos),
  ];

  return [rotated[0] + shipPosition[0], rotated[1] + shipPosition[1]];
};

const manhattanDistance = (x: number, y: number) => Math.abs(x) + Math.abs(y);

export const moveWaypointForInstructions = (instructions: Instruction[]): number[] => {
  const currentWaypointPosition = [10, 1];
  const currentShipPosition = [0, 0];
  instructions.forEach(({ direction, value }) => {
    switch (direction) {
      case Direction.North:
        currentWaypointPosition[1] += value;
        break;
      case Direction.South:
        currentWaypointPosition[1] -= value;
        break;
      case Direction.East:
        currentWaypointPosition[0] += value;
        break;
      case Direction.West:
        currentWaypointPosition[0] -= value;
        break;
      case Direction.Right: {
        const newWaypointPosition = rotateWaypointAroundShip(value * -1, currentWaypointPosition, currentShipPosition);
        currentWaypointPosition[0] = newWaypointPosition[0];
        currentWaypointPosition[1] = newWaypointPosition[1];
        break;
      }
      case Direction.Left: {
        const newWaypointPosition = rotateWaypointAroundShip(value, currentWaypointPosition, currentShipPosition);
        currentWaypointPosition[0] = newWaypointPosition[0];
        currentWaypointPosition[1] = newWaypointPosition[1];
        break;
      }
      case Direction.Forward: {
        const distance = [
          currentWaypointPosition[0] - currentShipPosition[0],
          currentWaypointPosition[1] - currentShipPosition[1],
        ];
        currentShipPosition[0] += distance[0] * value;
        currentShipPosition[1] += distance[1] * value;
        currentWaypointPosition[0] += distance[0] * value;
        currentWaypointPosition[1] += distance[1] * value;
      }
    }
  });
  return currentShipPosition;
};

export const moveShipForInstructions = (instructions: Instruction[]): number[] => {
  const currentPosition = [0, 0];
  let currentDirectionIndex = 1;
  instructions.forEach(({ direction, value }) => {
    switch (direction) {
      case Direction.North:
        currentPosition[1] += value;
        break;
      case Direction.South:
        currentPosition[1] -= value;
        break;
      case Direction.East:
        currentPosition[0] += value;
        break;
      case Direction.West:
        currentPosition[0] -= value;
        break;
      case Direction.Right:
        currentDirectionIndex = (currentDirectionIndex + value / 90) % directionVectors.length;
        break;
      case Direction.Left:
        currentDirectionIndex =
          (currentDirectionIndex - value / 90 + directionVectors.length) % directionVectors.length;
        break;
      case Direction.Forward:
        currentPosition[0] += directionVectors[currentDirectionIndex][0] * value;
        currentPosition[1] += directionVectors[currentDirectionIndex][1] * value;
    }
  });
  return currentPosition;
};

const parseInput = (input: string): Instruction[] => {
  return input.split('\n').map(i => {
    return {
      direction: i.charAt(0) as Direction,
      value: parseInt(i.substring(1)),
    };
  });
};

export async function p2020day12_part1(input: string): Promise<number> {
  const instructions = parseInput(input);
  const position = moveShipForInstructions(instructions);
  return manhattanDistance(position[0], position[1]);
}

export async function p2020day12_part2(input: string): Promise<number> {
  const instructions = parseInput(input);
  const position = moveWaypointForInstructions(instructions);
  return manhattanDistance(position[0], position[1]);
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day12_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day12_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day12_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day12_part2(input));
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
