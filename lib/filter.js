"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Item = require("./item");

var FilterIter = (function () {
	function FilterIter(iter) {
		var func = arguments[1] === undefined ? function (item) {
			return item;
		} : arguments[1];

		_classCallCheck(this, FilterIter);

		this.iter = iter;
		this.func = func;
		this.index = 0;
	}

	_prototypeProperties(FilterIter, null, {
		next: {
			value: function next() {
				var bool = false;
				var value = undefined;
				while (!bool) {
					value = this.iter.next();
					if (value.done) {
						return value;
					}
					if (this.iter.array) {
						bool = this.func(value.value[1], value.value[0]);
					} else {
						bool = this.func(value.value, this.index++);
					}
				}
				return value;
			},
			writable: true,
			configurable: true
		}
	});

	return FilterIter;
})();

module.exports = FilterIter;
//# sourceMappingURL=filter.js.map