/**
* @param {Digit} left
* @param {FingerTree} middle
* @param {Array} right
*/
function deepR ( M , left , middle , right ) {

	if ( right.length === 0 ) {

		if ( middle.empty( ) ) return _from_digit( M , left ) ;

		return new Deep( M , left , delay( ( ) => middle.init( ) ) , middle.last( ).digit( ) ) ;
	}

	return new Deep( M , left , middle , _digit( right ) ) ;

}

