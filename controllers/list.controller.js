const mongoose = require('mongoose');
const listModel = mongoose.model('ShoppingList');

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
	console.log(body)
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