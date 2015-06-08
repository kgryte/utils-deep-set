/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	factory = require( './../lib/factory.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'factory', function tests() {

	it( 'should export a function', function test() {
		expect( factory ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a key path argument which is not either a string primitive or a key array', function test() {
		var values = [
			5,
			null,
			undefined,
			NaN,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				factory( value );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			null,
			NaN,
			true,
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				factory( 'a', value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			null,
			NaN,
			{},
			undefined,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				factory( 'a', {
					'create': value
				});
			};
		}
	});

	it( 'should return a function', function test() {
		var dset = factory( 'a/b', {
			'create': true,
			'sep': '/'
		});
		expect( dset ).to.be.a( 'function' );
	});

	it( 'should return `false` if provided a non-object or null', function test() {
		var values, dset;

		values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			function(){}
		];

		dset = factory( 'a/b', {
			'create': true,
			'sep': '/'
		});

		for ( var i = 0; i < values.length; i++ ) {
			assert.isFalse( dset( values[ i ], 5 ) );
		}
	});

	it( 'should return a boolean', function test() {
		var bool, dset;

		dset = factory( 'a', {
			'create': false,
			'sep': '.'
		});

		bool = dset( {'a':5}, 4 );
		assert.isBoolean( bool );
		assert.isTrue( bool );

		bool = dset( {'b':5}, 4 );
		assert.isBoolean( bool );
		assert.isFalse( bool );

		dset = factory( 'a', {
			'create': true
		});

		bool = dset( {'b':5}, 4 );
		assert.isBoolean( bool );
		assert.isTrue( bool );
	});

	it( 'should deep set', function test() {
		var obj, dset, bool, expected;

		dset = factory( ['a','b'] );

		obj = { 'a': { 'b': 0 } };

		bool = dset( obj, 4 );
		expected = { 'a': { 'b': 4 } };

		assert.isTrue( bool );
		assert.deepEqual( obj, expected );

		bool = dset( obj, 40 );
		expected = { 'a': { 'b': 40 } };

		assert.isTrue( bool );
		assert.deepEqual( obj, expected );
	});

});
