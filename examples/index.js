'use strict';

var deepSet = require( './../lib' );

var data,
	bool,
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

for ( i = 0; i < data.length; i++ ) {
	bool = deepSet( data, i+'.y.2', set );
	if ( !bool ) {
		console.error( 'Unable to deep set value.' );
	}
}
console.log( data );
