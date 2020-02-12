const express = require("express");
const router = express.Router();
const {is_logged_handler} = require( '../lib/isLoggedIn' );
const user_controller = require('../controllers/user.controller');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

router.post( '/user/register', user_controller.userRegister )

router.get( '/user/isloggedin', ( req, res, next ) => {
		// return res.status( 200 ).json( { 'message': 'success' } );
	if( typeof req.session.user != 'undefined' )
		return res.status( 200 ).json( { 'message': 'success' } );
	else
		return res.status( 400 ).json( { 'message': 'failed' } );
} );

router.get( '/user/currentuser', is_logged_handler, user_controller.currentUser );

router.post( '/user/login', ( req, res, next ) => {
  	req.session.user = {
      id: '5e3abb1ddc3f52331d4303e2'
    }
  	// return res.status( 400 ).json( [{ 'message': 'Kirjautuminen ei onnistunut. Tarkista tunnuksesi' }])
  	return res.status( 200 ).json( [{ 'message': 'success' }] );

});


module.exports = router