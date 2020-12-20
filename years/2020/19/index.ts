import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 19;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/19/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/19/data.txt
// problem url : https://adventofcode.com/2020/day/19

enum PatternCharacter {
  A = 'a',
  B = 'b',
}

type Or = {
  Option1: number[];
  Option2: number[];
};

type Rule = PatternCharacter | number[] | Or;

const buildRules = (input: string): Map<number, Rule> => {
  const rules: Map<number, Rule> = new Map();
  input.split('\n').forEach(ruleStr => {
    const parts = ruleStr.split(': ');
    const index = parseInt(parts[0]);

    if (parts[1].includes(`"${PatternCharacter.A}"`)) {
      rules.set(index, PatternCharacter.A);
      return;
    }

    if (parts[1].includes(`"${PatternCharacter.B}"`)) {
      rules.set(index, PatternCharacter.B);
      return;
    }

    const options = parts[1].split(' | ').map(o => {
      return o.split(' ').map(r => parseInt(r));
    });
    if (options.length === 1) {
      rules.set(index, options[0]);
      return;
    }

    rules.set(index, { Option1: options[0], Option2: options[1] });
  });
  return rules;
};

const matchPatternForRule = (
  pattern: string,
  rules: Map<number, Rule>,
  ruleIndex: number
): { result: boolean; charsMatchedSoFar: number } => {
  const rule = rules.get(ruleIndex);
  if (!rule) {
    return { result: false, charsMatchedSoFar: 0 };
  }

  if (pattern.charAt(0) === rule) return { result: true, charsMatchedSoFar: 1 };

  if (typeof rule === 'string') return { result: false, charsMatchedSoFar: 0 };

  const ruleOptions = Array.isArray(rule) ? [rule] : [rule.Option1, rule.Option2];

  for (const option of ruleOptions) {
    let i = 0;
    let matches = true;
    for (const index of option) {
      const { result, charsMatchedSoFar } = matchPatternForRule(pattern.substring(i), rules, index);
      if (!result) {
        matches = false;
        break;
      }
      i = i + charsMatchedSoFar;
    }
    if (matches) return { result: true, charsMatchedSoFar: i };
  }

  return { result: false, charsMatchedSoFar: 0 };
};

const matchPatternsForRule = (patternInput: string, rules: Map<number, Rule>): string[] => {
  return patternInput.split('\n').filter(p => {
    const { result, charsMatchedSoFar: charCount } = matchPatternForRule(p, rules, 0);
    return result && charCount == p.length;
  });
};

const matchPatternsForRuleWithLoops = (patternInput: string, rules: Map<number, Rule>): string[] => {
  // basing on assumption that 0: 8 11
  const left = 42;
  const right = 31;
  rules.set(8, { Option1: [left], Option2: [left, 8] });
  rules.set(11, { Option1: [left, right], Option2: [left, 11, right] });

  return patternInput.split('\n').filter(p => {
    let currentIndex = 0;
    const currentMatches: Map<number, number> = new Map();
    let currentRule = left;
    while (currentIndex < p.length) {
      const { result, charsMatchedSoFar } = matchPatternForRule(p.substring(currentIndex), rules, currentRule);
      if (result) {
        currentMatches.set(currentRule, (currentMatches.get(currentRule) || 0) + 1);
      } else if (currentRule === left) {
        currentRule = right;
      } else {
        break;
      }
      currentIndex += charsMatchedSoFar;
    }

    return (
      currentIndex === p.length &&
      currentMatches.has(right) &&
      (currentMatches.get(left) ?? 0) > (currentMatches.get(right) ?? 0)
    );
  });
};

export async function p2020day19_part1(input: string): Promise<number> {
  const [rulesInput, patternsInput] = input.split('\n\n');
  const rules = buildRules(rulesInput);
  const matches = matchPatternsForRule(patternsInput, rules);
  return matches.length;
}

// 213 too low
export async function p2020day19_part2(input: string): Promise<number> {
  const [rulesInput, patternsInput] = input.split('\n\n');
  const rules = buildRules(rulesInput);
  const matches = matchPatternsForRuleWithLoops(patternsInput, rules);
  return matches.length;
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day19_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day19_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day19_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day19_part2(input));
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
