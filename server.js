'use strict';

const env = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//
// Routes
//
app.get('/hello', (req, res) => {
    res.send('hello');
});

app.get('/howdy', (req, res) => {
    res.send('howdy')
});

//
// Spotify Auth
//
const spotifyAuthURI = 'https://accounts.spotify.com/authorize';
const spotifyAuthRedirectURI = 'http://localhost:5000/howdy/';
app.get('/spotify-login', (req, res) => {
    var permissionScope = 'user-read-private user-read-email';
    res.redirect(spotifyAuthURI + 
        '?response_type=code' + 
        '&client_id=' + env.parsed.SPOTIFY_CLIENT_ID +
        (permissionScope ? '&scope=' + encodeURIComponent(permissionScope) : '') +
        '&redirect_uri=' + encodeURIComponent(spotifyAuthRedirectURI));
});

//
// Start server
// 
app.listen(port, () => {
    console.log('listening on port ' + port);
});