class Deep extends Tree {

	constructor ( M , left , middle , right ) {
		super( ) ;
		this.M = M ;
		this.left = left ;
		this.middle = middle ;
		this.right = right ;
		this.v = null ;
	}

	measure ( ) {

		if ( this.v === null ) {

			const M = this.M ;

			this.v = M.plus(
				this.left.measure( M ) ,
				M.plus(
					this.middle.measure( ) ,
					this.right.measure( M )
				)
			) ;

		}

		return this.v ;

	}

	empty ( ) {
		return false ;
	}

	head ( ) {
		return this.left.head( ) ;
	}

	last ( ) {
		return this.right.last( ) ;
	}

	tail ( ) {

		if ( this.left instanceof One ) {

			if ( this.middle.empty( ) ) {
				return _from_digit( this.M , this.right ) ;
			}

			return new Deep( this.M , this.middle.head( ).digit( ) , delay( ( ) => this.middle.tail( ) ) , this.right ) ;

		}

		return new Deep( this.M , this.left.tail( ) , this.middle , this.right ) ;

	}

	init ( ) {

		if ( this.right instanceof One ) {

			if ( this.middle.empty( ) ) {
				return _from_digit( this.M , this.left ) ;
			}

			return new Deep( this.M , this.left , delay( ( ) => this.middle.init( ) ) , this.middle.last( ).digit( ) ) ;

		}

		return new Deep( this.M , this.left , this.middle , this.right.init( ) ) ;

	}

	cons ( value )  {

		if ( this.left instanceof Four ) {

			return new Deep(
				this.M ,
				new Two( value , this.left.head( ) ) ,
				this.middle.cons( this.left.tail( ).node( this.M ) ) ,
				this.right
			) ;

		}

		return new Deep( this.M , this.left.cons( value ) , this.middle , this.right ) ;

	}

	push ( value ) {

		if ( this.right instanceof Four ) {

			return new Deep(
				this.M ,
				this.left ,
				this.middle.push( this.right.init( ).node( this.M ) ) ,
				new Two( this.right.last( ) , value )
			) ;

		}

		return new Deep( this.M , this.left , this.middle , this.right.push( value ) ) ;

	}

	concat ( other ) {

		return app3( this , [ ] , other ) ;

	}

	*[Symbol.iterator] ( ) {

		yield* this.left ;
		for ( const node of this.middle ) yield* node ;
		yield* this.right ;

	}

	/**
	 * It is assumed that p(|this|) is true.
	 */
	splitTree ( p , i ) {

		const { left , middle , right , M } = this ;

		// see if the split point is inside the left tree
		const leftMeasure = M.plus( i , left.measure( M ) ) ;
		if ( p( leftMeasure ) ) {
			const split = left.splitDigit( p , i , M ) ;
			return new Split(
				_from_small_list( M , split.left ) ,
				split.middle ,
				_deepL( M , split.right , middle , right )
			) ;
		}

		// see if the split point is inside the middle tree
		const midMeasure = M.plus( leftMeasure , middle.measure( ) ) ;

		if ( p( midMeasure ) ) {
			const midSplit = middle.splitTree( p , leftMeasure ) ;
			// midsplit.middle is a Node since middle is a Tree ( Node a )
			const split = midSplit.middle.digit( ).splitDigit( p , M.plus( leftMeasure , midSplit.left.measure( ) ) , M ) ;
			return new Split(
				_deepR( M , left , midSplit.left, split.left ) ,
				split.middle ,
				_deepL( M , split.right , midSplit.right , right )
			) ;
		}

		// the split point is in the right tree
		const split = right.splitDigit( p , midMeasure , M ) ;
		return new Split(
			_deepR( M , left , middle , split.left ) ,
			split.middle ,
			_from_small_list( M , split.right )
		) ;
	}

	split ( p ) {

		if ( p( this.measure( ) ) ) {
			const split = this.splitTree( p , this.M.zero( ) ) ;
			return [ split.left , split.right.cons( split.middle ) ] ;
		}

		return [ this , new Empty( this.M ) ] ;

	}

}
