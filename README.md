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

#### deepSet( obj, path, value[, opts] )

Deep sets a nested property.

``` javascript
var obj = {
	'a': {
		'b': {
			'c': 'd'
		}
	}
};

obj = deepSet( obj, 'a.b.c', 'beep' );
/* returns
	{
		'a': {
			'b': {
				'c': 'beep'
			}
		}
	}
*/
```


## Examples

``` javascript
var deepSet = require( 'utils-deep-set' );
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
