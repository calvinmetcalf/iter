"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _applyConstructor = function (Constructor, args) { var instance = Object.create(Constructor.prototype); var result = Constructor.apply(instance, args); return result != null && (typeof result == "object" || typeof result == "function") ? result : instance; };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var ObjectIter = require("./object");
var MapIter = require("./map");
var ZipIter = require("./zip");
var FlattenIter = require("./flatten");
var FilterIter = require("./filter");
var GroupIter = require("./group");
var Item = require("./item");
require("babel/polyfill");
var noAcc = Symbol("no acc");
var zipFunc = function () {
	for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		args[_key] = arguments[_key];
	}

	return args;
};

var Iter = (function () {
	function Iter(collection) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		_classCallCheck(this, Iter);

		this.array = false;
		if (typeof collection === "function") {
			collection = collection.apply(undefined, args);
		}
		if (typeof collection[Symbol.iterator] === "function") {
			this.iter = collection[Symbol.iterator]();
			if (collection.constructor === Map) {
				this.array = true;
			}
		} else if (typeof collection.next === "function") {
			this.iter = collection;
		} else if (collection && typeof collection === "object") {
			this.iter = new ObjectIter(collection);
			this.array = true;
		}
	}

	_prototypeProperties(Iter, null, (function () {
		var _prototypeProperties2 = {};
		_prototypeProperties2[Symbol.iterator] = {
			value: function () {
				return this;
			},
			writable: true,
			configurable: true
		};

		_defineProperty(_prototypeProperties2, "next", {
			value: function next() {
				return this.iter.next();
			},
			writable: true,
			configurable: true
		});

		_defineProperty(_prototypeProperties2, "toArray", {
			value: function toArray() {
				var out = [];
				var value = this.next();
				while (!value.done) {
					out.push(value.value);
					value = this.next();
				}
				return out;
			},
			writable: true,
			configurable: true
		});

		_defineProperty(_prototypeProperties2, "toSet", {
			value: function toSet() {
				var out = new Set();
				var value = this.next();
				while (!value.done) {
					out.add(value.value);
					value = this.next();
				}
				return out;
			},
			writable: true,
			configurable: true
		});

		_defineProperty(_prototypeProperties2, "toObject", {
			value: function toObject() {
				if (!this.array) {
					throw new TypeError("I don't know how to turn this into an object");
				}
				var out = {};
				var value = this.next();
				while (!value.done) {
					out[value.value[0]] = value.value[1];
					value = this.next();
				}
				return out;
			},
			writable: true,
			configurable: true
		});

		_defineProperty(_prototypeProperties2, "toMap", {
			value: function toMap() {
				if (!this.array) {
					throw new TypeError("I don't know how to turn this into a Map");
				}
				return new Map(this);
			},
			writable: true,
			configurable: true
		});

		_defineProperty(_prototypeProperties2, "map", {
			value: function map(func) {
				return new Iter(new MapIter(this, func));
			},
			writable: true,
			configurable: true
		});

		_defineProperty(_prototypeProperties2, "filter", {
			value: function filter(func) {
				return new Iter(new FilterIter(this, func));
			},
			writable: true,
			configurable: true
		});

		_defineProperty(_prototypeProperties2, "zip", {
			value: function zip() {
				var _ref;

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				var out = (_ref = this).zipWith.apply(_ref, [zipFunc].concat(args));
				if (args.length === 1) {
					out.array = true;
				}
				return out;
			},
			writable: true,
			configurable: true
		});

		_defineProperty(_prototypeProperties2, "zipWith", {
			value: function zipWith(func) {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				return new Iter(_applyConstructor(ZipIter, [func, this].concat(_toConsumableArray(args.map(function (item) {
					if (item instanceof Iter) {
						return item;
					}
					return new Iter(item);
				})))));
			},
			writable: true,
			configurable: true
		});

		_defineProperty(_prototypeProperties2, "flatten", {
			value: function flatten(deep) {
				return new Iter(new FlattenIter(this, Iter));
			},
			writable: true,
			configurable: true
		});

		_defineProperty(_prototypeProperties2, "group", {
			value: function group(by) {
				if (by === 1) {
					return this;
				}
				var out = new Iter(new GroupIter(this, by));
				if (by === 2) {
					out.array = true;
				}
				return out;
			},
			writable: true,
			configurable: true
		});

		_defineProperty(_prototypeProperties2, "forEach", {
			value: function forEach(func) {
				if (this.array) {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var _step$value = _slicedToArray(_step.value, 2);

							var key = _step$value[0];
							var value = _step$value[1];

							func(key, value);
						}
					} catch (err) {
						_didIteratorError = true;
						_iteratorError = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion && _iterator["return"]) {
								_iterator["return"]();
							}
						} finally {
							if (_didIteratorError) {
								throw _iteratorError;
							}
						}
					}
				} else {
					var i = 0;
					var _iteratorNormalCompletion2 = true;
					var _didIteratorError2 = false;
					var _iteratorError2 = undefined;

					try {
						for (var _iterator2 = this[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
							var value = _step2.value;

							func(value, i++);
						}
					} catch (err) {
						_didIteratorError2 = true;
						_iteratorError2 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
								_iterator2["return"]();
							}
						} finally {
							if (_didIteratorError2) {
								throw _iteratorError2;
							}
						}
					}
				}
			},
			writable: true,
			configurable: true
		});

		_defineProperty(_prototypeProperties2, "reduce", {
			value: function reduce(func) {
				var acc = arguments[1] === undefined ? noAcc : arguments[1];

				if (acc === noAcc) {
					acc = this.next().value;
				}
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var value = _step.value;

						acc = func(acc, value);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator["return"]) {
							_iterator["return"]();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				return acc;
			},
			writable: true,
			configurable: true
		});

		return _prototypeProperties2;
	})());

	return Iter;
})();

module.exports = Iter;
//# sourceMappingURL=index.js.map