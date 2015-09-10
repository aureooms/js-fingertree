
require( "../node_modules/aureooms-node-package/node_modules/babel-core/polyfill" ) ;
var FingerTree = require('..').FingerTree ;
//var COUNTER = require( 'aureooms-js-measure' ).Measures.COUNTER ;
var COUNTER = {
	plus : function ( a , b ) { return a + b ; } ,
	measure : function ( x ) { return 1 ; } ,
	zero : function ( ) { return 0 ; } ,
} ;

var t, i, len = 100000;

console.log('number of operations: ', len);

console.time('total');
console.time('cons');
t = FingerTree.from_iterable( COUNTER , []);
for (i = 0; i < len; ++i) {
  t = t.cons(i);
}
console.timeEnd('cons');

console.time('tail');
for (i = 0; i < len; ++i) {
  t = t.tail();
}
console.timeEnd('tail');

console.time('push');
t = FingerTree.from_iterable( COUNTER , []);
for (i = 0; i < len; ++i) {
  t = t.push(i);
}
console.timeEnd('push');

console.time('split');
for (i = 0; i < len; ++i) {
  t.split(function (m) {
    return m > i;
  });
}
console.timeEnd('split');

console.time('init');
for (i = 0; i < len; ++i) {
  t = t.init();
}
console.timeEnd('init');
console.timeEnd('total');
