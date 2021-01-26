console.time('prepare');
require('regenerator-runtime/runtime');
const ArgumentParser = require('argparse').ArgumentParser;
const itertools = require('@aureooms/js-itertools');
const empty = require('..').empty;
const COUNTER = {
	plus(a, b) {
		return a + b;
	},
	measure(_x) {
		return 1;
	},
	zero() {
		return 0;
	}
};

const parser = new ArgumentParser();
parser.addArgument(['M'], {defaultValue: 1000, nargs: '?'});
parser.addArgument(['-N'], {defaultValue: 1000});
const args = parser.parseArgs();
const M = args.M;
const N = args.N;

console.log('number of operations:', M * N);

const t = empty(COUNTER);
console.timeEnd('prepare');

console.time('prepend');
for (let k = 0; k < N; ++k) t.prepend(itertools.range(M));
console.timeEnd('prepend');
