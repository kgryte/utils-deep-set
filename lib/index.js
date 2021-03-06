'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isArray = require( 'validate.io-array' ),
	validate = require( './validate.js' ),
	defaults = require( './defaults.js' ),
	dset = require( './deepset.js' );


// DEEP SET //

/**
* FUNCTION: deepSet( obj, path, value[, opts] )
*	Deep sets a nested property.
*
* @param {Object|Array} obj - input object
* @param {String|Array} path - key path
* @param {*} value - value to set
* @param {Object} [opts] - function options
* @param {Boolean} [opts.create=false] - boolean indicating whether to create a path if the key path does not already exist
* @param {String} [opts.sep='.'] - key path separator
* @returns {Boolean} boolean indicating if the property was successfully set
*/
function deepSet( obj, path, value, options ) {
	var isStr = isString( path ),
		props,
		opts,
		err;
	if ( typeof obj !== 'object' || obj === null ) {
		return false;
	}
	if ( !isStr && !isArray( path ) ) {
		throw new TypeError( 'deepSet()::invalid input argument. Key path must be a string primitive or a key array. Value: `' + path + '`.' );
	}
	opts = defaults();
	if ( arguments.length > 3 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isStr ) {
		props = path.split( opts.sep );
	} else {
		props = path;
	}
	return dset( obj, props, opts.create, value );
} // end FUNCTION deepSet()


// EXPORTS //

module.exports = deepSet;
module.exports.factory = require( './factory.js' );
