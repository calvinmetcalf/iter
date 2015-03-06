let Item = require('./item');

class FilterIter {
	constructor(iter, func = item=>item) {
		this.iter = iter;
		this.func = func;
		this.index = 0;
	}
	next() {
		let bool = false;
		let value;
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
	}
} 

module.exports = FilterIter;