import { load, eof } from './parser';

const parser = load(['b', 'a', 'a']);

const A = () => {
  if (parser.is('b')) {
    parser.consume(APrime);
    return parser.success('be');
  }
};

const APrime = () => {
  if (parser.is('a')) {
    parser.consume(APrime);
    return parser.success('ah');
  }
  if (parser.is(eof)) {
    return parser.success('end');
  }
};

export const ast = A();
