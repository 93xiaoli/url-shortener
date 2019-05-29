const mongoose = require('mongoose')
const connectOptions = {
    keepAlive: true,
    reconnectTries: 100,
    useNewUrlParser: true,
};
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://18.235.222.65:27017/test', connectOptions, (err, db) =>
{
    if (err) console.log(`Error`, err);
    console.log(`Connected to MongoDB`);
});
const schema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String
})

const data = mongoose.model('url', schema);
module.exports = data;


