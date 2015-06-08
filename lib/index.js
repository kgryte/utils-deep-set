'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	validate = require( './validate.js' ),
	defaults = require( './defaults.js' ),
	set = require( './deepset.js' );


// DEEP SET //

/**
* FUNCTION: deepSet( obj, path, value[, opts] )
*	Deep sets a nested property.
*
* @param {Object|Array} obj - input object
* @param {String} path - key path
* @param {*} value - value to set
* @param {Object} [opts] - function options
* @param {Boolean} [opts.create=false] - boolean indicating whether to create a path if the key path does not already exist
* @param {String} [opts.sep='.'] - key path separator
* @returns {Boolean} boolean indicating if the property was successfully set
*/
function deepSet( obj, path, value, options ) {
	var opts, err;
	if ( typeof obj !== 'object' || obj === null ) {
		return false;
	}
	if ( !isString( path ) ) {
		throw new TypeError( 'deepSet()::invalid input argument. Key path must be a string primitive. Value: `' + path + '`.' );
	}
	opts = defaults();
	if ( arguments.length > 3 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	return set( obj, path, opts.sep, opts.create, value );
} // end FUNCTION deepSet()


// FACTORY //

/**
* FUNCTION: factory( path[, opts] )
*	Creates a reusable deep set factory.
*
* @param {String} path - key path
* @param {Object} [opts] - function options
* @param {Boolean} [opts.create=false] - boolean indicating whether to create a path if the key path does not already exist
* @param {String} [opts.sep='.'] - key path separator
* @returns {Function} deep set factory
*/
function factory( path, options ) {
	var opts, err;
	if ( !isString( path ) ) {
		throw new TypeError( 'deepSet()::invalid input argument. Key path must be a string primitive. Value: `' + path + '`.' );
	}
	opts = defaults();
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	/**
	* FUNCTION: deepSet( obj, value )
	*	Deep sets a nested property.
	*
	* @param {Object|Array} obj - input object
	* @param {*} value - value to set
	* @returns {Boolean} boolean indicating if the property was successfully set
	*/
	return function deepSet( obj, value ) {
		if ( typeof obj !== 'object' || obj === null ) {
			return false;
		}
		return set( obj, path, opts.sep, opts.create, value );
	};
} // end FUNCTION factory()


// EXPORTS //

module.exports = deepSet;
module.exports.factory = factory;
