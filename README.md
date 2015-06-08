Deep Set
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Deep set a nested property.


## Installation

``` bash
$ npm install utils-deep-set
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var deepSet = require( 'utils-deep-set' );
```

#### deepSet( obj, path, value[, options] )

Deep set a nested property.

``` javascript
var obj = { 'a': { 'b': { 'c': 'd' } } };

var bool = deepSet( obj, 'a.b.c', 'beep' );
/*
	{ 'a': { 'b': { 'c': 'beep' } } }
*/
```

If the function is able to deep set a nested property, the function returns `true`; otherwise, the function returns `false`.

``` javascript
var bool = deepSet( obj, 'a.b.c', 'woot' );
// returns true

bool = deepSet( obj, 'a.beep.c', 'boop' );
// returns false

bool = deepSet( null, 'a.beep.c', 'boop' );
// returns false

bool = deepSet( 'bap', 'a.beep.c', 'boop' );
// returns false
```

For `paths` including `arrays`, specify the numeric index.

``` javascript
var arr = [
	{ 'a': [ {'x': 5} ] },
	{ 'a': [ {'x': 10} ] }
];

var bool = deepSet( arr, '1.a.0.x', 25 );
/*
	[
		{ 'a': [ {'x': 5} ] },
		{ 'a': [ {'x': 25} ] }
	]
*/
```

The key `path` may be specified as either a delimited `string` or a key `array`.

``` javascript
var obj = { 'a': { 'b': { 'c': 'd' } } };

var bool = deepSet( obj, ['a','b','c'], 'beep' );
/*
	{ 'a': { 'b': { 'c': 'beep' } } }
*/
```

If `value` is a `function`, the argument is treated as a `callback` and should return a value to set.

``` javascript
function set( val ) {
	var ch = val;
	for ( var i = 0; i < 4; i++ ) {
		val += ch;
	}
	return val;
}
var obj = { 'a': { 'b': { 'c': 'd' } } };

var bool = deepSet( obj, 'a.b.c', set );
/*
	{ 'a': { 'b': { 'c': 'ddddd' } } }
*/
```

The function accepts the following `options`:

*	__sep__: key path separator. Default: `'.'`.
*	__create__: `boolean` indicating whether to create a path if the key path does not already exist. Default: `false`.

By default, the function assumes `dot` separated key values. To specify an alternative separator, set the `sep` option.

``` javascript
var obj = { 'a': { 'b': { 'c': 'd' } } };

var bool = deepSet( obj, 'a/b/c', 'beep', {
	'sep': '/'	
});
/*
	{ 'a': { 'b': { 'c': 'beep' } } }
*/
```

To create a key path which does not already exist, set the `create` option to `true`.

``` javascript
var bool = deepSet( obj, 'a.e.c', 'boop', {
	'create': true	
});
/*
	{ 
		'a': { 
			'b': {
				'c': 'beep'
			}, 
			'e': {
				'c': 'boop'
			} 
		}
	}
*/
```


#### deepSet.factory( path[, options] )

Creates a reusable deep set factory. The factory method ensures a `deepSet` function is configured identically by using the same set of provided `options`.

``` javascript
var dset = deepSet.factory( 'a/b/c', {
	'create': true,
	'sep': '/'
});
```


#### dset( obj, value )

Deep sets a nested property.

``` javascript
var obj = { 'a': { 'b': { 'c': 'd' } } };

var bool = dset( obj, 'beep' );
/*
	{ 'a': { 'b': { 'c': 'beep' } } }
*/
```



## Examples

``` javascript
var deepSet = require( 'utils-deep-set' );

var data,
	bool,
	keys,
	i;

function set( val ) {
	return val * 10;
}

data = new Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': Date.now(),
		'y': [ Math.random(), Math.random(), i ]
	};
}

keys = [ 0, 'y', 2 ];
for ( i = 0; i < data.length; i++ ) {
	keys[ 0 ] = i;
	bool = deepSet( data, keys, set );
	if ( !bool ) {
		console.error( 'Unable to deep set value.' );
	}
}
console.log( data );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/utils-deep-set.svg
[npm-url]: https://npmjs.org/package/utils-deep-set

[travis-image]: http://img.shields.io/travis/kgryte/utils-deep-set/master.svg
[travis-url]: https://travis-ci.org/kgryte/utils-deep-set

[coveralls-image]: https://img.shields.io/coveralls/kgryte/utils-deep-set/master.svg
[coveralls-url]: https://coveralls.io/r/kgryte/utils-deep-set?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/utils-deep-set.svg
[dependencies-url]: https://david-dm.org/kgryte/utils-deep-set

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/utils-deep-set.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/utils-deep-set

[github-issues-image]: http://img.shields.io/github/issues/kgryte/utils-deep-set.svg
[github-issues-url]: https://github.com/kgryte/utils-deep-set/issues
