let Item = require('./item');

class GroupIter{
  constructor(iter, by) {
    this.iter = iter;
    this.by = by;
  }
  next(){
    
    let current = new Array(this.by);
    let len = 0;
    while (len < this.by) {
      let value = this.iter.next();
      if (value.done) {
        return new Item(current, true);
      }
      current[len++] = value.value;
    }
    return new Item(current);
  }
}

module.exports = GroupIter;