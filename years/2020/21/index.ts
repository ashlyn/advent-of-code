import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { part1Tests, part2Tests } from './testCases';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 21;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// solution path: /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/21/index.ts
// data path  : /Users/ashlyn.slawnyk/workspace/advent-of-code/years/2020/21/data.txt
// problem url : https://adventofcode.com/2020/day/21

type Food = {
  ingredients: string[];
  knownAllergens: string[];
};

type AllergenOutput = {
  safeIngredients: string[];
  allergenMap: Map<string, string[]>;
};

const parseFood = (input: string): Food => {
  const parts = input.split(' (contains ');
  const ingredients = parts[0].split(' ');
  const allergens = input.length >= 2 ? parts[1].substring(0, parts[1].length - 1).split(', ') : [];
  return {
    ingredients: ingredients,
    knownAllergens: allergens,
  };
};

const getSafeIngredients = (foods: Food[]): AllergenOutput => {
  const allergenMap: Map<string, string[]> = new Map();

  foods.forEach(f => {
    f.knownAllergens.forEach(a => {
      if (!allergenMap.has(a)) {
        allergenMap.set(a, f.ingredients);
      } else {
        const currentIngredients = allergenMap.get(a) || [];
        const newIngredients = f.ingredients.filter(i => currentIngredients.includes(i));
        allergenMap.set(a, newIngredients);
      }
    });
  });

  const potentialAllergenIngredients = new Set([...allergenMap.values()].flat());
  const safe = foods.flatMap(f => {
    return f.ingredients.filter(i => !potentialAllergenIngredients.has(i));
  });

  return {
    safeIngredients: safe,
    allergenMap: allergenMap,
  };
};

const buildCanonicalDangerousIngredientList = ({ allergenMap }: AllergenOutput): string => {
  const translations: Map<string, string> = new Map();
  while (translations.size < allergenMap.size) {
    const [allergen, ingredients] =
      [...allergenMap.entries()].find(a => a[1].length === 1 && !translations.has(a[0])) || [];
    if (!allergen || !ingredients) return '';

    translations.set(allergen, ingredients[0]);
    [...allergenMap.entries()].forEach(a => {
      if (a[0] !== allergen && a[1].includes(ingredients[0])) {
        const index = a[1].findIndex(i => i === ingredients[0]);
        a[1].splice(index, 1);
      }
    });
  }

  return [...translations.keys()]
    .sort()
    .map(a => allergenMap.get(a) || '')
    .join(',');
};

export async function p2020day21_part1(input: string): Promise<number> {
  const foods = input.split('\n').map(i => parseFood(i));
  const { safeIngredients } = getSafeIngredients(foods);
  return safeIngredients.length;
}

export async function p2020day21_part2(input: string): Promise<string | undefined> {
  const foods = input.split('\n').map(i => parseFood(i));
  const allergenOutput = getSafeIngredients(foods);
  const list = buildCanonicalDangerousIngredientList(allergenOutput);
  return list;
}

async function runTests() {
  // Run tests
  test.beginTests();
  test.beginSection();
  for (const testCase of part1Tests) {
    test.logTestResult(testCase, String(await p2020day21_part1(testCase.input)));
  }
  test.beginSection();
  for (const testCase of part2Tests) {
    test.logTestResult(testCase, String(await p2020day21_part2(testCase.input)));
  }
  test.endTests();
}

async function run() {
  await runTests();

  // Get input and run program while measuring performance
  const input = await util.getInput(DAY, YEAR);

  const part1Before = performance.now();
  const part1Solution = String(await p2020day21_part1(input));
  const part1After = performance.now();

  const part2Before = performance.now();
  const part2Solution = String(await p2020day21_part2(input));
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
