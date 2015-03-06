let test = require('tape');
let Iter = require('./lib');

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
});

test('zipWith', t=>{
  t.plan(1);
  t.deepEquals(new Iter([1,2,3]).zipWith((a,b,c)=>a+b+c,[3,2,1], [5,5,5, 5]).toArray(), [9,9,9]);
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
test('forEach', t=>{
  t.plan(20);
  var curent = 0;
  new Iter([0, 1, 2, 3, 4]).forEach((item, index)=> {
    t.equals(item, curent++, item.toString());
    t.equals(item, index, item.toString());
  });
  var obj = {
    a: 0,
    b:1,
    c:2,
    d: 3,
    e:4
  };
  curent = 0;
  new Iter(obj).forEach((key, value)=> {
    var calced = obj[key];
    t.equals(calced, curent++, key);
    t.equals(calced, value, key);
  });
});

test('reduce', t=>{
  t.plan(2);
  t.equals(new Iter([1,2,3,4,5]).reduce((a,b)=> a+b),15, 'no acc');
  t.deepEquals(new Iter(['a','b','c','a','b', 'a']).reduce((a,b)=> {
    if (a[b]) {
      a[b]++;
    } else {
      a[b] = 1;
    }
    return a;
  }, {}),{
    a:3,
    b:2,
    c:1
  }, 'acc');
})