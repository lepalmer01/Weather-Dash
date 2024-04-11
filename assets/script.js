var apiKey = "69dacd3e106811916a8d25c1fbe9dc73"; //my API key
var now = dayjs().format("MM/DD/YYYY");

const searchInput = document.getElementById("search-input");
var cityList = document.getElementById("city-list");

// function to push city name to search history array in local storage
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    search();
  }
});

function search() {
  var city = searchInput.value;
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

  //   check if city is already in search history
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    getLatLon(city);
    renderButtons();
  } else {
    alert("City already in search history");
  }
}

const searchButton = document.getElementById("basic-addon2");
searchButton.addEventListener("click", search);

// function to call weather api based on user input when search history button is clicked
function getLatLon(city) {
  var apiKey = "69dacd3e106811916a8d25c1fbe9dc73"; // my API key
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      // renderButton(city);
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
      console.log("data:", data);
      displayWeatherdata(data);
    })
    .catch((error) => console.error("Error:", error));
}

// function to display city weather data on screen
function displayWeatherdata(data) {
  // console.log(data);

  // create elements to display the current weather data
  // data object contains the current weather information accessible for the city
  var temperature = data.list[0].main.temp;
  var humidity = data.list[0].main.humidity;
  var windSpeed = data.list[0].wind.speed;
  var feelslike = data.list[0].main.feels_like;
  var weatherdata = data.list[0].weather[0].description;
  var icon = data.list[0].weather[0].icon;

  // id of the div where I want to display the current weather data
  var weatherDataDiv = document.getElementById("weather-data");
  weatherDataDiv.className = "container";

  var city = document.createElement("h1");
  city.textContent = data.city.name + " " + now;
  weatherDataDiv.appendChild(city);

  weatherDataDiv.textContent = data.name;
  weatherDataDiv.append(city);
  weatherDataDiv.style.color = "white";

  var iconImg = document.createElement("img");
  iconImg.src = `https://openweathermap.org/img/w/${icon}.png`;
  iconImg.className = "getCurrent-icon";
  weatherDataDiv.appendChild(iconImg);

  var weatherDiv = document.createElement("div");
  weatherDiv.className = "weather-description";
  weatherDiv.textContent = `Weather Description: ${weatherdata}`;
  weatherDataDiv.appendChild(weatherDiv);

  var temperatureCard = document.createElement("div");
  temperatureCard.className = "temperature";
  temperatureCard.textContent = `Temperature: ${temperature}` + " F";
  weatherDataDiv.appendChild(temperatureCard);

  var feels_likeDiv = document.createElement("div");
  feels_likeDiv.className = "feels-like";
  feels_likeDiv.textContent = `Feels Like: ${feelslike}` + " F";
  weatherDataDiv.appendChild(feels_likeDiv);

  var humidityDiv = document.createElement("div");
  humidityDiv.className = "humidity";
  humidityDiv.textContent = `Humidity: ${humidity}`;
  weatherDataDiv.appendChild(humidityDiv);

  var windSpeedDiv = document.createElement("div");
  windSpeedDiv.className = "wind-speed";
  windSpeedDiv.textContent = `Wind Speed: ${windSpeed}`;
  weatherDataDiv.appendChild(windSpeedDiv);
}

// function to display the 5 day forecast data on screen
function getForecast(lat, lon) {
  var apiKey = "69dacd3e106811916a8d25c1fbe9dc73";
  url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      var forecastDiv = document.getElementById("forecast");
      forecastDiv.innerHTML = ""; // clear any existing forecast data

      var fivedayDiv = document.createElement("h4");
      fivedayDiv.textContent = "5 Day Forecast";
      fivedayDiv.classList = "five-day-title";
      forecastDiv.appendChild(fivedayDiv);

      var rowDiv = document.createElement("div");
      rowDiv.className = "row justify-content-around";
      forecastDiv.appendChild(rowDiv);

      // OpenWeatherMap's forecast API returns data for every 3 hours, so we'll use a step of 8 to get data for approximately every 24 hours
      for (var i = 0; i < data.list.length; i += 8) {
        var dayData = data.list[i];

        var cardDiv = document.createElement("div");
        cardDiv.className = "card col-md-2";
        rowDiv.appendChild(cardDiv);

        var dateDiv = document.createElement("h5");
        dateDiv.textContent = new Date(dayData.dt_txt).toLocaleDateString();
        dateDiv.className = "card-date";
        cardDiv.appendChild(dateDiv);

        var icon = document.createElement("img");
        icon.src = `https://openweathermap.org/img/w/${dayData.weather[0].icon}.png`;
        icon.width = 100;
        icon.height = 100;
        icon.className = "icon-img";

        cardDiv.appendChild(icon);

        var temperatureDiv = document.createElement("div");
        temperatureDiv.textContent = `Temperature: ${dayData.main.temp}`;
        cardDiv.appendChild(temperatureDiv);

        var humidityDiv = document.createElement("div");
        humidityDiv.textContent = `Humidity: ${dayData.main.humidity}`;
        cardDiv.appendChild(humidityDiv);

        var windSpeedDiv = document.createElement("div");
        windSpeedDiv.textContent = `Wind Speed: ${dayData.wind.speed}`;
        cardDiv.appendChild(windSpeedDiv);

        rowDiv.appendChild(cardDiv);
      }
    })
    .catch((error) => console.error("Error:", error));
}

// get previous city search history from local storage
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
renderButtons();

function renderButtons() {
  cityList.innerHTML = "";
  searchHistory.forEach(renderButton);
}

// create buttons for each city, assign value and display on screen
function renderButton(city) {
  var cityListItem = document.createElement("button");
  cityListItem.className = "list-group-item list-group-item-action";
  cityListItem.textContent = city;

  // Add event listener to the button
  cityListItem.addEventListener("click", function () {
    getLatLon(city);
  });

  cityList.appendChild(cityListItem);
}
