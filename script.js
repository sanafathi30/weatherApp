function showTemperature(response) {


    let k = document.querySelector("#dg");
    k.innerHTML = Math.round(response.data.main.temp);
    let status1 = document.querySelector("#status");
    status1.innerHTML = response.data.weather[0].main;

    let speed = document.querySelector("#windspeed");
    speed.innerHTML = `Wind :${Math.round(
                  response.data.wind.speed
                )} km/h `;
    let humidity = document.querySelector("#Humidity");
    humidity.innerHTML = `Humidity: ${response.data.main.humidity} %`;




}

// function showTemperature(response) {
//     let temperature = Math.round(response.data.main.temp);
//     let currentTemperature = document.querySelector("#current-temperature");
//     currentTemperature.innerHTML = `${temperature}°C`;

//     let weather = response.data.weather[0].description;
//     let currentWeather = document.querySelector("#current-weather");
//     currentWeather.innerHTML = weather;

//     let humidity = response.data.main.humidity;
//     let currentHumidity = document.querySelector("#humidity");
//     currentHumidity.innerHTML = `${humidity}%`;

//     let windSpeed = response.data.wind.speed;
//     let currentWindSpeed = document.querySelector("#wind-speed");
//     currentWindSpeed.innerHTML = windSpeed;

//     let cityName = response.data.name;
//     let city = document.querySelector("#city-name");
//     city.innerHTML = cityName;
// }





function setApi(position) {

    let keyApi = "0962dc1fc48ff43b087025aa1e35e11b";
    let apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${keyApi}&units=metric`;

    axios.get(apiurl).then(showTemperature);
}




function setPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(setApi)

}



let btn2 = document.querySelector("#current");
btn2.addEventListener("click", setPosition)