require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const axios = require('axios');
const bodyParser = require('body-parser');
const apikey=process.env.API_KEY;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    const city=req.query.city;
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
        // Fetching  hourly forecast data
    const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}`);
    const currentWeather = {
        weather: response.data.weather[0].main,
        icon: response.data.weather[0].icon,
        description: response.data.weather[0].description,
        temperatureCelsius: (response.data.main.temp - 273.15).toFixed(2),
        humidity: response.data.main.humidity,
      };
        
       
    // Get the  hourly forecast data from the response
    const hourlyForecastData = forecastResponse.data.list.map((forecast) => ({
        time: forecast.dt_txt,
        temperatureCelsius: (forecast.main.temp - 273.15).toFixed(2),
        humidity: forecast.main.humidity,
        weather: forecast.weather[0].main,
        description: forecast.weather[0].description,
        icon: forecast.weather[0].icon,
      }));
      
  
      // Create an array to send back to the client
      const sending = {
        currentWeather,
        hourlyForecastData,
      };

       res.send(sending)
       
    }catch(err){
        console.log(err);
    }
  
});
app.get("/hello",function(req,res){
    res.send("Hello");
})

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});