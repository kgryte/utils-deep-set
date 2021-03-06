/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	deepSet = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'utils-deep-set', function tests() {

	it( 'should export a function', function test() {
		expect( deepSet ).to.be.a( 'function' );
	});

	it( 'should export a factory function', function test() {
		expect( deepSet.factory ).to.be.a( 'function' );
	});

	it( 'should return `false` if provided a non-object or null', function test() {
		var values = [
			'5',
			5,
			null,
			undefined,
			NaN,
			true,
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isFalse( deepSet( values[ i ], 'a.b.c', 5 ) );
		}
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
				deepSet( {'a':5}, value, 5 );
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
				deepSet( {'a':5}, 'a', 4, value );
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
				deepSet( {'a':5}, 'a', 4, {
					'create': value
				});
			};
		}
	});

	it( 'should return a boolean', function test() {
		var bool;

		bool = deepSet( {'a':5}, 'a', 4 );
		assert.isBoolean( bool );
		assert.isTrue( bool );

		bool = deepSet( {'a':5}, 'b', 4, {
			'create': false
		});
		assert.isBoolean( bool );
		assert.isFalse( bool );
	});

	it( 'should deep set', function test() {
		var obj, bool, expected;

		obj = { 'a': { 'b': 0 } };

		bool = deepSet( obj, 'a.b', 4 );
		expected = { 'a': { 'b': 4 } };

		assert.isTrue( bool );
		assert.deepEqual( obj, expected );

		bool = deepSet( obj, ['a','b'], 40 );
		expected = { 'a': { 'b': 40 } };

		assert.isTrue( bool );
		assert.deepEqual( obj, expected );
	});

});
