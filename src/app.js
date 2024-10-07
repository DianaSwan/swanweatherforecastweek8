function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");

  if (searchInput && searchInput.value) {
    console.log(searchInput.value);
    searchCity(searchInput.value);
  } else {
    console.error("Search input not found or empty");
  }
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function searchCity(city) {
  let apiKey = "24a843192c3oc0c5tab227801f7a3edf";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query={query}&key={key}`;

  axios
    .get(apiURL)
    .then(refreshWeather)
    .catch(function (error) {
      console.error("Error fetching weather data", error);
    });
}

function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");

  let date = new Date(response.data.time * 1000);
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity + "%";
  windSpeedElement.innerHTML = response.data.wind.speed + " km/h";
  timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
