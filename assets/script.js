var apiKey = '69dacd3e106811916a8d25c1fbe9dc73'; //my API key

// function to push city name to search history array in local storage
document
  .getElementById("search-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      var city = this.value;
      searchHistory.push(city);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      renderButtons(city);
      getLatLon(city);
    }
  });

// function to call weather api based on user input when search history button is clicked
function getLatLon(city) {
    var apiKey = '69dacd3e106811916a8d25c1fbe9dc73'; // my API key
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            getCurrent(lat, lon);
            getForecast(lat, lon);

            url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // data contains the current weather data for the given latitude and longitude
                var temperature = data.main.temp;
                var humidity = data.main.humidity;
                var windSpeed = data.wind.speed;
                // function to display city weather data on screen
                var weatherDataDiv = document.getElementById('weather-data'); // id of the div where I want to display the current weather data

                var temperatureDiv = document.createElement('div');
                temperatureDiv.textContent = `Temperature: ${temperature}`;
                weatherDataDiv.appendChild(temperatureDiv);

                var humidityDiv = document.createElement('div');
                humidityDiv.textContent = `Humidity: ${humidity}`;
                weatherDataDiv.appendChild(humidityDiv);

                var windSpeedDiv = document.createElement('div');
                windSpeedDiv.textContent = `Wind Speed: ${windSpeed}`;
                weatherDataDiv.appendChild(windSpeedDiv);
            })
            .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
}

function getForecast(lat, lon) {

}

// function to display city weather data on screen




// function to call weather api based on user input when search history button is clicked















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



