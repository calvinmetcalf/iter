let test = require('tape');
let Iter = require('./');

test('array', t=>{
  t.plan(1);
  t.deepEquals(new Iter([1,2,3]).map(item=>item*item).toArray(), [1,4,9], 'map');
})

test('object', t=>{
  t.plan(1);
  t.deepEquals(new Iter({1:true,2:true,3:true}).map(item=>item*item).toArray(), [1,4,9], 'map');
});

test('map', t=>{
  t.plan(4);
  var map = new Iter({1:true,2:true,3:true}).map(item=>item*item).zip([1,2,3]).toMap();
  t.equals(map.size, 3, 'right size');
  t.equals(map.get(1), 1, 'item 1');
  t.equals(map.get(4), 2, 'item 2');
  t.equals(map.get(9), 3, 'item 3');
})

test('filter', t=>{
  t.plan(1);
  t.deepEquals(new Iter(function *(){
    var i = -1;
    while (++i < 30) {
      yield i;
    }
  }).filter(item=>item < 10).filter(item=>item%2).toArray(), [1,3,5,7,9]);
});

test('flatten', t=>{
  t.plan(1);
  t.deepEquals(new Iter([1,[[new Set([2,3,4]), 5], 6, 7, function *(){
    yield 8;
    yield 9;
  }()]]).flatten().toArray(), [1,2,3,4,5,6,7,8,9]);
});

test('group', t=>{
  t.plan(2);
  t.deepEquals(new Iter([1,[[new Set([2,3,4]), 5], 6, 7, function *(){
    yield 8;
    yield 9;
  }()]]).flatten().group(3).toArray(), [[1,2,3],[4,5,6],[7,8,9]]);
  t.deepEquals(new Iter(['foo', 'bar', 'baz','bat']).group(2).toObject(), {foo:'bar',baz:'bat'});
});