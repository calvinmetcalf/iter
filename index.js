let ObjectIter = require('./object');
let MapIter = require('./map');
let ZipIter = require('./zip');
let FlattenIter = require('./flatten');
let FilterIter = require('./filter');

let Item = require('./item');

class Iter {
	constructor(collection,  ...args) {
		
		this.index = 0;
		this.array = false;
		if (typeof collection === 'function') {
			collection = collection(...args);
		}
		if (typeof collection[Symbol.iterator] === 'function') {
			this.iter = collection[Symbol.iterator]();
			if (collection.constructor === Map) {
				this.array = true;
			}
		} else if (typeof collection.next === 'function') {
			this.iter = collection;
		} else if (collection && typeof collection === 'object') {
			this.iter = new ObjectIter(collection);
			this.array = true;
		}
	}
	[Symbol.iterator](){
		return this;
	}
	next() {
		return this.iter.next();
	}
	toArray() {
		let out = [];
		let value = this.next();
		while (!value.done) {
			out.push(value.value);
			value = this.next();
		}
		return out;
	}
	toSet() {
		let out = new Set();
		let value = this.next();
		while (!value.done) {
			out.add(value.value);
			value = this.next();
		}
		return out;
	}
	toObject() {
		if (!this.array) {
			throw new TypeError('I don\'t know how to turn this into an object');
		}
		let out = {};
		let value = this.next();
		while (!value.done) {
			out[value.value[0]] = value.value[1];
			value = this.next();
		}
		return out;
	}
	toMap() {
		if (!this.array) {
			throw new TypeError('I don\'t know how to turn this into a Map');
		}
		return new Map(this);
	}
	map(func) {
		return new Iter(new MapIter(this, func));
	}
	filter(func) {
		return new Iter(new FilterIter(this, func));
	}
	zip(...args) {
		let out = new Iter(new ZipIter(this, ...args.map(item=>{
			if (item instanceof Iter) {
				return item;
			}
			return new Iter(item);
		})));
		if (args.length === 1) {
			out.array = true;
		}
		return out;
	}
	flatten(deep) {
		return new Iter(new FlattenIter(this, Iter));
	}
}


module.exports = Iter;