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

app.get("/movieInfo", (req, res) => {
  console.log("Received query string:", req.query);
  let movieID = req.query.movie_id;
  console.log("Movie Title:", movieID);

  axios(`${baseUrl}/movie/${movieID}?api_key=${apiKey}`).then(response => {
    console.log("API response received:", response.data);
    //res.json(response.data);
  }).catch(error => {
    console.log("Error when requesting from API", error);
  });;
});

app.listen(port, hostname, () => {
  console.log(`http://${hostname}:${port}`);
});