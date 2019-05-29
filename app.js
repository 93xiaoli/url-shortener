const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const shorten = require('./utils/shorten')
const data = require('./utils/database')


// logging requests
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '.', '.')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'pug');

// for
function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

app.post('/api/v1/shorten/put', (req, res) => {
    let longUrl = req.body.longUrl;
    if (!validateUrl(longUrl)) {
        res.render('index', {message: 'url invalid'})
        return
    }

    let shortUrl, hasShortUrl = false;

    data.findOne({longUrl: longUrl}, (err, doc) => {
        if (err) {
            console.log(err);
        }
        if (doc != null) {
            shortUrl = doc.shortUrl
            hasShortUrl = true
        }
    })
    if (hasShortUrl){
        res.render('index', {shortFullUrl:  doc.shortUrl});
        return;
    }
    shortUrl = shorten(longUrl);
    new data({
        longUrl: longUrl,
        shortUrl: shortUrl
    }).save((err) => {
        if (err) {
            console.log(err);
        }
        var shortFullUrl = req.protocol + '://' + req.get('host') + '/' + shortUrl;
        // console.log(shortenFullUrl);
        res.render('index', {shortFullUrl: shortFullUrl});
    });
});


app.get('/:shortUrl', (req, res) => {
    let shortUrl = req.params.shortUrl;
    if (!shortUrl) {
        res.render('index')
        return
    }
    // console.log(shortenUrl)
    ///query if shortenUrl is available in database
    data.findOne({shortUrl: shortUrl}, (err, doc) => {
        if (err) {
            console.log(err);
        }
        if (doc == null) {
            res.render('index', {message: "cannot decode short url"});
        }
        else {
            if (doc.longUrl[0] == 'w') {
                res.redirect('http://' + doc.longUrl)
            }
            else {
                res.redirect(doc.longUrl);
            }
        }
    })
});

app.get('/', (req, res) => {
    res.render('index');
});

module.exports = app;