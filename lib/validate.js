'use strict';

// MODULES //

var isString = require( 'validate.io-string-primitive' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination for function options
* @param {Object} options - function options
* @param {Boolean} [options.create] - boolean indicating whether to create a path if the key path does not already exist
* @param {String} [options.sep] - key path separator
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'deepSet()::invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( options.hasOwnProperty( 'create' ) ) {
		opts.create = options.create;
		if ( !isBoolean( opts.create ) ) {
			return new TypeError( 'deepSet()::invalid option. Create option must be a boolean primitive. Option: `' + opts.create + '`.' );
		}
	}
	if ( options.hasOwnProperty( 'sep' ) ) {
		opts.sep = options.sep;
		if ( !isString( opts.sep ) ) {
			return new TypeError( 'deepSet()::invalid option. Key path separator must be a string primitive. Option: `' + opts.sep + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
