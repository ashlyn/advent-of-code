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

const TILE_SIZE = 10;
const ASSEMBLED_TILE_SIZE = TILE_SIZE - 2;

const SEARCH_CHARACTER = '#';

enum Orientation {
  Right = 1,
  Bottom = 2,
}

type TileOrientation = {
  edgeIds: number[];
  variationBody: string[];
};

type Tile = {
  id: number;
  originalBody: string[];
  orientations: TileOrientation[];
  potentialNeighbors?: Tile[];
};

type OrientedTile = {
  id: number;
  orientation?: TileOrientation;
};

type FindMonsterOutput = {
  mapWithMonsters: string[];
  monsters: number;
  roughness: number;
};

const getEdgeId = (edge: string) => parseInt(edge.replace(/#/g, '1').replace(/\./g, '0'), 2);

const parseTile = (input: string): Tile => {
  const [idLine, ...body] = input.split('\n');
  const id = parseInt(idLine.substring(5, 9));
  return {
    id: id,
    originalBody: body,
    orientations: buildAllOrientations(body),
  };
};

const rotateTile = (tile: string[]): string[] => {
  return [...tile[0]].map((_, i) =>
    tile
      .map(row => row[i])
      .reverse()
      .join('')
  );
};

const buildAllOrientations = (tile: string[]): TileOrientation[] => {
  const orientations: TileOrientation[] = [];
  for (let flips = 0; flips < 2; flips++) {
    for (let rotations = 0; rotations < 4; rotations++) {
      const top = tile[0];
      const bottom = tile[tile.length - 1];
      const left = tile.map(row => row[0]).join('');
      const right = tile.map(row => row[row.length - 1]).join('');
      const edgeIds = [top, right, bottom, left].map(edge => getEdgeId(edge));
      orientations.push({
        edgeIds: edgeIds,
        variationBody: tile.slice(1, tile.length - 1).map(row => row.substring(1, row.length - 1)),
      });
      tile = rotateTile(tile);
    }
    tile = tile.reverse();
  }
  return orientations;
};

const buildPotentialNeighbors = (tiles: Tile[]): void => {
  tiles.forEach(currentTile => {
    const potentialNeighbors = tiles.filter(
      t =>
        t !== currentTile &&
        t.orientations[0].edgeIds.some(id => currentTile.orientations.some(t => t.edgeIds.some(edge => edge === id)))
    );
    currentTile.potentialNeighbors = potentialNeighbors;
  });
};

const createMatchingFunction = (tiles: Tile[]) => (
  tile: OrientedTile | undefined,
  orientation: Orientation
): OrientedTile | undefined => {
  if (!tile) return;
  const currentTile = tiles.find(t => t.id === tile.id);
  if (!currentTile || !currentTile.potentialNeighbors) return;
  return currentTile.potentialNeighbors
    .map(neighbor => {
      return {
        id: neighbor.id,
        orientation: neighbor.orientations.find(
          v => tile.orientation?.edgeIds[orientation] === v.edgeIds[orientation ^ 2]
        ),
      };
    })
    .find(t => t.orientation !== undefined);
};

const orientAndAssemble = (tiles: Tile[]): string[][] => {
  const matchingFunction = createMatchingFunction(tiles);
  const startingCorner = tiles.filter(t => t.potentialNeighbors?.length === 2)[0];
  const cornerEdges = startingCorner.potentialNeighbors?.flatMap(n => n.orientations.flatMap(v => v.edgeIds));
  const topLeft = startingCorner.orientations.find(({ edgeIds: [, right, bottom] }) =>
    [bottom, right].every(e => cornerEdges?.includes(e))
  );
  let currentTile: OrientedTile | undefined = { id: startingCorner.id, orientation: topLeft };
  const orientedTiles: Array<Array<OrientedTile | undefined>> = [[]];
  while (currentTile) {
    orientedTiles[orientedTiles.length - 1].push(currentTile);
    currentTile = matchingFunction(currentTile, Orientation.Right);
    if (!currentTile) {
      const topTile = orientedTiles[orientedTiles.length - 1][0];
      currentTile = matchingFunction(topTile, Orientation.Bottom);
      if (currentTile) {
        orientedTiles.push([]);
      }
    }
  }

  const assembled = [...new Array(orientedTiles.length * ASSEMBLED_TILE_SIZE)].map((_, y) => {
    return [...new Array(orientedTiles[0].length * ASSEMBLED_TILE_SIZE)].map((_, x) => {
      return (
        orientedTiles[y >> 3][x >> 3]?.orientation?.variationBody[y & (ASSEMBLED_TILE_SIZE - 1)].charAt(
          x & (ASSEMBLED_TILE_SIZE - 1)
        ) || ''
      );
    });
  });

  return assembled;
};

const findMonsters = (assembledMap: string[][]): FindMonsterOutput | undefined => {
  const monster = ['                  # ', '#    ##    ##    ###', ' #  #  #  #  #  #   '].map(row => row.split(''));
  const coordinatesForMonster = monster.flatMap((row, y) => {
    return row.reduce((coords, cell, x) => (cell === '#' ? [...coords, [x, y]] : coords), [] as number[][]);
  });
  let monsterCount = 0;
  for (let flips = 0; flips < 2; flips++) {
    for (let rotations = 0; rotations < 4; rotations++) {
      for (let y = 0; y < assembledMap.length - monster.length; y++) {
        for (let x = 0; x < assembledMap[0].length - monster[0].length; x++) {
          if (coordinatesForMonster.every(([dx, dy]) => assembledMap[y + dy][x + dx] === SEARCH_CHARACTER)) {
            // replace to not double-count monster characters
            coordinatesForMonster.forEach(([dx, dy]) => (assembledMap[y + dy][x + dx] = 'O'));
            monsterCount++;
          }
        }
      }
      if (monsterCount) break;
      assembledMap = rotateTile(assembledMap.map(row => row.join(''))).map(row => row.split(''));
    }
    assembledMap.reverse();
  }
  if (monsterCount) {
    return {
      mapWithMonsters: assembledMap.map(row => row.join('')),
      monsters: monsterCount,
      roughness: assembledMap
        .map(row => row.filter(character => character === '#').length)
        .reduce((sum, v) => sum + v, 0),
    };
  }
};

export async function p2020day20_part1(input: string): Promise<number> {
  const tiles = input.split('\n\n').map(parseTile);
  buildPotentialNeighbors(tiles);
  const corners = tiles.filter(t => t.potentialNeighbors?.length === 2);
  return corners.reduce((a, b) => a * b.id, 1);
}

export async function p2020day20_part2(input: string): Promise<number> {
  const tiles = input.split('\n\n').map(parseTile);
  buildPotentialNeighbors(tiles);
  const assembled = orientAndAssemble(tiles);
  const output = findMonsters(assembled);
  if (!output) return 0;
  const { roughness } = output;
  return roughness;
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
