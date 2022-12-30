require("dotenv").config();

//const { Router } = require("express");
const express = require("express");
const hbs = require("hbs");

// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
   clientId: process.env.SPOTIFY_CLIENTID,
   clientSecret: process.env.SPOTIFY_CLIENTSECRET,
});

spotifyApi
   .clientCredentialsGrant()
   .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
   .catch((error) =>
      console.log("Something went wrong when retrieving an access token", error)
   );

// Our routes go here:

app.get("/", (req, res)=>{
   res.render("home")
})

spotifyApi
  .searchArtists("/artist-search")
  .then(data => {
    console.log('The received data from the API: ', data.body);
    // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    res.render("artist-search-results", data.body)
  })
  .catch(err => console.log('The error while searching artists occurred: ', err));









app.listen(3000, () =>
   console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);
