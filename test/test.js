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

	it( 'should do something' );

});
