type a =
  | ['Case1', number]
  | ['Case2', number, string]
  | ['Case3', string]
  | ['Case4', string, string, string];

type b =
  | ['Case5', string, number]
  | ['Case6', string]
  | ['Case7', number, number]
  | ['Case8', string];

type c = a | b;

type d =
  | ['case1', { age: number; name: string }, Date]
  | ['case2', { name: string }];

type ADT = [string, ...unknown[]];

type discriminants<adt extends ADT> = adt extends [infer tag, ...unknown[]]
  ? tag
  : never;

type select<
  adt extends ADT,
  selector extends discriminants<adt>
> = adt extends [selector, ...any[]] ? adt : never;

type matchPattern<adt extends ADT> = {
  [tag in discriminants<adt>]: ((...args: select<adt, tag>) => any) extends (
    h: string,
    ...t: infer T
  ) => any
    ? (...x: T) => any
    : never;
};

type returnValue<f> = f extends (...x: any) => infer r ? r : never;

const match = <A extends ADT, C extends matchPattern<A>>(
  [discriminant, ...value]: A,
  matchCase: C
): returnValue<C[discriminants<A>]> => {
  return matchCase[discriminant](...value);
};

let x: d;
const y = match(x, {
  case1: ({ age, name }, ksdjfks) => ksdjfks,
  case2: ({ name }) => name,
});
