import { p2020day7_part1, p2020day7_part2, parseChildren, parseLine } from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2020 Day 7', () => {
  describe('parseChildren', () => {
    it('Correctly parses no children', () => {
      const input = 'contain no other bags.';
      const result = parseChildren(input);

      expect(result).toEqual([]);
    });

    it('Correctly parses single children', () => {
      const input = '1 shiny gold bag.';
      const result = parseChildren(input);

      expect(result).toEqual([{ name: 'shiny gold', count: 1 }]);
    });

    it('Correctly parses multiple children', () => {
      const input = '3 posh turquoise bags, 4 dull lime bags, 3 vibrant fuchsia bags, 2 dull green bags.';
      const result = parseChildren(input);

      expect(result).toEqual([
        { name: 'posh turquoise', count: 3 },
        { name: 'dull lime', count: 4 },
        { name: 'vibrant fuchsia', count: 3 },
        { name: 'dull green', count: 2 },
      ]);
    });
  });

  describe('parseLine', () => {
    it('Correctly parses no children', () => {
      const parent = 'faded blue';
      const input = `${parent} bags contain no other bags.`;
      const result = parseLine(input);

      expect(result).toEqual({ name: parent, count: 1, children: [] });
    });

    it('Correctly parses single children', () => {
      const parent = 'bright white';
      const input = `${parent} bags contain 1 shiny gold bag.`;
      const result = parseLine(input);

      expect(result).toEqual({
        name: parent,
        count: 1,
        children: [
          {
            name: 'shiny gold',
            count: 1,
          },
        ],
      });
    });

    it('Correctly parses multiple children', () => {
      const parent = 'posh purple';
      const input = `${parent} bags contain 3 posh turquoise bags, 4 dull lime bags, 3 vibrant fuchsia bags, 2 dull green bags.`;
      const result = parseLine(input);

      expect(result).toEqual({
        name: parent,
        count: 1,
        children: [
          { name: 'posh turquoise', count: 3 },
          { name: 'dull lime', count: 4 },
          { name: 'vibrant fuchsia', count: 3 },
          { name: 'dull green', count: 2 },
        ],
      });
    });
  });

  describe('Part 1 Solution', () => {
    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day7_part1(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });

  describe('Part 2 Solution', () => {
    part2Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day7_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
