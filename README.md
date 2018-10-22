LIRI-Node-App
LIRI is a Language Interpretation and Recognition Interface. It searches Spotify for songs, Bands in Town for concerts, and OMDB for movies.

It utilizes four Node packages:

Node-Spotify-API
Request
Moment
DotEnv
The OMDB and Bands in Town are accessed using the Node package Request.

4 Commands main
concert-this 
spotify-this-song 
movie-this 
do-what-it-says

========================================================================================
1. node liri.js concert-this 'band name here'
node liri.js concert-this <artist/band name here>
This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")(MOMENT.JS)
======================================================================================== 

2. node liri.js spotify-this-song ''

This will show the following information about the song in the terminal/bash window

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from If no song is provided then program will default to "The Sign" by Ace of Base.
======================================================================================== 

3. node liri.js movie-this '' 

This will output the following information to the terminal/bash window:

Title of the movie.
Year the movie came out.
IMDB Rating of the movie.
Rotten Tomatoes Rating of the movie.
Country where the movie was produced.
Language of the movie.
Plot of the movie.
Actors in the movie.
If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/ It's on Netflix!

========================================================================================

4. node liri.js do-what-it-says ''

Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt. Edit the text in random.txt to test out the feature for movie-this and my-tweets



