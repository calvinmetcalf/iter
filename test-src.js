"use strict";

var test = require("tape");
var Iter = require("./lib");

test("array", function (t) {
  t.plan(1);
  t.deepEquals(new Iter([1, 2, 3]).map(function (item) {
    return item * item;
  }).toArray(), [1, 4, 9], "map");
});

test("object", function (t) {
  t.plan(1);
  t.deepEquals(new Iter({ 1: true, 2: true, 3: true }).map(function (item) {
    return item * item;
  }).toArray(), [1, 4, 9], "map");
});

test("map", function (t) {
  t.plan(4);
  var map = new Iter({ 1: true, 2: true, 3: true }).map(function (item) {
    return item * item;
  }).zip([1, 2, 3]).toMap();
  t.equals(map.size, 3, "right size");
  t.equals(map.get(1), 1, "item 1");
  t.equals(map.get(4), 2, "item 2");
  t.equals(map.get(9), 3, "item 3");
});

test("zipWith", function (t) {
  t.plan(1);
  t.deepEquals(new Iter([1, 2, 3]).zipWith(function (a, b, c) {
    return a + b + c;
  }, [3, 2, 1], [5, 5, 5, 5]).toArray(), [9, 9, 9]);
});

test("filter", function (t) {
  t.plan(1);
  t.deepEquals(new Iter(regeneratorRuntime.mark(function callee$1$0() {
    var i;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          i = -1;

        case 1:
          if (!(++i < 30)) {
            context$2$0.next = 6;
            break;
          }

          context$2$0.next = 4;
          return i;

        case 4:
          context$2$0.next = 1;
          break;

        case 6:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  })).filter(function (item) {
    return item < 10;
  }).filter(function (item) {
    return item % 2;
  }).toArray(), [1, 3, 5, 7, 9]);
});

test("flatten", function (t) {
  t.plan(1);
  t.deepEquals(new Iter([1, [[new Set([2, 3, 4]), 5], 6, 7, regeneratorRuntime.mark(function callee$1$0() {
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return 8;

        case 2:
          context$2$0.next = 4;
          return 9;

        case 4:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  })()]]).flatten().toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test("group", function (t) {
  t.plan(2);
  t.deepEquals(new Iter([1, [[new Set([2, 3, 4]), 5], 6, 7, regeneratorRuntime.mark(function callee$1$0() {
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return 8;

        case 2:
          context$2$0.next = 4;
          return 9;

        case 4:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  })()]]).flatten().group(3).toArray(), [[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  t.deepEquals(new Iter(["foo", "bar", "baz", "bat"]).group(2).toObject(), { foo: "bar", baz: "bat" });
});
test("forEach", function (t) {
  t.plan(20);
  var curent = 0;
  new Iter([0, 1, 2, 3, 4]).forEach(function (item, index) {
    t.equals(item, curent++, item.toString());
    t.equals(item, index, item.toString());
  });
  var obj = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4
  };
  curent = 0;
  new Iter(obj).forEach(function (key, value) {
    var calced = obj[key];
    t.equals(calced, curent++, key);
    t.equals(calced, value, key);
  });
});

test("reduce", function (t) {
  t.plan(2);
  t.equals(new Iter([1, 2, 3, 4, 5]).reduce(function (a, b) {
    return a + b;
  }), 15, "no acc");
  t.deepEquals(new Iter(["a", "b", "c", "a", "b", "a"]).reduce(function (a, b) {
    if (a[b]) {
      a[b]++;
    } else {
      a[b] = 1;
    }
    return a;
  }, {}), {
    a: 3,
    b: 2,
    c: 1
  }, "acc");
});

