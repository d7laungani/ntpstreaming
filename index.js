var express = require('express');
var app = express();
var server = app.listen(process.env.PORT);

app.use(express.static('public'));


var io = require('socket.io')(server);
var ntp = require('socket-ntp');



var video = " "
var session = 58364
var songstartTime = ' '

io.sockets.on('connection', function (socket) {
    ntp.sync(socket);

    console.log("We have a new client: " + socket.id);
    socket.on('addSongs',

        // Getting data of songs for playlist

        function(data) {

            video = data.song
            /*
            // Add songs to global playlist
            for (song in data.songs ) {

                playlist.add(song)
            }
            */
        }
    );

    socket.on('playSongs',
        function(data) {
            console.log(data)
            songstartTime = Date()
            const songRequest = {
                timestamp: songstartTime,
                //song: video
                song: '58364'

            }

            // Send all clients that are on
            io.sockets.emit('startOnClients', songRequest);
        }

    );

    socket.on('requestToJoin',

        function(data) {
        console.log('got request')
            const songRequest = {
                timestamp: songstartTime,
                song: video

            }

            // Send all client that are on
            socket.emit('startOnClients', songRequest);
        }


    );



});




