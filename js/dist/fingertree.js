'use strict';

(function () {

	'use strict';

	var definition = function definition(exports, undefined) {

		/* js/src/0-core */
		/* js/src/0-core/concatenate */
		/* js/src/0-core/concatenate/app3.js */
		function app3(A, list, B) {

			A = A.force();
			B = B.force();

			if (A instanceof Empty) return _prepend(B, list);
			if (B instanceof Empty) return _append(A, list);

			if (A instanceof Single) return _prepend(B, list).cons(A.head());
			if (B instanceof Single) return _append(A, list).push(B.last());

			return new Deep(A.M, A.left, delay(function () {
				return app3(A.middle, A.right._nodes_with_list(A.M, list, B.left), B.middle);
			}), B.right);
		}

		/* js/src/0-core/concatenate/append.js */
		function append(tree, iterable) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {

				for (var _iterator = iterable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var value = _step.value;
					tree = tree.push(value);
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return tree;
		}

		/* js/src/0-core/concatenate/from.js */
		function from(M, iterable) {

			return new Empty(M).append(iterable);
		}

		/* js/src/0-core/concatenate/nodes.js */
		function nodes(M, list) {

			var out = [];

			var n = list.length;

			var i = 0;

			switch (n % 3) {

				case 1:
					out.push(node2(M, list[0], list[1]));
					out.push(node2(M, list[2], list[3]));
					i += 4;
					break;
				case 2:
					out.push(node2(M, list[0], list[1]));
					i += 2;
					break;

			}

			for (; i < n; i += 3) {
				out.push(node3(M, list[i], list[i + 1], list[i + 2]));
			}

			return out;
		}

		/* js/src/0-core/concatenate/prepend.js */
		function prepend(tree, iterable) {

			return _prepend(tree, Array.from(iterable));
		}

		/* js/src/0-core/measure */
		/* js/src/0-core/measure/CachedMeasure.js */
		function CachedMeasure(M) {
			this.M = M;
		}

		CachedMeasure.prototype.zero = function () {
			return this.M.zero();
		};

		CachedMeasure.prototype.plus = function (a, b) {
			return this.M.plus(a, b);
		};

		CachedMeasure.prototype.measure = function (measured) {
			return measured.measure();
		};

		/* js/src/0-core/measure/cache.js */
		function cache(M) {
			return M instanceof CachedMeasure ? M : new CachedMeasure(M);
		}

		/* js/src/0-core/optimizing */
		/* js/src/0-core/optimizing/_app3.js */
		function _app3(A, B) {

			B = B.force();

			if (B instanceof Empty) return A;

			if (B instanceof Single) return A.push(B.last());

			return new Deep(A.M, A.left, delay(function () {
				return app3(A.middle, A.right._nodes(A.M, B.left), B.middle);
			}), B.right);
		}

		/* js/src/0-core/optimizing/_append.js */
		function _append(tree, list) {

			var n = list.length;

			for (var i = 0; i < n; ++i) {
				tree = tree.push(list[i]);
			}return tree;
		}

		/* js/src/0-core/optimizing/_deepL.js */
		function _deepL(M, left, middle, right) {
			return delay(function () {
				return deepL(M, left, middle, right);
			});
		}

		/* js/src/0-core/optimizing/_deepR.js */
		function _deepR(M, left, middle, right) {
			return delay(function () {
				return deepR(M, left, middle, right);
			});
		}

		/* js/src/0-core/optimizing/_digit.js */
		function _digit(list) {

			switch (list.length) {

				case 1:
					return new One(list[0]);
				case 2:
					return new Two(list[0], list[1]);
				case 3:
					return new Three(list[0], list[1], list[2]);
				case 4:
					throw new Error('digit(.) should never be called on length 4 lists since it is only called on results of splitDigit which outputs lists of length at most 3');
				default:
					throw new Error('cannot make digit for length ' + list.length);

			}
		}

		/* js/src/0-core/optimizing/_from_digit.js */
		function _from_digit(M, digit) {

			if (digit instanceof One) return new Single(M, digit.a);
			if (digit instanceof Two || digit instanceof Three || digit instanceof Four) {
				return new Deep(M, digit.init(), new Empty(M), new One(digit.last()));
			}

			throw new Error('second argument is not a Digit');
		}

		/* js/src/0-core/optimizing/_from_small_list.js */
		function _from_small_list(M, list) {

			switch (list.length) {

				case 0:
					return new Empty(M);
				case 1:
					return new Single(M, list[0]);
				case 2:
					return new Deep(M, new One(list[0]), new Empty(M), new One(list[1]));
				case 3:
					return new Deep(M, new Two(list[0], list[1]), new Empty(M), new One(list[2]));
				default:
					throw new Error('second argument has wrong length');

			}
		}

		/* js/src/0-core/optimizing/_prepend.js */
		function _prepend(tree, list) {

			var i = list.length;

			while (i--) tree = tree.cons(list[i]);

			return tree;
		}

		/* js/src/0-core/optimizing/fast-iterators */
		/* js/src/0-core/optimizing/fast-iterators/1-_EmptyGenerator.js */
		function _EmptyGenerator() {}

		_EmptyGenerator.prototype.next = function () {
			return { done: true };
		};

		/* js/src/0-core/optimizing/fast-iterators/2-_EMPTY.js */
		var _EMPTY = new _EmptyGenerator();

		/* js/src/0-core/split */
		/* js/src/0-core/split/Split.js */
		function Split(left, middle, right) {
			this.left = left;
			this.middle = middle;
			this.right = right;
		}

		/* js/src/0-core/split/deepL.js */
		/**
  * @param {Array} left
  * @param {FingerTree} middle
  * @param {Digit} right
  */
		function deepL(M, left, middle, right) {

			if (left.length === 0) {

				if (middle.empty()) return _from_digit(M, right);

				return new Deep(M, middle.head().digit(), delay(function () {
					return middle.tail();
				}), right);
			}

			return new Deep(M, _digit(left), middle, right);
		}

		/* js/src/0-core/split/deepR.js */
		/**
  * @param {Digit} left
  * @param {FingerTree} middle
  * @param {Array} right
  */
		function deepR(M, left, middle, right) {

			if (right.length === 0) {

				if (middle.empty()) return _from_digit(M, left);

				return new Deep(M, left, delay(function () {
					return middle.init();
				}), middle.last().digit());
			}

			return new Deep(M, left, middle, _digit(right));
		}

		/* js/src/1-digit */
		/* js/src/1-digit/0-Digit.js */
		function Digit() {}

		Digit.prototype._concat = function (list, other) {
			return this._list().concat(list).concat(other._list());
		};

		Digit.prototype._nodes_with_list = function (M, list, other) {
			return nodes(M, this._concat(list, other));
		};

		Digit.prototype[Symbol.iterator] = function () {
			return this._list()[Symbol.iterator]();
		};

		/* js/src/1-digit/1-One.js */
		function One(a) {
			this.a = a;
			this.v = null;
		}

		One.prototype = new Digit();

		One.prototype.measure = function (M) {
			if (this.v === null) this.v = M.measure(this.a);
			return this.v;
		};

		One.prototype.head = function () {
			return this.a;
		};

		One.prototype.last = function () {
			return this.a;
		};

		One.prototype.init = function () {
			throw new Error("cannot call init on digit One");
		};

		One.prototype.tail = function () {
			throw new Error("cannot call tail on digit One");
		};

		One.prototype.push = function (value) {
			return new Two(this.a, value);
		};

		One.prototype.cons = function (value) {
			return new Two(value, this.a);
		};

		One.prototype.node = function (M) {
			throw new Error("cannot convert One to node");
		};

		/**
   * It is assumed that p(|this|) is true.
   */
		One.prototype.splitDigit = function (p, i, M) {
			return new Split([], this.a, []);
		};

		One.prototype._nodes = function (M, other) {
			if (other instanceof One) return [node2(M, this.a, other.a)];
			if (other instanceof Two) return [node3(M, this.a, other.a, other.b)];
			if (other instanceof Three) return [node2(M, this.a, other.a), node2(M, other.b, other.c)];
			return [node3(M, this.a, other.a, other.b), node2(M, other.c, other.d)];
		};

		One.prototype._list = function () {
			return [this.a];
		};

		/* js/src/1-digit/2-Two.js */
		function Two(a, b) {
			this.a = a;
			this.b = b;
			this.v = null;
		}

		Two.prototype = new Digit();

		Two.prototype.measure = function (M) {
			if (this.v === null) this.v = M.plus(M.measure(this.a), M.measure(this.b));
			return this.v;
		};

		Two.prototype.head = function () {
			return this.a;
		};

		Two.prototype.last = function () {
			return this.b;
		};

		Two.prototype.init = function () {
			return new One(this.a);
		};

		Two.prototype.tail = function () {
			return new One(this.b);
		};

		Two.prototype.push = function (value) {
			return new Three(this.a, this.b, value);
		};

		Two.prototype.cons = function (value) {
			return new Three(value, this.a, this.b);
		};

		Two.prototype.node = function (M) {
			throw new Error("Two should never be converted to Node2 with current implementation");
		};

		/**
   * It is assumed that p(|this|) is true.
   */
		Two.prototype.splitDigit = function (p, i, M) {
			i = M.plus(i, M.measure(this.a));
			if (p(i)) return new Split([], this.a, [this.b]);
			return new Split([this.a], this.b, []);
		};

		Two.prototype._nodes = function (M, other) {
			if (other instanceof One) return [node3(M, this.a, this.b, other.a)];
			if (other instanceof Two) return [node2(M, this.a, this.b), node2(M, other.a, other.b)];
			if (other instanceof Three) return [node3(M, this.a, this.b, other.a), node2(M, other.b, other.c)];
			return [node3(M, this.a, this.b, other.a), node3(M, other.b, other.c, other.d)];
		};

		Two.prototype._list = function () {
			return [this.a, this.b];
		};

		/* js/src/1-digit/3-Three.js */
		function Three(a, b, c) {
			this.a = a;
			this.b = b;
			this.c = c;
			this.v = null;
		}

		Three.prototype = new Digit();

		Three.prototype.measure = function (M) {
			if (this.v === null) this.v = M.plus(M.measure(this.a), M.plus(M.measure(this.b), M.measure(this.c)));
			return this.v;
		};

		Three.prototype.head = function () {
			return this.a;
		};

		Three.prototype.last = function () {
			return this.c;
		};

		Three.prototype.init = function () {
			return new Two(this.a, this.b);
		};

		Three.prototype.tail = function () {
			return new Two(this.b, this.c);
		};

		Three.prototype.push = function (value) {
			return new Four(this.a, this.b, this.c, value);
		};

		Three.prototype.cons = function (value) {
			return new Four(value, this.a, this.b, this.c);
		};

		Three.prototype.node = function (M) {
			return node3(M, this.a, this.b, this.c);
		};

		/**
   * It is assumed that p(|this|) is true.
   */
		Three.prototype.splitDigit = function (p, i, M) {
			i = M.plus(i, M.measure(this.a));
			if (p(i)) return new Split([], this.a, [this.b, this.c]);
			i = M.plus(i, M.measure(this.b));
			if (p(i)) return new Split([this.a], this.b, [this.c]);
			return new Split([this.a, this.b], this.c, []);
		};

		Three.prototype._nodes = function (M, other) {
			if (other instanceof One) return [node2(M, this.a, this.b), node2(M, this.c, other.a)];
			if (other instanceof Two) return [node3(M, this.a, this.b, this.c), node2(M, other.a, other.b)];
			if (other instanceof Three) return [node3(M, this.a, this.b, this.c), node3(M, other.a, other.b, other.c)];
			return [node3(M, this.a, this.b, this.c), node2(M, other.a, other.b), node2(M, other.c, other.d)];
		};

		Three.prototype._list = function () {
			return [this.a, this.b, this.c];
		};

		/* js/src/1-digit/4-Four.js */
		function Four(a, b, c, d) {
			this.a = a;
			this.b = b;
			this.c = c;
			this.d = d;
			this.v = null;
		}

		Four.prototype = new Digit();

		Four.prototype.measure = function (M) {
			if (this.v === null) this.v = M.plus(M.measure(this.a), M.plus(M.measure(this.b), M.plus(M.measure(this.c), M.measure(this.d))));
			return this.v;
		};

		Four.prototype.head = function () {
			return this.a;
		};

		Four.prototype.last = function () {
			return this.d;
		};

		Four.prototype.init = function () {
			return new Three(this.a, this.b, this.c);
		};

		Four.prototype.tail = function () {
			return new Three(this.b, this.c, this.d);
		};

		Four.prototype.push = function (value) {
			throw new Error("cannot push digit Four");
		};

		Four.prototype.cons = function (value) {
			throw new Error("cannot cons digit Four");
		};

		Four.prototype.node = function (M) {
			throw new Error("cannot convert Four to node");
		};

		/**
   * It is assumed that p(|this|) is true.
   */
		Four.prototype.splitDigit = function (p, i, M) {
			i = M.plus(i, M.measure(this.a));
			if (p(i)) return new Split([], this.a, [this.b, this.c, this.d]);
			i = M.plus(i, M.measure(this.b));
			if (p(i)) return new Split([this.a], this.b, [this.c, this.d]);
			i = M.plus(i, M.measure(this.c));
			if (p(i)) return new Split([this.a, this.b], this.c, [this.d]);
			return new Split([this.a, this.b, this.c], this.d, []);
		};

		Four.prototype._nodes = function (M, other) {
			if (other instanceof One) return [node3(M, this.a, this.b, this.c), node2(M, this.d, other.a)];
			if (other instanceof Two) return [node3(M, this.a, this.b, this.c), node3(M, this.d, other.a, other.b)];
			if (other instanceof Three) return [node3(M, this.a, this.b, this.c), node2(M, this.d, other.a), node2(M, other.b, other.c)];
			return [node3(M, this.a, this.b, this.c), node3(M, this.d, other.a, other.b), node2(M, other.c, other.d)];
		};

		Four.prototype._list = function () {
			return [this.a, this.b, this.c, this.d];
		};

		/* js/src/2-node */
		/* js/src/2-node/Node2.js */
		function Node2(v, a, b) {
			this.v = v;
			this.a = a;
			this.b = b;
		}

		Node2.prototype[Symbol.iterator] = function () {
			return [this.a, this.b][Symbol.iterator]();
		};

		Node2.prototype.measure = function () {
			return this.v;
		};

		Node2.prototype.digit = function () {
			return new Two(this.a, this.b);
		};

		Node2.prototype.head = function () {
			throw new Error("trying to call head of Node2");
		};

		Node2.prototype.last = function () {
			throw new Error("trying to call last of Node2");
		};

		Node2.prototype.init = function () {
			throw new Error("trying to call init of Node2");
		};

		Node2.prototype.tail = function () {
			throw new Error("trying to call tail of Node2");
		};

		Node2.prototype.push = function (value) {
			throw new Error("trying to call push of Node2");
		};

		Node2.prototype.cons = function (value) {
			throw new Error("trying to call cons of Node2");
		};

		function node2(M, a, b) {

			return new Node2(M.plus(M.measure(a), M.measure(b)), a, b);
		}

		/* js/src/2-node/Node3.js */
		function Node3(v, a, b, c) {
			this.v = v;
			this.a = a;
			this.b = b;
			this.c = c;
		}

		Node3.prototype[Symbol.iterator] = function () {
			return [this.a, this.b, this.c][Symbol.iterator]();
		};

		Node3.prototype.measure = function () {
			return this.v;
		};

		Node3.prototype.digit = function () {
			return new Three(this.a, this.b, this.c);
		};

		Node3.prototype.head = function () {
			throw new Error("trying to call head of Node3");
		};

		Node3.prototype.last = function () {
			throw new Error("trying to call last of Node3");
		};

		Node3.prototype.init = function () {
			throw new Error("trying to call init of Node3");
		};

		Node3.prototype.tail = function () {
			throw new Error("trying to call tail of Node3");
		};

		Node3.prototype.push = function (value) {
			throw new Error("trying to call push of Node3");
		};

		Node3.prototype.cons = function (value) {
			throw new Error("trying to call cons of Node3");
		};

		function node3(M, a, b, c) {

			return new Node3(M.plus(M.measure(a), M.plus(M.measure(b), M.measure(c))), a, b, c);
		}

		/* js/src/3-tree */
		/* js/src/3-tree/0-base */
		/* js/src/3-tree/0-base/Tree.js */

		function Tree() {}

		Tree.prototype.force = function () {
			return this;
		};

		Tree.prototype.takeUntil = function (p) {
			return this.split(p)[0];
		};

		Tree.prototype.dropUntil = function (p) {
			return this.split(p)[1];
		};

		Tree.prototype.append = function (iterable) {
			return append(this, iterable);
		};

		Tree.prototype.prepend = function (iterable) {
			return prepend(this, iterable);
		};

		/* js/src/3-tree/1-implementations */
		/* js/src/3-tree/1-implementations/0-Empty.js */
		function Empty(M) {
			this.M = M;
			this.v = M.zero();
		}

		Empty.prototype = new Tree();

		Empty.prototype.measure = function () {
			return this.v;
		};

		Empty.prototype.empty = function () {
			return true;
		};

		Empty.prototype.head = function () {
			throw new Error("cannot call head on Empty");
		};

		Empty.prototype.last = function () {
			throw new Error("cannot call last on Empty");
		};

		Empty.prototype.tail = function () {
			return this;
		};

		Empty.prototype.init = function () {
			return this;
		};

		Empty.prototype.push = function (value) {
			return new Single(this.M, value);
		};

		Empty.prototype.cons = function (value) {
			return new Single(this.M, value);
		};

		Empty.prototype.concat = function (other) {
			return other;
		};

		Empty.prototype[Symbol.iterator] = function () {
			return _EMPTY;
		};

		/**
   * It is assumed that p(|this|) is true.
   */
		Empty.prototype.splitTree = function (p, i) {
			throw new Error("splitTree not implemented in Empty");
		};

		Empty.prototype.split = function (p) {
			return [this, this];
		};

		/* js/src/3-tree/1-implementations/1-Single.js */
		function Single(M, element) {
			this.M = M;
			this.element = element;
			this.v = M.measure(element);
		}

		Single.prototype = new Tree();

		Single.prototype.measure = function () {
			return this.v;
		};

		Single.prototype.empty = function () {
			return false;
		};

		Single.prototype.head = function () {
			return this.element;
		};

		Single.prototype.last = function () {
			return this.element;
		};

		Single.prototype.tail = function () {
			return new Empty(this.M);
		};

		Single.prototype.init = function () {
			return new Empty(this.M);
		};

		Single.prototype.cons = function (value) {
			return new Deep(this.M, new One(value), new Empty(cache(this.M)), new One(this.element));
		};

		Single.prototype.push = function (value) {
			return new Deep(this.M, new One(this.element), new Empty(cache(this.M)), new One(value));
		};

		Single.prototype.concat = function (other) {
			return other.cons(this.element);
		};

		Single.prototype[Symbol.iterator] = regeneratorRuntime.mark(function callee$2$0() {
			return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						context$3$0.next = 2;
						return this.element;

					case 2:
					case 'end':
						return context$3$0.stop();
				}
			}, callee$2$0, this);
		});

		/**
   * It is assumed that p(|this|) is true.
   */
		Single.prototype.splitTree = function (p, i) {
			return new Split(new Empty(this.M), this.element, new Empty(this.M));
		};

		Single.prototype.split = function (p) {
			return p(this.measure()) ? [new Empty(this.M), this] : [this, new Empty(this.M)];
		};

		/* js/src/3-tree/1-implementations/2-Deep.js */
		function Deep(M, left, middle, right) {
			this.M = M;
			this.left = left;
			this.middle = middle;
			this.right = right;
			this.v = null;
		}

		Deep.prototype = new Tree();

		Deep.prototype.measure = function () {

			if (this.v === null) {

				var M = this.M;

				this.v = M.plus(this.left.measure(M), M.plus(this.middle.measure(), this.right.measure(M)));
			}

			return this.v;
		};

		Deep.prototype.empty = function () {
			return false;
		};

		Deep.prototype.head = function () {
			return this.left.head();
		};

		Deep.prototype.last = function () {
			return this.right.last();
		};

		Deep.prototype.tail = function () {
			var _this = this;

			if (this.left instanceof One) {

				if (this.middle.empty()) {
					return _from_digit(this.M, this.right);
				}

				return new Deep(this.M, this.middle.head().digit(), delay(function () {
					return _this.middle.tail();
				}), this.right);
			}

			return new Deep(this.M, this.left.tail(), this.middle, this.right);
		};

		Deep.prototype.init = function () {
			var _this2 = this;

			if (this.right instanceof One) {

				if (this.middle.empty()) {
					return _from_digit(this.M, this.left);
				}

				return new Deep(this.M, this.left, delay(function () {
					return _this2.middle.init();
				}), this.middle.last().digit());
			}

			return new Deep(this.M, this.left, this.middle, this.right.init());
		};
		Deep.prototype.cons = function (value) {

			if (this.left instanceof Four) {

				return new Deep(this.M, new Two(value, this.left.head()), this.middle.cons(this.left.tail().node(this.M)), this.right);
			}

			return new Deep(this.M, this.left.cons(value), this.middle, this.right);
		};
		Deep.prototype.push = function (value) {

			if (this.right instanceof Four) {

				return new Deep(this.M, this.left, this.middle.push(this.right.init().node(this.M)), new Two(this.right.last(), value));
			}

			return new Deep(this.M, this.left, this.middle, this.right.push(value));
		};
		Deep.prototype.concat = function (other) {

			return _app3(this, other);
		};

		Deep.prototype[Symbol.iterator] = regeneratorRuntime.mark(function callee$2$0() {
			var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, node;

			return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
				while (1) switch (context$3$0.prev = context$3$0.next) {
					case 0:
						return context$3$0.delegateYield(this.left, 't0', 1);

					case 1:
						_iteratorNormalCompletion2 = true;
						_didIteratorError2 = false;
						_iteratorError2 = undefined;
						context$3$0.prev = 4;
						_iterator2 = this.middle[Symbol.iterator]();

					case 6:
						if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
							context$3$0.next = 12;
							break;
						}

						node = _step2.value;
						return context$3$0.delegateYield(node, 't1', 9);

					case 9:
						_iteratorNormalCompletion2 = true;
						context$3$0.next = 6;
						break;

					case 12:
						context$3$0.next = 18;
						break;

					case 14:
						context$3$0.prev = 14;
						context$3$0.t2 = context$3$0['catch'](4);
						_didIteratorError2 = true;
						_iteratorError2 = context$3$0.t2;

					case 18:
						context$3$0.prev = 18;
						context$3$0.prev = 19;

						if (!_iteratorNormalCompletion2 && _iterator2['return']) {
							_iterator2['return']();
						}

					case 21:
						context$3$0.prev = 21;

						if (!_didIteratorError2) {
							context$3$0.next = 24;
							break;
						}

						throw _iteratorError2;

					case 24:
						return context$3$0.finish(21);

					case 25:
						return context$3$0.finish(18);

					case 26:
						return context$3$0.delegateYield(this.right, 't3', 27);

					case 27:
					case 'end':
						return context$3$0.stop();
				}
			}, callee$2$0, this, [[4, 14, 18, 26], [19,, 21, 25]]);
		});

		/**
   * It is assumed that p(|this|) is true.
   */
		Deep.prototype.splitTree = function (p, i) {
			var left = this.left;
			var middle = this.middle;
			var right = this.right;
			var M = this.M;

			// see if the split point is inside the left tree
			var leftMeasure = M.plus(i, left.measure(M));
			if (p(leftMeasure)) {
				var _split = left.splitDigit(p, i, M);
				return new Split(_from_small_list(M, _split.left), _split.middle, _deepL(M, _split.right, middle, right));
			}

			// see if the split point is inside the middle tree
			var midMeasure = M.plus(leftMeasure, middle.measure());

			if (p(midMeasure)) {
				var midSplit = middle.splitTree(p, leftMeasure);
				// midsplit.middle is a Node since middle is a Tree ( Node a )
				var _split2 = midSplit.middle.digit().splitDigit(p, M.plus(leftMeasure, midSplit.left.measure()), M);
				return new Split(_deepR(M, left, midSplit.left, _split2.left), _split2.middle, _deepL(M, _split2.right, midSplit.right, right));
			}

			// the split point is in the right tree
			var split = right.splitDigit(p, midMeasure, M);
			return new Split(_deepR(M, left, middle, split.left), split.middle, _from_small_list(M, split.right));
		};

		Deep.prototype.split = function (p) {

			if (p(this.measure())) {
				var split = this.splitTree(p, this.M.zero());
				return [split.left, split.right.cons(split.middle)];
			}

			return [this, new Empty(this.M)];
		};

		/* js/src/4-lazy */
		/* js/src/4-lazy/Lazy.js */
		function Lazy(thunk) {
			this.tree = null;
			this.thunk = thunk;
		}

		Lazy.prototype = new Tree();

		Lazy.prototype.force = function () {
			if (this.tree === null) {
				this.tree = this.thunk();
				this.thunk = null;
			}
			return this.tree;
		};

		Lazy.prototype.empty = function () {
			return this.force().empty();
		};

		Lazy.prototype.measure = function () {
			return this.force().measure();
		};

		Lazy.prototype.head = function () {
			return this.force().head();
		};

		Lazy.prototype.last = function () {
			return this.force().last();
		};

		Lazy.prototype.cons = function (value) {
			return this.force().cons(value);
		};

		Lazy.prototype.push = function (value) {
			return this.force().push(value);
		};

		Lazy.prototype.tail = function () {
			return this.force().tail();
		};

		Lazy.prototype.init = function () {
			return this.force().init();
		};

		Lazy.prototype.splitTree = function (p, i) {
			return this.force().splitTree(p, i);
		};

		Lazy.prototype.split = function (p) {
			return this.force().split(p);
		};

		Lazy.prototype.concat = function (other) {
			return this.force().concat(other);
		};

		Lazy.prototype[Symbol.iterator] = function () {
			return this.force()[Symbol.iterator]();
		};

		/* js/src/4-lazy/delay.js */
		function delay(thunk) {
			return new Lazy(thunk);
		}

		/* js/src/5-api.js */
		exports.empty = function (M) {
			return new Empty(M);
		};
		exports.from = from;

		return exports;
	};
	if (typeof exports === "object") {
		definition(exports);
	} else if (typeof define === "function" && define.amd) {
		define("aureooms-js-fingertree", [], function () {
			return definition({});
		});
	} else if (typeof window === "object" && typeof window.document === "object") {
		definition(window["fingertree"] = {});
	} else console.error("unable to detect type of module to define for aureooms-js-fingertree");
})();