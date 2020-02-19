const express = require("express");
const router = express.Router();
const {is_logged_handler} = require( '../lib/isLoggedIn' );
const user_controller = require('../controllers/user.controller');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports=function(app, passport) {
    router.post( '/user/register', user_controller.userRegister )

    router.get( '/user/isloggedin', ( req, res, next ) => {
        if( typeof req.user != 'undefined' )
            return res.status( 200 ).json( { 'message': 'success' } );
        else
            return res.status( 401 ).json( { 'message': 'Not authorized' } );
    } );

    router.get( '/user/currentuser', is_logged_handler, user_controller.currentUser );

    router.post('/user/login', 
        passport.authenticate('local', { 
            successRedirect: '/',
            failureRedirect: '/login'
        })
    );

    return router;
}