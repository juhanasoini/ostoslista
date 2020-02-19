const mongoose = require('mongoose');
const listModel = mongoose.model('ShoppingList');
const userModel = mongoose.model('User');
const user_controller = require('./user.controller');

module.exports.newList = async function( req, res, next ){
	let body = req.body;
	try{
		let ownerID = req.user.id
		let list = new listModel( {
			name: body.name,
			owner: ownerID} );
		await list.save( function( err, list ){
			if( err )
      			return res.status( 400 ).json( err.errors);

  			let user = userModel.findById( ownerID , function( err, user ){
  				if( err )
  					return res.status( 400 ).json( err.errors); 

  				user.lists.push( list );
  				user.save();
  			});

      		return res.status( 200 ).json( list );
		} )
	} catch( err ) {
		console.error( err );
	}
}

module.exports.updateList = function( req, res, next ){
	let body = req.body;
	try{
		let list = listModel.findOneAndUpdate( { _id: body._id }, { items: body.items }, {new: true}, function( err, list ){
			if( list == null )
				res.status(400).end();
			else
				res.status(200).json( list );
		} )
	} catch( err ) {
		console.error( err );
	}

	return res.status(200);
}

module.exports.updateListName = function( req, res, next ){
	let body = req.body;
	try{
		let list = listModel.findOneAndUpdate( { _id: body._id }, { name: body.name }, {new: true}, function( err, list ){
			if( list == null )
				res.status(400).end();
			else
				res.status(200).json( list );
		} )
	} catch( err ) {
		console.error( err );
	}

	return res.status(400);
}
module.exports.deleteList = async function( req, res, next ){
	let params = req.params;
	try{
		let listID = params.listid;
		let ownerID = req.user.id;
		let list = await listModel.findById( listID );
		if( list.owner == ownerID )
		{
			await userModel.findById( list.owner, function( err, user ){
				if( err )
					return res.status( 400 ).json( err.errors); 

				let index = user.lists.indexOf(listID);
				if( index != -1  )
				{
					user.lists.splice( index, 1 );
					user.save( function( err, user ){
						listModel.findByIdAndDelete( listID, function (err) {
							if(err) 
								return res.status( 400 ).json( err.errors); 

							return res.status( 200 ).json( {'success': 'List removed'} );						  
						});
					});
				}
			});
		}
		else
			return res.status( 400 ).json( { 'error': `User not allowed to remove list ID ${listID}` } ); 

	
	} catch( err ) {
		console.error( err );
	}
}