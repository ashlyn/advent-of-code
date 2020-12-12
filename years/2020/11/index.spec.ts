import { getCountOfOccupiedSeatsInSight, p2020day11_part1, p2020day11_part2 } from '.';
import { part1Tests, part2Tests } from './testCases';

const getCoords = (input: string): string[][] => {
  return input.split('\n').map(row => row.split(''));
  // .map((row, i) => row.map((seat, j) => ({ x: i, y: j, value: seat })))
  // .flat();
  // .filter(seat => seat.value === '#');
};

describe('2020 Day 11', () => {
  describe('findVisible', () => {
    it('Finds no visible seats correctly', () => {
      const input = '.##.##.\n#.#.#.#\n##...##\n...L...\n##...##\n#.#.#.#\n.##.##.';
      const occupied = getCoords(input);
      expect(getCountOfOccupiedSeatsInSight({ x: 3, y: 3 }, occupied)).toEqual(0);
    });

    it('Empty seats block correctly', () => {
      const input = '.............\n.L.L.#.#.#.#.\n.............';
      const occupied = getCoords(input);
      expect(getCountOfOccupiedSeatsInSight({ x: 1, y: 1 }, occupied)).toEqual(0);
    });

    it('Occupied seats block correctly', () => {
      const input = '.............\n.L.#.#.#.#.#.\n.............';
      const occupied = getCoords(input);
      expect(getCountOfOccupiedSeatsInSight({ x: 1, y: 1 }, occupied)).toEqual(1);
    });

    it('Finds set of visible seats correctly', () => {
      const input = '.......#.\n...#.....\n.#.......\n.........\n..#L....#\n....#....\n.........\n#........\n...#.....';
      const occupied = getCoords(input);
      expect(getCountOfOccupiedSeatsInSight({ x: 4, y: 3 }, occupied)).toEqual(8);
    });

    it('Finds zero correctly on top of grid', () => {
      const input =
        '#.LL.LL.L#\n#LLLLLL.LL\nL.L.L..L..\nLLLL.LL.LL\nL.LL.LL.LL\nL.LLLLL.LL\n..L.L.....\nLLLLLLLLL#\n#.LLLLLL.L\n#.LLLLL.L#';
      const occupied = getCoords(input);
      expect(getCountOfOccupiedSeatsInSight({ x: 0, y: 3 }, occupied)).toEqual(0);
    });
  });

  describe('Part 1 Solution', () => {
    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day11_part1(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });

  describe('Part 2 Solution', () => {
    part2Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day11_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
