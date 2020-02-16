
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { Schema } = mongoose;

var ShoppingListSchema = new Schema({
	name: {
		type: String, 
		required: [true, "Anna nimi ostoslistalle"],
		index: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User',
		index: true,
		required: true
	},
	shared_with: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'User'
	}],
	items: [{
        title: {
            type: String,
        },
        done: {
            type: Boolean,
        },
        id: {
            type: String,
        }
    }]
}, {timestamps: true});

const shoppingListModel = mongoose.model('ShoppingList', ShoppingListSchema);

module.exports = shoppingListModel;