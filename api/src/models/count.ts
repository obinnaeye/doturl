export {};
var mongoose = require('mongoose');

var countModel = mongoose.Schema({
    count: {
        type: Number,
        required: true,
        default: 0
    },
    _id: {
        type: String,
        require: true
    }
});

const Count = module.exports = mongoose.model('count', countModel);
module.exports.get = function (callback, limit) {
    Count.find(callback).limit(limit);
}
