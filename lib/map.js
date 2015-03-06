"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Item = require("./item");

var MapIter = (function () {
	function MapIter(iter, func) {
		_classCallCheck(this, MapIter);

		this.iter = iter;
		this.func = func;
		this.index = 0;
	}

	_prototypeProperties(MapIter, null, {
		next: {
			value: function next() {
				var value = this.iter.next();
				if (value.done) {
					return value;
				} else if (this.iter.array) {
					return new Item(this.func(value.value[0], value.value[1]));
				} else {
					return new Item(this.func(value.value, this.index++));
				}
			},
			writable: true,
			configurable: true
		}
	});

	return MapIter;
})();

module.exports = MapIter;
//# sourceMappingURL=map.js.map