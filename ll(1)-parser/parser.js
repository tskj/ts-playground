"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.load = exports.eof = void 0;
exports.eof = Symbol('eof');
exports.load = function (tokens) {
    var pop = function () {
        var token = tokens[0];
        if (token !== undefined) {
            tokens = tokens.slice(1);
            return token;
        }
    };
    var peek = function () {
        if (tokens.length === 0) {
            return exports.eof;
        }
        return tokens[0];
    };
    var current = [];
    return {
        is: function (match) {
            if (match === peek()) {
                var token = pop();
                current = [];
                return true;
            }
            return false;
        },
        consume: function (match) {
            var scratch = current;
            if (match instanceof Function) {
                var success = match();
                if (success === undefined) {
                    throw { error: true, ast: current, tried: match };
                }
                current = __spreadArrays(scratch, [success]);
            }
            else {
                var token = pop();
                if (token !== match) {
                    throw { error: true, ast: current, tried: match, found: token };
                }
            }
        },
        success: function (node) {
            return [node, current];
        }
    };
};
