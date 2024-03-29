let PORT = process.env.PORT || 8081;
const supertest = require("supertest");

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");

// Require bodyParser dependency
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();
const request = supertest(app);
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());


// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server

// Listening function
app.listen(PORT, function () {
    console.log("http://localhost:" + PORT);
});


// GET route setup to return the JS object created projectData
app.get("/", getData);

function getData(req, res) {
    res.status(200).send("dist/index.html");
}

app.get('/test', async (req, res) => {
    res.json({ message: 'pass!' })
})


// POST route setup to add an entry to the project endpoint

app.post("/postProjectData", addData);

function addData(req, res) {
    let newData = req.body;
    projectData["cityImage"] = newData.cityImage;
    projectData["toCity"] = newData.toCity;
    projectData["countryName"] = newData.countryName;
    projectData["countryCode"] = newData.countryCode;
    projectData["dateOfDeparting"] = newData.dateOfDeparting;
    projectData["daysAway"] = newData.daysAway;
    projectData["maxTemp"] = newData.maxTemp;
    projectData["minTemp"] = newData.minTemp;
    projectData["weatherCondition"] = newData.weatherCondition;
    projectData["weatherIcon"] = newData.weatherIcon;
    res.send(projectData);
}

module.exports = app;