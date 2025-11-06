let axios = require("axios");
let express = require("express");
let app = express();
let apiFile = require("../api/env.json");
let apiKey = apiFile["api_key"]; // use this to make requests
let baseUrl = apiFile["api_url"]; // use this to make requests
let port = 3000;
let hostname = "localhost";
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send();
});

app.get("/movieInfo/:movie_id", (req, res) => {
  //console.log("Movie ID:", req.params.movie_id);
  let movieID = req.params.movie_id; // int ID of movie
  console.log("Movie ID:", movieID);
  console.log(`${baseUrl}/movie/${movieID}?api_key=${apiKey}`);

  // axios to call TMDB api with movie id in english
  axios(`${baseUrl}/movie/${movieID}?api_key=${apiKey}&language=en-US`).then(response => {
    console.log("API response received:", response.data);
    res.json(response.data); // send json blob of movie data
  }).catch(error => {
    console.log("Error when requesting from API", error);
    res.status(error.response.status).json({"error": error.response.data["message"]}); // error if anything goes wrong
  });
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});