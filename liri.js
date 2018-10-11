require("dotenv").config();

const fs = require('fs')
var request = require("request");
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var type = process.argv[2];
var name = process.argv[3];

var pick = function (type, name){
	switch (type) {
    case "concert-this":
        pickConcert();
        break;
    case "spotify-this-song":
        pickMusic();
        break;
    case "movie-this":
        pickMovie();
        break;
    case "do-what-it-says":
        pickFile();
        break;
    default:
        console.log("Liri cannot understand, try again.")
        break;
	}
};

var runThis = function (argOne, argTwo){
	pick(argOne, argTwo);
};

runThis (type,name);

// BANDSINTOWN API CALL AND FUNCTION ==========================================================

function pickConcert(){

	// Then run a request to the BANDS IN TOWN API with the ARTIST specified
	let queryUrl = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp";
	
	// This line is just to help us debug against the actual URL.
	//console.log(queryUrl);
	
	// Then create a request to the queryUrl
	request(queryUrl, function(error, response, data){
	    if(!error && response.statusCode === 200){
	        //console.log(JSON.parse(data)[0].id);
	    } 
	    	    
	    console.log("Venue Name: " + JSON.parse(data)[0].venue.name);
	    console.log("Venue Location: " + JSON.parse(data)[0].venue.city);
	    console.log("Event Date: " + moment(JSON.parse(data)[0].datetime).format("MM/DD/YYYY"));
	    
	});
};

// SPOTIFY API CALL AND FUNCTION ==============================================================

function pickMusic(){

	//console.log(process.env.SPOTIFY_ID);
	//console.log(process.env.SPOTIFY_SECRET);
	//var name = dataArr[1];
		
	spotify.search({ type: 'track', query: name }, function (err, data) {
		
        if (err) {
            console.log('Error occurred: ' + err);
			pickMusic();
            return;
        }
        
        
       if (name === undefined){

	        console.log("ASJDKHASLDJKHS");
	        let name = "The Sign";
	        pickMusic();
        }

        //console.log(data);
            
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
		console.log("Name of Song: " + data.tracks.items[0].name);
		console.log("Preview Link: " + data.tracks.items[0].preview_url);
		console.log("Album: " + data.tracks.items[0].album.name);
            
    });
};

// OMDB API CALL AND FUNCTION ================================================================

function pickMovie(){
			
	// Then run a request to the OMDB API with the movie specified
	let queryUrl = "http://www.omdbapi.com/?t=" + name.trim() + "&y=&plot=short&apikey=trilogy";
	
	
	// This line is just to help us debug against the actual URL.
	//console.log(queryUrl);
	
	
	request(queryUrl, function(error, response, data){
	    if(error && response.statusCode === 200){
		   	console.log('Error occurred: ' + error);
	    }
		    console.log("Title: " + JSON.parse(data).Title);
		    console.log("Year Relased: " + JSON.parse(data).Released);
		    console.log("IMDB Rating: " + JSON.parse(data).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(data).Ratings[2].Value);
		    console.log("Country where the movie was produced: " + JSON.parse(data).Country);
		    console.log("Language: " + JSON.parse(data).Language);
		    console.log("Plot: " + JSON.parse(data).Plot);
		    console.log("Actor(s): " + JSON.parse(data).Actors);

	});
	
};

// RANDOM FILE UPLOAD AND RUN CALL AND FUNCTION ===============================================

function pickFile() {


   fs.readFile("random.txt", "utf-8", function (error, data) {
        console.log(data);
/*
        if (error){ 
	        throw err;
	    }

        var dataArr = data.split(",");
        
        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);
        }
       
*/

    });    

};



