import { executeInstructions, Operation, p2020day8_part1, p2020day8_part2 } from '.';
import { part1Tests, part2Tests } from './testCases';

describe('2020 Day 8', () => {
  describe('executeInstructions', () => {
    it('Correctly executes acc instructions', () => {
      const expected = 7;
      const input = [{ operation: Operation.Accumulate, value: expected, executed: false }];
      expect(executeInstructions(input)).toEqual({
        accumulator: expected,
        terminated: true,
      });
    });

    it('Correctly executes jmp instructions', () => {
      const input = [{ operation: Operation.Jump, value: 1, executed: false }];
      expect(executeInstructions(input)).toEqual({
        accumulator: 0,
        terminated: true,
      });
    });

    it('Correctly executes nop instructions', () => {
      const input = [{ operation: Operation.Nop, value: 7, executed: false }];
      expect(executeInstructions(input)).toEqual({
        accumulator: 0,
        terminated: true,
      });
    });

    it('Correctly handles out-of-bounds jmp instructions', () => {
      const input = [{ operation: Operation.Jump, value: 7, executed: false }];
      expect(executeInstructions(input)).toEqual({
        accumulator: 0,
        terminated: true,
      });
    });

    it('Correctly executes negative jmp instructions', () => {
      const input = [
        { operation: Operation.Jump, value: 2, executed: false },
        { operation: Operation.Jump, value: 2, executed: false },
        { operation: Operation.Jump, value: -1, executed: false },
      ];
      expect(executeInstructions(input)).toEqual({
        accumulator: 0,
        terminated: true,
      });
    });

    it('Correctly executes negative acc instructions', () => {
      const expected = -3;
      const input = [{ operation: Operation.Accumulate, value: expected, executed: false }];
      expect(executeInstructions(input)).toEqual({
        accumulator: expected,
        terminated: true,
      });
    });

    it('Correctly executes looping instructions', () => {
      const expected = 3;
      const input = [
        { operation: Operation.Accumulate, value: expected, executed: false },
        { operation: Operation.Jump, value: -1, executed: false },
      ];
      expect(executeInstructions(input)).toEqual({
        accumulator: expected,
        terminated: false,
      });
    });
  });

  describe('Part 1 Solution', () => {
    part1Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day8_part1(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });

  describe('Part 2 Solution', () => {
    part2Tests.forEach(testCase => {
      it(`${testCase.description}`, async () => {
        const actual = String(await p2020day8_part2(testCase.input));
        expect(actual).toEqual(testCase.expected);
      });
    });
  });
});
