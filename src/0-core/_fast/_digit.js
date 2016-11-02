import { One , Two , Three } from '../../1-digit' ;

export function _digit ( list ) {

	switch ( list.length ) {

		case 1 : return new One( list[0] ) ;
		case 2 : return new Two( list[0] , list[1] ) ;
		case 3 : return new Three( list[0] , list[1] , list[2] ) ;
		// potential optimization by commenting out this section
		// and defaulting for case 3
		case 4 : throw new Error( '_digit(.) should never be called on length 4 lists since it is only called on results of splitDigit which outputs lists of length at most 3' ) ;
		default: throw new Error( `cannot make digit for length ${list.length}` ) ;

	}

}
