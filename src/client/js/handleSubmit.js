import { geoNamesApiKey, weatherBitApiKey, pixaBayApiKey } from "./appApi";

const projectData = {};
const responsesSection = document.querySelector("#responsesSection");

function handleSubmit(event) {
    event.preventDefault();
    // Storing data in the projectData object
    let toCity = document.querySelector("#toCity").value;
    projectData["toCity"] = toCity;
    //lengthOfTrip function parameters
    let dateOfDeparting = document.querySelector("#dateOfdeparting").value;
    projectData["dateOfDeparting"] = dateOfDeparting;
    let dateOfReturning = document.querySelector("#dateOfReturning").value;
    projectData["dateOfReturning"] = dateOfReturning;
    let daysAway = lengthOfTrip(dateOfReturning, dateOfDeparting);
    projectData["daysAway"] = daysAway;
    //make multiple API call
    try {
        getCityCoordinates(toCity)
            .then(function (cityInfo) {
                //getWeatherOfCity function parameters
                const latitude = cityInfo.geonames[0].lat;
                const longitude = cityInfo.geonames[0].lng;
                const date = projectData["dateOfDeparting"];
                // to store country name of city name in projectData object 
                projectData["countryName"] = cityInfo.geonames[0].countryName;
                // to store country code used later on to show flag of country
                projectData["countryCode"] = cityInfo.geonames[0].countryCode;
                // call getWeatherOfCity function to return weather data
                return getWeatherOfCity(latitude, longitude, date);
            }).then(function (weatherInfo) {
                // store maxTemp,minTemp and weatherCondition data in projectData object 
                projectData["maxTemp"] = weatherInfo["data"][0]["max_temp"];
                projectData["minTemp"] = weatherInfo["data"][0]["min_temp"];
                projectData["weatherCondition"] = weatherInfo["data"]["0"]["weather"]["description"];
                // store weather code icon to show icon of weather later on 
                projectData["weatherIcon"] = weatherInfo["data"]["0"]["weather"]["icon"];
                return getImage(projectData["toCity"]);
            }).then(function (imageInfo) {
                // to store city url Image data in projectData object
                projectData["cityImage"] = imageInfo["hits"][0]["largeImageURL"];
                // call post function
                return postProjectData(projectData);
            }).then(function (userData) {
                // to Update UI view
                dynamicUpdateUI(userData);
            })
    } catch (error) {
        console.log("error", error);
    }
}

// Function to get Coordinates of city from geoNames
async function getCityCoordinates(city) {
    const geoNamesUrl = `https://api.geonames.org/searchJSON?q=${city}&maxRows=10&username=${geoNamesApiKey}`;
    const response = await fetch(geoNamesUrl, { mode: 'cors' });
    try {
        let data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

//Async function to get weather from WeatherBit
async function getWeatherOfCity(latitude, longitude, date) {
    const forecastUrl = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${weatherBitApiKey}`;
    const response = await fetch(forecastUrl, { mode: 'cors' })
    try {
        let data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error)
    }
}

// Async function to get data from Pixabay
async function getImage(city) {
    const PixaBayApiUrl = `https://pixabay.com/api/?key=${pixaBayApiKey}&q=${city}&image_type=photo`;
    const response = await fetch(PixaBayApiUrl, { mode: 'cors' })
    try {
        let data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error)
    }
}

//  post function
async function postProjectData(projectData) {

    const url = "https://travel-planner2020.herokuapp.com/postProjectData";

    const response = await fetch(url, {
        method: "POST",
        mode: 'cors',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(projectData)
    });
    try {
        let data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

//Function to get the difference between two dates
function lengthOfTrip(date1, date2) {
    let fristDate = new Date(date1);
    let secondDate = new Date(date2);
    const differenceInTime = Math.abs(fristDate - secondDate);
    //console.log(differenceInTime);
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    return differenceInDays;
}

//Function to get the city image
function getCityImage(imageUrl) {
    cityImage.setAttribute("src", imageUrl);
}

//Function to get the contery flag
function getConteryFlag(countryCode) {

    countryFlags.setAttribute("src", `https://www.countryflags.io/${countryCode}/flat/64.png`);
}

//Function to get the weather icon
function getWeatherIcon(weatherCodeIcon) {
    weatherIcon.setAttribute("src", `https://www.weatherbit.io/static/img/icons/${weatherCodeIcon}.png`);
}

// Function to update UI
function dynamicUpdateUI(data) {
    responsesSection.classList.remove("hidden");
    let cityImage = document.querySelector("#cityImage");
    let myTripToCity = document.querySelector("#myTripToCity");
    let myTripToCountry = document.querySelector("#myTripToCountry");
    let countryFlags = document.querySelector("#countryflags");
    let city = document.querySelector("#city");
    let dateOfDeparting = document.querySelector("#dateOfDeparting");
    let daysAway = document.querySelector("#daysAway");
    let maxTemp = document.querySelector("#maxTemp");
    let minTemp = document.querySelector("#minTemp");
    let weatherCondition = document.querySelector("#weatherCondition");
    let weatherIcon = document.querySelector("#weatherIcon");

    getCityImage(data.cityImage);
    myTripToCity.innerHTML = data.toCity;
    myTripToCountry.innerHTML = data.countryName;
    getConteryFlag(data.countryCode);
    dateOfDeparting.innerHTML = data.dateOfDeparting;
    city.innerHTML = data.toCity;
    daysAway.innerHTML = data.daysAway;
    maxTemp.innerHTML = data.maxTemp;
    minTemp.innerHTML = data.minTemp;
    weatherCondition.innerHTML = data.weatherCondition;
    getWeatherIcon(data.weatherIcon);

}

export {
    handleSubmit,
    responsesSection
}