const express = require("express")
const router = express.Router()

router.get( '/user/hello/:name', ( req, res, next ) => {
	return res.send( "Hello world again "+req.params.name );
} );

module.exports = router