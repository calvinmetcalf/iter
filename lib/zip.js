"use strict";

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Item = require("./item");

var ZipIter = (function () {
	function ZipIter(func) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		_classCallCheck(this, ZipIter);

		this.iters = args;
		this.func = func;
	}

	_prototypeProperties(ZipIter, null, {
		next: {
			value: function next() {
				var _ref;

				var values = this.iters.map(function (iter) {
					return iter.next();
				});
				var plucked = (_ref = this).func.apply(_ref, _toConsumableArray(values.map(function (item) {
					return item.value;
				})));
				var done = values.some(function (value) {
					return value.done;
				});
				return new Item(plucked, done);
			},
			writable: true,
			configurable: true
		}
	});

	return ZipIter;
})();

module.exports = ZipIter;
//# sourceMappingURL=zip.js.map