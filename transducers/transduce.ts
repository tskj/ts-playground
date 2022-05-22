import { InitReducer, IReducable } from './reduce';

export type transducer<a, b, Coll, Result> = (
  r: InitReducer<b, Coll, Result>
) => InitReducer<a, Coll, Result>;

interface multiArity<a, b, x, y, z> {
  (): x;
  (a: a): y;
  (a: a, b: b): z;
}
export const multiArity = <a, b, x, y, z>({
  arity0,
  arity1,
  arity2,
}: {
  arity0: () => x;
  arity1: (a: a) => y;
  arity2: (a: a, b: b) => z;
}): multiArity<a, b, x, y, z> =>
  ((a?: a, b?: b) => {
    if (a === undefined) {
      return arity0();
    }
    if (b === undefined) {
      return arity1(a);
    }
    return arity2(a, b);
  }) as multiArity<a, b, x, y, z>;

// Make stupid comp overlaods
export const comp = <a, b, c>(f: (x: b) => c, g: (y: a) => b) => (y: a): c =>
  f(g(y));

const transduce = <b, Coll, Result>(
  step: InitReducer<b, Coll, Result>,
  onComplete: (result: Coll) => Coll = (x) => x
) => <a>(
  reducer: (result: Coll, input: a) => Coll
): InitReducer<a, Coll, Result> =>
  multiArity({
    arity0: step,
    arity1: (result) => step(onComplete(result)),
    arity2: reducer,
  });

export const map = <a, b, Coll, Result>(
  f: (x: a) => b
): transducer<a, b, Coll, Result> => (step) =>
  transduce(step)((result, input) => {
    return step(result, f(input));
  });

export const filter = <a, Coll, Res>(
  p: (x: a) => boolean
): transducer<a, a, Coll, Res> => (step) =>
  transduce(step)((result, input) => {
    if (p(input)) {
      return step(result, input);
    } else {
      return result;
    }
  });

export const cat = <T, Coll, Res>(step: InitReducer<T, Coll, Res>) => (
  result: Coll,
  input: IReducable<T>
) =>
  input._reduce(
    multiArity({ arity0: () => result, arity1: (x) => x, arity2: step })
  );

export const flatMap = <T>(f: (x: T) => IReducable<T>) => comp(map(f), cat);

const take = <a, Coll, Res>(n: number): transducer<a, a, Coll, Res> => (
  step
) => {
  let taken = 0;
  return transduce(step)((result, value) => {
    if (taken === n) {
      throw step(result);
    }
    taken++;
    return step(result, value);
  });
};

// repeat
// partition
// taking-while
