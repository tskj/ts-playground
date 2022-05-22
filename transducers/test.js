"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
var console_1 = require("console");
var incStuff = function (stuff) {
    return stuff._map(function (x) { return x + 1; });
};
var toString = function (stuff) {
    return stuff._map(function (x) { return x.toString(); });
};
Array.prototype._map = function (f) {
    return this.map(f);
};
Map.prototype._map = function (f) {
    return new Map(__spread(this.entries()).map(function (_a) {
        var _b = __read(_a, 2), k = _b[0], v = _b[1];
        return [k, f(v)];
    }));
};
var z = incStuff([1, 2, 3, 4, 4]);
var x = toString([1, 2, 3, 4, 4]);
var y = toString(new Map([
    ['a', 0],
    ['b', 1],
    ['c', 2],
]));
console.log(x);
console.log(y);
function translate(x, b) {
    if (b === void 0) { b = false; }
    if (b) {
        return x;
    }
    return x.move(1, 1);
}
var Point = function (x, y) { return ({
    x: x,
    y: y,
    move: function (dx, dy) { return Point(x + dx, y + dy); }
}); };
var p = Point(1, 1);
var p2 = translate(p);
var empty = function (field) {
    console_1.assert(false);
    return null;
};
var set = function (rec, field, value) {
    return (function (f) {
        if (f === field) {
            return value;
        }
        return rec(f);
    });
};
var name = Symbol('name');
var age = Symbol('age');
var roger = set(set(empty, name, 'Roger'), age, 42);
var rogersName = roger(name);
var rogersAge = roger(age);
console.log(rogersName);
console.log(rogersAge);
