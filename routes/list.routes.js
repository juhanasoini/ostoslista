const express = require("express");
const router = express.Router();
const {is_logged_handler} = require( '../lib/isLoggedIn' );
const list_controller = require('../controllers/list.controller');

router.put( '/list/name', is_logged_handler, list_controller.updateListName );
router.put( '/list/items', is_logged_handler, list_controller.updateList );

module.exports = router;