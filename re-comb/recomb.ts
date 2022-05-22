
// Accepts only two exact code points, not full strings. How to handle surrogate pairs?
const digit = literalRange('0', '9')
const nonZeroDigit = literalRange('1', '9')

const regex = one(nonZeroDigit).any(digit).optionally(oneOf(literal('.'), literal(',')).some(digit)))

one(x) == repeat(1, x)
any(x) == repeat(0, Infinity, x)
some(x) == repeat(1, Infinity, x)
optionally(x) == repeat(0, 1, x)

const { isMatch } = x.test(s)

// either startOfString or endOfString makes it a thing that can only be matched, but behaves as matchFirst.
const { isMatch, match, groups: { group1 } } = startOfString().capture('group1', x).endOfString().match(s)
// match and groups are probably undefined if no match
const { isMatch, match, groups: { group1 } } = capture('group1', x).matchFirst(s)
// matchAll returns a list of the same things as matchFirst
const [ { isMatch, match, groups: { group1 } }, ... ] = capture('group1', x).matchAll(s)

const { isMatch, str } = startOfString().capture('group1', x, x => x.reverse()).endOfString().replace(s)
// return values are here all the same, regardless if it matches or not
const { isMatch, str } = capture('group1', x, x => x.reverse()).replaceFirst(s)
const { isMatch, str } = capture('group1', x, x => x.reverse()).replaceAll(s)
// not sure str here is the best word, maybe replaced or replacedString

// .capture should probably behave the same for replace and match, with an optional third argument for replacement transformations
// for .match this would mean that `groups` are changed probably, maybe not match?

// we should have a mechanism for producing every string matched by the regex
// an iterator works well for representing a lazy seq of potentially infinitely many of these