import { $, _ } from './hkts';

type getT<A, X> = X extends $<A, [infer T]> ? T : never;

type test1 = getT<Array<_>, string[]>;

const recordMap = <A, B>(f: <T>(x: $<A, [T]>) => $<B, [T]>) => <
  O extends { [K in keyof O]: $<A, [any]> }
>(
  o: O
): { [K in keyof O]: $<B, [getT<A, O[K]>]> } =>
  Object.fromEntries(Object.entries(o).map(([k, v]) => [k, f(v)])) as any;

type A<T> = { validValue: T };

const x = { k: { validValue: 'sadf' }, asdf: { validValue: 123 } };

const y = recordMap<A<_>, _>((x) => x.validValue)(x);
