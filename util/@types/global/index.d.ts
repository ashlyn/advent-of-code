interface TestCase {
  input: string;
  expected: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'a-star' {
  export default function (options: any): { status: stringify; path: any[] };
}
