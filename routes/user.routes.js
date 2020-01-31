const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const userModel = mongoose.model('User');

// const userModel = require('../models/user.model');

router.get( '/user/hello/:name', ( req, res, next ) => {
	return res.send( "Hello world again "+req.params.name );
} );


router.get( '/user/register', async ( req, res, next ) => {
	let user = new userModel( {
		username: 'Moikkelis',
		email: 'juhanasoini@gmail.com'
	});
	user = await user.save( function (err, user) {
      if (err) 
      	return res.status( 400 ).json( err.errors)

      	return res.status( 200 ).json( user );
    } );
});

module.exports = router