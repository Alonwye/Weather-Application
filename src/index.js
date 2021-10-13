function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayGeoTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = `Latitude = ${response.data.coord.lat}\nLongitude = ${response.data.coord.lon}`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchGeo(position) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}&units=metric&${position}`;
  axios.get(apiUrl).then(displayGeoTemperature);
}

function showCurrentPosition(position) {
  console.log(
    `Latitude = ${position.coords.latitude}\nLongitude = ${position.coords.longitude}`
  );
  let weatherData = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
  searchGeo(weatherData);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentUnit = "metric";

function search(city) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${currentUnit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchCity");
  search(cityInputElement.value);
}

let form = document.querySelector("#citySearch");
form.addEventListener("submit", handleSubmit);

search("Canberra");

function createFahrenheit(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("#temperature");
  let temperature = temperatureNow.innerHTML;
  temperature = Number(temperature);
  temperatureNow.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", createFahrenheit);

function createCelcius(event) {
  event.preventDefault();
  let temperatureNow = document.querySelector("#temperature");
  let temperature = temperatureNow.innerHTML;
  temperature = Number(temperature);
  currentUnit = "metric";
  temperatureNow.innerHTML = Math.round((temperature - 32) * (5 / 9));
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", createCelcius);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getPosition);
