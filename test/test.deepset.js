/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	deepSet = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset', function tests() {

	var obj;

	beforeEach( function before() {
		obj = {
			'a': {
				'b': {
					'c': 'd'
				}
			},
			'arr': [
				{
					'x': 1,
					'y': 2
				},
				{
					'x': 3,
					'y': 4
				}
			],
			'null': null
		};
	});

	it( 'should export a function', function test() {
		expect( deepSet ).to.be.a( 'function' );
	});

	it( 'should deep set a nested property', function test() {
		var expected, bool;

		expected = {
			'a': {
				'b': {
					'c': 'beep'
				}
			},
			'arr': [
				{
					'x': 1,
					'y': 2
				},
				{
					'x': 3,
					'y': 4
				}
			],
			'null': null
		};

		bool = deepSet( obj, ['a','b','c'], false, 'beep' );
		assert.deepEqual( obj, expected );
		assert.isTrue( bool );
	});

	it( 'should return `true` if able to successfully set', function test() {
		var bool = deepSet( obj, ['a','b','c'], false, 'beep' );
		assert.isBoolean( bool );
		assert.isTrue( bool );
	});

	it( 'should return `false` if unable to successfully set', function test() {
		var bool;
		bool = deepSet( obj, ['a','b','djfajdfaj'], false, 'beep' );
		assert.isBoolean( bool );
		assert.isFalse( bool );

		bool = deepSet( obj, ['null','e'], false, 'beep' );
		assert.isBoolean( bool );
		assert.isFalse( bool );
	});

	it( 'should deep set an array', function test() {
		var expected, bool;

		expected = {
			'a': {
				'b': {
					'c': 'd'
				}
			},
			'arr': [
				{
					'x': 1,
					'y': 200
				},
				{
					'x': 3,
					'y': 4
				}
			],
			'null': null
		};

		bool = deepSet( obj, ['arr',0,'y'], false, 200 );
		assert.deepEqual( obj, expected );
		assert.isTrue( bool );
	});

	it( 'should create properties which do not exist', function test() {
		var expected, bool;

		expected = {
			'a': {
				'b': {
					'c': 'd'
				}
			},
			'arr': [
				{
					'x': 1,
					'y': 2
				},
				{
					'x': 3,
					'y': 4
				},
				{
					'y': 200
				}
			],
			'null': null
		};

		bool = deepSet( obj, ['arr',2,'y'], true, 200 );
		assert.deepEqual( obj, expected );
		assert.isTrue( bool );
	});

	it( 'should deep set using a callback function', function test() {
		var expected, bool;

		expected = {
			'a': {
				'b': {
					'c': 'dub-beat'
				}
			},
			'arr': [
				{
					'x': 1,
					'y': 2
				},
				{
					'x': 3,
					'y': 4
				}
			],
			'null': null
		};

		bool = deepSet( obj, ['a','b','c'], false, set );
		assert.deepEqual( obj, expected );
		assert.isTrue( bool );

		function set( val ) {
			return val + 'ub-beat';
		}
	});

});
