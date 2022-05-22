export const eof = Symbol('eof');

type AST<node> = [node, AST<node>[]];

export type Parser<token, node> = {
  is: (token: token | typeof eof) => boolean;
  consume: (token: token | (() => AST<node>)) => void;
  success: (node: node) => AST<node>;
};

export const load = <token, node>(tokens: token[]): Parser<token, node> => {
  const pop = () => {
    const token = tokens[0];
    if (token !== undefined) {
      tokens = tokens.slice(1);
      return token;
    }
  };

  const peek = () => {
    if (tokens.length === 0) {
      return eof;
    }
    return tokens[0];
  };

  let current: AST<node>[] = [];

  return {
    is: (match) => {
      if (match === peek()) {
        const token = pop();
        current = [];
        return true;
      }
      return false;
    },

    consume: (match) => {
      const scratch = current;
      if (match instanceof Function) {
        const success = match();
        if (success === undefined) {
          throw { error: true, ast: current, tried: match };
        }
        current = [...scratch, success];
      } else {
        const token = pop();
        if (token !== match) {
          throw { error: true, ast: current, tried: match, found: token };
        }
      }
    },

    success: (node) => {
      return [node, current];
    },
  };
};
