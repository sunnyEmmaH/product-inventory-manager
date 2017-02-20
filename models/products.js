var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    packing: String,
    status: Boolean
});

module.exports = mongoose.model('products', ProductsSchema);