let Item = require('./item');

class ZipIter {
	constructor(func, ...args) {
		this.iters = args;
    this.func = func;
	}
	next() {
		let values = this.iters.map(iter=>iter.next());
		var plucked = this.func(...values.map(item=>item.value));
		var done = values.some(value => value.done);
		return new Item(plucked, done);
	}
} 

module.exports = ZipIter;