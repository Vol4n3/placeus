var mongoose = require('mongoose');
//Config
var dbName = "user"
var crypto = require('crypto');
var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

schema.static.create = function(data, level) {

}
var model = mongoose.model(dbName, schema);
module.exports = model;