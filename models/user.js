var mongoose = require('mongoose');
//Config
const dbName = "user"
const crypto = require('crypto');


function crypt(data) {
    return crypto.createHmac('sha256', data)
        .update('love chocolate')
        .digest('hex')
}
/*permission

1 user
2 partner
3 autor
4 moderator
5 editor
6 admin

*/
var permission = {
    post: 1,
    get: 6,
    put: 1,
    delete: 6
};
//Filter
//post
function filterPost(data, level) {

    switch (level) {
        case 1:
            return {
                email: data.email,
                password: crypt(data.password)
            };
        case 6:
            return data;
        default:
            return {};
    }
}
//put
function filterPut(data, level) {

    switch (level) {
        case 1:
            return {
                password: crypt(data.password)
            };
        case 6:
            return data;
        default:
            return {};
    }
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
    },
    level: {
        type: Number,
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    last_connection: {
        type: Date,
        default: Date.now
    },
    last_ip: {
        type: String,
    },
    estate: [mongoose.Schema.ObjectId]
});
// Post method
schema.statics.post = function(data, level) {
    if (level >= permission.post) {
        var filterData = filterPost(data, level);
        var dbObject = new model(filterData);
        return dbObject.save();

    } else {
        return false;
    }
};
// get method
schema.statics.get = function(data, level) {
    if (level >= permission.get) {
        return this.find(data)
    }
}

var model = mongoose.model(dbName, schema);
module.exports = model;