import { $, _ } from './hkts';

type Exists<C> = <R>(run: <A>(_: $<C, [A]>) => R) => R;
const mk = <Mk>() => <A>(v_: $<Mk, [A]>): Exists<Mk> => (run) => run(v_);
const run = <Mk, R>(runner: (x: Mk) => R) => (foo: Exists<Mk>): R =>
  foo(runner);

// Userland

type Tuple<E> = [E, (a: E) => boolean];
const foo = (foos: Exists<Tuple<_>>[]) => foos.map(run(([v, p]) => p(v)));

const mkT = mk<Tuple<_>>();
const res = foo([mkT(['dk', (str) => str.length > 2]), mkT([3, (n) => n > 2])]);

type myRecord = ((input: 'a') => number) & ((input: 'b') => string);

function r(input: 'a'): number;
function r(input: 'b'): string;
function r(input: unknown): unknown {
  switch (input) {
    case 'a':
      return 0;
    case 'b':
      return '';
  }
}

const y = r('a');
