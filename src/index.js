let ObjectIter = require('./object');
let MapIter = require('./map');
let ZipIter = require('./zip');
let FlattenIter = require('./flatten');
let FilterIter = require('./filter');
let GroupIter = require('./group');
let Item = require('./item');
require("babel/polyfill");
let noAcc = Symbol('no acc');
let zipFunc = (...args)=>args;
class Iter {
	constructor(collection,  ...args) {
		
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
		let out = this.zipWith(zipFunc, ...args);
		if (args.length === 1) {
			out.array = true;
		}
		return out;
	}
	zipWith(func, ...args) {
		return new Iter(new ZipIter(func, this, ...args.map(item=>{
			if (item instanceof Iter) {
				return item;
			}
			return new Iter(item);
		})));
	}
	flatten(deep) {
		return new Iter(new FlattenIter(this, Iter));
	}
	group(by) {
		if (by === 1) {
			return this;
		}
		let out = new Iter(new GroupIter(this, by));
		if (by === 2) {
			out.array = true;
		}
		return out;
 	}
 	forEach(func) {
 		if (this.array) {
 			for (let [key, value] of this) {
 				func(key, value);
 			}
 		} else {
 			let i = 0;
 			for (let value of this) {
 				func(value, i++);
 			}
 		}
 	}
 	reduce(func, acc=noAcc) {
 		if (acc === noAcc) {
 			acc = this.next().value;
 		}
 		for (let value of this) {
 			acc = func(acc, value);
 		}
 		return acc;
 	}
}


module.exports = Iter;