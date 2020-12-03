export const part1Tests: TestCase[] = [
  {
    description: 'Simple array',
    input: '[1,2,3]',
    expected: '6',
  },
  {
    description: 'Simple object',
    input: '{"a":2,"b":4}',
    expected: '6',
  },
  {
    description: 'Nested array',
    input: '[[[3]]]',
    expected: '3',
  },
  {
    description: 'Nested object',
    input: '{"a":{"b":4},"c":-1}',
    expected: '3',
  },
  {
    description: 'Object of array',
    input: '{"a":[-1,1]}',
    expected: '0',
  },
  {
    description: 'Array of object',
    input: '[-1,{"a":1}]',
    expected: '0',
  },
  {
    description: 'Empty array',
    input: '[]',
    expected: '0',
  },
  {
    description: 'Empty object',
    input: '{}',
    expected: '0',
  },
];
export const part2Tests: TestCase[] = [
  {
    description: 'Simple array',
    input: '[1,2,3]',
    expected: '6',
  },
  {
    description: 'Object with red property',
    input: '[1,{"c":"red","b":2},3]',
    expected: '4',
  },
  {
    description: 'Top-level contains red',
    input: '{"d":"red","e":[1,2,3,4],"f":5}',
    expected: '0',
  },
  {
    description: 'Array containing red',
    input: '[1,"red",5]',
    expected: '6',
  },
];
