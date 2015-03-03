
class FlattenIter {
	constructor(iter) {
		this.iters = [iter]
		this.done = false;
	}


	next() {
		if (this.done) {
			return this.done;
		}
		let value = false;
		while (value === false) {
			let currentIter = this.iters[this.iters.length - 1];
			value = currentIter.next();
			if (value.done) {
				if (this.iters.length === 1) {
					this.done = value;
					return value;
				}
				this.iters.pop();
				value = false;
			} else if (typeof value.value[Symbol.iterator] === 'function') {
				this.iters.push(value.value[Symbol.iterator]());
				value = false;
			}
		}
		return value;
	}
}

module.exports = FlattenIter;