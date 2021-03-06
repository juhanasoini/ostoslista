const mongoose = require('mongoose');
const userModel = mongoose.model('User');
const listModel = mongoose.model('ShoppingList');

module.exports.userRegister = async ( req, res, next ) => {
	let user = new userModel( {
		username: req.body.username,
		email: req.body.email
	});
	user.setPassword( req.body.password );

	await user.save( function (err, user) {
		if (err) 
      		return res.status( 400 ).json( err.errors)

	  	let list = new listModel( {
	  		name: 'Lista 1',
	  		owner: user
	  	});

	  	list = list.save( function (err, list ){
	  		user.lists.push( list );
	  		user.save();

	  	} );
		return res.status( 200 ).json( user );
    } );
}

module.exports.currentUser = ( req, res, next ) => {
	let id = req.user._id;

	userModel.findById( id )
	.populate( {
		path: 'shared_lists'
	})
	.populate( {
		path: 'lists',
		populate: {
			path: 'shared_with',
			'select': 'email -_id'
		}
	})
	.select('username email lists')
	.then( result => {
		return res.status( 200 ).json(result);
	});	
}