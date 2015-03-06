class Item {
	constructor(value, done) {
		this.value = value;
		this.done = !!done;
	}
}

module.exports = Item;