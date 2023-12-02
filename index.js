//TODO: https://miku.sega.jp/arcade/en/music_01.html like frontend
//TODO: rewrite on TS

// Used libraries
var express = require('express');
var xssClean = require('xss-clean');
const dynamoDB = require('@cyclic.sh/dynamodb');
const db = dynamoDB('pink-faithful-sea-lionCyclicDB');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
var fs = require('fs');

// Express app, XSS cleanup, body parser, CORS and port
var app = express();
app.use(xssClean());
app.use('/api/create', bodyParser.json());
app.use(cors());
const port = 3000;

//Rate-limit settings
const limiter = rateLimit({
    windowMs: 5 * 1000,
    max: 5 
});
app.use('/api/create', limiter);

app.get('/', (req, res) => {
    //TODO: any frontend
    res.send('o/ this is made for sharing Project Diva F / F 2nd edits. I don\'t know how newer consoles host songs nor do I own one.')
});

app.post('/api/create', async (req, res) => {
    
    let dysongs = db.collection('songs')

    var song = req.body.song;
    var voca = req.body.vocaloid;
    var author = req.body.author;
    var charter = req.body.charter;
    var psn = req.body.psn;
    var uploadid = req.body.uploadid;
    var game = req.body.game;
    var yt = req.body.yt;
    var reg = req.body.region;

    // Create a new song object
    var newSong = {
        song: song,
        vocaloid: voca,
        author: author,
        charter: charter,
        psn: psn,
        uploadid: uploadid,
        game: game,
        yt: yt,
        region: reg
    };

    

    var itemname = song + 'by' + charter;   

    // Specify the parameters for the put method
    var params = {
        TableName: 'Songs',
        Item: itemname
    };

    try {
        await dysongs.set(itemname, newSong);
        res.status(200).send(await dysongs.get(itemname));
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while creating song' + error + '. Contact @burandby on discord');
    }
});

app.get('/api/db', async (req, res) => {
    let dysongs = db.collection('songs')
    let songList = await dysongs.list();
    let output = {"songs": {}};

    for(let i = 0; i < songList.results.length; i++) {
        let songKey = songList.results[i].key;
        let songDetails = await dysongs.get(songKey);
        output.songs[songDetails.props.song] = songDetails.props;
    }

    res.status(200).send(output);
});

app.listen(port, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", port);
});
