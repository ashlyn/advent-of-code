import { parseInput } from '.';

describe('2020 Day 1 Solution', () => {
  it('Parses input into array of integers', () => {
    const input = '1\n02\n1234';
    expect(parseInput(input)).toStrictEqual([1, 2, 1234]);
  });
});
