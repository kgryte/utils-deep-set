'use strict';

var deepSet = require( './../lib' );

var data,
	bool,
	i;

data = new Array( 100 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': Date.now(),
		'y': [ Math.random(), Math.random(), i ]
	};
}

for ( i = 0; i < data.length; i++ ) {
	bool = deepSet( data, i+'.y.2', i*10 );
	if ( !bool ) {
		console.error( 'Unable to deep set value.' );
	}
}
console.log( data );
