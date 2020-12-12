import { p2020day12_part1, p2020day12_part2, Direction, moveShipForInstructions, rotateWaypointAroundShip } from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2020 Day 12', () => {
  describe('moveShipForInstructions', () => {
    it('Moves North correctly', () => {
      const instructions = [
        {
          direction: Direction.North,
          value: 10,
        },
      ];

      expect(moveShipForInstructions(instructions)).toEqual([0, 10]);
    });

    it('Moves East correctly', () => {
      const instructions = [
        {
          direction: Direction.East,
          value: 10,
        },
      ];

      expect(moveShipForInstructions(instructions)).toEqual([10, 0]);
    });

    it('Moves South correctly', () => {
      const instructions = [
        {
          direction: Direction.South,
          value: 10,
        },
      ];

      expect(moveShipForInstructions(instructions)).toEqual([0, -10]);
    });

    it('Moves West correctly', () => {
      const instructions = [
        {
          direction: Direction.West,
          value: 10,
        },
      ];

      expect(moveShipForInstructions(instructions)).toEqual([-10, 0]);
    });

    it('Moves forward correctly', () => {
      const instructions = [
        {
          direction: Direction.Forward,
          value: 10,
        },
      ];

      expect(moveShipForInstructions(instructions)).toEqual([10, 0]);
    });

    it('Turns right correctly', () => {
      const instructions = [
        {
          direction: Direction.Right,
          value: 90,
        },
        {
          direction: Direction.Forward,
          value: 10,
        },
      ];

      expect(moveShipForInstructions(instructions)).toEqual([0, -10]);
    });

    it('Turns left correctly', () => {
      const instructions = [
        {
          direction: Direction.Left,
          value: 180,
        },
        {
          direction: Direction.Forward,
          value: 10,
        },
      ];

      expect(moveShipForInstructions(instructions)).toEqual([-10, 0]);
    });
  });

  describe('rotateWaypointAroundShip', () => {
    it('Correctly rotates right', () => {
      const current = [2, 2];
      const result = rotateWaypointAroundShip(-90, current, [0, 0]);
      expect(result).toEqual([2, -2]);
    });

    it('Correctly rotates left', () => {
      const current = [2, 2];
      const result = rotateWaypointAroundShip(90, current, [0, 0]);
      expect(result).toEqual([-2, 2]);
    });
  });

  describe('Part 1 Solution', () => {
    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day12_part1(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });

  describe('Part 2 Solution', () => {
    part2Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day12_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
