"use strict";
exports.__esModule = true;
exports.ast = void 0;
var parser_1 = require("./parser");
var parser = parser_1.load(['b', 'a', 'a']);
var A = function () {
    if (parser.is('b')) {
        parser.consume(APrime);
        return parser.success('be');
    }
};
var APrime = function () {
    if (parser.is('a')) {
        parser.consume(APrime);
        return parser.success('ah');
    }
    if (parser.is(parser_1.eof)) {
        return parser.success('end');
    }
};
exports.ast = A();
