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

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast-card");
  let forecastElementHTML = `<div class="row">`;
  let forecast = response.data.daily;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastElementHTML = forecastElementHTML + `
      <div class="col-2">
        <img class="forecast-icons" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="Clear" id="forecast-icon"/>
        <div class="forecast-details">
          <div class="forecast-description">${forecastDay.weather[0].description}</div>
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
          <div class="forecast-date">16-Oct</div>
          <div class="forecast-temps">
            <span class="forecast-temp-low">${Math.round(forecastDay.temp.min)}</span>° / <span class="forecast-temp-high">${Math.round(forecastDay.temp.max)}</span>°
          </div>
        </div>
      </div>`;
    }
  });
  forecastElementHTML = forecastElementHTML + `</div>`;
  forecastElement.innerHTML = forecastElementHTML;
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

  getForecast(response.data.coord);
}


let currentUnit = "metric";

function search(city) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${currentUnit}`;
  axios.get(apiUrl).then(displayTemperature);
}

function getForecast(coordinates) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${currentUnit}&cnt=5&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchCity");
  search(cityInputElement.value);
}

let form = document.querySelector("#citySearch");
form.addEventListener("submit", handleSubmit);

search("Canberra");