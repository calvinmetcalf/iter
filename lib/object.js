"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Item = require("./item");

var ObjectIter = (function () {
	function ObjectIter(object) {
		_classCallCheck(this, ObjectIter);

		this.keys = Object.keys(object);
		this.object = object;
		this.index = 0;
	}

	_prototypeProperties(ObjectIter, null, {
		next: {
			value: function next() {
				if (this.index >= this.keys.length) {
					return new Item(void 0, true);
				}
				var key = this.keys[this.index++];
				var value = this.object[key];
				return new Item([key, value], false);
			},
			writable: true,
			configurable: true
		}
	});

	return ObjectIter;
})();

module.exports = ObjectIter;
//# sourceMappingURL=object.js.map