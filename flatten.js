let Item = require('./item');

class FlattenIter {
	constructor(iter, Iter) {
		this.iter = iter;
		this.Iter = Iter;
		this.tempIter = void 0;
	}

	getTempIter() {
		let tempIter = this.iter.next();
		if (tempIter.done) {
			return true;
		} else {
			this.tempIter = new this.Iter(tempIter.value);
			return false;
		}
	}

	next() {
		if (!this.tempIter) {
			if(this.getTempIter()) {
				return new Item(void 0, true);
			}
		}
		let value = this.tempIter.next();
		while (value.done) {
			if(this.getTempIter()) {
				return new Item(void 0, true);
			}
		}
		return value;
	}
}

module.exports = FlattenIter;