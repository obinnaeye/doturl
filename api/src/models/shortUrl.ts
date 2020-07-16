const mongoose = require('mongoose');
const Count = require('./count')

const shortUrlModel = mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
}, { timestamps: true });

shortUrlModel.pre('save', function(next) {
    Count.findByIdAndUpdate({ _id: 'count_id' }, { $inc: { count: 1 } }, function(err, count) {
        if(err) return next(err);
        next();
    });
});

const ShortUrl = module.exports = mongoose.model('shorturl', shortUrlModel);
module.exports.get = function (callback, limit) {
    ShortUrl.find(callback).limit(limit);
}