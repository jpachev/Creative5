var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/videoDB', { useNewUrlParser: true });
var videoSchema = mongoose.Schema({
    name: String,
    url: String
});
var Video = mongoose.model('Video', videoSchema);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => console.log('connected'));

router.post('/add', (req, res, next) => {
    console.log('POST add route');
    new Video(req.body).save((err, post) => {
        if (err) return console.error(err);
        res.sendStatus(200);
    });
});

router.get('/getVideo', (req, res, next) => {
    console.log('GET getVideo route');
    var url = req.query.url;
    var name = req.query.name;
    var settings;
    if (url === "")
        settings = { name: req.query.name };
    else
        settings = { url: req.query.url };

    Video.findOne(settings, (err, video) => {
        if (err)
            return console.error(err);
        else
            console.log(video);
        res.json(video);
    });
});

router.get('/list', (req, res, next) => {
    Video.find((err, videos) => {
        if (err) return console.log(err);
        res.json(videos);
    });
});

router.post('/erase', (req, res, next) => {
    console.log('POST erase route');
    Video.find().remove().exec();
    res.sendStatus(200);
});

module.exports = router;
