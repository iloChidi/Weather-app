//query select all element
const notifictionElement = document.querySelector(".notification");
const locationElement = document.querySelector(".location");
const tempInCelsius = document.querySelector(".temp-celsius p");
const tempInFahrenheit = document.querySelector(".temp-fahrenheit p");
const descElement = document.querySelector(".temp-description p");
const dateElement = document.querySelector(".date");

//data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273;

//API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

//check if browser supports geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);   
}else{
    notifictionElement.style.display = "block";
    notifictionElement.innerHTML = "<p>Geolocation not supported</p>";
}

//set user's position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

//if error in geolocation service
 function showError(error) {
     notifictionElement.style.display = "block";
     notifictionElement.innerHTML = `<p> ${error.message} </p>`;
 }

//get weather from api
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    fetch(api)
      .then(function(response){
          let data = response.json();
          return data;
      })
      .then(function(data){
          weather.temperature.value = Math.floor(data.main.temp - KELVIN);
          weather.description = data.weather[0].description;
          weather.iconId = data.weather[0].icon;
          weather.city = data.name;
          weather.country = data.sys.country;
      })
      .then(function(){
          displayWeather();
      });
}

//dispaly weather 
function displayWeather(){
    tempInCelsius.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    tempInFahrenheit.innerHTML = `${Math.floor(weather.temperature.value * 9/5) + 32}°<span>F</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`; 


    let now = new Date();
    dateElement.innerHTML = dateBuilder(now);
}

function dateBuilder(d){
    let months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`;
}