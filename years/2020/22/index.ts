import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 22;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/22/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/22/data.txt
// problem url : https://adventofcode.com/2020/day/22

type GameOutput = {
  winner: number; // 0 or 1 (index)
  winningHand: number[];
};

const parseInput = (input: string): number[][] => {
  return input.split('\n\n').map(player => {
    const [, ...cards] = player.split('\n');
    return cards.map(c => parseInt(c));
  });
};

const getFinalScore = (cards: number[]): number => {
  return cards.reduce((a, b, i) => a + (cards.length - i) * b, 0);
};

const playGame = (originalCards: number[][], withRecursion = false): GameOutput => {
  const cardsForPlayers = [[...originalCards[0]], [...originalCards[1]]];
  const previousRounds: Set<string> = new Set();
  while (cardsForPlayers[0].length > 0 && cardsForPlayers[1].length > 0) {
    const json = JSON.stringify(cardsForPlayers);
    if (previousRounds.has(json)) {
      return {
        winner: 0,
        winningHand: cardsForPlayers[0],
      };
    } else {
      previousRounds.add(json);
    }

    const topCards = cardsForPlayers.map(c => c.shift() ?? 0);
    let roundWinner = topCards[0] > topCards[1] ? 0 : 1;
    let sortedCards: number[] = [...topCards];
    if (withRecursion && cardsForPlayers[0].length >= topCards[0] && cardsForPlayers[1].length >= topCards[1]) {
      const newCards = [[...cardsForPlayers[0].slice(0, topCards[0])], [...cardsForPlayers[1].slice(0, topCards[1])]];
      const { winner } = playGame(newCards, withRecursion);
      roundWinner = winner;
      if (winner) sortedCards = sortedCards.reverse();
    } else {
      sortedCards = [...topCards].sort((a, b) => b - a);
    }
    cardsForPlayers[roundWinner] = cardsForPlayers[roundWinner].concat(sortedCards);
  }

  const winner = cardsForPlayers.findIndex(c => c.length > 0);
  return {
    winner: winner,
    winningHand: cardsForPlayers[winner],
  };
};

export async function p2020day22_part1(input: string): Promise<number> {
  const cardsForPlayers = parseInput(input);
  const { winningHand } = playGame(cardsForPlayers, false);
  const winningScore = getFinalScore(winningHand);
  return winningScore;
}

export async function p2020day22_part2(input: string): Promise<number> {
  const cardsForPlayers = parseInput(input);
  const { winningHand } = playGame(cardsForPlayers, true);
  const winningScore = getFinalScore(winningHand);
  return winningScore;
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day22_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day22_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day22_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day22_part2(input));
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
