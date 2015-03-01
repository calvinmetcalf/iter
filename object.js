let Item = require('./item');

class ObjectIter {
	constructor(object) {
		this.keys = Object.keys(object);
		this.object = object;
		this.index = 0;
	}
	next() {
		if (this.index > this.keys.length) {
			return new Item(void 0, true);
		}
		let key = this.keys[this.index++];
		let value = this.object[key];
		return new Item([key, value], false);
	}
} 

module.exports = ObjectIter;