export const filterMap = <T, E>(list: T[], f: (x: T) => E | undefined): E[] =>
  list.reduce((acc, value) => {
    const x = f(value);
    return x === undefined ? acc : [...acc, x];
  }, [] as E[]);
