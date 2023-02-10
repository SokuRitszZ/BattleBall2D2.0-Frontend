export type typeResponse = {
  code: 0;
  data: any;
} | {
  code: 1 | 2 | 3;
  msg: string;
};

type NotZero<T extends number> = T extends 0 ? never : T;