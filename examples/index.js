'use strict';

var deepSet = require( './../lib' );

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
