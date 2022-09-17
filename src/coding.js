function formatTime(date) {
let hours = now.getHours();
if (hours < 10) {
  hours =`0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes =`0${minutes}`;
}
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
let day = days[now.getDay()];

return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector ("h3");
let now = new Date();
dateElement.innerHTML = formatTime(now);

function showWeather(response) {
  console.log(response.data);
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

function searchCity(city) {
  let apiKey = "e9ffd4ce16dc45c9d34d0660cc02fdff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather)
}
function searchLocation(position) {
  let apiKey = "e9ffd4ce16dc45c9d34d0660cc02fdff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=e9ffd4ce16dc45c9d34d0660cc02fdff&units=metric`;
  axios.get(apiUrl).then(showWeather)
}

function currentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function submitButton(event) {
    event.preventDefault();
    let city = document.querySelector("#city-name").value;
    searchCity(city);
}

let searchForm = document.querySelector ("#search-form");
searchForm.addEventListener("submit", submitButton)

let currentLocationButton = document.querySelector ("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation)
 
searchCity("New York");