import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 7;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/07/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/07/data.txt
// problem url : https://adventofcode.com/2020/day/7

type BagNode = {
  name: string;
  count: number;
  children?: BagNode[];
};

const targetColor = 'shiny gold';
const lineSplit = ' bags contain ';
const noChildrenSubstr = 'no other bags.';
const childrenPattern = /(\d+) ([a-z ]+) bags?[.,]?/g;

export const parseChildren = (childrenStr: string): BagNode[] => {
  if (childrenStr === noChildrenSubstr) return [];
  return [...childrenStr.matchAll(childrenPattern)].map(([, count, color]) => {
    return {
      name: color,
      count: parseInt(count),
    };
  });
};

export const parseLine = (line: string): BagNode => {
  const parts = line.split(lineSplit);

  return {
    name: parts[0],
    count: 1,
    children: parseChildren(parts[1]),
  };
};

const searchForParentsOf = (children: BagNode[], nodes: BagNode[]): BagNode[] => {
  const directParents = nodes.filter(n => n.children?.some(child => children.map(c => c.name).includes(child.name)));
  if (!directParents.length) return [];
  return directParents.concat(searchForParentsOf(directParents, nodes));
};

const searchForChildrenOf = (parent: BagNode, nodes: BagNode[]): number => {
  const initialNode = nodes.find(n => n.name === parent.name);
  if (!initialNode) return 0;
  if (!initialNode.children || !initialNode.children.length) {
    return initialNode.count;
  }

  const children = initialNode.children.map(child => child.count * searchForChildrenOf(child, nodes));
  return children.reduce((a, b) => a + b, 0) + initialNode.count;
};

export async function p2020day7_part1(input: string): Promise<number> {
  const nodes = input.split('\n').map(parseLine);
  const parents = searchForParentsOf([{ name: targetColor, count: 1 }], nodes);
  return new Set(parents.map(p => p.name)).size;
}

export async function p2020day7_part2(input: string): Promise<number> {
  const nodes = input.split('\n').map(parseLine);
  const children = searchForChildrenOf({ name: targetColor, count: 1 }, nodes);
  return children - 1;
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day7_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day7_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day7_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day7_part2(input));
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
