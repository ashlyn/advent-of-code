import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 20;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/20/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/20/data.txt
// problem url : https://adventofcode.com/2020/day/20

type Coords = {
  x: number;
  y: number;
};

interface ITile {
  id: number;
  body: string[];
  coords: Coords | null;
  neighbors: ITile[];
  setPotentialNeighbors: (tiles: ITile[]) => ITile[];
  getEdges: () => string[];
  setAdjacency: (tile: ITile) => Coords | null;
  getBodyWithoutBorder: () => string[];
}

class Tile implements ITile {
  id: number;
  body: string[];
  coords: Coords | null;
  neighbors: ITile[];

  constructor(input: string) {
    const [idLine, ...body] = input.split('\n');
    this.body = body;
    this.id = parseInt(idLine.substring(5, 10));
    this.coords = null;
    this.neighbors = [];
  }

  private rotate = (): void => {
    this.body = this.body.map((row, i) =>
      [...row].map((c, j) => this.body[i].charAt(this.body.length - j - 1)).join('')
    );
  };

  public getBodyWithoutBorder = (): string[] => {
    return this.body.slice(1, this.body.length - 1).map(row => row.substring(1, row.length - 1));
  };

  public getEdges = (): string[] => {
    const top = this.body[0];
    const bottom = this.body[this.body.length - 1];
    const left = this.body.map(row => row.charAt(0)).join('');
    const right = this.body.map(row => row.charAt(row.length - 1)).join('');

    const originals = [top, bottom, left, right];
    const flipped = originals.map(o => [...o].reverse().join(''));
    return [...originals, ...flipped];
  };

  public setPotentialNeighbors = (tiles: ITile[]): ITile[] => {
    if (this.neighbors.length > 0) return this.neighbors;
    const neighbors = tiles.filter(t => {
      if (t.id === this.id) return false;
      const edges = t.getEdges();
      return this.getEdges().find(e => edges.includes(e));
    });
    this.neighbors = neighbors;
    return neighbors;
  };

  public setAdjacency = (tile: ITile): Coords | null => {
    if (!tile.coords) return null;

    for (let i = 0; i <= 4; i++) {
      if (tile.body[0] === this.body[this.body.length]) {
        this.coords = { x: tile.coords.x, y: tile.coords.y - 1 };
        return this.coords;
      }

      if (tile.body[0] === this.body[0]) {
        this.body = this.body.reverse();
        this.coords = { x: tile.coords.x, y: tile.coords.y - 1 };
        return this.coords;
      }

      if (tile.body[tile.body.length - 1] === this.body[0]) {
        this.coords = { x: tile.coords.x, y: tile.coords.y + 1 };
        return this.coords;
      }

      if (tile.body[tile.body.length - 1] === this.body[this.body.length - 1]) {
        this.body = this.body.reverse();
        this.coords = { x: tile.coords.x, y: tile.coords.y + 1 };
        return this.coords;
      }

      const tileLeft = tile.body.map(row => row.charAt(0)).join('');
      const thisRight = this.body.map(row => row.charAt(row.length - 1)).join('');
      if (tileLeft === thisRight) {
        this.coords = { x: tile.coords.x - 1, y: tile.coords.y };
        return this.coords;
      }

      const tileRight = tile.body.map(row => row.charAt(row.length - 1)).join('');
      const thisLeft = this.body.map(row => row.charAt(0)).join('');

      if (tileLeft === thisLeft) {
        this.body = this.body.map(row => [...row].reverse().join(''));
        this.coords = { x: tile.coords.x - 1, y: tile.coords.y };
        return this.coords;
      }

      if (tileRight === thisLeft) {
        this.coords = { x: tile.coords.x + 1, y: tile.coords.y };
        return this.coords;
      }

      if (tileRight === thisRight) {
        this.body = this.body.map(row => [...row].reverse().join(''));
        this.coords = { x: tile.coords.x + 1, y: tile.coords.y };
        return this.coords;
      }

      this.rotate();
    }

    return null;
  };
}

const setAllCoords = (tiles: ITile[]): ITile[] => {
  tiles[0].coords = { x: 0, y: 0 };
  while (tiles.some(t => !t.coords)) {
    const current = tiles.find(t => !t.coords);
    const withCoords = tiles.filter(t => t.coords);
    withCoords.some(t => current?.setAdjacency(t));
  }
  return tiles;
};

const assemble = (tiles: ITile[]): string[] => {
  const dimension = Math.sqrt(tiles.length);
  tiles.forEach(t => t.setPotentialNeighbors(tiles));
  const corners = tiles.filter(t => t.neighbors.length === 2);

  for (let y = 0; y < dimension; y++) {
    for (let x = 0; x < dimension; x++) {
      let current: ITile | undefined;
      if (x === 0 && y === 0) {
        current = corners[2];
      } else {
        const left = tiles.find(t => t.coords?.x === x - 1 && t.coords?.y === y);
        const top = tiles.find(t => t.coords?.x === x && t.coords?.y === y - 1);
        const topEdge = y === 0;
        const bottomEdge = y === dimension - 1;
        const leftEdge = x === 0;
        const rightEdge = x === dimension - 1;

        const isEdge = leftEdge || rightEdge || topEdge || bottomEdge;
        const isCorner = (leftEdge || rightEdge) && (topEdge || bottomEdge);

        if (!left && !top) {
          return [];
        }

        current = tiles.find(
          t =>
            !t.coords &&
            (!left || t.neighbors.includes(left)) &&
            (!top || t.neighbors.includes(top)) &&
            (!isEdge || t.neighbors.length <= 3) &&
            (!isCorner || t.neighbors.length == 2)
        );
      }

      if (!current) {
        return [];
      }

      current.coords = { x: x, y: y };
    }
  }

  let complete: string[] = [];
  for (let y = 0; y < dimension; y++) {
    for (let x = 0; x < dimension; x++) {
      const current = tiles
        .filter(t => t.coords?.y === y)
        .sort((a, b) => (a.coords?.x || 0) - (a.coords?.y || 0))
        .map(t => t.getBodyWithoutBorder());
      const fullRows = current[0].map((row, i) => current.map(x => x[i]).join(''));
      complete = [...complete, ...fullRows];
    }
  }

  return complete;
};

export async function p2020day20_part1(input: string): Promise<number> {
  const tiles = input.split('\n\n').map(i => new Tile(i));
  tiles.forEach(t => t.setPotentialNeighbors(tiles));
  const corners = tiles.filter(t => t.neighbors.length === 2);
  return corners.reduce((a, t) => a * t.id, 1);
}

// 32685 too high
// 32445
export async function p2020day20_part2(input: string): Promise<string | undefined> {
  const tiles = input.split('\n\n').map(i => new Tile(i));
  const assembled = assemble(tiles).join('\n');
  const poundSigns = [...assembled].filter(a => a === '#').length;
  return 'Not implemented';
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day20_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day20_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day20_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day20_part2(input));
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
