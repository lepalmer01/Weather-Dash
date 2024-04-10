var apiKey = "69dacd3e106811916a8d25c1fbe9dc73"; //my API key
var now = dayjs().format("MM/DD/YYYY");

// function to push city name to search history array in local storage
document
  .getElementById("search-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      var city = this.value;
      var searchHistory = [];
      searchHistory.push(city);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      renderButtons(city);
      getLatLon(city);
    }
  });

// function to call weather api based on user input when search history button is clicked
function getLatLon(city) {
  var apiKey = "69dacd3e106811916a8d25c1fbe9dc73"; // my API key
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      getCurrent(lat, lon);
      getForecast(lat, lon);
    })
    .catch((error) => console.error("Error:", error));
}

// function to get current weather data for the city
function getCurrent(lat, lon) {
  url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayWeatherdata(data);
    })
    .catch((error) => console.error("Error:", error));
}

// function to display city weather data on screen
function displayWeatherdata(data) {
  console.log(data);

  // create elements to display the current weather data
  // data object contains the current weather information accessible for the city
  var temperature = data.list[0].main.temp;
  var humidity = data.list[0].main.humidity;
  var windSpeed = data.list[0].wind.speed;
  var feelslike = data.list[0].main.feels_like;
  var weatherdata = data.list[0].weather[0].description;

  // id of the div where I want to display the current weather data
  var weatherDataDiv = document.getElementById("weather-data");
  weatherDataDiv.className = "container";

  var city = document.createElement("h1");
  city.textContent = data.city.name + " " + now;
  weatherDataDiv.appendChild(city);

  weatherDataDiv.textContent = data.name;
  weatherDataDiv.append(city);
  weatherDataDiv.style.color = "white";

//   var date = document.createElement("h3");
//   date.textContent = new Date().toLocaleDateString();
//   weatherDataDiv.appendChild(date);

  var weatherDiv = document.createElement("div");
  weatherDiv.textContent = `Weather Description: ${weatherdata}`;
  weatherDataDiv.appendChild(weatherDiv);

  var temperatureCard = document.createElement("div");
  temperatureCard.textContent = `Temperature: ${temperature}`;
  weatherDataDiv.appendChild(temperatureCard);

  var feels_likeDiv = document.createElement("div");
  feels_likeDiv.textContent = `Feels Like: ${feelslike}`;
  weatherDataDiv.appendChild(feels_likeDiv);

  var humidityDiv = document.createElement("div");
  humidityDiv.textContent = `Humidity: ${humidity}`;
  weatherDataDiv.appendChild(humidityDiv);

  var windSpeedDiv = document.createElement("div");
  windSpeedDiv.textContent = `Wind Speed: ${windSpeed}`;
  weatherDataDiv.appendChild(windSpeedDiv);
}

// function to display the 5 day forecast data on screen
function getForecast(lat, lon) {}

// get previous city search history from local storage
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
searchHistory.forEach(renderButtons);

// create buttons for each city, assign value and display on screen
function renderButtons(city) {
  var btn = document.createElement("button");
  btn.classList.add("search-history-btn");
  btn.textContent = city;
  btn.value = city;
  document.getElementById("search-history").appendChild(btn);
}
