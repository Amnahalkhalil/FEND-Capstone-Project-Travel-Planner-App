# FEND Capstone Project: Travel Planner App

This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs. Given that this is the Capstone project, it's highly encouraged for you to go above and beyond, adding additional functionality and customization to truly stand out with a project you are proud to have at the top of your portfolio!
## Extra functionality
- Add end date and display the length of trip.
- Allow the user to remove the trip.
- Incorporate icons into forecast.
## Main files of the project

- Server side: 
  - server.js
- Client side: 
  - app.js 
  - appApi.js
  - handleSubmit.js
  - handleReset.js
  
## Testing

For test run `npm run test`

![Test screenshoot](testscreenshoot.gpngif)

## Development environment

For dev env run `npm run build-dev`

## How to run the project

1. Run `npm install` to install dependencies.
2.go `src > client > js > appApi.js` and fill the file with your API keys [Geonames](http://www.geonames.org/export/web-services.html),[WeatherBit](https://www.weatherbit.io/) and[pixbay](https://pixabay.com)
4. Run `npm run build-prod` to create dist folder.
5. Start the server with `npm run start`.
6. Go to [http://localhost:8081](http://localhost:8081).

## How it works

![how to use the website](FEND.gif)
## Online demo hosted on Heroku

[Check the online demo here](https://travel-planner2020.herokuapp.com/)
