"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var FlattenIter = (function () {
	function FlattenIter(iter) {
		_classCallCheck(this, FlattenIter);

		this.iters = [iter];
		this.done = false;
	}

	_prototypeProperties(FlattenIter, null, {
		next: {
			value: function next() {
				if (this.done) {
					return this.done;
				}
				var value = false;
				while (value === false) {
					var currentIter = this.iters[this.iters.length - 1];
					value = currentIter.next();
					if (value.done) {
						if (this.iters.length === 1) {
							this.done = value;
							return value;
						}
						this.iters.pop();
						value = false;
					} else if (typeof value.value[Symbol.iterator] === "function") {
						this.iters.push(value.value[Symbol.iterator]());
						value = false;
					}
				}
				return value;
			},
			writable: true,
			configurable: true
		}
	});

	return FlattenIter;
})();

module.exports = FlattenIter;
//# sourceMappingURL=flatten.js.map