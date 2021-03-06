const express = require("express");
const router = express.Router();
const {is_logged_handler} = require( '../lib/isLoggedIn' );
const list_controller = require('../controllers/list.controller');

router.post( '/list', is_logged_handler, list_controller.newList );
router.put( '/list/name', is_logged_handler, list_controller.updateListName );
router.put( '/list/items', is_logged_handler, list_controller.updateList );
router.put( '/list/shared', is_logged_handler, list_controller.updateShared );
router.delete( '/list/:listid', is_logged_handler, list_controller.deleteList );

module.exports = router;