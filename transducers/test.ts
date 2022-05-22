import { assert } from 'console';
import { $, _ } from './hkts';

type getT<A, X> = X extends $<A, [infer T]> ? T : never;
type Fun<x, y> = (x: x) => y;

interface Functor<F> {
  _map: <b>(f: Fun<any, b>) => $<F, [b]>;
}

const incStuff = <F extends Functor<F>>(
  stuff: $<F, [number]>
): $<F, [number]> => {
  return stuff._map((x: number) => x + 1);
};
const toString = <F extends Functor<F>>(
  stuff: $<F, [number]>
): $<F, [string]> => {
  return stuff._map((x: number) => x.toString());
};

declare global {
  interface Array<T> extends Functor<Array<_>> {}
  interface Map<K, V> extends Functor<Map<K, _>> {}
}
Array.prototype._map = function <a, b>(f: (x: a) => b) {
  return this.map(f);
};
Map.prototype._map = function <a, b>(f: (x: a) => b) {
  return new Map([...this.entries()].map(([k, v]) => [k, f(v)])) as any;
};

const z = incStuff<Array<_>>([1, 2, 3, 4, 4]);
const x = toString<Array<_>>([1, 2, 3, 4, 4]);
const y = toString<Map<string, _>>(
  new Map([
    ['a', 0],
    ['b', 1],
    ['c', 2],
  ]) as any
);

console.log(x);
console.log(y);

type Movable<t> = {
  move: (x: number, y: number) => t;
};

function translate<t extends Movable<t>>(x: t, b: boolean = false): t {
  if (b) {
    return x;
  }
  return x.move(1, 1);
}

type Point = {
  x: number;
  y: number;
  move: (x: number, y: number) => Point;
};
const Point = (x: number, y: number): Point => ({
  x,
  y,
  move: (dx, dy) => Point(x + dx, y + dy),
});

const p = Point(1, 1);
const p2 = translate(p);

const empty = (field: never): any => {
  assert(false);
  return null;
};

const set = <rec extends (field: any) => any, f, a>(
  rec: rec,
  field: f,
  value: a
): rec & ((field: f) => a) =>
  ((f: any) => {
    if (f === field) {
      return value;
    }
    return rec(f);
  }) as any;

type name = typeof name;
const name: unique symbol = Symbol('name');

type age = typeof age;
const age: unique symbol = Symbol('age');

interface person {
  (field: name): string;
  (field: age): number;
}
const roger: person = set(set(empty, name, 'Roger'), age, 42);

const rogersName = roger(name);
const rogersAge = roger(age);

console.log(rogersName);
console.log(rogersAge);
