function formatData(timestemp) {
      let daysweek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      let data = new Date(timestemp);
      let h = data.getHours();
      let m = data.getMinutes();
      if (m < 10) {
            m = `0${m}`;
      }
      if (h < 10) {
            h = `0${h}`;
      }
      let d = daysweek[data.getDay() - 1];

      return `${d} ${h}:${m}`;
}

function formatDay(timestemp) {
      let dat = new Date(timestemp * 1000);
      let day = dat.getDay();

      let daysweek2 = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      return daysweek2[day];
}

function displayForecast(response) {
      let forecast = response.data.daily;

      // console.log(response.data.daily)
      let forecastElement = document.querySelector("#forecast");

      let forecastHtml = `<div class="row">`;

      forecast.forEach(function (forecastday, index) {
            if (index < 6) {
                  forecastHtml =
                        forecastHtml +
                        `
                        <div class="col-2">
                            <div class="weather-forecast-date">${formatDay(forecastday.dt)}</div>

                            <img src="http://openweathermap.org/img/wn/${
                                  forecastday.weather[0].icon
                            }@2x.png" alt="" width="42px">
                            <div class="weather-forecast-temprature">
                                <span class="weather-forecast-temprature-maxi">${Math.round(
                                      forecastday.temp.max
                                )}°</span>
                                <span class="weather-forecast-temprature-mini"> ${Math.round(
                                      forecastday.temp.min
                                )}°</span>
                            </div>

                        </div>

                    `;
            }
      });

      forecastHtml = forecastHtml + `</div>`;

      forecastElement.innerHTML = forecastHtml;
}

function getforecast(coordinates) {
      let key = "0962dc1fc48ff43b087025aa1e35e11b";
      let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
      axios.get(api).then(displayForecast);
}

function displayTempruture(response) {
      let cityName = document.querySelector("#city");
      cityName.innerHTML = response.data.name;

      let temp = document.querySelector("#temprature");
      temp.innerHTML = Math.round(response.data.main.temp);
      let description = document.querySelector("#description");
      description.innerHTML = response.data.weather[0].description;

      let Humidity = document.querySelector("#Humidity");
      Humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

      let wind = document.querySelector("#wind");
      wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

      let dataelement = document.querySelector("#data");
      dataelement.innerHTML = formatData(response.data.dt * 1000);

      let iconElement = document.querySelector("#icon");

      cels = response.data.main.temp;

      iconElement.setAttribute(
            "src",
            `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt", response.data.weather[0].description);

      getforecast(response.data.coord);
}

function handleSubmit(event) {
      event.preventDefault();
      let cityInput = document.querySelector("#city-input").value;
      search(cityInput);
}

function search(city) {
      let key = "0962dc1fc48ff43b087025aa1e35e11b";

      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
      axios.get(apiUrl).then(displayTempruture);
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", handleSubmit);

search("Tehran");
