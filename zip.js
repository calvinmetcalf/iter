let Item = require('./item');

class ZipIter {
	constructor(...args) {
		this.iters = args;
	}
	next() {
		let values = this.iters.map(iter=>iter.next());
		var plucked = values.map(item=>item.value);
		var done = values.some(value => value.done);
		return new Item(plucked, done);
	}
} 

module.exports = ZipIter;