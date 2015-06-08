'use strict';

/**
* FUNCTION: deepSet( obj, path, sep, create, value )
*	Deep sets a nested property.
*
* @param {Object|Array} obj - input object
* @param {String} path - key path
* @param {String} sep - key path separator
* @param {Boolean} create - boolean indicating whether to create a path if the key path does not already exist
* @param {*} value - value to set
* @returns {Boolean} boolean indicating if the property was successfully set
*/
function deepSet( obj, path, sep, create, value ) {
	var bool = false,
		props,
		len,
		v, p,
		i;

	props = path.split( sep );
	len = props.length;
	v = obj;
	for ( i = 0; i < len; i++ ) {
		p = props[ i ];
		if ( typeof v === 'object' && v !== null ) {
			if ( !v.hasOwnProperty( p ) ) {
				if ( create ) {
					v[ p ] = {};
				} else {
					break;
				}
			}
			if ( i < len-1 ) {
				v = v[ p ];
			} else {
				if ( typeof value === 'function' ) {
					v[ p ] = value( v[ p ] );
				} else {
					v[ p ] = value;
				}
				bool = true;
			}
		} else {
			break;
		}
	}
	return bool;
} // end FUNCTION deepSet()


// EXPORTS //

module.exports = deepSet;
