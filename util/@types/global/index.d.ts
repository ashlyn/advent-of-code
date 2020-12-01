interface TestCase {
  input: string;
  expected: string;
  description?: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'a-star' {
  export default function (options: any): { status: stringify; path: any[] };
}
