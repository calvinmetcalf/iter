let Item = require('./item');

class MapIter {
	constructor(iter, func) {
		this.iter = iter;
		this.func = func;
		this.index = 0;
	}
	next() {
		let value = this.iter.next();
		if (value.done) {
			return value;
		} else if (this.iter.array) {
			return new Item(this.func(value.value[0], value.value[1]));
		} else {
			return new Item(this.func(value.value, this.index++));
		}
	}
} 

module.exports = MapIter;