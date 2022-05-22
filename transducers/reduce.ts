const reducedSymbol: unique symbol = Symbol('reduced');
type Reduced<T> = { [reducedSymbol]: true; value: T };
const reduced = <T>(value: T): Reduced<T> => ({ [reducedSymbol]: true, value });
const isReduced = <T>(x: unknown): x is Reduced<T> => x[reducedSymbol] === true;
const derefReduced = <T>(x: Reduced<T>): T => x.value;

export interface reducer<x, Coll, Result> {
  (result: Coll): Result;
  (result: Coll, input: x): Coll;
}
export interface InitReducer<x, Coll, Result> extends reducer<x, Coll, Result> {
  (): Coll;
}

export interface IReducable<x> {
  _reduce<Acc, Res>(reducer: reducer<x, Acc, Res>, init: Acc): Res;
  _reduce<Acc, Res>(reducer: InitReducer<x, Acc, Res>): Res;
}

declare global {
  interface Array<T> extends IReducable<T> {}
}
Array.prototype._reduce = function <V, Acc, Res>(
  this: V[],
  reducer: InitReducer<V, Acc, Res>,
  acc?: Acc
): Res {
  if (acc === undefined) {
    return this._reduce(reducer, reducer());
  }
  if (this.length === 0) {
    return reducer(acc);
  }
  const [x, ...xs] = this;
  const next = reducer(acc, x);
  return xs._reduce(reducer, next);
};
export const conjList = <V>(list: V[], x: V): V[] => [...list, x];

const x = ['']._reduce<number, number>((acc: number, res?: string) => acc, 0);
