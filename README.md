[@aureooms/js-fingertree](https://aureooms.github.io/js-fingertree)
==

<img src="https://cdn.rawgit.com/aureooms/js-fingertree/master/media/sketch.svg" width="864">

Finger trees for JavaScript.
See [docs](https://aureooms.github.io/js-fingertree).
Parent is [@aureooms/js-persistent](https://github.com/aureooms/js-persistent).

    data FingerTree x = Empty
                      | Single x
                      | Deep ( Digit x ) ( FingerTree ( Node x ) ) ( Digit x )

[![License](https://img.shields.io/github/license/aureooms/js-fingertree.svg)](https://raw.githubusercontent.com/aureooms/js-fingertree/master/LICENSE)
[![Version](https://img.shields.io/npm/v/@aureooms/js-fingertree.svg)](https://www.npmjs.org/package/@aureooms/js-fingertree)
[![Build](https://img.shields.io/travis/aureooms/js-fingertree/master.svg)](https://travis-ci.org/aureooms/js-fingertree/branches)
[![Dependencies](https://img.shields.io/david/aureooms/js-fingertree.svg)](https://david-dm.org/aureooms/js-fingertree)
[![Dev dependencies](https://img.shields.io/david/dev/aureooms/js-fingertree.svg)](https://david-dm.org/aureooms/js-fingertree?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/js-fingertree.svg)](https://github.com/aureooms/js-fingertree/issues)
[![Downloads](https://img.shields.io/npm/dm/@aureooms/js-fingertree.svg)](https://www.npmjs.org/package/@aureooms/js-fingertree)

[![Code issues](https://img.shields.io/codeclimate/issues/aureooms/js-fingertree.svg)](https://codeclimate.com/github/aureooms/js-fingertree/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/github/aureooms/js-fingertree.svg)](https://codeclimate.com/github/aureooms/js-fingertree/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/github/aureooms/js-fingertree.svg)](https://codecov.io/gh/aureooms/js-fingertree)
[![Code coverage (clim)](https://img.shields.io/codeclimate/coverage-letter/aureooms/js-fingertree.svg)](https://codeclimate.com/github/aureooms/js-fingertree/trends/test_coverage_new_code)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/aureooms/js-fingertree.svg)](https://codeclimate.com/github/aureooms/js-fingertree/trends/technical_debt)
[![Documentation](https://aureooms.github.io/js-fingertree/badge.svg)](https://aureooms.github.io/js-fingertree/source.html)


## API reference

The data structure is
[fully persistent](https://en.wikipedia.org/wiki/Persistent_data_structure#Fully_persistent):
All methods are pure functions that do not modify their object. 

> The [parent project](https://github.com/aureooms/js-persistent) shows how
> specialized persistent data structures can be build on top of those methods.

> :warning: The code requires `regeneratorRuntime` to be defined, for instance by importing
> [regenerator-runtime/runtime](https://www.npmjs.com/package/regenerator-runtime).

First, require the polyfill at the entry point of your application
```js
require( 'regenerator-runtime/runtime' );
// or
import 'regenerator-runtime/runtime.js' ;
```

### Definition of a `Tree`

    data Tree x = Empty
                | Single x
                | Deep ( Digit x ) ( Tree ( Node x ) ) ( Digit x )

### Definition of a `Measure`

    Measure = (
      plus = ( x , x ) -> m
      measure = x -> m
      zero = ( ) => m
    )

### Example of a `Measure`

The following measure will compute the size of each subtree.

```js
const counter = {
  plus : ( x , y ) => x + y ,
  measure : x => 1 ,
  zero : ( ) => 0 ,
} ;
```

### How to `import`

No surprises here:

```js
import { from , empty } from '@aureooms/js-fingertree' ;
```

### `empty(Measure) -> Tree`

Create an empty fingertree from a measure object.

```js
let tree = empty( counter ) ;
```

### `from(Measure, Iterable) -> Tree`

Create a fingertree from a measure object and an iterable.

```js
let tree = from( counter , 'abc' ) ;
```

### `Tree#measure() -> m`

Returns the measure of the tree.

```js
if ( tree.measure() > 1 ) ...
```

### `Tree#empty() -> Boolean`

Returns `true` if the tree is empty, `false` otherwise.

```js
return tree.empty() ? 'empty' : 'not empty' ;
```

### `Tree#head() -> x`

Returns the left-most value in the tree.

```js
let head = tree.head() ; // 'a'
```

### `Tree#last() -> x`

Returns the right-most value in the tree.

```js
let last = tree.last() ; // 'b'
```

### `Tree#push(x) -> Tree`

Returns a new tree with an additional value as the new right-most value.

```js
tree = tree.cons('k');
```

### `Tree#cons(x) -> Tree`

Returns a new tree with an additional value as the new left-most value.

```js
tree = tree.cons('g');
```

### `Tree#init() -> Tree`

Returns a new tree without the right-most element.

```js
while ( ! tree.empty() ) tree = tree.init() ;
```

### `Tree#tail() -> Tree`

Returns a new tree without the left-most element.

```js
while ( ! tree.empty() ) tree = tree.tail() ;
```

### `Tree#append(Iterable) -> Tree`

Equivalent to applying `push` to each value of the iterable in order.

```js
tree.append( 'www' ) ;
```

### `Tree#prepend(Iterable) -> Tree`

Equivalent to applying `cons` to each value of the iterable in reverse order.

```js
tree.prepend( 'xyz' ) ;
```

### `Tree#concat(Tree) -> Tree`

Returns the concatenation of two trees.

```js
tree = tree.concat( tree );
```

### `Tree[Symbol.iterator]() -> Iterable`

Returns an iterator on the values of the tree in left-to-right order.

```js
for ( const x of tree ) console.log( x ) ;
```

### `Tree#splitTree(Function, m) -> [ Tree , x , Tree ]`

Split the tree into a left tree, a middle value, and a right tree according to
a predicate on the measure of the tree __increased by a constant measure `m`__.
The predicate must be monotone, false then true, on prefixes of the values in
left-to-right order. The middle value `x` is the item for which the predicate
switches from false to true.

```js
let [ left , right ] = tree.split( measure => measure > 1 , 1 ) ;
```

### `Tree#split(Function) -> [ Tree , Tree ]`

Split the tree into a left tree and a right tree according to a predicate on
the measure of the tree. The predicate must be monotone, false then true, on
prefixes of the values in left-to-right order. The left-most value of the right
tree is the item for which the predicate switches from false to true.

```js
let [ left , right ] = tree.split( measure => measure > 2 ) ;
```

### `Tree#takeUntil(Function) -> Tree`

Returns the left tree of `Tree#split`.

```js
let left = tree.takeUntil( measure => measure > 2 ) ;
```

### `Tree#dropUntil(Function) -> Tree`

Returns the right tree of `Tree#split`.

```js
let right = tree.dropUntil( measure => measure > 2 ) ;
```

## References

  - [Hinze and Paterson](http://staff.city.ac.uk/~ross/papers/FingerTree.pdf)
  - [An (incomplete) implementation in Python](https://github.com/kachayev/fn.py/blob/master/fn/immutable/finger.py)
  - [A (buggy) previous JavaScript implementation](https://github.com/qiao/fingertree.js)
  - [A coffeescript implementation](https://github.com/zot/Leisure/blob/master/src/lib/fingertree.coffee)
