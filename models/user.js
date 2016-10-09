var mongoose = require('mongoose');
//Config
const dbName = "user"
const crypto = require('crypto');


function crypt(data) {
    return crypto.createHmac('sha256', data)
        .update('I love cupcakes')
        .digest('hex')
}

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