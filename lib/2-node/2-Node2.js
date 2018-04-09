"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Node2 = Node2;
exports.node2 = node2;

var _digit = require("../1-digit");

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
	return new _digit.Two(this.a, this.b);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy8yLW5vZGUvMi1Ob2RlMi5qcyJdLCJuYW1lcyI6WyJOb2RlMiIsIm5vZGUyIiwidiIsImEiLCJiIiwicHJvdG90eXBlIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJtZWFzdXJlIiwiZGlnaXQiLCJoZWFkIiwiRXJyb3IiLCJsYXN0IiwiaW5pdCIsInRhaWwiLCJwdXNoIiwidmFsdWUiLCJjb25zIiwiTSIsInBsdXMiXSwibWFwcGluZ3MiOiI7Ozs7O1FBRWdCQSxLLEdBQUFBLEs7UUEyQ0FDLEssR0FBQUEsSzs7QUE3Q2hCOztBQUVPLFNBQVNELEtBQVQsQ0FBaUJFLENBQWpCLEVBQXFCQyxDQUFyQixFQUF5QkMsQ0FBekIsRUFBNkI7QUFDbkMsTUFBS0YsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsTUFBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsTUFBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0E7O0FBRURKLE1BQU1LLFNBQU4sQ0FBZ0JDLE9BQU9DLFFBQXZCLElBQW1DLFlBQWE7QUFDL0MsUUFBTyxDQUFFLEtBQUtKLENBQVAsRUFBVyxLQUFLQyxDQUFoQixFQUFvQkUsT0FBT0MsUUFBM0IsR0FBUDtBQUNBLENBRkQ7O0FBSUFQLE1BQU1LLFNBQU4sQ0FBZ0JHLE9BQWhCLEdBQTBCLFlBQWE7QUFDdEMsUUFBTyxLQUFLTixDQUFaO0FBQ0EsQ0FGRDs7QUFJQUYsTUFBTUssU0FBTixDQUFnQkksS0FBaEIsR0FBd0IsWUFBYTtBQUNwQyxRQUFPLGVBQVMsS0FBS04sQ0FBZCxFQUFrQixLQUFLQyxDQUF2QixDQUFQO0FBQ0EsQ0FGRDs7QUFJQUosTUFBTUssU0FBTixDQUFnQkssSUFBaEIsR0FBdUIsWUFBYTtBQUNuQyxPQUFNLElBQUlDLEtBQUosQ0FBVyw4QkFBWCxDQUFOO0FBQ0EsQ0FGRDs7QUFJQVgsTUFBTUssU0FBTixDQUFnQk8sSUFBaEIsR0FBdUIsWUFBYTtBQUNuQyxPQUFNLElBQUlELEtBQUosQ0FBVyw4QkFBWCxDQUFOO0FBQ0EsQ0FGRDs7QUFJQVgsTUFBTUssU0FBTixDQUFnQlEsSUFBaEIsR0FBdUIsWUFBYTtBQUNuQyxPQUFNLElBQUlGLEtBQUosQ0FBVyw4QkFBWCxDQUFOO0FBQ0EsQ0FGRDs7QUFJQVgsTUFBTUssU0FBTixDQUFnQlMsSUFBaEIsR0FBdUIsWUFBYTtBQUNuQyxPQUFNLElBQUlILEtBQUosQ0FBVyw4QkFBWCxDQUFOO0FBQ0EsQ0FGRDs7QUFJQVgsTUFBTUssU0FBTixDQUFnQlUsSUFBaEIsR0FBdUIsVUFBV0MsS0FBWCxFQUFtQjtBQUN6QyxPQUFNLElBQUlMLEtBQUosQ0FBVyw4QkFBWCxDQUFOO0FBQ0EsQ0FGRDs7QUFJQVgsTUFBTUssU0FBTixDQUFnQlksSUFBaEIsR0FBdUIsVUFBV0QsS0FBWCxFQUFtQjtBQUN6QyxPQUFNLElBQUlMLEtBQUosQ0FBVyw4QkFBWCxDQUFOO0FBQ0EsQ0FGRDs7QUFLTyxTQUFTVixLQUFULENBQWlCaUIsQ0FBakIsRUFBcUJmLENBQXJCLEVBQXlCQyxDQUF6QixFQUE2QjtBQUNuQyxRQUFPLElBQUlKLEtBQUosQ0FBV2tCLEVBQUVDLElBQUYsQ0FBUUQsRUFBRVYsT0FBRixDQUFXTCxDQUFYLENBQVIsRUFBeUJlLEVBQUVWLE9BQUYsQ0FBV0osQ0FBWCxDQUF6QixDQUFYLEVBQXVERCxDQUF2RCxFQUEyREMsQ0FBM0QsQ0FBUDtBQUNBIiwiZmlsZSI6IjItTm9kZTIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUd28gfSBmcm9tICcuLi8xLWRpZ2l0JyA7XG5cbmV4cG9ydCBmdW5jdGlvbiBOb2RlMiAoIHYgLCBhICwgYiApIHtcblx0dGhpcy52ID0gdiA7XG5cdHRoaXMuYSA9IGEgO1xuXHR0aGlzLmIgPSBiIDtcbn1cblxuTm9kZTIucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoICkge1xuXHRyZXR1cm4gWyB0aGlzLmEgLCB0aGlzLmIgXVtTeW1ib2wuaXRlcmF0b3JdKCApIDtcbn0gO1xuXG5Ob2RlMi5wcm90b3R5cGUubWVhc3VyZSA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiB0aGlzLnYgO1xufSA7XG5cbk5vZGUyLnByb3RvdHlwZS5kaWdpdCA9IGZ1bmN0aW9uICggKSB7XG5cdHJldHVybiBuZXcgVHdvKCB0aGlzLmEgLCB0aGlzLmIgKSA7XG59IDtcblxuTm9kZTIucHJvdG90eXBlLmhlYWQgPSBmdW5jdGlvbiAoICkge1xuXHR0aHJvdyBuZXcgRXJyb3IoIFwidHJ5aW5nIHRvIGNhbGwgaGVhZCBvZiBOb2RlMlwiICkgO1xufSA7XG5cbk5vZGUyLnByb3RvdHlwZS5sYXN0ID0gZnVuY3Rpb24gKCApIHtcblx0dGhyb3cgbmV3IEVycm9yKCBcInRyeWluZyB0byBjYWxsIGxhc3Qgb2YgTm9kZTJcIiApIDtcbn0gO1xuXG5Ob2RlMi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICggKSB7XG5cdHRocm93IG5ldyBFcnJvciggXCJ0cnlpbmcgdG8gY2FsbCBpbml0IG9mIE5vZGUyXCIgKSA7XG59IDtcblxuTm9kZTIucHJvdG90eXBlLnRhaWwgPSBmdW5jdGlvbiAoICkge1xuXHR0aHJvdyBuZXcgRXJyb3IoIFwidHJ5aW5nIHRvIGNhbGwgdGFpbCBvZiBOb2RlMlwiICkgO1xufSA7XG5cbk5vZGUyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKCB2YWx1ZSApIHtcblx0dGhyb3cgbmV3IEVycm9yKCBcInRyeWluZyB0byBjYWxsIHB1c2ggb2YgTm9kZTJcIiApIDtcbn0gO1xuXG5Ob2RlMi5wcm90b3R5cGUuY29ucyA9IGZ1bmN0aW9uICggdmFsdWUgKSB7XG5cdHRocm93IG5ldyBFcnJvciggXCJ0cnlpbmcgdG8gY2FsbCBjb25zIG9mIE5vZGUyXCIgKSA7XG59IDtcblxuXG5leHBvcnQgZnVuY3Rpb24gbm9kZTIgKCBNICwgYSAsIGIgKSB7XG5cdHJldHVybiBuZXcgTm9kZTIoIE0ucGx1cyggTS5tZWFzdXJlKCBhICkgLCBNLm1lYXN1cmUoIGIgKSApICwgYSAsIGIgKSA7XG59XG4iXX0=